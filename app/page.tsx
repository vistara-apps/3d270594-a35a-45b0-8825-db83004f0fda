'use client';

import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { FrameGenerator } from './components/FrameGenerator';
import { PromptLibrary } from './components/PromptLibrary';
import { Dashboard } from './components/Dashboard';

export default function Home() {
  const [activeView, setActiveView] = useState('generator');
  const [selectedPrompt, setSelectedPrompt] = useState('');

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setActiveView('generator');
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'generator':
        return <FrameGenerator selectedPrompt={selectedPrompt} />;
      case 'library':
        return <PromptLibrary onPromptSelect={handlePromptSelect} />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <FrameGenerator selectedPrompt={selectedPrompt} />;
    }
  };

  return (
    <div className="flex h-screen bg-dark-bg">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 overflow-hidden">
        {renderMainContent()}
      </div>
    </div>
  );
}
