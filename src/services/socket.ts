import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function connectNotificationsSocket(access_token: string) {
  if (socket) return socket;

  socket = io(`${import.meta.env.VITE_API_URL}/notifications/me`, {
    auth: { access_token }, // sera lu côté Nest dans handshake.auth
    withCredentials: true,
  });

  return socket;
}

export function getNotificationsSocket() {
  return socket;
}
