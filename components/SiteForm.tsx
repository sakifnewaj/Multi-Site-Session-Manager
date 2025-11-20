import React, { useState } from 'react';
import { Tag, Link as LinkIcon, Home, LogIn, Save, FlaskConical } from 'lucide-react';
import { Site } from '../types';

interface SiteFormProps {
  onAddSite: (site: Site) => void;
}

const SiteForm: React.FC<SiteFormProps> = ({ onAddSite }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    homepageUrl: '',
    usernameField: 'user',
    passwordField: 'pass',
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSite: Site = {
      id: `site_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...formData,
      sessionId: `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    onAddSite(newSite);
    
    // Reset essentials, keep field names as they are often repetitive
    setFormData(prev => ({
      ...prev,
      name: '',
      url: '',
      homepageUrl: '',
      username: '',
      password: ''
    }));
  };

  const handleTestLogin = () => {
    if (!formData.url) return alert('Please enter a URL first');
    window.open(formData.url, 'loginTest', 'width=1024,height=768');
  };

  const handleDemoFill = () => {
    setFormData({
      name: 'Demo CPanel',
      url: 'https://linkup.snllc.info',
      homepageUrl: '',
      usernameField: 'user',
      passwordField: 'pass',
      username: 'demo_user',
      password: 'password123'
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Tag size={14} /> Account Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., John's CPanel"
              required
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <LinkIcon size={14} /> Login URL
            </label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://example.com/login"
              required
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Home size={14} /> Homepage URL (Optional)
            </label>
            <input
              type="url"
              name="homepageUrl"
              value={formData.homepageUrl}
              onChange={handleChange}
              placeholder="https://example.com/dashboard"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
            />
          </div>
        </div>

        <div className="bg-gray-100 p-3 rounded-lg border-l-4 border-primary space-y-3">
          <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <LogIn size={16} /> Login Credentials
          </h4>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">User Field</label>
              <input
                type="text"
                name="usernameField"
                value={formData.usernameField}
                onChange={handleChange}
                placeholder="user"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Pass Field</label>
              <input
                type="text"
                name="passwordField"
                value={formData.passwordField}
                onChange={handleChange}
                placeholder="pass"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div className="pt-2 space-y-2">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow hover:-translate-y-0.5"
          >
            <Save size={18} /> Save Account
          </button>
          <button
            type="button"
            onClick={handleTestLogin}
            className="w-full flex items-center justify-center gap-2 bg-warning hover:bg-orange-500 text-white py-2 rounded-lg font-medium text-sm transition-all"
          >
            <FlaskConical size={16} /> Test Login URL
          </button>
        </div>
      </form>

      <div 
        className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 cursor-pointer hover:bg-yellow-100 transition-colors"
        onClick={handleDemoFill}
      >
        <p className="font-bold mb-1">Quick Fill Demo Data</p>
        <p>Click here to fill form with sample data for testing.</p>
      </div>
    </div>
  );
};

export default SiteForm;