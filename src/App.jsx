// App.jsx
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ContactsPage from './pages/ContactsPage';
import InboxPage from './pages/InboxPage';
import BroadcastsPage from './pages/BroadcastsPage';
import SettingsPage from './pages/SettingsPage';
import OnboardingPage from './pages/OnboardingPage';
import ConnectFacebookPage from './pages/ConnectFacebookPage';
import ConnectInstagramPage from './pages/ConnectInstagramPage';
import MetaCallbackPage from './pages/MetaCallbackPage';

// ── Protected Route wrapper ────────────────────────────────
// If user is not logged in → redirect to /login
// If first time login (onboarding not done) → redirect to /onboarding
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#007aff] rounded-full animate-spin" />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;

  const userKey = user.email || user._id || 'default_user';
  const hasCompletedOnboarding = localStorage.getItem(`onboarding_${userKey}`);

  if (!hasCompletedOnboarding && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

// ── Public Route wrapper ───────────────────────────────────
// If user is already logged in → redirect to /onboarding or /home
function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) {
    const userKey = user.email || user._id || 'default_user';
    const hasCompletedOnboarding = localStorage.getItem(`onboarding_${userKey}`);
    return <Navigate to={hasCompletedOnboarding ? '/home' : '/onboarding'} replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Public: Login page — redirect to /home if already logged in */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Meta OAuth Popup Callback */}
      <Route path="/meta-callback" element={<MetaCallbackPage />} />

      {/* Onboarding Flow: shown after first time login/signup */}
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <OnboardingPage />
          </ProtectedRoute>
        }
      />

      {/* Protected: All app pages require login */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<HomePage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/broadcasts" element={<BroadcastsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/connect-facebook" element={<ConnectFacebookPage />} />
        <Route path="/connect-instagram" element={<ConnectInstagramPage />} />

        {/* Redirects */}
        <Route path="/automation" element={<Navigate to="/home" replace />} />
        <Route path="/omniconnect-ai" element={<Navigate to="/home" replace />} />
        <Route path="/dashboard" element={<Navigate to="/home" replace />} />
        <Route path="/integrations" element={<Navigate to="/settings?tab=integrations" replace />} />
      </Route>

      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
