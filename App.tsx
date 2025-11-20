import React, { useState, useEffect } from 'react';
import { Shield, Menu, PlayCircle, StopCircle, HelpCircle } from 'lucide-react';
import { Site, TabView } from './types';
import Sidebar from './components/Sidebar';
import SessionManager from './components/SessionManager';
import HelpModal from './components/HelpModal';

const App: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [activeSessions, setActiveSessions] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabView>('add-site');
  const [helpOpen, setHelpOpen] = useState(false);

  // Load sites from local storage on mount
  useEffect(() => {
    const savedSites = localStorage.getItem('multiSiteManager');
    if (savedSites) {
      try {
        setSites(JSON.parse(savedSites));
      } catch (e) {
        console.error("Failed to parse sites from local storage", e);
      }
    }
  }, []);

  // Save sites to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('multiSiteManager', JSON.stringify(sites));
  }, [sites]);

  const handleAddSite = (newSite: Site) => {
    setSites(prev => [...prev, newSite]);
    setActiveTab('saved-sites');
  };

  const handleDeleteSite = (id: string) => {
    if (confirm('Are you sure you want to delete this account?')) {
      setSites(prev => prev.filter(site => site.id !== id));
      handleCloseSession(id);
    }
  };

  const handleOpenSession = (id: string) => {
    if (!activeSessions.includes(id)) {
      setActiveSessions(prev => [...prev, id]);
      
      // Update last opened
      setSites(prev => prev.map(site => 
        site.id === id ? { ...site, lastOpened: new Date().toISOString() } : site
      ));
    }
  };

  const handleCloseSession = (id: string) => {
    setActiveSessions(prev => prev.filter(sessionId => sessionId !== id));
  };

  const handleOpenAll = () => {
    const allIds = sites.map(s => s.id);
    setActiveSessions(allIds);
  };

  const handleCloseAll = () => {
    setActiveSessions([]);
  };

  return (
    <div className="min-h-screen flex flex-col p-2 sm:p-4 max-w-[1600px] mx-auto">
      {/* Header */}
      <header className="bg-white rounded-xl shadow-md p-4 mb-4 flex flex-col md:flex-row justify-between items-center gap-4 z-20">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg text-white shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Session<span className="text-primary">Manager</span></h1>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-3">
          <button 
            onClick={() => setHelpOpen(true)}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-primary hover:bg-blue-50 rounded-lg transition-all text-sm font-medium border border-transparent hover:border-blue-100"
            title="Setup & Deployment Guide"
          >
            <HelpCircle size={18} />
            <span className="hidden sm:inline">Setup Guide</span>
          </button>

          <div className="h-6 w-px bg-gray-200 mx-1 hidden md:block"></div>

          <button 
            onClick={handleOpenAll}
            className="flex items-center gap-2 px-4 py-2 bg-success hover:bg-green-600 text-white rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 text-sm font-medium"
          >
            <PlayCircle size={18} />
            <span className="hidden sm:inline">Open All</span>
          </button>
          
          <button 
            onClick={handleCloseAll}
            className="flex items-center gap-2 px-4 py-2 bg-danger hover:bg-red-600 text-white rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 text-sm font-medium"
          >
            <StopCircle size={18} />
            <span className="hidden sm:inline">Close All</span>
          </button>
          
          <span className="bg-dark text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm border border-gray-700">
            {activeSessions.length} Active
          </span>
          
          <button 
            className="md:hidden p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4 flex-1 overflow-hidden h-[calc(100vh-140px)]">
        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'flex' : 'hidden'} 
          md:flex flex-col w-full md:w-[350px] bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-100
        `}>
          <Sidebar 
            sites={sites}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onAddSite={handleAddSite}
            onDeleteSite={handleDeleteSite}
            onOpenSession={handleOpenSession}
            activeSessions={activeSessions}
          />
        </div>
        
        {/* Session Area */}
        <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col relative border border-gray-100">
          <SessionManager 
            sites={sites}
            activeSessions={activeSessions}
            onCloseSession={handleCloseSession}
            onOpenFirst={() => {
              setSidebarOpen(true);
              setActiveTab('add-site');
            }}
          />
        </div>
      </div>

      {/* Help Modal */}
      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
};

export default App;