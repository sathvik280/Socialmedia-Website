import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { IoMdClose } from 'react-icons/io';

import { removeFriend } from '../features/slice/friendSlice';
import { removeChatFriend } from '../features/slice/chatSlice';

import { ProfileFriendProps, User, Store } from '../types/interface';

const FriendP: React.FC<ProfileFriendProps> = (props): JSX.Element => {
    const { friend, sendRemoveFriendToSocket }: {
        friend: User, 
        sendRemoveFriendToSocket: Function
    } = props;

    const { user, token }: {
        user: User, 
        token: string
    } = useSelector( (store: Store) => store.auth);

    const { isChatsFetched }: {
        isChatsFetched: boolean
    } = useSelector( (store: Store) => store.chat);

    const dispatch = useDispatch();

    const removeFriendDb: Function = async (url: string): Promise<void> => {
        try 
        {
            await axios.patch(url, 
                {
                    id: user._id, 
                    friendId: friend._id
                }, 
                {
                    headers: {
                        'authorization': token
                    }
                }
            );
        }

        catch (error: any)
        {
            console.log(error);

            if (error.response === undefined)
            {
                console.log('Server down, please try again');
                return;
            }

            console.log('Server error, please try again');
        }
    };

    const unFriend = (): void => {
        removeFriendDb(`https://socialmedia-server-qq3r.onrender.com/user/friend/remove`);

        dispatch(removeFriend(friend._id));
        sendRemoveFriendToSocket(friend._id);

        if (isChatsFetched)
        {
            dispatch(removeChatFriend(friend._id));
        }
    };

    return (
        <div className="flex flex-col gap-y-2 items-start xs:flex-row xs:justify-between xs:items-center">
            <div 
                className="flex flex-row items-center gap-x-4 cursor-default"
            >
                <img
                    src={friend.imageUrl}
                    alt=""
                    className="w-[60px] h-[60px] object-cover rounded-full bg-[#F6F6F6]" 
                />

                <div className="text-[#666666] text-[16px]">
                    {friend.name.split(' ')[0]}
                </div>
            </div>

            <div 
                className={`bg-[#CCF7FE] text-lg px-5 py-2 xs:px-2 rounded-lg xs:rounded-full text-[#4D4D4D] cursor-pointer self-center ${friend._id === user._id ? "hidden" : "flex"}`}
                onClick={unFriend}
            >
                <IoMdClose />
            </div>
        </div>
    );
};

export default FriendP;