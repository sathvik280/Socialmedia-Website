import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IoMdClose } from 'react-icons/io';

import { removeIsOpen, removeSelectedFriend } from '../features/slice/windowSlice';

import { Store, ChatFriend } from '../types/interface';

const WindowHead: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();

    const { selectedFriend }: {
        selectedFriend: ChatFriend
    } = useSelector( (store: Store) => store.window);

    return (
        <div className="w-full py-5 px-4 xs:px-6 md:px-8 lg:px-10 shadow-md bg-white">
            <div className="flex gap-y-2 flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-x-4 cursor-default">
                    <img
                        src={selectedFriend.imageUrl}
                        alt=""
                        className="w-[60px] h-[60px] object-cover rounded-full bg-[#F6F6F6]" 
                    />

                    <div className="text-[#666666] text-[16px]">
                        {selectedFriend.name}
                    </div>
                </div>

                <div 
                    className="bg-[#CCF7FE] p-2 rounded-full text-xl text-[#4D4D4D] cursor-pointer"
                    onClick={ () => {
                        dispatch(removeIsOpen());
                        dispatch(removeSelectedFriend());
                    }}
                >
                    <IoMdClose />
                </div>
            </div>
        </div>
    );
};

export default WindowHead;