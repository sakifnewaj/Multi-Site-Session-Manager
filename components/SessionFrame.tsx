import React, { useState, useRef, useEffect } from 'react';
import { X, RefreshCw, Lock, Copy, Check, ExternalLink } from 'lucide-react';
import { Site } from '../types';

interface SessionFrameProps {
  site: Site;
  onClose: () => void;
}

const SessionFrame: React.FC<SessionFrameProps> = ({ site, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState<'user' | 'pass' | null>(null);
  // We use a refresh key to force iframe re-mounting on reload
  const [refreshKey, setRefreshKey] = useState(0); 

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleReload = () => {
    setIsLoading(true);
    setRefreshKey(prev => prev + 1);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const copyToClipboard = (text: string, type: 'user' | 'pass') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden flex flex-col h-[600px] transition-all hover:shadow-xl animate-fadeIn">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className={`w-2.5 h-2.5 rounded-full ${isLoading ? 'bg-warning animate-pulse' : 'bg-success'}`} />
          <div className="flex flex-col overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-800 truncate">{site.name}</span>
              <span className="hidden sm:inline-block text-[10px] bg-gray-200 text-gray-600 px-1.5 rounded border border-gray-300">
                {site.username}
              </span>
            </div>
            <span className="text-xs text-gray-400 truncate max-w-[200px]">{site.url}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Credentials Tools */}
          <div className="hidden sm:flex items-center gap-1 mr-2 pr-2 border-r border-gray-300">
            <button 
              onClick={() => copyToClipboard(site.username, 'user')}
              className="p-1.5 text-gray-500 hover:text-primary hover:bg-blue-50 rounded transition-colors relative group"
              title="Copy Username"
            >
              {copied === 'user' ? <Check size={14} className="text-success" /> : <UserIcon size={14} />}
            </button>
            <button 
              onClick={() => site.password && copyToClipboard(site.password, 'pass')}
              className="p-1.5 text-gray-500 hover:text-primary hover:bg-blue-50 rounded transition-colors relative group"
              title="Copy Password"
            >
              {copied === 'pass' ? <Check size={14} className="text-success" /> : <Lock size={14} />}
            </button>
          </div>

          <button 
            onClick={handleReload}
            className="p-1.5 text-gray-500 hover:text-primary hover:bg-blue-50 rounded transition-colors"
            title="Reload Session"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>
          
          <a 
            href={site.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1.5 text-gray-500 hover:text-primary hover:bg-blue-50 rounded transition-colors"
            title="Open in New Tab"
          >
            <ExternalLink size={16} />
          </a>

          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-danger hover:bg-red-50 rounded transition-colors ml-1"
            title="Close Session"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Iframe Container */}
      <div className="flex-1 relative bg-white">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/80 z-10">
            <RefreshCw className="animate-spin text-primary mb-2" size={32} />
            <p className="text-sm text-gray-500 font-medium">Connecting to Secure Session...</p>
          </div>
        )}
        
        <iframe
          key={refreshKey}
          ref={iframeRef}
          src={site.url}
          name={`session_${site.sessionId}`} // Critical for isolation attempts
          className="w-full h-full border-none"
          onLoad={handleIframeLoad}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-top-navigation-by-user-activation"
          allow="autoplay; encrypted-media; fullscreen; clipboard-write"
        />
      </div>

      {/* Footer / Info Bar */}
      <div className="bg-white border-t border-gray-100 px-3 py-1.5 flex justify-between items-center text-[10px] text-gray-400">
        <div className="flex items-center gap-1">
          <Lock size={10} />
          <span>Secure Context</span>
        </div>
        <span>Session ID: {site.sessionId.substring(0, 8)}...</span>
      </div>
    </div>
  );
};

// Simple User Icon helper
const UserIcon = ({ size }: { size: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default SessionFrame;