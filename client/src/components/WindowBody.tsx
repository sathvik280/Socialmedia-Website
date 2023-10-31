import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Store, Chats, ChatFriend, Chat } from '../types/interface';

const WindowBody: React.FC = (): JSX.Element => {
    const windowBodyRef = useRef<HTMLDivElement | null>(null);

    const { chats }: {
        chats: Chats
    } = useSelector( (store: Store) => store.chat);

    const { selectedFriend }: {
        selectedFriend: ChatFriend
    } = useSelector( (store: Store) => store.window);

    const scrollToBottom: Function = (): void => {
        if (windowBodyRef.current) 
        {
          windowBodyRef.current.scrollTop = windowBodyRef.current.scrollHeight;
        }
    };

    useEffect( () => {
        scrollToBottom();
    });

    return (
        <div 
            className="w-full h-full bg-[#ecf4fe] px-4 pt-6 pb-2 overflow-y-auto"
            ref={windowBodyRef}
        >
            <div className="flex flex-col-reverse items-start w-full">
                {
                    chats[selectedFriend._id]
                    &&
                    chats[selectedFriend._id].map( (chat: Chat): JSX.Element => {
                        const {
                            chatId, 
                            flag, 
                            message
                        }: Chat = chat;

                        return (
                            <div 
                                key={chatId}
                                className={`${flag === 0 ? "text-right self-end bg-[#3476f4] text-white": "text-left bg-white"} max-w-[200px] xs:max-w-[250px] my-2 px-2 py-1 rounded-md`}
                            >
                                {message}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default WindowBody;