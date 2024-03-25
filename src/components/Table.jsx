import { useEffect, useRef, useState } from 'react';
import DriverList from './lists/DriverList';
import EmployeeList from './lists/EmployeeList';
import Modal from './Modal';
import RouteList from './lists/RouteList';
import Button from './Button';

const Table = ({ data, category }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const filterInputRef = useRef(null);
  const filterSelectRef = useRef(null);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const selectedRow = (item) => {
    setSelectedItem(() => item);
    setShowModal(true);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };

  const updateHandler = async (data) => {
    try {
      const res = await fetch(
        `https://panda-back.vercel.app/api/${category}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage('Failed to update data. Please try again.');
    }
  };

  const filterHandler = () => {
    const inputValue = filterInputRef.current.value;
    const selectValue = filterSelectRef.current.value;
    const filtered = data.filter((item) =>
      String(item[selectValue]).toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const deleteHandler = async (id) => {
    try {
      const res = await fetch(
        `https://panda-back.vercel.app/api/${category}/?${category}_id=${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage('Failed to delete data. Please try again.');
    }
  };

  const downloadCSV = async () => {
    const inputValue = filterInputRef.current.value;
    const selectValue = filterSelectRef.current.value;
  
    try {
      const res = await fetch(
        `https://panda-back.vercel.app/api/single/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: category,
            data: {
              lookup_value: inputValue,
              lookup_type: selectValue,
            },
          }),
        }
      );
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      // Convert the response to a Blob
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      link.download = `${category}_data_${formattedDate}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage('Failed to download data. Please try again.');
    }
  };
  
  
  return (
    <div className='flex-1 overflow-x-auto overflow-y-scroll'>
      <div>
        <input
          className='text-black px-4 py-2 w-50px hover:bg-stone-300 transition-colors duration-300 ease-in-out rounded border-stone-500 border-2 m-2'
          ref={filterInputRef}
        />
        <label htmlFor='filter'>Seleccionar filtro:</label>
        <select
          ref={filterSelectRef}
          name='filter'
          id='filter'
          className='text-black px-4 py-2 w-50px hover:bg-stone-300 transition-colors duration-300 ease-in-out rounded border-stone-500 border-2 m-2'
        >
          {category === 'driver' && (
            <>
              {/* <option value='id'>ID de Driver</option> */}
              <option value='name'>Nombre de Driver</option>
              <option value='address'>Direccion de Driver</option>
              <option value='phone'>Numero de Driver</option>
            </>
          )}
          {category === 'employee' && (
            <>
              {/* <option value='id'>ID de Empleado</option> */}
              <option value='name'>Nombre de Empleado</option>
              <option value='shift'>Turno de Empleado</option>
              <option value='address'>Direccion de Empleado</option>
              <option value='phone'>Numero de Empleado</option>
              <option value='company'>Empresa de Empleado</option>
              <option value='driver_name'>Nombre de Driver de Empleado</option>
            </>
          )}
          {category === 'route' && (
            <>
              {/* <option value='id'>ID de Ruta</option> */}
              <option value='name'>Nombre de Ruta</option>
              <option value='descr'>Descripcion de Ruta</option>
              <option value='company'>Empresa de Ruta</option>
              <option value='shift'>Turno de Ruta</option>
              <option value='address'>Direccion de Ruta</option>
            </>
          )}
        </select>
        <Button selectHandler={filterHandler}>Aceptar</Button>
        <Button selectHandler={downloadCSV}>Descargar Tabla</Button>
      </div>
      <table className='min-w-full bg-white border border-gray-300'>
        {category === 'driver' ? (
          <DriverList data={filteredData} rowHandler={selectedRow} />
        ) : category === 'employee' ? (
          <EmployeeList data={filteredData} rowHandler={selectedRow} />
        ) : (
          <RouteList data={filteredData} rowHandler={selectedRow} />
        )}
      </table>
      <Modal
        category={category}
        data={selectedItem}
        onDelete={deleteHandler}
        onUpdate={updateHandler}
        closeModal={closeModalHandler}
        openModal={showModal}
      />
      {errorMessage && <div className='text-red-500 mt-2'>{errorMessage}</div>}
    </div>
  );
};

export default Table;
