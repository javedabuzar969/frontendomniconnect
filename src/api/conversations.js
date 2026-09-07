import { apiClient, isMock } from './client';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from '../utils/mockData';

// ─── Conversations API ───────────────────────────────────────────────────────

export async function fetchConversations(workspaceId) {
  if (isMock) {
    await delay(400);
    return MOCK_CONVERSATIONS;
  }
  const res = await apiClient.get('/api/conversations', {
    params: { workspaceId },
  });
  return res.data.data;
}

export async function fetchConversation(id) {
  if (isMock) {
    await delay(300);
    return MOCK_CONVERSATIONS.find((c) => c.id === id) || null;
  }
  const res = await apiClient.get(`/api/conversations/${id}`);
  return res.data.data;
}

export async function fetchMessages(conversationId) {
  if (isMock) {
    await delay(300);
    return MOCK_MESSAGES[conversationId] || [];
  }
  const res = await apiClient.get(
    `/api/conversations/${conversationId}/messages`
  );
  return res.data.data;
}

export async function sendMessage(conversationId, payload) {
  if (isMock) {
    await delay(600);
    return {
      id: `msg_${Date.now()}`,
      conversationId,
      direction: 'outbound',
      type: 'text',
      content: payload.content,
      status: 'sent',
      sentAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
  }
  const res = await apiClient.post(
    `/api/conversations/${conversationId}/messages`,
    payload
  );
  return res.data.data;
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
