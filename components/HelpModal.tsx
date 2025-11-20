import React from 'react';
import { X, Upload, Globe, ShieldAlert, CheckCircle, Settings, Home } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col animate-scaleIn">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <Globe size={24} />
            Setup & Deployment Guide
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Section 1: How to Deploy */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Upload size={20} className="text-success" />
              How to Host on cPanel
            </h3>
            <div className="space-y-4 text-sm text-gray-600 bg-gray-50 p-5 rounded-lg border border-gray-200">
              <p>This is a modern React Application. To run it on cPanel, you must <strong>build</strong> it first.</p>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-white border border-gray-300 rounded-lg w-8 h-8 flex items-center justify-center font-bold text-primary shrink-0 shadow-sm">1</div>
                  <div>
                    <p className="font-semibold text-gray-800">Install Node.js</p>
                    <p className="text-xs mt-1">Download and install Node.js from <a href="https://nodejs.org" target="_blank" rel="noreferrer" className="text-primary hover:underline">nodejs.org</a> on your computer.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-white border border-gray-300 rounded-lg w-8 h-8 flex items-center justify-center font-bold text-primary shrink-0 shadow-sm">2</div>
                  <div>
                    <p className="font-semibold text-gray-800">Install Dependencies</p>
                    <p className="text-xs mt-1">Open a terminal in the project folder and run:</p>
                    <div className="bg-dark text-gray-200 p-2 rounded mt-2 font-mono text-xs shadow-inner border border-gray-700">npm install</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-white border border-gray-300 rounded-lg w-8 h-8 flex items-center justify-center font-bold text-primary shrink-0 shadow-sm">3</div>
                  <div>
                    <p className="font-semibold text-gray-800">Build the App</p>
                    <p className="text-xs mt-1">Run the build command to generate production files:</p>
                    <div className="bg-dark text-gray-200 p-2 rounded mt-2 font-mono text-xs shadow-inner border border-gray-700">npm run build</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-white border border-gray-300 rounded-lg w-8 h-8 flex items-center justify-center font-bold text-primary shrink-0 shadow-sm">4</div>
                  <div>
                    <p className="font-semibold text-gray-800">Upload to cPanel</p>
                    <p className="text-xs mt-1">
                      A new folder named <code>dist</code> will appear. 
                      <br/>
                      Upload the <strong>contents</strong> of this <code>dist</code> folder to your cPanel's <code>public_html</code> directory.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Troubleshooting */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Settings size={20} className="text-danger" />
              Troubleshooting Login Issues
            </h3>
            <div className="bg-red-50 border border-red-100 rounded-lg p-5 text-sm text-red-900">
              <strong className="block text-lg mb-2">Login not redirecting?</strong>
              <p className="mb-3">
                If you log in but the screen stays on the login page (or loops), your browser is likely blocking <strong>Third-Party Cookies</strong>.
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Since the cPanel login is inside an "iframe", browsers treat its cookies as "Third-Party".</li>
                <li>Modern browsers (Chrome, Safari) block these by default for security.</li>
              </ul>
              
              <div className="bg-white/60 p-3 rounded border border-red-100">
                <strong>Quick Fix:</strong>
                <ol className="list-decimal pl-5 mt-2 space-y-1 text-xs">
                  <li>Go to your browser Settings.</li>
                  <li>Search for "Cookies".</li>
                  <li>Allow "Third-party cookies" (or add your dashboard URL to the allowed list).</li>
                  <li>Alternatively, try clicking the <span className="inline-block px-1 py-0.5 bg-gray-200 rounded"><Home size={10} className="inline"/></span> <strong>Force Dashboard</strong> button in the session header after logging in.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 3: Session Isolation */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ShieldAlert size={20} className="text-warning" />
              About Session Isolation
            </h3>
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-5 text-sm text-amber-900">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle size={18} className="text-success mt-0.5" />
                <div>
                  <strong className="block text-gray-900">Isolated Contexts</strong>
                  <p>Each session runs in a frame with a unique ID. This ensures that <code>window.name</code> and <code>sessionStorage</code> are completely separate for each tab.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldAlert size={18} className="text-warning mt-0.5" />
                <div>
                  <strong className="block text-gray-900">Browser Limitation</strong>
                  <p>
                    Browsers share <strong>cookies</strong> across tabs if the domain is the same. 
                    <br/>
                    <span className="block mt-1 text-xs bg-white/50 p-2 rounded">
                      <strong>Example:</strong> If you have two accounts on <code>server1.host.com</code>, logging into one might log you out of the other. 
                      <br/>
                      <strong>Solution:</strong> Ensure your cPanel accounts are accessed via different subdomains or IPs if possible.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;