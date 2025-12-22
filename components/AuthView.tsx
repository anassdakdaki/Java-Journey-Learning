import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { CheckIcon, XIcon } from './icons/FeedbackIcons';

interface AuthViewProps {
  onLogin: (user: User) => void;
}

const AVATARS = ['🐱', '🐶', '🦊', '🐻', '🐼', '🐵', '🐨', '🦁', '🐯', '🐸'];

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMessage(null);
  }, [mode]);

  const loadUsers = (): Array<{ email: string; password: string; user: User }> => {
    try {
      const raw = localStorage.getItem('javaJourneyUsers');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const saveUsers = (users: Array<{ email: string; password: string; user: User }>) => {
    localStorage.setItem('javaJourneyUsers', JSON.stringify(users));
  };

  const setCurrentUser = (user: User) => {
    localStorage.setItem('javaJourneyUser', JSON.stringify(user));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setMessage(null);

    const users = loadUsers();

    if (mode === 'signup') {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setMessage({ type: 'error', text: 'Please fill out all fields.' });
        setIsSubmitting(false);
        return;
      }
      const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        setMessage({ type: 'error', text: 'An account with this email already exists.' });
        setIsSubmitting(false);
        return;
      }
      const user: User = {
        id: `${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)]
      };
      const nextUsers = [...users, { email: user.email, password, user }];
      saveUsers(nextUsers);
      setCurrentUser(user);
      onLogin(user);
      setMessage({ type: 'success', text: 'Account created successfully.' });
      setIsSubmitting(false);
      return;
    }

    if (mode === 'login') {
      if (!email.trim() || !password.trim()) {
        setMessage({ type: 'error', text: 'Please provide email and password.' });
        setIsSubmitting(false);
        return;
      }
      const match = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!match) {
        setMessage({ type: 'error', text: 'Invalid email or password.' });
        setIsSubmitting(false);
        return;
      }
      setCurrentUser(match.user);
      onLogin(match.user);
      setMessage({ type: 'success', text: 'Logged in successfully.' });
      setIsSubmitting(false);
      return;
    }
  };

  return (
    <div className="w-full max-w-md bg-base-100 dark:bg-base-100-dark rounded-xl shadow-lg p-6 animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary dark:text-white">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        <p className="text-content-200 dark:text-content-200-dark mt-2">{mode === 'login' ? 'Log in to save progress and view your profile.' : 'Sign up to track progress and personalize your experience.'}</p>
      </div>

      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            className={`px-4 py-2 text-sm font-medium border ${mode === 'login' ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-base-200-dark text-primary border-gray-300 dark:border-gray-700'}`}
            onClick={() => setMode('login')}
          >
            Log In
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border ${mode === 'signup' ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-base-200-dark text-primary border-gray-300 dark:border-gray-700'}`}
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full rounded-md border border-base-300 dark:border-base-300-dark px-3 py-2 bg-white dark:bg-base-200-dark"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded-md border border-base-300 dark:border-base-300-dark px-3 py-2 bg-white dark:bg-base-200-dark"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full rounded-md border border-base-300 dark:border-base-300-dark px-3 py-2 bg-white dark:bg-base-200-dark"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {message && (
          <div className={`flex items-center gap-2 text-sm ${message.type === 'success' ? 'text-success' : 'text-red-500'}`}>
            {message.type === 'success' ? <CheckIcon className="w-4 h-4" /> : <XIcon className="w-4 h-4" />}
            <span>{message.text}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-2 rounded-md transition-colors disabled:opacity-60"
        >
          {mode === 'login' ? 'Log In' : 'Create Account'}
        </button>
      </form>
      <div className="mt-4">
        <button
          onClick={() => {
            const demo: User = {
              id: 'demo',
              name: 'Demo User',
              email: 'demo@example.com',
              avatar: '🧪',
            };
            localStorage.setItem('javaJourneyUser', JSON.stringify(demo));
            onLogin(demo);
          }}
          className="w-full border border-base-300 dark:border-base-300-dark text-primary hover:bg-primary/10 font-semibold py-2 rounded-md transition-colors"
        >
          Login as Demo
        </button>
      </div>
    </div>
  );
};

export default AuthView;

