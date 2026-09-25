import { describe, expect, it } from "vitest";
import { addChatMessage, countUnreadMessages, createChatThreadId } from "./chat";

describe("chat", () => {
  it("creates stable item-scoped thread ids", () => {
    expect(createChatThreadId("buyer-1", "seller-1", "item-1")).toBe("buyer-1:seller-1:item-1");
  });

  it("orders messages and counts unread messages", () => {
    const messages = addChatMessage(
      [{ id: "2", sender: "seller", body: "موجوده", createdAt: "2026-09-25T10:01:00Z" }],
      { id: "1", sender: "buyer", body: "سلام، موجوده؟", createdAt: "2026-09-25T10:00:00Z" }
    );

    expect(messages.map((message) => message.id)).toEqual(["1", "2"]);
    expect(countUnreadMessages(messages, "buyer")).toBe(1);
  });
});
