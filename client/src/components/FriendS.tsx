import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FriendProps, User, Store } from '../types/interface';

const FriendS: React.FC<FriendProps> = (props): JSX.Element => {
    const { friend }: {
        friend: User
    } = props;

    const { user }: {
        user: User
    } = useSelector( (store: Store) => store.auth);

    const navigate = useNavigate();

    return (
        <div 
            className="flex flex-col gap-y-4 items-start xs:flex-row xs:items-center xs:justify-between bg-white px-3 py-[10px] rounded-md"
            style={ {boxShadow: "0px 0px 6px 0px lightgrey"} }
        >
            <div className="flex flex-row gap-x-5 items-center cursor-default">
                <img
                    src={friend.imageUrl}
                    alt=""
                    className="w-[60px] h-[60px] object-cover rounded-full bg-[#F6F6F6]" 
                />

                <div>
                    <div className="text-[#666666] text-[17px]">
                        {friend.name.split(' ')[0]}
                    </div>

                    <div className="text-[#666666] text-[14px]">
                        {friend.location}
                    </div>
                </div>
            </div>

            <button
                className="cursor-pointer text-white bg-[#00D5FA] rounded-lg flex items-center justify-center py-2 px-4 xs:px-3 self-center"
                onClick={ () => {
                    if (friend._id === user._id)
                    {
                        navigate('/profile');
                        return;
                    }

                    navigate(`/user`,{
                        state: {
                            id: friend._id,
                            name: friend.name,
                            location: friend.location,
                            imageName: friend.imageName,
                            imageUrl: friend.imageUrl,
                            occupation: friend.occupation 
                        }
                    });
                }}
            >
                View
            </button>
        </div>
    );
};

export default FriendS;