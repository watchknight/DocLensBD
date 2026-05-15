import React, { useRef, useState, useEffect } from 'react';
import { X, Camera as CameraIcon, AlertCircle } from 'lucide-react';
import { products } from '../data/products';
import { FaceMesh, Results } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';

interface VirtualTryOnProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductId?: number;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ isOpen, onClose, initialProductId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number>(initialProductId || products[0].id);
  const [isLoadingMesh, setIsLoadingMesh] = useState<boolean>(true);

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];
  const glassesImageRef = useRef<HTMLImageElement | null>(null);

  // Pre-load the glasses image whenever selected product changes
  useEffect(() => {
    const img = new Image();
    img.src = selectedProduct.images[0];
    img.onload = () => {
      glassesImageRef.current = img;
    };
  }, [selectedProductId, selectedProduct.images]);

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
      if (camera) {
        camera.stop();
      }
      if (faceMesh) {
        faceMesh.close();
      }
    };
  }, [isOpen, initialProductId]);

  const onResults = (results: Results) => {
    setIsLoadingMesh(false);
    if (!canvasRef.current || !videoRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Match canvas size to video size
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw video frame (mirrored)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0 && glassesImageRef.current) {
      const landmarks = results.multiFaceLandmarks[0];
      
      // Face Mesh indices for glasses placement
      const leftEyeOuter = landmarks[33];   // outer corner of left eye
      const rightEyeOuter = landmarks[263]; // outer corner of right eye
      const noseBridge = landmarks[168];    // center between eyes

      // Convert normalized coordinates to pixel coordinates
      const leftX = leftEyeOuter.x * canvas.width;
      const leftY = leftEyeOuter.y * canvas.height;
      
      const rightX = rightEyeOuter.x * canvas.width;
      const rightY = rightEyeOuter.y * canvas.height;

      const noseX = noseBridge.x * canvas.width;
      const noseY = noseBridge.y * canvas.height;

      // Calculate the angle of the face (tilt)
      const angle = Math.atan2(rightY - leftY, rightX - leftX);

      // Calculate distance between eyes to determine glasses width
      const distance = Math.hypot(rightX - leftX, rightY - leftY);
      
      // Glasses width needs to be slightly wider than the eye distance
      const glassesWidth = distance * 2.3; 
      
      // Aspect ratio of the selected product image
      const aspectRatio = glassesImageRef.current.width / glassesImageRef.current.height;
      const glassesHeight = glassesWidth / aspectRatio;

      ctx.translate(noseX, noseY);
      ctx.rotate(angle);
      
      // Offset slightly up from the nose bridge
      const yOffset = -glassesHeight * 0.15;
      
      ctx.drawImage(
        glassesImageRef.current, 
        -glassesWidth / 2, 
        -glassesHeight / 2 + yOffset, 
        glassesWidth, 
        glassesHeight
      );
    }
    
    ctx.restore();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden relative shadow-2xl">
        <div className="p-4 border-b flex justify-between items-center bg-[#0A0A3E] text-white">
          <h2 className="text-xl font-bold flex items-center gap-2"><CameraIcon size={24} /> AI Virtual Try-On</h2>
          <button onClick={onClose} className="hover:text-red-400 transition-colors p-1 rounded-full"><X size={24} /></button>
        </div>
        
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden max-h-[calc(90vh-[64px])]">
          {/* Camera View */}
          <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-0">
            {hasPermission === false ? (
              <div className="text-center text-white p-6">
                <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Camera Access Denied</h3>
                <p className="text-gray-400 max-w-sm mx-auto">Please allow camera access to use the AI Virtual Try-On feature.</p>
              </div>
            ) : (
              <>
                <video ref={videoRef} style={{ display: 'none' }} playsInline muted />
                
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full object-contain"
                />
                
                {isLoadingMesh && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-10 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00C9D6]"></div>
                      <p className="text-white text-sm font-medium">Initializing AI Face Tracking...</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Product Selection */}
          <div className="w-full md:w-80 bg-gray-50 overflow-y-auto border-l p-4 flex flex-col gap-4">
            <h3 className="font-bold text-[#0A0A3E]">Try Different Frames</h3>
            <div className="grid grid-cols-2 gap-3 pb-8">
              {products.map(p => (
                <button 
                  key={p.id} 
                  onClick={() => setSelectedProductId(p.id)}
                  className={`bg-white rounded-xl p-2 border-2 text-left transition-all ${selectedProductId === p.id ? 'border-[#0A0A3E] shadow-md relative' : 'border-transparent hover:border-gray-200 shadow-sm'}`}
                >
                  {selectedProductId === p.id && (
                    <div className="absolute top-1 right-1 w-3 h-3 bg-[#00C9D6] rounded-full ring-2 ring-white"></div>
                  )}
                  <div className="bg-gray-50 rounded-lg aspect-square mb-2 overflow-hidden flex items-center justify-center p-1">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <p className="text-xs font-semibold text-[#0A0A3E] line-clamp-1">{p.name}</p>
                  <p className="text-xs text-gray-500 font-medium">৳{p.price.toLocaleString()}</p>
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
