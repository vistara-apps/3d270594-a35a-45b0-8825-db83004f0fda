'use client';

import { Box, Home, Library, Settings, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'generator', icon: Box, label: 'Generator' },
    { id: 'library', icon: Library, label: 'Library' },
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-16 bg-dark-surface border-r border-dark-border flex flex-col items-center py-6">
      <div className="mb-8">
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
          <Zap className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <nav className="flex-1 flex flex-col space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors relative group ${
                isActive 
                  ? 'bg-accent text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-border'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5" />
              
              {/* Tooltip */}
              <div className="absolute left-14 bg-dark-surface text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-dark-border">
                {item.label}
              </div>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}
