'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

export function CodeEditor({ value, onChange, readOnly = false }: CodeEditorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="relative flex-1 flex flex-col">
      <div className="flex items-center justify-between p-2 border-b border-dark-border bg-dark-surface">
        <span className="text-xs text-gray-400 font-mono">Frame Hub JSON</span>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-400 hover:text-white flex items-center space-x-1 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      <div className="flex-1 relative">
        <textarea
          value={value}
          onChange={(e) => !readOnly && onChange(e.target.value)}
          readOnly={readOnly}
          className="w-full h-full p-4 bg-dark-surface text-white font-mono text-sm resize-none focus:outline-none code-editor"
          placeholder="Generated Frame JSON will appear here..."
        />
        
        {!value && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center text-gray-500">
              <div className="w-12 h-12 border-2 border-gray-600 border-dashed rounded-lg flex items-center justify-center mx-auto mb-2">
                <div className="w-4 h-4 bg-gray-600 rounded"></div>
              </div>
              <p className="text-sm">JSON will appear here after generation</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
