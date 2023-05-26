import { Server as SocketIOServer } from 'socket.io';
import { liveRoomMessages, LiveRooms} from '../models/index';
import { Request, Response } from 'express';
import { sendResponseSuccess, sendResponseFailure } from '../middleware/responses';
import { liveRoomsAttributes } from '../models/liveRooms.model';
import { liveRoomsMessageAttributes } from '../models/liveRoomMessages.model';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from '../types/socketTypes';
import { createServer, Server as HTTPServer } from 'http';

export const getLiveRooms = async (req: Request, res: Response) => {
    try {
        const getAllLiveRooms: liveRoomsAttributes[] = await LiveRooms.findAll({
            attributes: ['id', 'socketId', 'idOfRoom']
        });
        return sendResponseSuccess(200, getAllLiveRooms, res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}

export const getLiveMessages = async (req: Request, res: Response) => {
    try {
        const getAllMessages:liveRoomsMessageAttributes[] = await liveRoomMessages.findAll({
            attributes: ['id', 'name', 'message', 'idOfRoom']
        });
        return sendResponseSuccess(200, getAllMessages, res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}

export const getListOfRooms = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const listOfChats: number = await LiveRooms.count();
            resolve(listOfChats)
        } catch (error) {
            reject(false)
        }
    })
}

export const deleteAllChats = async (req: Request, res: Response) => {
    console.log('usao')
    try {
         await liveRoomMessages.destroy({ 
            where: { idOfRoom: { Not: null } } 
          })
            await LiveRooms.destroy({            
                where: { idOfRoom: { Not: null } } 
            })
            return sendResponseSuccess(201, 'Deleted all chats', res)
    } catch (error: any) {
        console.log(error);
        return sendResponseFailure(401, error.message, res)
    }
}

export const deleteOneChat = async (req: Request, res: Response) => {
    const { idOfRoom } = req.body;
    console.log(idOfRoom);
    try {
        const showRoom = await LiveRooms.findOne({
            where: {
                idOfRoom: idOfRoom
            }
        })
        if (showRoom) {
            showRoom.destroy();
            return sendResponseSuccess(201, 'You deleted one chat!', res)
        }
        return sendResponseFailure(404, "That room doesn't exist", res)
    } catch (error: any) {
        console.log(error);
        sendResponseFailure(401, error.message, res)
    }
}

export const createSocketServer = (server: HTTPServer) => {
    const io: SocketIOServer = new SocketIOServer(server, {
        cors: {
            origin: 'http://127.0.0.1:5173',
            credentials: true
        }    
    });
    // console.log(io);
    io.on('connection', (socket) => {
        console.log('connected')
        console.log(`client ${socket.id} connected`)
        socket.on('admin_connected', async () => {
            const calculateListOfRooms = async () => {
                try {
                    const listOfChat = await getListOfRooms()
                    io.emit('list_of_rooms', listOfChat)
                } catch (error) {
                    console.log(error);
                }
            }
            calculateListOfRooms();
        })
        socket.on('join_room', async (data) => {
            const { name, id, message } = data;
            const dataToBeAdded = {
                idOfRoom: id,
                socketId: socket.id
            }
            console.log(socket.id, id)
            try {
                const activeChat = await LiveRooms.create(dataToBeAdded)
                const arrayToBeEmitted = {
                    idOfRoom: id,
                    socketId: socket.id,
                    id: activeChat.id
                }
                const listOfChats = await LiveRooms.count();
                if (listOfChats && activeChat) {
                    console.log(listOfChats, 'ovde')
                    io.emit('list_of_rooms', listOfChats)
                    socket.join(data.id);
                    io.emit('active_chats', arrayToBeEmitted);
                }
            } catch (error) {
                console.log(error, 'works')
            }
        })
        socket.on('join_admin_room', (data) => {
            socket.join(data.idOfRoom)
        })
        socket.on('send_message', async (data) => {
            const { idOfRoom, name, message } = data;
            const dataToBeAdded = {
                name: name,
                message: message,
                idOfRoom: idOfRoom
            }
            try {
                const findProperRoom = await LiveRooms.findOne({
                    where: {
                        idOfRoom: idOfRoom
                    }
                })
                if (findProperRoom) {
                    await liveRoomMessages.create({
                        name: name,
                        message: message,
                        idOfRoom: idOfRoom
                    })
                    console.log(dataToBeAdded);
                    io.emit('global_messager',dataToBeAdded )
                    io.to(idOfRoom).emit('receive_private_messages', data)
                } else {
                    io.emit('error_message', 'Please close chat and try again')
                    console.log(' nema sobe ')
                }
            } catch (error) {
                console.log(error, 'e')
            }
        })
        socket.on('input_typing', (data) => {
            if (data.name === 'Admin') {
                io.to(data.idOfRoom).emit('user_focus', data)
            }
            if (data.name === 'User') {
                io.emit('receive_input_typing_focus', data)
            }
        })
        socket.on('disconnect', async () => {
            try {
                const findProperRoom = await LiveRooms.findOne({
                    where: {
                        socketId: socket.id
                    }
                })
                if (findProperRoom) {
                    const findMessagesForThis = await liveRoomMessages.findOne({
                        where: {
                            idOfRoom: findProperRoom.idOfRoom
                        }
                    })
                    if (findMessagesForThis) {
                        await findMessagesForThis.destroy();
                    }
                    await findProperRoom.destroy();
                    const dataTobeEmitted = {
                        socketId: socket.id
                    }
                    const listOfChats = await getListOfRooms();
                    io.emit('list_of_rooms', listOfChats)
                    io.emit('new_active_chats', dataTobeEmitted);
                }
            } catch (error) {
                console.log(error, 'a');
            }
        })
    })    
}
