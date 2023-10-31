import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone, DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';
import axios, { AxiosResponse } from 'axios';

import { User, Store, Post, ResponseDataPost, CreatePostProps, MessageObj } from '../types/interface';

import { FaImage } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';

import { addFeedPost } from '../features/slice/homeSlice';
import { addProfilePost } from '../features/slice/profileSlice';

const CreatePost: React.FC<CreatePostProps> = (props): JSX.Element => {
    const { setMessageObj }: {
        setMessageObj: React.Dispatch<React.SetStateAction<MessageObj>>
    } = props;

    const dispatch = useDispatch();

    const { user, token }: {
        user: User, 
        token: string
    } = useSelector( (store: Store) => store.auth );

    const { isProfilePostsFetched }: {
        isProfilePostsFetched: boolean
    } = useSelector( (store: Store) => store.profile);

    const [description, setDiscription] = useState<string>('');
    const [pictureName, setPictureName] = useState<string>('Upload image');
    const [descriptionShake, setDescriptionShake] = useState<boolean>(false);
    const [imageShake, setImageShake] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [picture, setPicture] = useState<File | null>();
    const [isPictureUploaded, setIsPictureUploaded] = useState<boolean>(false);

    const onDrop: (acceptedFiles: File[]) => void = useCallback( (acceptedFiles: File[]): void => {
        const image = acceptedFiles[0];

        if (image.size > 4 * 1024 * 1024)
        {
            setMessageObj({
                flag: true, 
                status: 'cancel',
                message: 'Image size should be 4MB or less'
            });
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

    const uploadPost: Function = async (url: string, base64: string): Promise<void> => {
        try 
        {
            const response: AxiosResponse<ResponseDataPost> = await axios.post(url, 
                {
                    userId: user._id,
                    imageName: pictureName,
                    description,
                    imageBase64: base64
                }, 
                {
                    headers: {
                        'authorization': token
                    }
                }
            );
            const data: ResponseDataPost = await response.data;

            const { post }: {
                post: Post
            } = data;
            
            dispatch(addFeedPost(post));

            if (isProfilePostsFetched)
            {
                dispatch(addProfilePost(post));
            }

            setIsLoading(false);

            setMessageObj({
                flag: true, 
                status: 'success', 
                message: 'Post has been uploaded'
            });

            setDiscription('');
            setPictureName('Upload image');
            setIsPictureUploaded(false);
            setPicture(null);
        }

        catch (error: any)
        {
            console.log(error);
            setIsLoading(false);

            setMessageObj({
                flag: true, 
                status: 'cancel',
                message: 'Server error, please try again'
            });
        }
    };

    const handleSubmit = (): void => {
        if (isLoading)
        {
            return;
        }

        if (description === '')
        {
            setDescriptionShake(true);
            setTimeout( () => {
                setDescriptionShake(false);
            }, 500);

            return;
        }

        if (!isPictureUploaded)
        {
            setImageShake(true);
            setTimeout( () => {
                setImageShake(false);
            }, 500);

            return;
        }

        setIsLoading(true);

        const reader: FileReader = new FileReader();
        picture && reader.readAsDataURL(picture);

        reader.onloadend = (): void => {
            const base64: string = reader.result as string;
            uploadPost('https://socialmedia-server-qq3r.onrender.com/post/new', base64);
        };
    };

    return (
        <div 
            className="w-[90%] max-w-[550px] mx-auto px-4 flex flex-col items-center rounded-lg bg-white"
            style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
        >
            <div className="flex flex-row items-center w-full gap-x-4 mt-4">
                <img
                    src={user.imageUrl}
                    alt=""
                    className="hidden xs:flex w-[60px] h-[60px] object-cover rounded-full bg-[#F6F6F6]" 
                />

                <input
                    type="text"
                    value={description}
                    onChange={ (event) => {
                        setDiscription(event.target.value);
                    }}
                    placeholder="What's on your mind"
                    spellCheck={false}
                    className={`flex-1 p-3 bg-[#F6F6F6] rounded-full focus:outline-none placeholder:text-[#858585] text-[#666666] ${descriptionShake ? "animate-shake" : "animate-none"}`}                    
                />
            </div>

            <div className="w-full h-[2px] rounded-full mt-5 bg-[#F0F0F0]">
            </div>

            <div className="w-full flex flex-col gap-y-3 item-start xs:flex-row xs:items-center xs:justify-between mt-[14px] mb-4">
                <div {...getRootProps()} className={`cursor-pointer px-3 py-2 ${imageShake ? "animate-shake" : "animate-none"}`}>
                    <input name="picture" {...getInputProps()} />
                    <div className="flex flex-row items-center gap-x-3">
                        <FaImage className="text-[#858585] text-xl" />

                        <div className="text-[#858585]">
                            {pictureName}
                        </div>
                    </div>
                </div>

                <div className="flex xs:hidden w-full h-[2px] rounded-full mb-1 bg-[#F0F0F0]">
                </div>

                <button 
                    className="text-white bg-[#00D5FA] w-[90px] xs:w-[75px] h-[40px] rounded-full flex items-center justify-center self-center"
                    onClick={handleSubmit}
                >
                    {
                        isLoading ? 
                        <ImSpinner8 className="animate-spin text-xl" /> :
                        "Post"
                    }
                </button>
            </div>
        </div>
    );
};

export default CreatePost;