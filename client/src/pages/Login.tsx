import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

import { ResponseDataLogin, User } from '../types/interface';

import { setToken, setUser } from '../features/slice/authSlice';
import { setFriends, setIsFriendsFetched } from '../features/slice/friendSlice';

import { ImSpinner8 } from 'react-icons/im';

const Login: React.FC = (): JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('Enter your email and password');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateEmail: Function = (): boolean => {
        const validRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail.com/;
        return !!email.match(validRegex);
    };

    const authenticateUser: Function = async (url: string): Promise<void> => {
        try 
        {
            const response: AxiosResponse<ResponseDataLogin> = await axios.post(url, {
                email,
                password
            });
            const data: ResponseDataLogin = await response.data;

            const { user, token, friends }: {
                user: User, 
                token: string, 
                friends: Array<User>
            } = data;

            setMessage('Logged in successfully');

            setTimeout( () => {
                dispatch(setUser(user));
                dispatch(setToken(token));
                dispatch(setFriends(friends));
                dispatch(setIsFriendsFetched());

                navigate('/home');
            }, 1500);
        }

        catch (error: any)
        {
            if (error.response === undefined)
            {
                setMessage('Server down, please try again');
                return;
            }

            const errMessage = error.response.data.message;

            if (errMessage.startsWith('Email '))
            {
                setMessage('Email not registered');
                return;
            }

            if (errMessage.startsWith('Wrong '))
            {
                setMessage('Wrong password');
                return;
            }

            setMessage('Error, please try again');
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (message === '' || message === 'Logged in successfully')
        {
            return;
        }

        if (email === '')
        {
            setMessage('Please enter your email');
            return;
        }

        if (!validateEmail())
        {
            setMessage('Invalid email address');
            return;
        }

        if (password === '')
        {
            setMessage('Please enter your password');
            return;
        }

        if (!navigator.onLine)
        {
            setMessage('Network connection lost');
            return;
        }

        setMessage('');
        authenticateUser('https://socialmedia-server-qq3r.onrender.com/auth/login');
    };

    return (
        <div className="w-full min-h-screen bg-[#F6F6F6] relative pb-12 pt-28">            
            <div 
                className="w-[90%] max-w-[500px] mx-auto bg-white rounded-lg flex flex-col items-center py-6"
                style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
            >
                <div className="text-[17px] font-medium text-[#666666]">
                    Login to your account
                </div>

                <form 
                    className="mt-8 w-full flex flex-col gap-y-6 items-center"
                    onSubmit={handleSubmit}
                >
                    <input 
                        type="text"
                        placeholder='Email'
                        value={email}
                        onChange={ (event) => {
                            setEmail(event.target.value.trim())
                        }}
                        spellCheck={false}
                        className="focus:outline-none border-[1px] p-[10px] w-[85%] border-[#C2C2C2] rounded-md text-[#666666]"
                    />

                    <input 
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={ (event) => {
                            setPassword(event.target.value.trim());
                        }}
                        spellCheck={false}
                        className="focus:outline-none border-[1px] px-2 py-[10px] w-[85%] border-[#C2C2C2] rounded-md text-[#666666]"
                    />

                    <button
                        type="submit"
                        className="w-[85%] text-white bg-[#00D5FA] py-3 rounded-md"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-[#00D5FA] underline px-2 text-center">
                    <Link to='/register'>
                        Don't have an account? Sign up here
                    </Link>
                </div>
            </div>

            <div 
                className="w-[90%] max-w-[500px] mx-auto bg-white my-[25px] rounded-lg flex justify-center items-center py-6"
                style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
            >
                <div className="text-[18px] text-[#666666] px-2 text-center">
                    {
                        message === '' ? (
                            <ImSpinner8 className="animate-spin text-[27px] text-[#858585]"/>
                        ) : (
                            message
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;