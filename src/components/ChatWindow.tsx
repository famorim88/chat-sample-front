"use client"
import { useChat } from "@/context/ChatContext"
import { MessageItem } from "./MessageItem"
import { useState } from "react"
import styled from "styled-components"
import { Button, TextField } from "@mui/material"

const ChatWrapper = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: #fafafa;
  padding: 1rem;
  border-radius: 10px;
  height: 400px;
  overflow-y: auto;
`

export const ChatWindow = () => {
  const { messages, sendMessage } = useChat()
  const [text, setText] = useState("")

  const handleSend = async () => {
    if (!text.trim()) return
    await sendMessage(text)
    setText("")
  }

  return (
    <ChatWrapper>
      <MessageList>
        {messages.map((msg) => (
          <MessageItem key={msg.id} msg={msg} />
        ))}
      </MessageList>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Digite sua mensagem..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button variant="contained" onClick={handleSend}>
          Enviar
        </Button>
      </div>
    </ChatWrapper>
  )
}
