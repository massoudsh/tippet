export interface ChatMessage {
  id: string;
  sender: "buyer" | "seller";
  body: string;
  createdAt: string;
}

export function createChatThreadId(buyerId: string, sellerId: string, itemId: string) {
  return [buyerId, sellerId, itemId].join(":");
}

export function addChatMessage(messages: ChatMessage[], message: ChatMessage) {
  return [...messages, message].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function countUnreadMessages(messages: ChatMessage[], viewer: ChatMessage["sender"]) {
  return messages.filter((message) => message.sender !== viewer).length;
}
