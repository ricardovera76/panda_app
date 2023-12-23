import { useState } from 'react';
import DriverList from './lists/DriverList';
import EmployeeList from './lists/EmployeeList';
import Modal from './Modal';
import RouteList from './lists/RouteList';

const Table = ({ data, category }) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [errorMessage, setErrorMessage] = useState('');
  const selectedRow = (item) => {
    setSelectedItem(() => item);
    setShowModal(true);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  }

  const updateHandler = async (data) => {
    try {
      const res = await fetch(`http://panda-db.us-west-2.elasticbeanstalk.com/api/${category}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage('Failed to update data. Please try again.');
    }
  }

  const deleteHandler = async (id) => {
    try {
      const res = await fetch(`http://panda-db.us-west-2.elasticbeanstalk.com/api/${category}/?${category}_id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage('Failed to delete data. Please try again.');
    }
  }

  return (
    <div className='flex-1 overflow-x-auto overflow-y-scroll'>
      <table className='min-w-full bg-white border border-gray-300'>
        {category === 'driver' ? <DriverList data={data} rowHandler={selectedRow}/> : category === 'employee' ? <EmployeeList data={data} rowHandler={selectedRow}/> : <RouteList data={data} rowHandler={selectedRow}/>}
      </table>
      <Modal category={category} data={selectedItem} onDelete={deleteHandler} onUpdate={updateHandler} closeModal={closeModalHandler} openModal={showModal}/>
      {errorMessage && <div className='text-red-500 mt-2'>{errorMessage}</div>}
    </div>
  );
};

export default Table;
