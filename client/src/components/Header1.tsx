import React from 'react';

const Header1: React.FC = (): JSX.Element => {
    return (
        <div className="fixed top-0 left-0 right-0 flex items-center justify-center bg-white z-10 shadow-md">
            <div className="text-[#00D5FA] text-[25px] py-6 font-semibold cursor-default">
                Instamedia
            </div>
        </div>
    );
};

export default Header1;