import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IoMdClose } from 'react-icons/io';

import { setIsOpen, setSelectedFriend } from '../features/slice/windowSlice';

import { ChatFriend, ChatFriendProps, User, Store, PromptObj } from '../types/interface';

const FriendCsm: React.FC<ChatFriendProps> = (props): JSX.Element => {
    const { chatFriend, setPromptObj }: {
        chatFriend: ChatFriend, 
        setPromptObj: React.Dispatch<React.SetStateAction<PromptObj>>
    } = props;

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
            className="w-full max-w-[350px] mx-auto flex flex-row items-center justify-between px-3 py-[10px] rounded-md border border-gray-300 cursor-pointer"
            onClick={ () => {
                dispatch(setSelectedFriend(chatFriend));
                dispatch(setIsOpen());
            }}
        >
            <div className="flex flex-col gap-y-2 items-start xs:flex-row xs:justify-between xs:items-center w-full">
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
                    className={`bg-[#CCF7FE] text-lg px-5 py-2 xs:px-2 rounded-lg xs:rounded-full text-[#4D4D4D] cursor-pointer self-center ${isFriend(chatFriend._id) ? "hidden" : "flex"}`}
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

export default FriendCsm;