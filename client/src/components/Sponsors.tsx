import React from 'react';

const sponsor1 = require('../assets/info1.jpeg');
const sponsor2 = require('../assets/info2.jpeg');

const Sponsors: React.FC = (): JSX.Element => {
    return (
        <div className="flex flex-col gap-y-8 items-center w-[90%]">
            <div 
                className="flex flex-col p-5 bg-white rounded-lg"
                style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
            >
                <div className="font-semibold text-[#666666] text-[17px]">
                    Sponsored
                </div>

                <img 
                    src={sponsor1}
                    alt=""
                    className="rounded-lg mt-4 min-h-[194px] bg-[#F6F6F6]"
                />

                <div className="text-[#666666] mt-4">
                    MikaCosmetics
                </div>

                <div className="text-[#858585] mt-2 text-[15px]">
                    Your pathway to stunning beauty and made sure your skin shines like light
                </div>
            </div>

            <div 
                className="flex flex-col p-5 bg-white rounded-lg"
                style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
            >
                <div className="font-semibold text-[#666666] text-[17px]">
                    Sponsored
                </div>

                <img 
                    src={sponsor2}
                    alt=""
                    className="rounded-lg mt-4 min-h-[292px] bg-[#F6F6F6]"
                />

                <div className="text-[#666666] mt-4">
                    MikaCosmetics
                </div>

                <div className="text-[#858585] mt-2 text-[15px]">
                    Your pathway to stunning beauty and made sure your skin shines like light
                </div>
            </div>
        </div>
    );
};

export default Sponsors;