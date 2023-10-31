import React from 'react';

import { ProfileProps } from '../types/interface';

import ProfileCard from '../components/ProfileCard';
import ProfileFriends from '../components/ProfileFriends';
import ProfilePosts from '../components/ProfilePosts';

const Profile: React.FC<ProfileProps> = (props): JSX.Element => {
    const {
        sendRemoveFriendToSocket
    }: {
        sendRemoveFriendToSocket: Function 
    } = props;

    return (
        <div className="min-h-screen bg-[#F6F6F6]">
            <div className="flex flex-col gap-y-10 px-5 xl:flex-row justify-center mx-auto pt-32 pb-12 max-w-[1024px]">
                <div className="flex flex-col w-full xl:w-[40%] gap-y-8">
                    <ProfileCard />
                    <ProfileFriends sendRemoveFriendToSocket={sendRemoveFriendToSocket}/>
                </div>

                <div className="flex-1">
                    <ProfilePosts />
                </div>
            </div>
        </div>
    );
};

export default Profile;