// components/Layout.js
import React from 'react';
import Button from './Button';

const Layout = ({ children, onOptionSelect }) => {
  const selectHandler = (value) => {
    onOptionSelect(value);
  };

  return (
    <div className='flex h-screen'>
      <div className='w-1/6 bg-gray-800 p-4'>
        <div className='mb-4 grid grid-cols-1 gap-2 w-80px'>
          <Button selectHandler={selectHandler} category="driver">Drivers</Button>
          <Button selectHandler={selectHandler} category="employee">Empleados</Button>
          <Button selectHandler={selectHandler} category="route">Rutas</Button>
        </div>
      </div>
      <div className='w-5/6 flex-1 bg-gray-200'>{children}</div>
    </div>
  );
};

export default Layout;
