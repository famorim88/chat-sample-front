import { createContext, useContext, useState } from "react"
import { Message } from "@/types/Message"
import { api } from "@/services/api"
import { useSignalR } from "@/hooks/useSignalR"

interface ChatContextType {
  messages: Message[]
  sendMessage: (text: string) => Promise<void>
}

const ChatContext = createContext<ChatContextType>({} as ChatContextType)

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([])

  const sendMessage = async (text: string) => {
    const res = await api.post<Message[]>("api/chat/message", { text })
    setMessages((prev) => [...prev, ...res.data])
  }

  // Conecta via SignalR e escuta eventos do servidor,mas pode usar o service caso queira usar via POST tbm
  useSignalR({
    url: "https://localhost:7029/hubs/chat",
    listeners: {
      ReceiveMessage: (msgs: Message[]) => {
        setMessages((prev) => [...prev, ...msgs])
      },
    },
  })

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext)
