import React, { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import UserCard from '../components/UserCard';
import UserPosts from '../components/UserPosts';
import UserFriends from '../components/UserFriends';

import { Post, User as UserIntf, UserProps } from '../types/interface';

const User: React.FC<UserProps> = (props): JSX.Element => {
    const {
        sendAddFriendToSocket, 
        sendRemoveFriendToSocket
    }: {
        sendAddFriendToSocket: Function,
        sendRemoveFriendToSocket: Function
    } = props;

    const [userPosts, setUserPosts] = useState<Array<Post>>([]);
    const [userFriends, setUserFriends] = useState<Array<UserIntf>>([]);
    const [isUserFriendsFetched, setIsUserFriendsFetched] = useState<boolean>(false);
    const [isUserPostsFetched, setIsUserPostsFetched] = useState<boolean>(false);

    const { state } = useLocation();

    if (!state)
    {
        return <Navigate to='/home' />;
    }

    return (
        <div className="min-h-screen bg-[#F6F6F6]">
            <div className="flex flex-col gap-y-10 px-5 xl:flex-row justify-center mx-auto pt-32 pb-12 max-w-[1024px]">
                <div className="flex flex-col w-full xl:w-[40%] gap-y-8">
                    <UserCard 
                        userPosts={userPosts} 
                        userFriends={userFriends} 
                        setUserFriends={setUserFriends} 
                        isUserFriendsFetched={isUserFriendsFetched} 
                        isUserPostsFetched={isUserPostsFetched} 
                        sendAddFriendToSocket={sendAddFriendToSocket}
                        sendRemoveFriendToSocket={sendRemoveFriendToSocket}
                    />

                    <UserFriends 
                        userFriends={userFriends} 
                        setUserFriends={setUserFriends} 
                        isUserFriendsFetched={isUserFriendsFetched} 
                        setIsUserFriendsFetched={setIsUserFriendsFetched}
                        sendAddFriendToSocket={sendAddFriendToSocket}
                        sendRemoveFriendToSocket={sendRemoveFriendToSocket} 
                    />
                </div>

                <div className="flex-1">
                    <UserPosts 
                        userPosts={userPosts} 
                        setUserPosts={setUserPosts} 
                        isUserPostsFetched={isUserPostsFetched} 
                        setIsUserPostsFetched={setIsUserPostsFetched} 
                    />
                </div>
            </div>
        </div>
    );
};

export default User;