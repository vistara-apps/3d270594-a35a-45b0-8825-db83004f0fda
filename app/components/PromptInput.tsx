'use client';

import { useState } from 'react';
import { Box, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function PromptInput({ value, onChange, placeholder }: PromptInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const quickPrompts = [
    'A poll asking about favorite DeFi protocols',
    'A meme contest with voting buttons',
    'A NFT showcase with mint button',
    'A quiz about Ethereum basics',
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <motion.div
          animate={{
            borderColor: isFocused ? 'hsl(260, 87%, 61%)' : 'hsl(248, 20%, 24%)',
          }}
          className="border rounded-lg bg-dark-surface"
        >
          <div className="flex items-center p-3 border-b border-dark-border">
            <Box className="w-4 h-4 text-accent mr-2" />
            <span className="text-sm font-medium text-gray-300">
              Frame Example
            </span>
            <div className="ml-auto flex items-center space-x-2">
              <button className="text-xs text-accent hover:text-accent/80">
                Get sample!
              </button>
            </div>
          </div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="w-full p-4 bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none"
            rows={6}
          />
        </motion.div>
      </div>

      {!value && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-2"
        >
          <div className="flex items-center text-sm text-gray-400 mb-2">
            <Lightbulb className="w-4 h-4 mr-2" />
            Quick prompts:
          </div>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((quickPrompt, index) => (
              <button
                key={index}
                onClick={() => onChange(quickPrompt)}
                className="text-xs px-3 py-1 bg-dark-border hover:bg-accent/20 text-gray-300 hover:text-white rounded-full transition-colors"
              >
                {quickPrompt}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
