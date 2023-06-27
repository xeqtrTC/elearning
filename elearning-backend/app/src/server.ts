import express from 'express'
// import db from './models/';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';
import { sequelize } from './models';
import { createServer, Server as HTTPServer } from 'http';
import { createSocketServer } from './socket/socket';
import sessionStore from './config/sessionDB';
const app = express();

require('./passport/passport')
const server: HTTPServer  = createServer(app);
createSocketServer(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json()); 
app.use(cors({
    origin: ["http://127.0.0.1:5173"],
    methods: 'GET, PUT, HEAD, PATCH, POST, DELETE',
    credentials: true
}))

app.use(express.static(__dirname + 'src/images'))
app.use('/image', express.static('src/images'))
const sessionMiddleware = session({
    secret: 'secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    // secure: true,
    // httpOnly: true,
    // sameSite: 'none',
    cookie: { maxAge: 360000000 }
})

app.get('/', (req, res) => {
    return res.send('ovo mozda radi')
})
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use('/users', require('./routers/userRouter'))
app.use('/roles', require('./routers/roleRouter'))
app.use('/courses', require('./routers/courseRouter'))
app.use('/sockets', require('./routers/socketRouter'))
app.use('/pdf', require('./routers/pdfRouter'))

server.listen(5000, () => {
    console.log('server radi na 5000 portu')
})
try {
    sequelize.authenticate();
    sequelize.sync()
    console.log('server databrase works')
} catch (error) {
    console.log('error', error)
}

// db.databaseConf.sync(); 