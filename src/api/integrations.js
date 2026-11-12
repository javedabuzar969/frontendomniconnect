import { apiClient, isMock } from './client';
import { MOCK_WA_CONNECTION } from '../utils/mockData';

export async function fetchWhatsAppConnections(workspaceId) {
  if (isMock) {
    await delay(500);
    return [MOCK_WA_CONNECTION];
  }
  const res = await apiClient.get('/api/integrations/whatsapp', {
    params: { workspaceId },
  });
  return res.data.data;
}

export async function connectWhatsApp(payload) {
  if (isMock) {
    await delay(1200);
    return { ...MOCK_WA_CONNECTION, id: `wa_conn_${Date.now()}` };
  }
  const res = await apiClient.post('/api/integrations/whatsapp/connect', payload);
  return res.data.data;
}

export async function disconnectWhatsApp(id) {
  if (isMock) {
    await delay(600);
    return;
  }
  await apiClient.delete(`/api/integrations/whatsapp/${id}`);
}

// ── Salesforce CRM Integration ───────────────────────────────────────────────

/**
 * Get the Salesforce OAuth connect URL from the backend.
 * Returns { oauthUrl } to open in a popup.
 * Never exposes Client Secret — all OAuth happens server-side.
 */
export async function getSalesforceConnectUrl() {
  const res = await apiClient.get('/api/integrations/salesforce/connect', {
    headers: { Accept: 'application/json' },
    params: { format: 'json' },
  });
  return res.data; // { success, oauthUrl, state }
}

/**
 * Get current Salesforce connection status for the authenticated workspace.
 * Returns { connected, orgId, instanceUrl, connectedAt } — no tokens.
 */
export async function getSalesforceStatus() {
  const res = await apiClient.get('/api/integrations/salesforce/status');
  return res.data; // { success, connected, orgId, instanceUrl, connectedAt }
}

/**
 * Disconnect Salesforce CRM for the authenticated workspace.
 */
export async function disconnectSalesforce() {
  const res = await apiClient.post('/api/integrations/salesforce/disconnect');
  return res.data;
}

/**
 * Sync all workspace contacts directly into Salesforce CRM standard Contact object.
 */
export async function syncContactsToSalesforce() {
  const res = await apiClient.post('/api/integrations/salesforce/sync-contacts');
  return res.data; // { success, message, results: { total, created, updated, failed } }
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

