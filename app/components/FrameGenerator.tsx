'use client';

import { useState, useEffect } from 'react';
import { PromptInput } from './PromptInput';
import { FramePreview } from './FramePreview';
import { CodeEditor } from './CodeEditor';
import { Button } from './Button';
import { Sparkles, Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface FrameGeneratorProps {
  selectedPrompt: string;
}

export function FrameGenerator({ selectedPrompt }: FrameGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFrame, setGeneratedFrame] = useState<any>(null);
  const [frameJson, setFrameJson] = useState('');

  useEffect(() => {
    if (selectedPrompt) {
      setPrompt(selectedPrompt);
    }
  }, [selectedPrompt]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-frame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate frame');
      }

      const data = await response.json();
      setGeneratedFrame(data);
      setFrameJson(JSON.stringify(data.frameData, null, 2));
    } catch (error) {
      console.error('Error generating frame:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full flex">
      {/* Left Panel - Input */}
      <div className="w-1/2 p-6 border-r border-dark-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-full flex flex-col"
        >
          <div className="mb-6">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              AI FrameForge
            </h1>
            <p className="text-gray-400">
              Enter your Farcaster Frame prompt
            </p>
          </div>

          <div className="flex-1 flex flex-col space-y-6">
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              placeholder="Describe your Farcaster Frame (e.g., 'A poll asking about favorite crypto news sources with Yes/No buttons')"
            />

            <div className="flex space-x-3">
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="flex-1"
                variant="primary"
              >
                {isGenerating ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Frame</span>
                  </div>
                )}
              </Button>
            </div>

            {frameJson && (
              <div className="flex-1 flex flex-col">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Frame Hub JSON
                </h3>
                <CodeEditor value={frameJson} onChange={setFrameJson} />
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Preview */}
      <div className="w-1/2 p-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="h-full flex flex-col"
        >
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Preview</h2>
            
            {generatedFrame && (
              <div className="flex space-x-2">
                <Button variant="secondary" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="secondary" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            )}
          </div>

          <div className="flex-1">
            <FramePreview frameData={generatedFrame} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
