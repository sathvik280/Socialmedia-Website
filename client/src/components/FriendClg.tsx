import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IoMdClose } from 'react-icons/io';

import { setSelectedFriend } from '../features/slice/windowSlice';

import { ChatFriendProps, Store, ChatFriend, User, PromptObj } from '../types/interface';

const FriendClg: React.FC<ChatFriendProps> = (props): JSX.Element => {
    const { chatFriend, setPromptObj }: {
        chatFriend: ChatFriend, 
        setPromptObj: React.Dispatch<React.SetStateAction<PromptObj>>
    } = props;

    const { selectedFriend }: {
        selectedFriend: ChatFriend 
    } = useSelector( (store: Store) => store.window);

    const { friends }: {
        friends: Array<User>
    } = useSelector( (store: Store) => store.friend);

    const dispatch = useDispatch();

    const isFriend: Function = (id: string): boolean => {
        return !!friends.find( (eachFriend: User): boolean => {
            return eachFriend._id === id;
        });
    };

    return (
        <div 
            className={`w-full max-w-[350px] mx-auto flex flex-row items-center justify-between px-3 py-[10px] rounded-md border border-gray-300 cursor-pointer ${selectedFriend._id === chatFriend._id ? "bg-[#ecf4fe]" : "bg-white"}`}
            onClick={ () => {
                dispatch(setSelectedFriend(chatFriend));
            }}
        >
            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row gap-x-5 items-center">
                    <img
                        src={chatFriend.imageUrl}
                        alt=""
                        className="w-[60px] h-[60px] object-cover rounded-full bg-[#F6F6F6]" 
                    />

                    <div className="text-[#666666] text-[17px]">
                        {chatFriend.name.split(' ')[0]}
                    </div>
                </div>

                <div 
                    className={`text-lg py-2 px-2 rounded-full text-[#4D4D4D] cursor-pointer self-center ${isFriend(chatFriend._id) ? "hidden" : "flex"} ${selectedFriend._id === chatFriend._id ? "bg-white" : "bg-[#CCF7FE]"}`}
                    onClick={ (event) => {
                        event.stopPropagation();

                        setPromptObj({
                            flag: true, 
                            userId: chatFriend._id, 
                            userName: chatFriend.name
                        });
                    }}
                >
                    <IoMdClose />
                </div>
            </div>
        </div>
    );
};

export default FriendClg;