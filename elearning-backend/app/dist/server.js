"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_1 = require("./socket/socket");
const sessionDB_1 = __importDefault(require("./config/sessionDB"));
const app = (0, express_1.default)();
require('./passport/passport');
const server = http_1.default.createServer(app);
(0, socket_1.createSocketServer)(server);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://127.0.0.1:5173"],
    methods: 'GET, PUT, HEAD, PATCH, POST, DELETE',
    credentials: true
}));
app.use(express_1.default.static(__dirname + '/images'));
app.use('/image', express_1.default.static('images'));
const sessionMiddleware = (0, express_session_1.default)({
    secret: 'secret',
    store: sessionDB_1.default,
    resave: false,
    saveUninitialized: false,
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    cookie: { maxAge: 360000000 }
});
app.get('/', (req, res) => {
    return res.send('ovo mozda radi');
});
app.use(sessionMiddleware);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cookie_parser_1.default)());
app.use('/users', require('./routers/userRouter'));
app.use('/roles', require('./routers/roleRouter'));
app.use('/courses', require('./routers/courseRouter'));
app.use('/sockets', require('./routers/socketRouter'));
server.listen(5000, () => {
    console.log('server radi na 5000 portu');
});
// db.databaseConf.sync(); 
