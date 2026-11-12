import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

const CURRENT_USER_KEY = '__oc_current_user';
const TOKEN_KEY = '__oc_token';
const LEGACY_TOKEN_KEY = '__ag_jwt';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Initialize auth & handle Google OAuth redirect callback ───
  useEffect(() => {
    async function initAuth() {
      try {
        // 1. Check if returning from Supabase Google OAuth
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.email) {
          try {
            const googleRes = await apiClient.post('/api/auth/google', {
              email: session.user.email,
              name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
              supabaseToken: session.access_token,
            });

            const { token, user: authenticatedUser } = googleRes.data;
            if (token && authenticatedUser) {
              localStorage.setItem(TOKEN_KEY, token);
              sessionStorage.setItem(LEGACY_TOKEN_KEY, token);
              localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(authenticatedUser));
              setUser(authenticatedUser);
              // Clean hash parameters from URL
              if (window.location.hash) {
                window.history.replaceState(null, '', window.location.pathname);
              }
              setLoading(false);
              return;
            }
          } catch (gErr) {
            console.warn('Google backend session exchange warning:', gErr.message);
          }
        }

        // 2. Existing standard session restore
        const savedUser = localStorage.getItem(CURRENT_USER_KEY);
        const token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(LEGACY_TOKEN_KEY);
        if (savedUser && token) {
          setUser(JSON.parse(savedUser));
          localStorage.setItem(TOKEN_KEY, token);
          sessionStorage.setItem(LEGACY_TOKEN_KEY, token);
        }
      } catch {
        localStorage.removeItem(CURRENT_USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(LEGACY_TOKEN_KEY);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  // ── Signup ──────────────────────────────────────────────
  const signup = async ({ name, email, password }) => {
    const cleanEmail = email.toLowerCase().trim();
    const cleanName = name.trim();

    try {
      const res = await apiClient.post('/api/auth/signup', {
        name: cleanName,
        email: cleanEmail,
        password,
      });

      const { token, user: authenticatedUser } = res.data;
      if (!token || !authenticatedUser) {
        throw new Error('Authentication response did not contain a valid session token.');
      }

      purgeUserLocalCache();
      localStorage.setItem(TOKEN_KEY, token);
      sessionStorage.setItem(LEGACY_TOKEN_KEY, token);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(authenticatedUser));

      setUser(authenticatedUser);
      return authenticatedUser;
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Signup failed';
      throw new Error(msg);
    }
  };

  // ── Login ───────────────────────────────────────────────
  const login = async ({ email, password }) => {
    const cleanEmail = email.toLowerCase().trim();

    try {
      const res = await apiClient.post('/api/auth/login', {
        email: cleanEmail,
        password,
      });

      const { token, user: authenticatedUser } = res.data;
      if (!token || !authenticatedUser) {
        throw new Error('Authentication response did not contain a valid session token.');
      }

      purgeUserLocalCache();
      localStorage.setItem(TOKEN_KEY, token);
      sessionStorage.setItem(LEGACY_TOKEN_KEY, token);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(authenticatedUser));

      setUser(authenticatedUser);
      return authenticatedUser;
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Login failed';
      throw new Error(msg);
    }
  };

  // ── Login with Google ────────────────────────────────────
  const loginWithGoogle = async () => {
    try {
      const redirectUrl = window.location.origin + '/login';
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        throw new Error(error.message || 'Google sign-in initialization failed');
      }

      return data;
    } catch (err) {
      throw new Error(err.message || 'Failed to start Google sign-in');
    }
  };

  // Helper to purge workspace/channel cache from localStorage on user change
  const purgeUserLocalCache = () => {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && (k.startsWith('omni_') || k.startsWith('__oc_'))) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
      sessionStorage.removeItem(LEGACY_TOKEN_KEY);
    } catch (_) {}
  };

  // ── Logout ──────────────────────────────────────────────
  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (_) {}
    purgeUserLocalCache();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout }}>
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
