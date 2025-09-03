'use client';

import { useState } from 'react';
import { Search, Star, Copy, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface PromptLibraryProps {
  onPromptSelect: (prompt: string) => void;
}

export function PromptLibrary({ onPromptSelect }: PromptLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const promptTemplates = [
    {
      id: 1,
      name: 'Crypto Poll',
      description: 'A poll asking about favorite cryptocurrency',
      category: 'Poll',
      prompt: 'Create a poll asking users about their favorite cryptocurrency with options for Bitcoin, Ethereum, Solana, and Other. Include voting buttons and display current results.',
      likes: 42,
      uses: 156,
    },
    {
      id: 2,
      name: 'NFT Showcase',
      description: 'Display and promote NFT collection',
      category: 'NFT',
      prompt: 'Create a frame showcasing an NFT collection with an image, collection name, floor price, and a mint button that links to the minting page.',
      likes: 38,
      uses: 89,
    },
    {
      id: 3,
      name: 'DeFi Quiz',
      description: 'Educational quiz about DeFi protocols',
      category: 'Education',
      prompt: 'Create an interactive quiz about DeFi with a question about yield farming, multiple choice answers, and educational explanations for correct/incorrect choices.',
      likes: 29,
      uses: 67,
    },
    {
      id: 4,
      name: 'Meme Contest',
      description: 'Community meme voting contest',
      category: 'Community',
      prompt: 'Create a meme contest frame where users can vote on submitted memes with Like/Dislike buttons and see vote counts in real-time.',
      likes: 51,
      uses: 203,
    },
  ];

  const filteredTemplates = promptTemplates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ['All', 'Poll', 'NFT', 'Education', 'Community'];

  return (
    <div className="h-full p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-full flex flex-col"
      >
        <div className="mb-6">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Prompt Library
          </h1>
          <p className="text-gray-400">
            Browse and use successful Frame prompts
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts..."
            className="w-full pl-10 pr-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent"
          />
        </div>

        {/* Categories */}
        <div className="flex space-x-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 text-sm bg-dark-surface hover:bg-accent/20 text-gray-300 hover:text-white rounded-lg transition-colors border border-dark-border"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-surface border border-dark-border rounded-lg p-4 hover:border-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-400">{template.description}</p>
                  </div>
                  <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                    {template.category}
                  </span>
                </div>

                <div className="bg-dark-bg p-3 rounded text-sm text-gray-300 mb-4 font-mono">
                  {template.prompt.substring(0, 100)}...
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>{template.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Zap className="w-3 h-3" />
                      <span>{template.uses} uses</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-1 hover:bg-dark-border rounded text-gray-400 hover:text-white">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onPromptSelect(template.prompt)}
                      className="px-3 py-1 bg-accent hover:bg-accent/80 text-white text-xs rounded transition-colors"
                    >
                      Use This
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
