import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDropzone, DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';
import axios from 'axios';

import { ImSpinner8, ImPencil } from 'react-icons/im';

const Register: React.FC = (): JSX.Element => {
    const [name, setName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [occupation, setOccupation] = useState<string>('');
    const [pictureName, setPictureName] = useState<string>('Upload profile picture (jpg, png, jpeg)');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('Enter your details');
    const [picture, setPicture] = useState<File>();
    const [isPictureUploaded, setIsPictureUploaded] = useState<boolean>(false);

    const navigate = useNavigate();

    const onDrop: (acceptedFiles: File[]) => void = useCallback( (acceptedFiles: File[]): void => {
        const image = acceptedFiles[0];

        if (image.size > 4 * 1024 * 1024)
        {
            setMessage('Image size should be 4MB or less');
        }

        else
        {
            setPictureName(image.name);
            setPicture(image);

            if (!isPictureUploaded)
            {
                setIsPictureUploaded(true);
            }
        }
    }, []);
    
    const {getRootProps, getInputProps}: {
        getRootProps: () => DropzoneRootProps, 
        getInputProps: () => DropzoneInputProps
    } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg']
        }
    });

    const validateEmail: Function = (): boolean => {
        const validRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail.com/;
        return !!email.match(validRegex);
    };

    const strongPassword: Function = (): boolean => {
        return password.length >= 5;
    };

    const registerUser: Function = async (url: string, base64: string): Promise<void> => {
        try 
        {
            await axios.post(url, {
                name,
                location,
                occupation,
                imageName: pictureName,
                email,
                password,
                imageBase64: base64 
            });

            setMessage('Registered successfully');
            setTimeout( () => {
                navigate('/');
            }, 1500);
        }

        catch (error: any)
        {
            if (error.response === undefined)
            {
                setMessage('Server down, please try again');
                return;
            }

            const errMessage: string = error.response.data.message;

            if (errMessage.startsWith('E11000'))
            {
                setMessage('Email already registered');
                return;
            }

            setMessage('Error, please try again');
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (message === '' || message === 'Registered successfully')
        {
            return;
        }

        if (name === '')
        {
            setMessage('Please enter your name');
            return;
        }

        if (location === '')
        {
            setMessage('Please enter your location');
            return;
        }

        if (occupation === '')
        {
            setMessage('Please enter your occupation');
            return;
        }

        if (!isPictureUploaded)
        {
            setMessage('Upload your profile picture');
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

        if (!strongPassword())
        {
            setMessage('Choose strong password');
            return;
        }

        if (!navigator.onLine)
        {
            setMessage('Network connection lost');
            return;
        }

        setMessage('');

        const reader: FileReader = new FileReader();
        picture && reader.readAsDataURL(picture);

        reader.onloadend = (): void => {
            const base64: string = reader.result as string;
            registerUser('https://socialmedia-server-qq3r.onrender.com/auth/register', base64);
        };
    };

    return (
        <div className="w-full min-h-screen bg-[#F6F6F6] relative pb-12 pt-28">
            <div 
                className="w-[90%] max-w-[500px] mx-auto bg-white rounded-lg flex flex-col items-center py-6"
                style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
            >
                <div className="text-[17px] font-medium text-[#666666]">
                    Register your account
                </div>

                <form 
                    onSubmit={handleSubmit}
                    className="mt-8 w-full flex flex-col gap-y-6 items-center"
                >
                    <input 
                        type="text"
                        placeholder='Name'
                        value={name}
                        onChange={ (event) => {
                            setName(event.target.value)
                        }}
                        spellCheck={false}
                        className="focus:outline-none border-[1px] p-[10px] w-[85%] border-[#C2C2C2] rounded-md text-[#666666]"
                    />

                    <input 
                        type="text"
                        placeholder='Location'
                        value={location}
                        onChange={ (event) => {
                            setLocation(event.target.value)
                        }}
                        spellCheck={false}
                        className="focus:outline-none border-[1px] p-[10px] w-[85%] border-[#C2C2C2] rounded-md text-[#666666]"
                    />

                    <input 
                        type="text"
                        placeholder='Occupation'
                        value={occupation}
                        onChange={ (event) => {
                            setOccupation(event.target.value)
                        }}
                        spellCheck={false}
                        className="focus:outline-none border-[1px] p-[10px] w-[85%] border-[#C2C2C2] rounded-md text-[#666666]"
                    />

                    <div {...getRootProps()} className="focus:outline-none border-[1px] p-[10px] w-[85%] border-[#C2C2C2] rounded-md cursor-pointer flex flex-row justify-between items-center">
                        <input name="picture" {...getInputProps()} />
                        <div className={`${pictureName.startsWith('Upload') ? "text-[#A3A3A3]" : "text-[#666666]"} cursor-pointer`}>
                            {pictureName}
                        </div>

                        <div className={`pr-2 text-[#666666] ${pictureName.startsWith('Upload') ? "hidden" : "flex"}`}>
                            <ImPencil />
                        </div>
                    </div>

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
                        Register
                    </button>
                </form>

                <div className="mt-6 text-[#00D5FA] underline px-2 text-center">
                    <Link to='/'>
                        Already have an account? Login here
                    </Link>
                </div>
            </div>

            <div 
                className="w-[90%] max-w-[500px] mx-auto bg-white mt-[25px] rounded-lg flex justify-center items-center py-6"
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

export default Register;