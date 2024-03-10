import React from 'react';

const Button = ({ children, selectHandler, category }) => {
  return (
    <button
      className='bg-stone-500 text-white px-4 py-2 w-50px hover:bg-stone-300 transition-colors duration-300 ease-in-out rounded '
      onClick={() => selectHandler(category)}
    >
      {children}
    </button>
  );
};

export default Button;
