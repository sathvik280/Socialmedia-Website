import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { FaUserMinus, FaUserPlus } from 'react-icons/fa';

import { addFriend, removeFriend } from '../features/slice/friendSlice';
import { addChatFriend, removeChatFriend } from '../features/slice/chatSlice';

import { UserFriendProps, User, Store } from '../types/interface';

const FriendU: React.FC<UserFriendProps> = (props): JSX.Element => {
    const { 
        friend, 
        sendAddFriendToSocket,
        sendRemoveFriendToSocket
    }: {
        friend: User, 
        sendAddFriendToSocket: Function,
        sendRemoveFriendToSocket: Function
    } = props;

    const { user, token }: {
        user: User, 
        token: string
    } = useSelector( (store: Store) => store.auth );

    const { friends }: {
        friends: Array<User>
    } = useSelector( (store: Store) => store.friend);

    const { isChatsFetched }: {
        isChatsFetched: boolean
    } = useSelector( (store: Store) => store.chat);

    const dispatch = useDispatch();

    const addRemoveFriend: Function = async (url: string): Promise<void> => {
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

    const updateFriends = (): void => {
        const isAlreadyFriend: boolean = !!friends.find( (eachFriend: User): boolean => {
            return eachFriend._id === friend._id;
        });

        if (isAlreadyFriend)
        {
            addRemoveFriend('https://socialmedia-server-qq3r.onrender.com/user/friend/remove');
            sendRemoveFriendToSocket(friend._id);

            dispatch(removeFriend(friend._id));

            if (isChatsFetched)
            {
                dispatch(removeChatFriend(friend._id));
            }
        }

        else 
        {
            addRemoveFriend('https://socialmedia-server-qq3r.onrender.com/user/friend/add');
            sendAddFriendToSocket(friend._id);

            dispatch(addFriend(friend));

            if (isChatsFetched)
            {
                dispatch(addChatFriend({
                    _id: friend._id, 
                    name: friend.name, 
                    imageName: friend.imageName, 
                    imageUrl: friend.imageUrl
                }));
            }
        }
    };

    return (
        <div className="flex flex-col gap-y-2 items-start xs:flex-row xs:justify-between xs:items-center">
            <div className="flex flex-row items-center gap-x-4 cursor-default">
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
                className={`bg-[#CCF7FE] text-xl px-5 py-2 xs:px-2 rounded-lg xs:rounded-full text-[#4D4D4D] cursor-pointer self-center ${friend._id === user._id ? "hidden" : "flex"}`}
                onClick={updateFriends}
            >
                {
                    friends.find( (eachFriend: User): boolean => {
                        return eachFriend._id === friend._id 
                    })  
                    ? 
                    <FaUserMinus /> 
                    :
                    <FaUserPlus />
                }
            </div>
        </div>
    );
};

export default FriendU;