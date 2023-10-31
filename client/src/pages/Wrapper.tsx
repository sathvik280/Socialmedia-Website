import React, { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';

import { addChat, addChatFriend, removeChatFriend, removeUserChat } from '../features/slice/chatSlice';
import { addFriend, removeFriend } from '../features/slice/friendSlice';
import { removeIsOpen, removeSelectedFriend } from '../features/slice/windowSlice';

import { Store, User as UserIntf, ChatFriend } from '../types/interface';

import Home from './Home';
import Search from './Search';
import Chat from './Chat';
import User from './User';
import Profile from './Profile';
import NotFound from './NotFound';

import PrivateRoutes2 from '../privateRoutes/privateRoutes2';

const Wrapper: React.FC = (): JSX.Element => {
    const socket: React.MutableRefObject<Socket | null> = useRef(null);

    const { user }: {
        user: UserIntf
    } = useSelector( (store: Store) => store.auth);

    const { selectedFriend }: {
        selectedFriend: ChatFriend
    } = useSelector( (store: Store) => store.window);

    const dispatch = useDispatch();

    const sendMessageToSocket: Function = (message: string, chatId: string): void => {
        if (!socket.current)
        {
            return;
        }

        socket.current.emit('sendMessage', {
            chatId,
            senderId: user._id, 
            receiverId: selectedFriend._id,
            message
        });
    };

    const sendAddFriendToSocket: Function = (friendId: string): void => {
        if (!socket.current)
        {
            return;
        }

        socket.current.emit('addFriend', {
            id: user._id,
            name: user.name, 
            email: user.email, 
            location: user.location, 
            occupation: user.occupation, 
            imageName: user.imageName, 
            imageUrl: user.imageUrl, 
            friendId
        });
    };

    const sendRemoveFriendToSocket: Function = (friendId: string): void => {
        if (!socket.current)
        {
            return;
        }

        socket.current.emit('removeFriend', {
            id: user._id, 
            friendId
        });

        if (selectedFriend._id === friendId)
        {
            dispatch(removeIsOpen());
            dispatch(removeSelectedFriend());
        }
    };

    const sendRemoveUserChatToSocket: Function = (userId: string): void => {
        if (!socket.current)
        {
            return;
        }

        socket.current.emit('removeUserChat', {
            id: user._id, 
            userId
        });
    };

    useEffect( () => {
        socket.current = io('https://socialmedia-server-qq3r.onrender.com');
        socket.current.emit('newUser', user._id);

        socket.current.on('receiveMessage', ( {chatId, senderId, message} ): void => {                   
            dispatch(addChat({
                chatId,
                friendId: senderId, 
                message, 
                senderId
            }));
        });

        socket.current.on('receiveAddFriend', ({
            id, 
            name, 
            email,
            location, 
            occupation, 
            imageName, 
            imageUrl
        }: {
            id: string, 
            name: string, 
            email: string, 
            location: string, 
            occupation: string, 
            imageName: string, 
            imageUrl: string
        }): void => {
            dispatch(addFriend({
                _id: id, 
                name, 
                email, 
                location, 
                occupation, 
                imageName, 
                imageUrl
            }));

            dispatch(addChatFriend({
                _id: id, 
                name, 
                imageName, 
                imageUrl
            }));
        });

        socket.current.on('receiveRemoveFriend', (id: string): void => {
            dispatch(removeFriend(id));
            dispatch(removeChatFriend(id));
            dispatch(removeIsOpen());
            dispatch(removeSelectedFriend());
        });

        socket.current.on('receiveRemoveUserChat', (id: string): void => {
            dispatch(removeUserChat(id));
            dispatch(removeIsOpen());
            dispatch(removeSelectedFriend());
        });

        return () => {
            if (socket.current)
            {
                socket.current.disconnect();
            }
        };
    }, []);

    return (
        <div>
            <Routes>
                <Route 
                    path='/home'
                    element={
                        <PrivateRoutes2>
                            <Home />
                        </PrivateRoutes2>
                    }
                />

                <Route 
                    path='/search'
                    element={
                        <PrivateRoutes2>
                            <Search />
                        </PrivateRoutes2>
                    }
                />

                <Route 
                    path='/chat'
                    element={
                        <PrivateRoutes2>
                            <Chat 
                                sendMessageToSocket={sendMessageToSocket}
                                sendRemoveUserChatToSocket={sendRemoveUserChatToSocket}
                            />
                        </PrivateRoutes2>
                    }
                />

                <Route 
                    path='/user'
                    element={
                        <PrivateRoutes2>
                            <User 
                                sendAddFriendToSocket={sendAddFriendToSocket}
                                sendRemoveFriendToSocket={sendRemoveFriendToSocket}
                            />
                        </PrivateRoutes2>
                    }
                />

                <Route 
                    path='/profile'
                    element={
                        <PrivateRoutes2>
                            <Profile 
                                sendRemoveFriendToSocket={sendRemoveFriendToSocket}
                            />
                        </PrivateRoutes2>
                    }
                />

                <Route 
                    path='*'
                    element={
                        <NotFound />
                    }
                />
            </Routes>
        </div>
    );
};

export default Wrapper;