import React, { useRef, useState, useEffect } from 'react';
import { X, Camera, AlertCircle } from 'lucide-react';
import { products } from '../data/products';

interface VirtualTryOnProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductId?: number;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ isOpen, onClose, initialProductId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number>(initialProductId || products[0].id);

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  useEffect(() => {
    if (isOpen) {
      if (initialProductId) {
        setSelectedProductId(initialProductId);
      }
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen, initialProductId]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setHasPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error(err);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden relative shadow-2xl">
        <div className="p-4 border-b flex justify-between items-center bg-[#000042] text-white">
          <h2 className="text-xl font-bold flex items-center gap-2"><Camera size={24} /> Virtual Try-On Preview</h2>
          <button onClick={onClose} className="hover:text-red-400 transition-colors p-1 rounded-full"><X size={24} /></button>
        </div>
        
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden max-h-[calc(90vh-[64px])]">
          {/* Camera View */}
          <div className="flex-1 relative bg-gray-900 flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-0">
            {hasPermission === false ? (
              <div className="text-center text-white p-6">
                <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Camera Access Denied</h3>
                <p className="text-gray-400 max-w-sm mx-auto">Please allow camera access in your browser settings to use the Virtual Try-On feature.</p>
                <div className="mt-6 flex justify-center">
                  <div className="bg-gray-800 p-4 rounded-xl relative max-w-[300px] w-full aspect-[3/4] flex items-center justify-center">
                    <img 
                      src={selectedProduct.images[0]} 
                      alt="Frame Overlay" 
                      className="w-[80%] opacity-90 drop-shadow-2xl absolute" 
                    />
                    <div className="text-gray-600 font-bold opacity-30">NO CAMERA</div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover transform -scale-x-100"
                />
                
                {/* Frame Overlay */}
                {stream && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     {/* Overlay guides for eyes */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] md:w-[45%] max-w-[300px]">
                        <img 
                          src={selectedProduct.images[0]} 
                          alt="Frame Overlay" 
                          className="w-full drop-shadow-2xl transition-all duration-300" 
                        />
                     </div>
                     <p className="absolute bottom-6 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
                       Position your face in the center
                     </p>
                  </div>
                )}
                
                {!stream && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                    <div className="flex flex-col items-center gap-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00BAC6]"></div>
                      <p className="text-white text-sm">Activating camera...</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Product Selection */}
          <div className="w-full md:w-80 bg-gray-50 overflow-y-auto border-l p-4 flex flex-col gap-4">
            <h3 className="font-bold text-[#000042]">Try Different Frames</h3>
            <div className="grid grid-cols-2 gap-3 pb-8">
              {products.map(p => (
                <button 
                  key={p.id} 
                  onClick={() => setSelectedProductId(p.id)}
                  className={`bg-white rounded-xl p-2 border-2 text-left transition-all ${selectedProductId === p.id ? 'border-[#000042] shadow-md relative' : 'border-transparent hover:border-gray-200 shadow-sm'}`}
                >
                  {selectedProductId === p.id && (
                    <div className="absolute top-1 right-1 w-3 h-3 bg-[#00BAC6] rounded-full ring-2 ring-white"></div>
                  )}
                  <div className="bg-gray-50 rounded-lg aspect-square mb-2 overflow-hidden flex items-center justify-center p-1">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-xs font-semibold text-[#000042] line-clamp-1">{p.name}</p>
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
