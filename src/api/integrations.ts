import { apiClient, isMock } from './client';
import type { WhatsAppConnection, WhatsAppConnectPayload } from '../types';
import { MOCK_WA_CONNECTION } from '../utils/mockData';

// ─── WhatsApp Integration API ───────────────────────────────────────────────

/** GET /api/integrations/whatsapp — list connections for current workspace */
export async function fetchWhatsAppConnections(
  workspaceId: string
): Promise<WhatsAppConnection[]> {
  if (isMock) {
    await delay(500);
    return [MOCK_WA_CONNECTION];
  }
  const res = await apiClient.get<{ data: WhatsAppConnection[] }>(
    `/api/integrations/whatsapp`,
    { params: { workspaceId } }
  );
  return res.data.data;
}

/** POST /api/integrations/whatsapp/connect — exchange Meta code for tokens */
export async function connectWhatsApp(
  payload: WhatsAppConnectPayload
): Promise<WhatsAppConnection> {
  if (isMock) {
    await delay(1200);
    return { ...MOCK_WA_CONNECTION, id: `wa_conn_${Date.now()}` };
  }
  const res = await apiClient.post<{ data: WhatsAppConnection }>(
    '/api/integrations/whatsapp/connect',
    payload
  );
  return res.data.data;
}

/** DELETE /api/integrations/whatsapp/:id — disconnect a WhatsApp connection */
export async function disconnectWhatsApp(id: string): Promise<void> {
  if (isMock) {
    await delay(600);
    return;
  }
  await apiClient.delete(`/api/integrations/whatsapp/${id}`);
}

// helper
function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
