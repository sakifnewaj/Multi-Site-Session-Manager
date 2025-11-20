import React from 'react';
import { PlusCircle, List } from 'lucide-react';
import { Site, TabView } from '../types';
import SiteForm from './SiteForm';
import SiteList from './SiteList';

interface SidebarProps {
  sites: Site[];
  activeTab: TabView;
  setActiveTab: (tab: TabView) => void;
  onAddSite: (site: Site) => void;
  onDeleteSite: (id: string) => void;
  onOpenSession: (id: string) => void;
  activeSessions: string[];
}

const Sidebar: React.FC<SidebarProps> = ({
  sites,
  activeTab,
  setActiveTab,
  onAddSite,
  onDeleteSite,
  onOpenSession,
  activeSessions
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 font-semibold text-sm transition-colors
            ${activeTab === 'add-site' 
              ? 'text-primary border-b-2 border-primary bg-blue-50/50' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          onClick={() => setActiveTab('add-site')}
        >
          <PlusCircle size={16} />
          Add Account
        </button>
        <button
          className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 font-semibold text-sm transition-colors
            ${activeTab === 'saved-sites' 
              ? 'text-primary border-b-2 border-primary bg-blue-50/50' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          onClick={() => setActiveTab('saved-sites')}
        >
          <List size={16} />
          Saved 
          <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full">
            {sites.length}
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50/30">
        {activeTab === 'add-site' ? (
          <SiteForm onAddSite={onAddSite} />
        ) : (
          <SiteList 
            sites={sites} 
            onDelete={onDeleteSite}
            onOpen={onOpenSession}
            activeSessions={activeSessions}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;