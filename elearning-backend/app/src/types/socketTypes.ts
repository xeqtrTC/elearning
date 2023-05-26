export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    list_of_rooms: (a: unknown) => void;
    active_chats: (data: activeChatsTypes) => void;
    global_messager: (data: sendMessageType) => void;
    receive_private_messages: (data: sendMessageType) => void;
    error_message: (error: string) => void;
    user_focus: (data: inputTypingType) => void;
    receive_input_typing_focus: (data: inputTypingType) => void;
    new_active_chats: (data: newActiveChatsType) => void;
}
  
export interface ClientToServerEvents {
    hello: () => void;
    admin_connected: () => void
    join_room: (data: joinRoomTypes) => void;
    join_admin_room: (data: join_admin_room) => void;
    send_message: (data: sendMessageType) => void;
    input_typing: (data: inputTypingType) => void;
}
  
export interface InterServerEvents {
    ping: () => void;
}
  
export interface SocketData {
    name: string;
    age: number;
}

interface joinRoomTypes {
  name: string,
  id: string,
  message: string
}

interface activeChatsTypes {
  idOfRoom: string,
  socketId: string,
  id: string
}

interface join_admin_room {
  idOfRoom: string
}
interface sendMessageType {
  idOfRoom: string,
  name: string,
  message: string
}
interface inputTypingType {
  name: string
  idOfRoom: string
}
interface newActiveChatsType {
  socketId: string
}