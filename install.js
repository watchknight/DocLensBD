import https from 'https';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';

const NODE = process.execPath;
const NODE_DIR = path.dirname(NODE);
const CWD = process.cwd();

function httpsFollow(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        httpsFollow(res.headers.location).then(resolve).catch(reject);
        return;
      }
      resolve(res);
    }).on('error', reject);
  });
}

// Minimal tar extraction (only handles regular files)
async function extractTgz(tgzPath, destDir) {
  const gunzip = createGunzip();
  const input = fs.createReadStream(tgzPath);
  
  return new Promise((resolve, reject) => {
    const chunks = [];
    input.pipe(gunzip)
      .on('data', chunk => chunks.push(chunk))
      .on('end', () => {
        const buffer = Buffer.concat(chunks);
        let offset = 0;
        let fileCount = 0;
        
        while (offset < buffer.length) {
          // Read tar header (512 bytes)
          if (offset + 512 > buffer.length) break;
          const header = buffer.subarray(offset, offset + 512);
          
          // Check for end of archive (two zero blocks)
          if (header.every(b => b === 0)) break;
          
          // Extract filename
          let name = header.subarray(0, 100).toString('utf8').replace(/\0/g, '');
          // Check for ustar prefix
          const prefix = header.subarray(345, 500).toString('utf8').replace(/\0/g, '');
          if (prefix) name = prefix + '/' + name;
          
          // Remove leading 'package/' from npm tarball
          name = name.replace(/^package\//, '');
          
          // File size (octal)
          const sizeStr = header.subarray(124, 136).toString('utf8').replace(/\0/g, '').trim();
          const size = parseInt(sizeStr, 8) || 0;
          
          // File type
          const type = header[156];
          
          offset += 512; // Move past header
          
          if (name && type === 53) { // Directory
            const dirPath = path.join(destDir, name);
            fs.mkdirSync(dirPath, { recursive: true });
          } else if (name && (type === 48 || type === 0) && size > 0) { // Regular file
            const filePath = path.join(destDir, name);
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
            const data = buffer.subarray(offset, offset + size);
            fs.writeFileSync(filePath, data);
            fileCount++;
          }
          
          // Advance to next 512-byte boundary
          offset += Math.ceil(size / 512) * 512;
        }
        
        console.log(`Extracted ${fileCount} files`);
        resolve();
      })
      .on('error', reject);
  });
}

async function downloadFile(url, dest) {
  const res = await httpsFollow(url);
  await pipeline(res, fs.createWriteStream(dest));
}

async function main() {
  console.log('Node:', NODE, process.version);
  console.log('CWD:', CWD);

  if (fs.existsSync(path.join(CWD, 'node_modules', 'react'))) {
    console.log('Dependencies already installed.');
    return;
  }

  const tmpDir = path.join(CWD, '_npm_tmp');
  fs.mkdirSync(tmpDir, { recursive: true });

  // Download npm
  const tarPath = path.join(tmpDir, 'npm.tgz');
  console.log('Downloading npm...');
  await downloadFile('https://registry.npmjs.org/npm/-/npm-10.9.0.tgz', tarPath);
  const stat = fs.statSync(tarPath);
  console.log(`Downloaded (${(stat.size / 1024 / 1024).toFixed(1)} MB). Extracting...`);

  // Extract using built-in zlib
  const npmDir = path.join(tmpDir, 'npm');
  fs.mkdirSync(npmDir, { recursive: true });
  await extractTgz(tarPath, npmDir);

  const npmCli = path.join(npmDir, 'bin', 'npm-cli.js');
  if (!fs.existsSync(npmCli)) {
    console.log('npm-cli.js not found! Looking for alternatives...');
    const binDir = path.join(npmDir, 'bin');
    if (fs.existsSync(binDir)) {
      console.log('bin contents:', fs.readdirSync(binDir));
    }
    // Try deeper
    const deepCli = path.join(npmDir, 'package', 'bin', 'npm-cli.js');
    if (fs.existsSync(deepCli)) {
      console.log('Found at:', deepCli);
    }
    return;
  }

  console.log('Running npm install...');
  execSync(`"${NODE}" "${npmCli}" install --no-audit --no-fund`, {
    stdio: 'inherit',
    cwd: CWD,
    env: { ...process.env, PATH: NODE_DIR + ';' + (process.env.PATH || '') }
  });
  console.log('Dependencies installed!');

  // Cleanup
  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log('Done!');
}

main().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
