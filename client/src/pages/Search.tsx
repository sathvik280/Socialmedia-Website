import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

import { FaSearch } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';

import FriendS from '../components/FriendS';
import RecommendedFriends from '../components/RecommendedFriends';

import { User, Store, ResponseDataSearch } from '../types/interface';

const Search: React.FC = (): JSX.Element => {
    const [nameInput, setNameInput] = useState<string>('');
    const [inputShake, setInputShake] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<Array<User>>([]);
    const [message, setMessage] = useState<string>('');

    const { token }: {
        token: string
    } = useSelector( (store: Store) => store.auth);

    const searchUsers: Function = async (url: string): Promise<void> => {
        try 
        {
            const response: AxiosResponse<ResponseDataSearch> = await axios.post(url,
                { 
                    searchInput: nameInput.toLowerCase() 
                },
                {
                    headers: {
                        'authorization': token
                    }
                }
            );
            const data: ResponseDataSearch = await response.data;

            const { searchResult }: {
                searchResult: Array<User>
            } = data;

            if (searchResult.length === 0)
            {
                setMessage('No results found');
            }
            
            else 
            {
                setSearchResults(searchResult);
            }   

            setIsLoading(false);
            setNameInput('');
        }

        catch (error)
        {
            setIsLoading(false);
            setMessage('Error, please try again');
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (isLoading)
        {
            return;
        }

        if (nameInput === '')
        {
            setInputShake(true);

            setTimeout( () => {
                setInputShake(false);
            }, 500);

            return;
        }

        setIsLoading(true);
        setMessage('');

        searchUsers('https://socialmedia-server-qq3r.onrender.com/search');
    };

    return (
        <div className="min-h-screen bg-[#F6F6F6]">
            <div className="pt-32 pb-12 flex flex-row gap-x-2 max-w-[1024px] mx-auto">
                <div className="w-full xl:w-[61%]">
                    <div 
                        className="w-[90%] max-w-[550px] mx-auto px-4 flex flex-col items-center rounded-lg bg-white py-10"
                        style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
                    >
                        <form 
                            className={`w-full flex flex-row items-center justify-center ${inputShake ? "animate-shake" : "animate-none"}`}
                            onSubmit={handleSubmit}
                        >
                            <input 
                                type="text"
                                value={nameInput}
                                onChange={ (event) => {
                                    setNameInput(event.target.value);
                                }}
                                spellCheck={false}
                                placeholder="Search for friends"
                                className="w-[80%] p-3 bg-[#F6F6F6] focus:outline-none placeholder:text-[#858585] text-[#666666] rounded-s-lg"
                            />

                            <button className="text-white bg-[#00D5FA] w-[20%] h-[48px] flex items-center justify-center text-lg rounded-e-lg">
                                {
                                    isLoading ? 
                                    <ImSpinner8 className="animate-spin text-[22px]"/> :
                                    <FaSearch />
                                }
                            </button>
                        </form>
                    </div>

                    <div 
                        className={`${message ? "flex" : "hidden"} w-[90%] max-w-[350px] mx-auto mt-10 flex items-center justify-center py-7 bg-white text-[#858585] text-xl rounded-lg`}
                        style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }     
                    >
                        {message}
                    </div>

                    <div className={`${message || isLoading ? "hidden" : "flex"} flex-col gap-y-5 px-4 w-[90%] max-w-[350px] mx-auto mt-10`}>
                        {
                            searchResults.map( (friend: User): JSX.Element => {
                                return (
                                    <div key={friend._id}>
                                        <FriendS friend={friend} />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                <div className="hidden xl:block w-[34%]">
                    <RecommendedFriends />
                </div>
            </div>
        </div>
    );
};

export default Search;