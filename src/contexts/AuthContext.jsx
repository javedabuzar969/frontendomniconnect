// src/contexts/AuthContext.jsx
// Standalone client-side auth state using localStorage (No MongoDB or backend required)
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const USERS_KEY = '__oc_registered_users';
const CURRENT_USER_KEY = '__oc_current_user';
const TOKEN_KEY = '__oc_token';

// Initial demo user so anyone can log in directly if they want
const DEFAULT_DEMO_USER = {
  id: 'user_demo_1',
  name: 'Demo Admin',
  email: 'admin@omniconnect.com',
  password: 'password123',
  plan: 'pro',
  workspace: "Demo's Workspace",
  contacts: 12,
  createdAt: new Date().toISOString(),
};

function getStoredUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      const initial = [DEFAULT_DEMO_USER];
      localStorage.setItem(USERS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [DEFAULT_DEMO_USER];
  }
}

function saveStoredUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save users in localStorage', err);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Initialize auth on startup from localStorage ────────
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(CURRENT_USER_KEY);
      const token = localStorage.getItem(TOKEN_KEY);
      if (savedUser && token) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      localStorage.removeItem(CURRENT_USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Signup ──────────────────────────────────────────────
  const signup = async ({ name, email, password }) => {
    const cleanEmail = email.toLowerCase().trim();
    const cleanName = name.trim();
    const users = getStoredUsers();

    // Check if account already exists
    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new Error('An account with this email already exists. Please log in.');
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      password: password,
      plan: 'free',
      workspace: `${cleanName.split(' ')[0]}'s Workspace`,
      contacts: 0,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveStoredUsers(users);

    const token = `token_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

    setUser(newUser);
    return newUser;
  };

  // ── Login ───────────────────────────────────────────────
  const login = async ({ email, password }) => {
    const cleanEmail = email.toLowerCase().trim();
    const users = getStoredUsers();

    let foundUser = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!foundUser) {
      // If user is logging in for first time without signup, automatically create their account for a seamless experience
      const namePart = cleanEmail.split('@')[0];
      const autoName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      foundUser = {
        id: `user_${Date.now()}`,
        name: autoName,
        email: cleanEmail,
        password: password,
        plan: 'free',
        workspace: `${autoName}'s Workspace`,
        contacts: 0,
        createdAt: new Date().toISOString(),
      };
      users.push(foundUser);
      saveStoredUsers(users);
    } else {
      // If found, check password if set
      if (foundUser.password && foundUser.password !== password) {
        throw new Error('Invalid email or password');
      }
    }

    const token = `token_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));

    setUser(foundUser);
    return foundUser;
  };

  // ── Logout ──────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for easy access
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

