import api from "@/lib/api";
import { ActiveCartProductI } from "@/types/rooms.types";
import { io } from "socket.io-client";

export const socket = io("http://localhost:3000");

async function createRoom(todoCart: ActiveCartProductI[]) {
  const { data: room } = await api.post("/rooms", {
    roomId: socket.id,
    todoCart,
  });
  console.log(room);

  socket.emit("create-room", room);
}

export const socketService = {
  createRoom,
};
