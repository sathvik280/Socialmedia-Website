import React, { useState } from 'react';

import CreatePost from '../components/CreatePost';
import FeedPosts from '../components/FeedPosts';
import Sponsors from '../components/Sponsors';
import UploadStatus from '../components/UploadStatus';

import { MessageObj } from '../types/interface';

const Home: React.FC = (): JSX.Element => {
    const [messageObj, setMessageObj] = useState<MessageObj>({
        flag: false, 
        status: '', 
        message: ''
    });

    return (
        <div className="bg-[#F6F6F6] min-h-screen">
            <div className={`fixed h-screen bg-black/90 top-0 w-full z-50 items-center justify-center ${messageObj.flag ? "flex" : "hidden"}`}>
                <UploadStatus 
                    messageObj={messageObj}
                    setMessageObj={setMessageObj}
                />
            </div>

            <div className="flex flex-row justify-center max-w-[1024px] mx-auto pt-32 pb-12">
                <div className="flex flex-col gap-y-10 flex-1">
                    <CreatePost 
                        setMessageObj={setMessageObj}
                    />
                    <FeedPosts />
                </div>

                <div className="hidden xl:flex w-[36%]">
                    <Sponsors />
                </div>
            </div>
        </div>
    );
};

export default Home;