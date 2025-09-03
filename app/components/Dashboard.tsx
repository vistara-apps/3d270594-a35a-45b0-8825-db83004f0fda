'use client';

import { useState } from 'react';
import { TrendingUp, Zap, Eye, Heart, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = {
    totalFrames: 23,
    totalViews: 1247,
    totalInteractions: 389,
    conversionRate: 31.2,
  };

  const recentFrames = [
    {
      id: 1,
      title: 'Crypto Poll Frame',
      created: '2 hours ago',
      views: 156,
      interactions: 42,
      status: 'active',
    },
    {
      id: 2,
      title: 'NFT Showcase',
      created: '1 day ago',
      views: 298,
      interactions: 87,
      status: 'active',
    },
    {
      id: 3,
      title: 'DeFi Quiz',
      created: '3 days ago',
      views: 189,
      interactions: 56,
      status: 'paused',
    },
  ];

  return (
    <div className="h-full p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Dashboard
            </h1>
            <p className="text-gray-400">
              Track your Frame performance and engagement
            </p>
          </div>
          
          <div className="flex space-x-2">
            {['24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  timeRange === range
                    ? 'bg-accent text-white'
                    : 'bg-dark-surface text-gray-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-surface border border-dark-border rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Frames</span>
              <Zap className="w-4 h-4 text-accent" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalFrames}</div>
            <div className="text-xs text-green-400 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +3 this week
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-dark-surface border border-dark-border rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Views</span>
              <Eye className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalViews.toLocaleString()}</div>
            <div className="text-xs text-green-400 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5% vs last week
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-dark-surface border border-dark-border rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Interactions</span>
              <Heart className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalInteractions}</div>
            <div className="text-xs text-green-400 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8.3% vs last week
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-dark-surface border border-dark-border rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Conversion Rate</span>
              <BarChart3 className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.conversionRate}%</div>
            <div className="text-xs text-green-400 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2.1% vs last week
            </div>
          </motion.div>
        </div>

        {/* Recent Frames */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-surface border border-dark-border rounded-lg"
        >
          <div className="p-4 border-b border-dark-border">
            <h2 className="text-lg font-semibold text-white">Recent Frames</h2>
          </div>
          <div className="p-4 space-y-3">
            {recentFrames.map((frame, index) => (
              <motion.div
                key={frame.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-dark-bg rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{frame.title}</h3>
                    <p className="text-sm text-gray-400">{frame.created}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{frame.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{frame.interactions}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    frame.status === 'active' 
                      ? 'bg-green-400/20 text-green-400' 
                      : 'bg-yellow-400/20 text-yellow-400'
                  }`}>
                    {frame.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
