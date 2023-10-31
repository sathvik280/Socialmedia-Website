import React, { useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { removeSelectedFriend, removeIsOpen } from '../features/slice/windowSlice';
import { removeUserChat } from '../features/slice/chatSlice';

import { PromptObj, PromptDeleteChatProps, Store, ChatFriend, User } from '../types/interface';

const PromptDeleteChat: React.FC<PromptDeleteChatProps> = (props): JSX.Element => {
    const { promptObj, setPromptObj, sendRemoveUserChatToSocket }: {
        promptObj: PromptObj, 
        setPromptObj: React.Dispatch<React.SetStateAction<PromptObj>>,
        sendRemoveUserChatToSocket: Function
    } = props;

    const { user, token }: {
        user: User, 
        token: string
    } = useSelector( (store: Store) => store.auth);

    const { selectedFriend }: {
        selectedFriend: ChatFriend
    } = useSelector( (store: Store) => store.window);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const deleteUserChats: Function = async (url: string): Promise<void> => {
        try 
        {
            await axios.delete(url, {
                headers: {
                    'authorization': token
                } 
            });

            dispatch(removeUserChat(promptObj.userId));
            sendRemoveUserChatToSocket(promptObj.userId);

            if (promptObj.userId === selectedFriend._id)
            {
                dispatch(removeIsOpen());
                dispatch(removeSelectedFriend());
            }

            setIsLoading(false);
            setPromptObj({
                flag: false, 
                userId: '', 
                userName: ''
            });
        }

        catch (error: any)
        {
            console.log(error);
            setIsLoading(false);
        }
    };

    const handleClick = (): void => {
        setIsLoading(true);
        deleteUserChats(`https://socialmedia-server-qq3r.onrender.com/chat/delete/${user._id}/${promptObj.userId}`);
    };

    return (
        <div className="w-[90%] max-w-[600px] mx-auto bg-white mt-[25px] rounded-xl flex flex-col items-center py-8 px-4">
            <div className="text-xl xs:text-2xl text-gray-600 text-center">
                Are you sure 
            </div>

            <div className="text-md xs:text-lg text-gray-600 text-center mt-3">
                Do you want to permanently delete chats with {promptObj.userName}
            </div>

            {
                isLoading 
                ?
                <div className="text-gray-600 mt-7 text-center text-lg">
                    Please wait...
                </div>
                :
                <div className="flex flex-row gap-x-8 mt-7">
                    <button 
                        className="text-gray-600 underline text-center text-lg"
                        onClick={handleClick}
                    >
                        Yes
                    </button>

                    <button 
                        className="text-gray-600 underline text-center text-lg"
                        onClick={ () => {
                            setPromptObj({
                                flag: false, 
                                userId: '', 
                                userName: ''
                            });
                        }}
                    >
                        No
                    </button>
                </div>
            }
        </div>
    );
};

export default PromptDeleteChat;