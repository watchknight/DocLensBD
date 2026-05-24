import React, { useRef, useState, useEffect, useCallback } from 'react';
import { X, Camera as CameraIcon, AlertCircle } from 'lucide-react';
import { products } from '../data/products';
import type { Results } from '@mediapipe/face_mesh';

// Use window globals for MediaPipe to bypass Vite/Rollup tree-shaking issues in production
const FaceMesh = (window as any).FaceMesh;
const Camera = (window as any).Camera;

interface VirtualTryOnProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductId?: number;
}

// Transparent glasses overlay images (front-facing, no background)
// For best results, replace these with actual transparent PNGs of your frames

// Create a transparent version of a glasses image by removing white/light background
function createTransparentGlasses(img: HTMLImageElement): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = img.naturalWidth || img.width;
  c.height = img.naturalHeight || img.height;
  const ctx = c.getContext('2d');
  if (!ctx) return c;
  ctx.drawImage(img, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, c.width, c.height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Calculate brightness and saturation
    const brightness = (r + g + b) / 3;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const saturation = max === 0 ? 0 : (max - min) / max;
    
    // Remove white/near-white pixels (high brightness, low saturation)
    if (brightness > 210 && saturation < 0.15) {
      data[i + 3] = 0; // fully transparent
    } else if (brightness > 190 && saturation < 0.2) {
      // Gradual fade for near-white pixels (anti-aliasing edges)
      const factor = (brightness - 190) / 30;
      data[i + 3] = Math.round(255 * Math.max(0, 1 - factor));
    }
    // Also handle very light gray backgrounds  
    else if (brightness > 230 && saturation < 0.25) {
      data[i + 3] = Math.round(255 * (1 - (brightness - 230) / 25));
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  return c;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ isOpen, onClose, initialProductId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number>(initialProductId || products[0].id);
  const [isLoadingMesh, setIsLoadingMesh] = useState<boolean>(true);

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];
  const processedGlassesRef = useRef<HTMLCanvasElement | null>(null);

  // Pre-load and process the glasses image whenever selected product changes
  useEffect(() => {
    processedGlassesRef.current = null;
    let cancelled = false;
    
    const imageUrl = selectedProduct.tryOnImage || selectedProduct.images[0];
    const hasTryOnImage = !!selectedProduct.tryOnImage;
    
    const processImage = (img: HTMLImageElement) => {
      if (cancelled) return;
      // If it's a dedicated tryOnImage (transparent PNG/SVG), use directly
      if (hasTryOnImage) {
        const c = document.createElement('canvas');
        c.width = img.naturalWidth || img.width;
        c.height = img.naturalHeight || img.height;
        const ctx = c.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        processedGlassesRef.current = c;
      } else {
        processedGlassesRef.current = createTransparentGlasses(img);
      }
    };

    // For local paths (start with /) and data URIs, load directly.
    // For external URLs, use fetch→blob to bypass CORS.
    const isLocalOrDataUri = imageUrl.startsWith('/') || imageUrl.startsWith('data:');
    
    if (isLocalOrDataUri) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => processImage(img);
      img.onerror = () => console.warn('Failed to load glasses image:', imageUrl);
      img.src = imageUrl;
    } else {
      fetch(imageUrl)
        .then(res => res.blob())
        .then(blob => {
          const objectUrl = URL.createObjectURL(blob);
          const img = new Image();
          img.onload = () => {
            processImage(img);
            URL.revokeObjectURL(objectUrl);
          };
          img.src = objectUrl;
        })
        .catch(err => console.warn('Failed to load glasses image:', err));
    }

    return () => { cancelled = true; };
  }, [selectedProductId, selectedProduct.images, selectedProduct.tryOnImage]);

  useEffect(() => {
    let camera: Camera | null = null;
    let faceMesh: FaceMesh | null = null;

    const initializeCameraAndMesh = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);

        faceMesh = new FaceMesh({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
        });

        faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        faceMesh.onResults(onResults);

        if (videoRef.current) {
          camera = new Camera(videoRef.current, {
            onFrame: async () => {
              if (videoRef.current && faceMesh) {
                await faceMesh.send({ image: videoRef.current });
              }
            },
            width: 640,
            height: 480
          });
          camera.start();
        }
      } catch (err) {
        console.error("Camera access or FaceMesh initialization failed:", err);
        setHasPermission(false);
      }
    };

    if (isOpen) {
      if (initialProductId) {
        setSelectedProductId(initialProductId);
      }
      setIsLoadingMesh(true);
      initializeCameraAndMesh();
    }

    return () => {
      if (camera) { camera.stop(); }
      if (faceMesh) { faceMesh.close(); }
    };
  }, [isOpen, initialProductId]);

  const onResults = useCallback((results: Results) => {
    setIsLoadingMesh(false);
    if (!canvasRef.current || !videoRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw video frame (mirrored)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0 && processedGlassesRef.current) {
      const landmarks = results.multiFaceLandmarks[0];
      
      // Key landmark indices
      const leftTemple = landmarks[234];    // left side of face (left temple)
      const rightTemple = landmarks[454];   // right side of face (right temple)
      const leftEyeOuter = landmarks[33];   // outer corner of left eye
      const rightEyeOuter = landmarks[263]; // outer corner of right eye
      const noseBridge = landmarks[6];      // top of nose bridge (between eyebrows)
      const noseBottom = landmarks[4];      // tip of nose
      const leftEyeTop = landmarks[159];    // top of left eye
      const rightEyeTop = landmarks[386];   // top of right eye

      // Convert to pixel coordinates
      const leftX = leftEyeOuter.x * canvas.width;
      const leftY = leftEyeOuter.y * canvas.height;
      const rightX = rightEyeOuter.x * canvas.width;
      const rightY = rightEyeOuter.y * canvas.height;
      const bridgeX = noseBridge.x * canvas.width;
      const bridgeY = noseBridge.y * canvas.height;

      // Face tilt angle
      const angle = Math.atan2(rightY - leftY, rightX - leftX);

      // Calculate glasses dimensions based on face width
      const eyeDistance = Math.hypot(rightX - leftX, rightY - leftY);
      const glassesWidth = eyeDistance * 2.2;
      
      // Use a fixed aspect ratio for glasses (roughly 3:1 for most frames)
      const glassesHeight = glassesWidth * 0.45;

      // Center point between eyes, slightly above nose bridge
      const centerX = (leftX + rightX) / 2;
      const centerY = bridgeY;

      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      
      // Draw the processed transparent glasses
      ctx.drawImage(
        processedGlassesRef.current,
        -glassesWidth / 2,
        -glassesHeight / 2,
        glassesWidth,
        glassesHeight
      );
    }
    
    ctx.restore();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden relative shadow-2xl">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E2E8F0] flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 font-display">
              <CameraIcon size={20} className="text-[#6366F1]" /> Virtual Try-On
            </h2>
            <p className="text-xs text-[#94A3B8] mt-0.5">Select a frame and see how it looks on you</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center text-[#475569] transition-colors" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Camera View */}
          <div className="flex-1 relative bg-[#0F172A] flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-0">
            {hasPermission === false ? (
              <div className="text-center text-white p-8">
                <div className="w-16 h-16 rounded-full bg-[#F43F5E]/20 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={32} className="text-[#F43F5E]" />
                </div>
                <h3 className="text-lg font-bold mb-2">Camera Access Required</h3>
                <p className="text-white/40 max-w-sm mx-auto text-sm">Please allow camera access in your browser to use the Virtual Try-On feature.</p>
              </div>
            ) : (
              <>
                <video ref={videoRef} style={{ display: 'none' }} playsInline muted />
                <canvas ref={canvasRef} className="w-full h-full object-contain" />
                
                {/* Currently trying label */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium">
                  Trying: {selectedProduct.name}
                </div>

                {isLoadingMesh && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0F172A]/90 z-10 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#6366F1]/20 border-t-[#6366F1]"></div>
                      </div>
                      <div className="text-center">
                        <p className="text-white text-sm font-medium">Initializing Face Tracking</p>
                        <p className="text-white/30 text-xs mt-1">This may take a few seconds...</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Product Selection Sidebar */}
          <div className="w-full md:w-72 bg-[#F8FAFC] overflow-y-auto border-l border-[#E2E8F0] p-3 flex flex-col gap-3">
            <h3 className="font-semibold text-[#0F172A] text-sm px-1">Select Frames</h3>
            <div className="grid grid-cols-2 gap-2 pb-4">
              {products.map(p => (
                <button 
                  key={p.id} 
                  onClick={() => setSelectedProductId(p.id)}
                  className={`bg-white rounded-xl p-2 border-2 text-left transition-all ${
                    selectedProductId === p.id 
                      ? 'border-[#6366F1] shadow-md ring-2 ring-[#6366F1]/20' 
                      : 'border-transparent hover:border-[#E2E8F0] shadow-sm'
                  }`}
                >
                  <div className="bg-[#F8FAFC] rounded-lg aspect-square mb-1.5 overflow-hidden flex items-center justify-center p-1">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-[10px] font-semibold text-[#0F172A] line-clamp-1">{p.name}</p>
                  <p className="text-[10px] text-[#94A3B8]">৳{p.price.toLocaleString()}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
