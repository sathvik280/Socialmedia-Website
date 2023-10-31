import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = (): JSX.Element => {
    return (
        <div className="w-full min-h-screen bg-[#F6F6F6] relative pt-28 pb-12">
            <div 
                className="w-[90%] max-w-[500px] mx-auto bg-white rounded-lg flex flex-col items-center py-6 px-4"
                style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
            >
                <div className="text-[22px] text-[#666666] text-center">
                    Sorry, this page isn't available
                </div>

                <div className="text-center mt-4 text-lg text-[#666666]">
                    The link you followed may be broken, or the page may have been removed
                </div>

                <Link 
                    to='/home'
                    className="text-[#00D5FA] underline mt-4 text-center"
                >
                    Go back to Instamedia
                </Link>
            </div>
        </div>
    );
};

export default NotFound;