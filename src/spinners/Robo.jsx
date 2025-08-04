import React from 'react';
import Lottie from 'lottie-react';
import robo from '../assets/animations/robo.json';

const Robo = () => {
   return ( 
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md animate-fadeIn">
            <div className="w-64 h-64 rounded-full  p-2 animate-pulse ">
                <Lottie animationData={robo} loop={true} />
            </div>
            <div className=" text-white text-xl font-bold text-center font-mono tracking-wide drop-shadow-md">
                Please wait for a moment, user 🐼
            </div>
        </div>
    );
};

export default Robo;
