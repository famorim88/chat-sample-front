export type Sender = "User" | "Bot"

export interface Message {
  id: string
  text: string
  timestamp: string
  sender: Sender
}
