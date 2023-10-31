import React from 'react';
import { useSelector } from 'react-redux';

import FriendP from './FriendP';

import { User, Store, ProfileFriendsProps } from '../types/interface';

const ProfileFriends: React.FC<ProfileFriendsProps> = (props): JSX.Element => {
    const {
        sendRemoveFriendToSocket
    }: {
        sendRemoveFriendToSocket: Function 
    } = props;
    
    const { friends }: {
        friends: Array<User>
    } = useSelector( (store: Store) => store.friend);
    
    return (
        <div 
            className="flex flex-col px-4 w-[90%] max-w-[550px] mx-auto rounded-lg bg-white py-4"
            style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
        >
            <div className="text-[#858585] font-semibold text-[20px]">
                Friends 
            </div>

            <div className="flex flex-col gap-y-4 pt-5">
                {
                    friends.map( (friend: User): JSX.Element => {
                        return (
                            <div key={friend._id}>
                                <FriendP 
                                    friend={friend} 
                                    sendRemoveFriendToSocket={sendRemoveFriendToSocket}
                                />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default ProfileFriends;