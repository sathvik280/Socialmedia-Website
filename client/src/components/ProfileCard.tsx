import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { BiMap, BiBriefcase } from 'react-icons/bi';
import { ImSpinner8 } from 'react-icons/im';

import { User, Store, Post } from '../types/interface';

import { removeToken, removeUser } from '../features/slice/authSlice';
import { clearChats, clearChatFriends, removeIsChatsFetched } from '../features/slice/chatSlice';
import { clearFriends, removeIsFriendsFetched } from '../features/slice/friendSlice';
import { clearFeedPosts, removeIsFeedPostsFetched } from '../features/slice/homeSlice';
import { clearProfilePosts, removeIsProfilePostsFetched } from '../features/slice/profileSlice';
import { removeIsOpen, removeSelectedFriend } from '../features/slice/windowSlice';

const ProfileCard: React.FC = (): JSX.Element => {
    const { user }: {
        user: User
    } = useSelector( (store: Store) => store.auth );

    const { profilePosts, isProfilePostsFetched }: {
        profilePosts: Array<Post>, 
        isProfilePostsFetched: boolean
    } = useSelector( (store: Store) => store.profile );

    const { friends, isFriendsFetched }: {
        friends: Array<User>, 
        isFriendsFetched: boolean
    } = useSelector( (store: Store) => store.friend);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutUser: Function = (): void => {
        if (isLoading)
        {
            return;
        }
        
        setIsLoading(true);

        setTimeout( () => {
            setIsLoading(false);

            dispatch(removeToken());
            dispatch(removeUser());

            dispatch(clearChats());
            dispatch(clearChatFriends());
            dispatch(removeIsChatsFetched());

            dispatch(clearFriends());
            dispatch(removeIsFriendsFetched());

            dispatch(clearFeedPosts());
            dispatch(removeIsFeedPostsFetched());

            dispatch(clearProfilePosts());
            dispatch(removeIsProfilePostsFetched());

            dispatch(removeIsOpen());
            dispatch(removeSelectedFriend());

            navigate('/');
        }, 1000);
    };

    return (
        <div 
            className="flex flex-col px-4 w-[90%] max-w-[550px] mx-auto rounded-lg bg-white py-4"
            style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
        >
            <div className="flex flex-row items-center gap-x-4">
                <img
                    src={user.imageUrl}
                    alt=""
                    className="w-[60px] h-[60px] object-cover rounded-full bg-[#F6F6F6]" 
                />

                <div className="text-[#858585] font-semibold text-[18px]">
                    {user.name}
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
                        {user.location}
                    </div>
                </div>

                <div className="flex flex-row items-center gap-x-2 text-[#666666]">
                    <div className="text-[22px]">
                        <BiBriefcase />
                    </div>

                    <div>
                        {user.occupation}
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
                        {isProfilePostsFetched ? profilePosts.length : ''}
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between">
                    <div>
                        total friends
                    </div>

                    <div>
                        {isFriendsFetched ? friends.length : ''}
                    </div>
                </div>
            </div>

            <div className="w-full h-[2px] rounded-full mt-5 bg-[#F0F0F0]">
            </div>

            <button 
                className="mt-4 text-white bg-[#00D5FA] w-[100px] h-[40px] self-center rounded-full flex items-center justify-center"
                onClick={ () => {
                    if (isLoading)
                    {
                        return;
                    }
                    logoutUser();
                }}
            >
                {
                    isLoading ? 
                    <ImSpinner8 className="animate-spin text-xl"/> :
                    "Logout"
                }
            </button>
        </div>
    );
};

export default ProfileCard;