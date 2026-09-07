// ─────────────────────────────────────────────────
//  Global TypeScript Types
// ─────────────────────────────────────────────────

// Auth
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

// Workspace (tenant)
export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  createdAt: string;
}

// WhatsApp Connection (never includes tokens)
export interface WhatsAppConnection {
  id: string;
  workspaceId: string;
  businessName: string;
  wabaId: string;
  phoneNumberId: string;
  displayPhoneNumber: string;
  status: 'active' | 'inactive' | 'pending' | 'error';
  createdAt: string;
  updatedAt: string;
}

// Channel types (future-proof)
export type ChannelType = 'WHATSAPP' | 'FACEBOOK' | 'INSTAGRAM';

// Customer / Contact
export interface Customer {
  id: string;
  workspaceId: string;
  name: string;
  phone?: string;
  email?: string;
  avatarUrl?: string;
  channelType: ChannelType;
  externalId: string; // WhatsApp phone number / PSID etc.
  createdAt: string;
}

// Conversation
export interface Conversation {
  id: string;
  workspaceId: string;
  channelType: ChannelType;
  customerId: string;
  customer: Customer;
  whatsappConnectionId?: string;
  status: 'open' | 'resolved' | 'pending';
  lastMessageAt: string;
  lastMessagePreview?: string;
  unreadCount: number;
  createdAt: string;
}

// Message
export type MessageDirection = 'inbound' | 'outbound';
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed' | 'pending';
export type MessageType = 'text' | 'image' | 'video' | 'audio' | 'document' | 'template';

export interface Message {
  id: string;
  conversationId: string;
  direction: MessageDirection;
  type: MessageType;
  content: string;
  status: MessageStatus;
  externalMessageId?: string;
  sentAt: string;
  deliveredAt?: string;
  readAt?: string;
  createdAt: string;
}

// API Response wrappers
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Meta Embedded Signup response
export interface MetaSignupResponse {
  type: 'WA_EMBEDDED_SIGNUP';
  event: 'FINISH' | 'CANCEL' | 'ERROR';
  data?: {
    phone_number_id: string;
    waba_id: string;
    code?: string;
  };
  error_message?: string;
}

// Connect payload sent to backend
export interface WhatsAppConnectPayload {
  code: string;
  workspaceId: string;
}

// Send message payload
export interface SendMessagePayload {
  content: string;
  type?: MessageType;
}

// Socket events
export interface IncomingMessageEvent {
  conversationId: string;
  message: Message;
  customer: Customer;
}
