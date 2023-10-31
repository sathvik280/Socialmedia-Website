import React from 'react';

import { MdCheckCircle } from 'react-icons/md';
import { FaTimesCircle } from 'react-icons/fa';

import { UploadStatusProps, MessageObj } from '../types/interface';

const UploadStatus: React.FC<UploadStatusProps> = (props): JSX.Element => {
    const { messageObj, setMessageObj }: {
        messageObj: MessageObj, 
        setMessageObj: React.Dispatch<React.SetStateAction<MessageObj>>
    } = props;

    return (
        <div className="w-[90%] max-w-[600px] mx-auto bg-white mt-[25px] rounded-xl flex flex-col items-center py-8 px-4">
            <div className="text-xl xs:text-2xl text-gray-600 text-center">
                {messageObj.message}
            </div>

            <div className="mt-5">
                {
                    messageObj.status === 'success'
                    ?
                    <MdCheckCircle size={50} />
                    :
                    <FaTimesCircle size={46} />
                }
            </div>

            <button 
                className="text-gray-600 underline mt-5 text-center text-lg"
                onClick={ () => {
                    setMessageObj({
                        flag: false, 
                        status: '', 
                        message: ''
                    });
                }}
            >
                Close
            </button>
        </div>
    );
};

export default UploadStatus;