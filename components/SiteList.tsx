import React from 'react';
import { ExternalLink, RefreshCw, Trash2, User, Clock } from 'lucide-react';
import { Site } from '../types';

interface SiteListProps {
  sites: Site[];
  activeSessions: string[];
  onDelete: (id: string) => void;
  onOpen: (id: string) => void;
}

const SiteList: React.FC<SiteListProps> = ({ sites, activeSessions, onDelete, onOpen }) => {
  if (sites.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center p-4">
        <p className="text-sm">No accounts saved yet.</p>
        <p className="text-xs mt-1">Use the "Add Account" tab to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sites.map((site) => {
        const isActive = activeSessions.includes(site.id);
        
        return (
          <div 
            key={site.id}
            className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-800 text-sm truncate max-w-[160px]">{site.name}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                  <User size={10} />
                  <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full text-[10px]">
                    {site.username}
                  </span>
                </div>
              </div>
              <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-success shadow-[0_0_8px_rgba(39,174,96,0.6)]' : 'bg-gray-300'}`} />
            </div>

            <p className="text-[11px] text-gray-400 truncate mb-3 font-mono">{site.url}</p>

            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => onOpen(site.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition-colors
                  ${isActive 
                    ? 'bg-success text-white hover:bg-green-600' 
                    : 'bg-primary text-white hover:bg-secondary'}`}
              >
                {isActive ? <RefreshCw size={12} /> : <ExternalLink size={12} />}
                {isActive ? 'Refresh' : 'Open'}
              </button>
              <button
                onClick={() => onDelete(site.id)}
                className="p-1.5 bg-red-50 text-danger rounded hover:bg-red-100 transition-colors"
                title="Delete Account"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {site.lastOpened && (
              <div className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-1 text-[10px] text-gray-400">
                <Clock size={10} />
                Last: {new Date(site.lastOpened).toLocaleTimeString()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SiteList;