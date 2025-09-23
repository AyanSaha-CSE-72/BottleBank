"use client";

import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ value, size = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, value, { width: size, margin: 2 }, (error) => {
        if (error) console.error(error);
      });
    }
  }, [value, size]);

  return (
    <div className="p-4 bg-white rounded-lg border-2 border-dashed flex items-center justify-center" style={{ width: size, height: size }}>
        <canvas ref={canvasRef} />
    </div>
  );
};

export default QRCodeDisplay;
