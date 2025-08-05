import React from 'react';
import Lottie from 'lottie-react';
import cuteCat from '../assets/animations/cute cat.json'; // no space!

const Cat = () => {
  return (
    <div className="max-w-28 border rounded-full">
      <Lottie animationData={cuteCat} loop={true} />
    </div>
  );
};

export default Cat;
