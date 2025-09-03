'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface FramePreviewProps {
  frameData?: any;
}

export function FramePreview({ frameData }: FramePreviewProps) {
  if (!frameData) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-dark-surface border border-dark-border rounded-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-dark-border rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-gray-600 rounded"></div>
          </div>
          <p className="text-gray-400">Generate a frame to see preview</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-dark-surface border border-dark-border rounded-lg overflow-hidden">
        {/* Frame Image */}
        <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
          {frameData.imageUrl ? (
            <img
              src={frameData.imageUrl}
              alt="Generated frame"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-accent rounded"></div>
              </div>
              <p className="text-sm text-gray-300">{frameData.title || 'Generated Frame'}</p>
            </div>
          )}
        </div>

        {/* Frame Actions */}
        {frameData.buttons && frameData.buttons.length > 0 && (
          <div className="p-4 border-t border-dark-border">
            <div className="grid grid-cols-2 gap-2">
              {frameData.buttons.map((button: any, index: number) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-accent hover:bg-accent/80 text-white text-sm font-medium rounded transition-colors"
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Frame Info */}
        <div className="p-4 border-t border-dark-border">
          <div className="text-xs text-gray-400 space-y-1">
            <div>Type: {frameData.type || 'Interactive'}</div>
            <div>Actions: {frameData.buttons?.length || 0}</div>
            {frameData.timestamp && (
              <div>Generated: {new Date(frameData.timestamp).toLocaleTimeString()}</div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
