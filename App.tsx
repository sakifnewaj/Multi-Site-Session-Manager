import React, { useState, useEffect } from 'react';
import { Shield, Menu, PlayCircle, StopCircle } from 'lucide-react';
import { Site, TabView } from './types';
import Sidebar from './components/Sidebar';
import SessionManager from './components/SessionManager';

const App: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [activeSessions, setActiveSessions] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabView>('add-site');

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
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">Multi-Site Session Manager</h1>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-3">
          <button 
            onClick={handleOpenAll}
            className="flex items-center gap-2 px-4 py-2 bg-success hover:bg-green-600 text-white rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 text-sm font-medium"
          >
            <PlayCircle size={18} />
            <span>Open All Sessions</span>
          </button>
          
          <button 
            onClick={handleCloseAll}
            className="flex items-center gap-2 px-4 py-2 bg-danger hover:bg-red-600 text-white rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 text-sm font-medium"
          >
            <StopCircle size={18} />
            <span>Close All Sessions</span>
          </button>
          
          <span className="bg-success text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            {activeSessions.length} Active
          </span>
          
          <button 
            className="md:hidden p-2 bg-primary text-white rounded-lg"
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
          md:flex flex-col w-full md:w-[350px] bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300
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
        <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col relative">
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
    </div>
  );
};

export default App;