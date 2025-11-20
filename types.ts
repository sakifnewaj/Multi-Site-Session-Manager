export interface Site {
  id: string;
  name: string;
  url: string;
  homepageUrl?: string;
  usernameField: string;
  passwordField: string;
  username: string;
  password?: string;
  sessionId: string;
  createdAt: string;
  lastOpened?: string;
}

export interface SessionStatus {
  status: 'logged-in' | 'logging-in' | 'logged-out';
  message: string;
}

export type TabView = 'add-site' | 'saved-sites';