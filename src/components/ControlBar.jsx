import { useState } from 'react';
import Button from './Button';
import AddDriverForm from './forms/AddDriverForm';
import AddEmployeeForm from './forms/AddEmployeeForm';
import AddRouteForm from './forms/AddRouteForm';
import AddVanForm from './forms/AddVanForm';

const ControlBar = () => {
  const [action, setAction] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const selectedAction = (act) => {
    setAction(act);
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setErrorMessage('');
  };

  const addToDBHandler = async (value) => {
    try {
      const req = { data: value };
      const res = await fetch(`http://panda-db.us-west-2.elasticbeanstalk.com/api/${action}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage('Failed to add data. Please try again.');
    }
  };

  return (
    <div className='bg-gray-800 p-4 text-white'>
      <div className='flex items-center space-x-4'>
        <Button selectHandler={selectedAction} category={'driver'}>
          Agregar Driver
        </Button>
        <Button selectHandler={selectedAction} category={'employee'}>
          Agregar Empleado
        </Button>
        <Button selectHandler={selectedAction} category={'route'}>
          Agregar Ruta
        </Button>
        <Button selectHandler={selectedAction} category={'van'}>
          Agregar Van
        </Button>
      </div>
      {errorMessage && <div className='text-red-500 mt-2'>{errorMessage}</div>}

      {action === 'driver' && (
        <AddDriverForm
          openModal={showModal}
          closeModal={closeModalHandler}
          addHandler={addToDBHandler}
        />
      )}
      {action === 'employee' && (
        <AddEmployeeForm
          openModal={showModal}
          closeModal={closeModalHandler}
          addHandler={addToDBHandler}
        />
      )}
      {action === 'route' && (
        <AddRouteForm
          openModal={showModal}
          closeModal={closeModalHandler}
          addHandler={addToDBHandler}
        />
      )}
      {action === 'van' && (
        <AddVanForm
          openModal={showModal}
          closeModal={closeModalHandler}
          addHandler={addToDBHandler}
        />
      )}
    </div>
  );
};

export default ControlBar;
