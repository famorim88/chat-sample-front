import { HubConnectionBuilder, HubConnection, LogLevel } from "@microsoft/signalr"
import { useEffect, useRef } from "react"

interface UseSignalROptions {
  url: string
  onConnect?: () => void
  listeners: { [eventName: string]: (...args: any[]) => void }
}

export const useSignalR = ({ url, onConnect, listeners }: UseSignalROptions) => {
  const connectionRef = useRef<HubConnection | null>(null)

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build()

    connectionRef.current = connection

    const start = async () => {
      try {
        await connection.start()
        console.log("🟢 SignalR conectado!")
        onConnect?.()

        // Registrar listeners
        Object.entries(listeners).forEach(([event, callback]) => {
          connection.on(event, callback)
        })
      } catch (err) {
        console.error("🔴 Erro ao conectar SignalR:", err)
        setTimeout(start, 3000)
      }
    }

    start()

    return () => {
      connection.stop()
      Object.keys(listeners).forEach((event) => {
        connection.off(event)
      })
    }
  }, [url, JSON.stringify(Object.keys(listeners))])
}
