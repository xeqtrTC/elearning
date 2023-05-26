"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSocketServer = exports.deleteOneChat = exports.deleteAllChats = exports.getListOfRooms = exports.getLiveMessages = exports.getLiveRooms = void 0;
const socket_io_1 = require("socket.io");
const models_1 = __importDefault(require("../models"));
const liveRooms = models_1.default.liveRooms;
const liveMessages = models_1.default.liveMessages;
const Op = models_1.default.Sequelize.Op;
const responses_1 = require("../middleware/responses");
const getLiveRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllLiveRooms = yield liveRooms.findAll({
            attributes: ['id', 'socketId', 'idOfRoom']
        });
        return (0, responses_1.sendResponseSuccess)(200, getAllLiveRooms, res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.getLiveRooms = getLiveRooms;
const getLiveMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllMessages = yield liveMessages.findAll({
            attributes: ['id', 'name', 'message', 'idOfRoom']
        });
        return (0, responses_1.sendResponseSuccess)(200, getAllMessages, res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.getLiveMessages = getLiveMessages;
const getListOfRooms = () => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const listOfChats = yield liveRooms.count();
            resolve(listOfChats);
        }
        catch (error) {
            reject(false);
        }
    }));
};
exports.getListOfRooms = getListOfRooms;
const deleteAllChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('usao');
    try {
        yield liveMessages.destroy({
            where: { liveRoomId: { [Op.not]: null } }
        });
        yield liveRooms.destroy({ where: { idOfRoom: { [Op.not]: null } }
        });
        return (0, responses_1.sendResponseSuccess)(201, 'Deleted all chats', res);
    }
    catch (error) {
        console.log(error);
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.deleteAllChats = deleteAllChats;
const deleteOneChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idOfRoom } = req.body;
    try {
        const showRoom = yield liveMessages.findOne({
            idOfRoom: idOfRoom
        });
        if (showRoom) {
            showRoom.destroy();
            return (0, responses_1.sendResponseSuccess)(201, 'You deleted one chat!', res);
        }
        return (0, responses_1.sendResponseFailure)(404, "That room doesn't exist", res);
    }
    catch (error) {
        (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.deleteOneChat = deleteOneChat;
const createSocketServer = (server) => {
    const io = new socket_io_1.Socket(server, {
        cors: {
            origin: 'http://127.0.0.1:5173',
            credentials: true
        }
    });
    io.on('connection', (socket) => {
        console.log('connected');
        console.log(`client ${socket.id} connected`);
        socket.on('admin_connected', () => __awaiter(void 0, void 0, void 0, function* () {
            const calculateListOfRooms = () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const listOfChats = yield (0, exports.getListOfRooms)();
                    io.emit('list_of_rooms', listOfChats);
                }
                catch (error) {
                    console.log(error);
                }
            });
            calculateListOfRooms();
        }));
        socket.on('join_room', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { name, id, message } = data;
            const dataToBeAdded = {
                idOfRoom: id,
                socketId: socket.id
            };
            try {
                const activeChat = yield liveRooms.create(dataToBeAdded);
                const arrayToBeEmitted = {
                    idOfRoom: id,
                    socketId: socket.id,
                    id: activeChat.id
                };
                const listOfChats = yield liveRooms.count();
                if (listOfChats && activeChat) {
                    console.log(listOfChats, 'ovde');
                    io.emit('list_of_rooms', listOfChats);
                    socket.join(data.id);
                    io.emit('active_chats', arrayToBeEmitted);
                }
            }
            catch (error) {
                console.log(error, 'works');
            }
        }));
        socket.on('join_admin_room', (data) => {
            socket.join(data.idOfRoom);
        });
        socket.on('send_message', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { idOfRoom, name, message } = data;
            console.log(data);
            const dataToBeAdded = {
                name: name,
                message: message,
                idOfRoom: idOfRoom
            };
            try {
                const findProperRoom = yield liveRooms.findOne({
                    where: {
                        idOfRoom: idOfRoom
                    }
                });
                if (findProperRoom) {
                    yield findProperRoom.createLiveMessage(dataToBeAdded);
                    io.emit('global_messager', data);
                    io.to(idOfRoom).emit('receive_private_messages', data);
                }
                else {
                    io.emit('error_message', 'Please close chat and try again');
                    console.log(' nema sobe ');
                }
            }
            catch (error) {
                console.log(error, 'e');
            }
        }));
        socket.on('input_typing', (data) => {
            if (data.name === 'Admin') {
                io.to(data.idOfRoom).emit('user_focus', data);
            }
            if (data.name === 'User') {
                io.emit('receive_input_typing_focus', data);
            }
        });
        socket.on('disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const findProperRoom = yield liveRooms.findOne({
                    where: {
                        socketId: socket.id
                    }
                });
                if (findProperRoom) {
                    const findMessagesForThis = yield liveMessages.findOne({
                        where: {
                            idOfRoom: findProperRoom.idOfRoom
                        }
                    });
                    if (findMessagesForThis) {
                        yield findMessagesForThis.destroy();
                    }
                    yield findProperRoom.destroy();
                    const dataTobeEmitted = {
                        socketId: socket.id
                    };
                    const listOfChats = yield (0, exports.getListOfRooms)();
                    io.emit('list_of_rooms', listOfChats);
                    io.emit('new_active_chats', dataTobeEmitted);
                }
            }
            catch (error) {
                console.log(error, 'a');
            }
        }));
    });
};
exports.createSocketServer = createSocketServer;
