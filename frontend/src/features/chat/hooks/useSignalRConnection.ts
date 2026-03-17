import { useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { createSignalRConnection } from "@/lib/realtime/createSignalRConnection";

export const useSignalRConnection = () => {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = async () => {
    if (connectionRef.current) return connectionRef.current;

    const connection = createSignalRConnection();

    connection.onreconnecting(() => setIsConnected(false));

    connection.onreconnected(() => setIsConnected(true));

    connection.onclose(() => setIsConnected(false));

    await connection.start();

    setIsConnected(true);

    connectionRef.current = connection;

    return connection;
  };

  const disconnect = async () => {
    const connection = connectionRef.current;

    if (!connection) return;

    await connection.stop();

    connectionRef.current = null;

    setIsConnected(false);
  };

  return {
    connectionRef,
    connect,
    disconnect,
    isConnected,
  };
};