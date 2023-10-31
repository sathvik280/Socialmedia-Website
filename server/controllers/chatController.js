const chatModel = require('../model/chatModel');
const userModel = require('../model/userModel');

const getUserChats = async (req, res) => {
    try 
    {
        const {
            id, 
            friendIds 
        } = req.body;

        const chats = await chatModel.find({
            $or: [
                { senderId: id },
                { receiverId: id }
            ]
        }).sort( {createdAt: -1} );

        const formattedChats = {};

        friendIds.forEach( (fid) => {
            formattedChats[fid] = [];
        });

        chats.forEach( (chat) => {
            const {
                chatId, 
                senderId, 
                receiverId, 
                message 
            } = chat;

            const flag = senderId === id ? 0 : 1;
            const friendId = senderId === id ? receiverId : senderId;

            if (!formattedChats[friendId])
            {
                formattedChats[friendId] = [];
            }

            formattedChats[friendId].push({
                chatId, 
                flag, 
                message 
            });
        });

        res.status(200).json( {chats: formattedChats} );
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

const addChat = async (req, res) => {
    try 
    {
        const {
            chatId, 
            senderId, 
            receiverId, 
            message 
        } = req.body;

        const sender = await userModel.findById(senderId);

        if (!sender)
        {
            res.status(404).json( {message: 'Sender not found'} );
            return;
        }

        const receiver = await userModel.findById(receiverId); 

        if (!receiver)
        {
            res.status(404).json( {message: 'Receiver not found'} );
            return;
        }

        await chatModel.create({
            chatId, 
            senderId, 
            receiverId, 
            message 
        });

        res.status(201).json( {message: 'Chat created successfully'} );
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

const deleteUserChat = async (req, res) => {
    try 
    {
        const { id, userId } = req.params;

        await chatModel.deleteMany({
            $or: [
                {
                    $and: [
                        {senderId: id}, 
                        {receiverId: userId}
                    ]
                }, 
                {
                    $and: [
                        {senderId: userId}, 
                        {receiverId: id}
                    ]
                }
            ]
        });

        res.status(204).json( {message: 'Chats have been deleted'} );
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

module.exports = { getUserChats, addChat, deleteUserChat };