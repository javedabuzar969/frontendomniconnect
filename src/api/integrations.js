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

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
