// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ContactsPage from './pages/ContactsPage';
import AutomationPage from './pages/AutomationPage';
import ManychatAIPage from './pages/ManychatAIPage';
import InboxPage from './pages/InboxPage';
import BroadcastsPage from './pages/BroadcastsPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Authenticated workspace routes inside Manychat Layout */}
      <Route element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/automation" element={<AutomationPage />} />
        <Route path="/omniconnect-ai" element={<ManychatAIPage />} />
        <Route path="/manychat-ai" element={<Navigate to="/omniconnect-ai" replace />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/broadcasts" element={<BroadcastsPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* Backward-compatible redirects */}
        <Route path="/dashboard" element={<Navigate to="/home" replace />} />
        <Route path="/integrations" element={<Navigate to="/settings?tab=integrations" replace />} />
      </Route>

      {/* Default redirect to login page */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
