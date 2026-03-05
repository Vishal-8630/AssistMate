import * as signalR from "@microsoft/signalr";
import { getAccessToken } from "@/lib/token-manager";

export const createSignalRConnection = () => {
  return new signalR.HubConnectionBuilder()
    .withUrl(`${process.env.NEXT_PUBLIC_SIGNALR_URL}/hubs/session`, {
      accessTokenFactory: () => getAccessToken() ?? "",
    })
    .withAutomaticReconnect()
    .build();
};