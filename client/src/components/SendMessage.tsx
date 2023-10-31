import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { MdSend } from 'react-icons/md';

import { addChat } from '../features/slice/chatSlice';

import { SendMessageProps, Store, User, ChatFriend } from '../types/interface';

const SendMessage: React.FC<SendMessageProps> = (props): JSX.Element => {
    const { sendMessageToSocket }: {
        sendMessageToSocket: Function
    } = props;

    const [message, setMessage] = useState<string>('');

    const dispatch = useDispatch();

    const { user, token }: {
        user: User, 
        token: string 
    } = useSelector( (store: Store) => store.auth);

    const { selectedFriend }: {
        selectedFriend: ChatFriend
    } = useSelector( (store: Store) => store.window);

    const generateChatId: Function = (): string => {
        const date = new Date();
      
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = String(date.getSeconds()).padStart(2, '0');
      
        return `${user._id}${selectedFriend._id}${year}${month}${day}${hour}${minute}${second}`;
    };

    const sendMessageToDb: Function = async (url: string, chatId: string, msg: string): Promise<void> => {
        try 
        {
            await axios.post(url, 
                {
                    chatId,
                    senderId: user._id, 
                    receiverId: selectedFriend._id, 
                    message: msg
                }, 
                {
                    headers: {
                        'authorization': token
                    }
                }
            );
        }

        catch (error)
        {
            console.log(error);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (message === '')
        {
            return;
        }

        const chatId: string = generateChatId();

        dispatch(addChat({
            chatId,
            friendId: selectedFriend._id, 
            message, 
            senderId: user._id 
        }));

        sendMessageToSocket(message, chatId);
        sendMessageToDb('https://socialmedia-server-qq3r.onrender.com/chat/new', chatId, message);

        setMessage('');
    };

    return (
        <div className="w-full py-6 px-4 xs:px-6 md:px-8 lg:px-10 bg-[#ecf4fe]">
            <form
                className="flex flex-row items-center gap-x-4"
                onSubmit={handleSubmit}
            >
                <input 
                    type="text"
                    spellCheck={false}
                    placeholder="Type your message"
                    value={message}
                    onChange={ (event) => {
                        setMessage(event.target.value);
                    }}
                    className="focus:outline-none border border-[#C2C2C2] px-2 py-[11px] w-[80%] xs:w-auto xs:flex-1 rounded-sm text-[#666666]"
                />

                <button
                    type="submit"
                    className="p-[10px] bg-[#3476f4] rounded-sm"
                >
                    <MdSend color='white' size={26}/>
                </button>
            </form>
        </div>
    );
};

export default SendMessage;