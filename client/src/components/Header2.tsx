import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaSearch } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import { RiHome4Fill, RiMenuFill, RiCloseFill } from 'react-icons/ri';

const Header2: React.FC = (): JSX.Element => {
    let [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <div className="fixed top-0 left-0 right-0 z-20 shadow-md bg-white">
            <div className="max-w-[1024px] mx-auto">
                <div className="px-6 md:px-10 lg:px-12 xl:px-12 flex flex-row items-center justify-between relative w-full">
                    <div 
                        className="text-[#00D5FA] text-[25px] py-6 font-semibold cursor-pointer"
                        onClick={ () => {
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            })
                        }}
                    >
                        Instamedia
                    </div>

                    <div className="flex flex-row items-center gap-x-8 md:gap-x-10">
                        <div 
                            className="cursor-pointer flex md:hidden text-2xl text-black"
                            onClick={ () => {
                                setIsOpen(!isOpen);
                            }}
                        >
                            {
                                isOpen ?                         
                                <RiCloseFill /> :
                                <RiMenuFill />
                            }
                        </div>

                        <div className={`fixed md:hidden flex flex-col items-center gap-y-8 px-6 py-4 transition-all duration-300 top-[84px] shadow-md z-20 bg-white ${isOpen ? "right-0" : "-right-[75px]"}`}>
                            <div
                                className="cursor-pointer"
                                onClick={ () => {
                                    setIsOpen(false);
                                    navigate('/home');
                                }}
                            >
                                <RiHome4Fill className="text-[25px] text-black"/>
                            </div>

                            <div
                                className="cursor-pointer"
                                onClick={ () => {
                                    setIsOpen(false);
                                    navigate('/search');
                                }}
                            >
                                <FaSearch className="text-[22px] text-black"/>
                            </div>

                            <div
                                className="cursor-pointer"
                                onClick={ () => {
                                    setIsOpen(false);
                                    navigate('/chat');
                                }}
                            >
                                <MdMessage className="text-[25px] text-black"/>
                            </div>

                            <div
                                className="cursor-pointer"
                                onClick={ () => {
                                    setIsOpen(false);
                                    navigate('/profile');
                                }}
                            >
                                <FaUser className="text-[22px] text-black"/>
                            </div>
                        </div>

                        <div className="flex-row gap-x-12 hidden md:flex">
                            <div
                                className="cursor-pointer"
                                onClick={ () => {
                                    navigate('/home');
                                }}
                            >
                                <RiHome4Fill className="text-[25px] text-black"/>
                            </div>

                            <div
                                className="cursor-pointer"
                                onClick={ () => {
                                    navigate('/search');
                                }}
                            >
                                <FaSearch className="text-[22px] text-black"/>
                            </div>

                            <div
                                className="cursor-pointer"
                                onClick={ () => {
                                    navigate('/chat');
                                }}
                            >
                                <MdMessage className="text-[25px] text-black"/>
                            </div>

                            <div
                                className="cursor-pointer"
                                onClick={ () => {
                                    navigate('/profile');
                                }}
                            >
                                <FaUser className="text-[22px] text-black"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header2;