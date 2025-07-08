import { Message } from "@/types/Message"
import styled from "styled-components"

const MessageBubble = styled.div<{ sender: string }>`
  background-color: ${({ sender }) => (sender === "User" ? "#1976d2" : "#e0e0e0")};
  color: ${({ sender }) => (sender === "User" ? "#fff" : "#000")};
  padding: 8px 12px;
  border-radius: 16px;
  max-width: 70%;
  align-self: ${({ sender }) => (sender === "User" ? "flex-end" : "flex-start")};
  margin: 4px 0;
`

export const MessageItem = ({ msg }: { msg: Message }) => (
  <MessageBubble sender={msg.sender}>{msg.text}</MessageBubble>
)
