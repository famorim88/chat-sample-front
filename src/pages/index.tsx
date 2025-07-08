import { ChatProvider } from "@/context/ChatContext"
import { ChatWindow } from "@/components/ChatWindow"
import Head from "next/head"

export default function Home() {
  return (
    <ChatProvider>
      <Head>
        <title>Chat com Bot</title>
      </Head>
      <ChatWindow />
    </ChatProvider>
  )
}
