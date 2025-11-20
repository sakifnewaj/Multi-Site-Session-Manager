import React from 'react';
import { UserX, Plus, AlertTriangle } from 'lucide-react';
import { Site } from '../types';
import SessionFrame from './SessionFrame';

interface SessionManagerProps {
  sites: Site[];
  activeSessions: string[];
  onCloseSession: (id: string) => void;
  onOpenFirst: () => void;
}

const SessionManager: React.FC<SessionManagerProps> = ({ 
  sites, 
  activeSessions, 
  onCloseSession,
  onOpenFirst
}) => {
  const activeSiteObjects = sites.filter(site => activeSessions.includes(site.id));

  // Check for potential cookie conflicts (Same Domain)
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return '';
    }
  };

  const domains = activeSiteObjects.map(s => getDomain(s.url)).filter(Boolean);
  const hasDuplicates = domains.length !== new Set(domains).size;

  if (activeSiteObjects.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 p-8">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
          <UserX size={40} className="text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">No Active Sessions</h3>
        <p className="text-gray-500 mb-8 max-w-md text-center leading-relaxed">
          Your workspace is clear. Select an account from the sidebar or add a new one to start a secure, isolated session.
        </p>
        <button 
          onClick={onOpenFirst}
          className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-secondary text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus size={20} />
          Start Session
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {hasDuplicates && (
        <div className="bg-amber-50 border-b border-amber-100 px-4 py-2 flex items-center justify-center gap-2 text-amber-800 text-xs font-medium">
          <AlertTriangle size={14} />
          Warning: Multiple sessions detected on the same domain. Cookies may be shared between them by the browser.
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100/50">
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
          {activeSiteObjects.map(site => (
            <SessionFrame 
              key={site.id} 
              site={site} 
              onClose={() => onCloseSession(site.id)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionManager;