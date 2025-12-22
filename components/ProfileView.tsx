import React, { useState } from 'react';
import { User } from '../types';
import { CheckIcon } from './icons/FeedbackIcons';

interface ProfileViewProps {
  user: User;
  onUpdate: (user: User) => void;
  onLogout: () => void;
}

const AVATARS = ['🐱', '🐶', '🦊', '🐻', '🐼', '🐵', '🐨', '🦁', '🐯', '🐸'];

const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdate, onLogout }) => {
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar || AVATARS[0]);
  const [message, setMessage] = useState<string | null>(null);
  const [aiKey, setAiKey] = useState<string>(user.aiKey || '');
  const notes: Array<{ lessonId: string; title: string; date: string }> = (() => {
    try {
      const raw = localStorage.getItem('javaJourneyNotes');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  })();
  const completedCount = notes.length;
  const badges: Array<{ label: string; threshold: number; emoji: string }> = [
    { label: 'Starter', threshold: 1, emoji: '✨' },
    { label: 'Learner', threshold: 3, emoji: '📚' },
    { label: 'Explorer', threshold: 6, emoji: '🧭' },
    { label: 'Achiever', threshold: 10, emoji: '🏆' },
  ];
  const earned = badges.filter(b => completedCount >= b.threshold);
  const [isSaving, setIsSaving] = useState(false);

  const updateUserInStorage = (updated: User) => {
    try {
      const raw = localStorage.getItem('javaJourneyUsers');
      const users: Array<{ email: string; password: string; user: User }> = raw ? JSON.parse(raw) : [];
      const next = users.map(entry => entry.user.email === updated.email ? { ...entry, user: updated } : entry);
      localStorage.setItem('javaJourneyUsers', JSON.stringify(next));
      localStorage.setItem('javaJourneyUser', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to update stored user profile', err);
    }
  };

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    const updated: User = { ...user, name: name.trim() || user.name, avatar, ...(aiKey ? { aiKey } : { aiKey: '' }) };
    updateUserInStorage(updated);
    onUpdate(updated);
    setMessage('Profile updated');
    setIsSaving(false);
  };

  return (
    <div className="w-full max-w-2xl bg-base-100 dark:bg-base-100-dark rounded-xl shadow-lg p-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-5xl bg-base-200 dark:bg-base-200-dark rounded-full w-16 h-16 flex items-center justify-center">{avatar}</div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-primary dark:text-white">{user.name}</h1>
          <p className="text-content-200 dark:text-content-200-dark">{user.email}</p>
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {earned.length === 0 ? (
              <span className="text-xs px-2 py-1 rounded-full bg-base-200 dark:bg-base-200-dark text-content-200">No badges yet</span>
            ) : (
              earned.map(b => (
                <span key={b.label} className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                  {b.emoji} {b.label}
                </span>
              ))
            )}
            <span className={`text-xs px-2 py-1 rounded-full border ${aiKey ? 'border-green-500 text-green-600' : 'border-gray-300 text-gray-500'}`}>
              {aiKey ? 'AI Enabled' : 'AI Disabled'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Display Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-base-300 dark:border-base-300-dark px-3 py-2 bg-white dark:bg-base-200-dark"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Avatar</label>
          <div className="flex flex-wrap gap-2">
            {AVATARS.map(a => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                className={`text-2xl px-3 py-2 rounded-md border ${avatar === a ? 'border-primary bg-primary/10' : 'border-base-300 dark:border-base-300-dark'}`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Settings</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">AI API Key</label>
            <input
              type="password"
              value={aiKey}
              onChange={(e) => setAiKey(e.target.value)}
              placeholder="Enter your AI API key"
              className="w-full rounded-md border border-base-300 dark:border-base-300-dark px-3 py-2 bg-white dark:bg-base-200-dark"
            />
            <p className="text-xs text-content-200 dark:text-content-200-dark mt-1">Used for code execution and assistant features.</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-4 py-2 rounded-md disabled:opacity-60"
        >
          Save Changes
        </button>
        <button
          onClick={onLogout}
          className="border border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 font-semibold px-4 py-2 rounded-md"
        >
          Log Out
        </button>
        {message && (
          <span className="flex items-center gap-2 text-success text-sm">
            <CheckIcon className="w-4 h-4" />
            {message}
          </span>
        )}
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Notes</h2>
        <div className="bg-base-200 dark:bg-base-200-dark rounded-md p-4">
          {notes.length === 0 ? (
            <p className="text-sm text-content-200 dark:text-content-200-dark">No notes yet. Finish lessons to record completion notes.</p>
          ) : (
            <div className="relative pl-6">
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-base-300 dark:bg-base-300-dark" />
              <ul className="space-y-3">
                {notes.slice().reverse().map(n => (
                  <li key={n.lessonId} className="relative">
                    <span className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-secondary" />
                    <div className="bg-white dark:bg-base-100-dark rounded-md shadow px-3 py-2">
                      <p className="text-sm font-semibold">{n.title}</p>
                      <p className="text-xs text-content-200 dark:text-content-200-dark">{new Date(n.date).toLocaleString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
