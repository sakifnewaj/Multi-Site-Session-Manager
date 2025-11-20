import React from 'react';
import { UserX, Plus } from 'lucide-react';
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

  if (activeSiteObjects.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50 p-8">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <UserX size={48} className="text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-600 mb-2">No Active Sessions</h3>
        <p className="text-gray-500 mb-6 max-w-md text-center">
          Select an account from the sidebar to start an isolated secure session.
        </p>
        <button 
          onClick={onOpenFirst}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-primary hover:text-white hover:bg-primary hover:border-primary rounded-full font-medium transition-all shadow-sm hover:shadow-lg"
        >
          <Plus size={18} />
          Start Your First Session
        </button>
      </div>
    );
  }

  return (
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
  );
};

export default SessionManager;