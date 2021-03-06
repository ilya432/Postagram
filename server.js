const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const postRoutes = require('./api/post/post.routes')
// const commentRoutes = require('./api/comment/comment.routes')
const connectSockets = require('./api/socket/socket.routes')
const uploadRoutes = require('./api/upload/upload.routes')

const logger = require('./services/logger.service')


app.use(cookieParser())
app.use(bodyParser.json());
app.use(express.json());//in new version of express body-parser isn't needed here
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
// app.use('/api/comment', commentRoutes)
app.use('/api/upload', uploadRoutes)
connectSockets(io)


const port = process.env.PORT || 3030;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});
