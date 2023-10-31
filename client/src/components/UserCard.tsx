import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { BiMap, BiBriefcase } from 'react-icons/bi';
import { FaUserPlus, FaUserMinus } from 'react-icons/fa';

import { addFriend, removeFriend } from '../features/slice/friendSlice';
import { addChatFriend, removeChatFriend } from '../features/slice/chatSlice';

import { UserCardProps, User, Post, Store } from '../types/interface';

const UserCard: React.FC<UserCardProps> = (props): JSX.Element => {
    const { 
        userPosts, 
        userFriends, 
        setUserFriends, 
        isUserFriendsFetched, 
        isUserPostsFetched, 
        sendAddFriendToSocket, 
        sendRemoveFriendToSocket 
    }: {
        userPosts: Array<Post>, 
        userFriends: Array<User>, 
        setUserFriends: React.Dispatch<React.SetStateAction<User[]>>
        isUserFriendsFetched: boolean, 
        isUserPostsFetched: boolean, 
        sendAddFriendToSocket: Function, 
        sendRemoveFriendToSocket: Function
    } = props;

    const { 
        state: {
            id,
            name, 
            imageName,
            imageUrl, 
            location, 
            occupation
        } 
    }: {
        state: {
            id: string, 
            name: string, 
            imageName: string,
            imageUrl: string, 
            location: string, 
            occupation: string 
        }
    } = useLocation();

    const { user, token }: {
        user: User,
        token: string
    } = useSelector( (store: Store) => store.auth);

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
                    friendId: id
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
        let newFriends: Array<User>;

        const isAlreadyFriend: boolean = !!friends.find( (friend: User): boolean => {
            return friend._id === id;
        });

        if (isAlreadyFriend)
        {
            addRemoveFriend('https://socialmedia-server-qq3r.onrender.com/user/friend/remove');
            sendRemoveFriendToSocket(id);

            dispatch(removeFriend(id));

            newFriends = [...userFriends].filter( (eachFriend: User): boolean => {
                return eachFriend._id !== user._id;
            });

            if (isChatsFetched)
            {
                dispatch(removeChatFriend(id));
            }
        }

        else 
        {
            addRemoveFriend('https://socialmedia-server-qq3r.onrender.com/user/friend/add');
            sendAddFriendToSocket(id);

            dispatch(addFriend({
                _id: id,
                name, 
                email: '', 
                imageName, 
                imageUrl, 
                location, 
                occupation
            }));

            newFriends = [
                ...userFriends, 
                {...user}
            ];

            if (isChatsFetched)
            {
                dispatch(addChatFriend({
                    _id: id,
                    name, 
                    imageName, 
                    imageUrl
                }));
            }
        }

        setUserFriends(newFriends);
    };

    return (
        <div 
            className="flex flex-col px-4 w-[90%] max-w-[550px] mx-auto rounded-lg bg-white py-4"
            style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
        >
            <div className="flex flex-col gap-y-3 items-start xs:flex-row xs:justify-between xs:items-center">
                <div className="flex flex-row items-center gap-x-4">
                    <img
                        src={imageUrl}
                        alt=""
                        className="w-[60px] h-[60px] object-cover rounded-full bg-[#F6F6F6]" 
                    />

                    <div className="text-[#858585] font-semibold text-[18px]">
                        {name.split(' ')[0]}
                    </div>
                </div>

                <div 
                    className={`bg-[#CCF7FE] text-xl px-5 py-2 xs:px-2 rounded-lg xs:rounded-full text-[#4D4D4D] cursor-pointer self-center ${isUserFriendsFetched ? "flex" : "hidden"}`}
                    onClick={updateFriends}
                >
                    {
                        friends.find( (friend: User): boolean => {
                            return friend._id === id 
                        }) 
                        ? 
                        <FaUserMinus /> 
                        :
                        <FaUserPlus />
                    }
                </div>
            </div>

            <div className="w-full h-[2px] rounded-full mt-5 bg-[#F0F0F0]">
            </div>

            <div className="flex flex-col gap-y-[10px] mt-5">
                <div className="flex flex-row items-center gap-x-2 text-[#666666]">
                    <div className="text-[22px]">
                        <BiMap />
                    </div>

                    <div>
                        {location}
                    </div>
                </div>

                <div className="flex flex-row items-center gap-x-2 text-[#666666]">
                    <div className="text-[22px]">
                        <BiBriefcase />
                    </div>

                    <div>
                        {occupation}
                    </div>
                </div>
            </div>

            <div className="w-full h-[2px] rounded-full mt-5 bg-[#F0F0F0]">
            </div>

            <div className="flex flex-col gap-y-[10px] mt-4 text-[#666666]">
                <div className="flex flex-row items-center justify-between">
                    <div>
                        posts uploaded
                    </div>

                    <div>
                        {isUserPostsFetched ? userPosts.length : ''}
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between">
                    <div>
                        total friends
                    </div>

                    <div>
                        {isUserFriendsFetched ? userFriends.length : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;