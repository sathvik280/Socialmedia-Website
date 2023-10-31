const express = require('express');
const { createServer } = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const server = createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});

app.use(express.json( {limit: '30mb'} ));
app.use(express.urlencoded( {extended: false} ));
app.use(cors());
app.use(helmet());

const connectDb = require('./db/connect');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const chatRouter = require('./routes/chatRoutes');
const postRouter = require('./routes/postRoutes');
const searchRouter = require('./routes/searchRoutes');

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);
app.use('/post', postRouter);
app.use('/search', searchRouter);

app.use('*', (req, res) => {
    res.status(404).json( {message: 'Invalid http request'} );
});

//

let connectedUsers = new Map();

io.on('connection', (socket) => {
    socket.on('newUser', (userId) => {
        console.log(`new user connected ${userId}`);

        if (!connectedUsers.get(userId))
        {
            connectedUsers.set(userId, socket);
        }
    });

    socket.on('sendMessage', ( {chatId, senderId, receiverId, message} ) => {
        const targetSocket = connectedUsers.get(receiverId);

        if (targetSocket)
        {
            targetSocket.emit('receiveMessage', {
                chatId,
                senderId, 
                message
            });
        }
    });

    socket.on('addFriend', ({
        id, 
        name, 
        email, 
        location, 
        occupation,
        imageName, 
        imageUrl,
        friendId
    }) => {
        const targetSocket = connectedUsers.get(friendId);

        if (targetSocket)
        {
            targetSocket.emit('receiveAddFriend', {
                id, 
                name, 
                email,
                location, 
                occupation, 
                imageName, 
                imageUrl
            });
        }
    });

    socket.on('removeFriend', ( {id, friendId} ) => {
        const targetSocket = connectedUsers.get(friendId);

        if (targetSocket)
        {
            targetSocket.emit('receiveRemoveFriend', id);
        }
    });

    socket.on('removeUserChat', ( {id, userId} ) => {
        const targetSocket = connectedUsers.get(userId);

        if (targetSocket)
        {
            targetSocket.emit('receiveRemoveUserChat', id);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');

        for (const [storedUserId, storedSocket] of connectedUsers) {
            if (storedSocket === socket) 
            {
                connectedUsers.delete(storedUserId);
                break;
            }
        }
    });
});

//

const port = process.env.PORT;
const url = process.env.MONGO_URL;

const start = async () => {
    try 
    {
        await connectDb(url);
        server.listen(port, () => {
            console.log('server running...');
        });
    }

    catch (error)
    {
        console.log(error);
    }
};

start();