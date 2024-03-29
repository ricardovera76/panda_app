import { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';

const AddVanForm = ({ closeModal, openModal, addHandler }) => {
  const dialogRef = useRef(null);
  const idRef = useRef(null);
  const driverIdRef = useRef(null);

  useEffect(() => {
    if (openModal) {
      dialogRef.current.showModal();
    }
  }, [openModal]);

  const handleAddVan = (e) => {
    e.preventDefault();
    const id = idRef.current.value;
    const driverId = driverIdRef.current.value;

    addHandler({ id, driver_id: driverId });

    dialogClose();
  };

  const dialogClose = () => {
    dialogRef.current.close();
    closeModal();
  };

  const { data: driversData, isLoading: driversLoading, isError: driversError } = useQuery('drivers', async () => {
    const response = await fetch(`https://panda-back.vercel.app/api/driver`);
    if (!response.ok) {
      throw new Error('Failed to fetch drivers');
    }
    const responseData = await response.json();
    return responseData.data;
  });

  return (
    <dialog
      ref={dialogRef}
      className='fixed inset-0 overflow-y-auto backdrop:bg-black/50 backdrop:backdrop-blur-md rounded'
    >
      <div className='flex items-center justify-center'>
        <form className='bg-white p-8 rounded shadow-md w-full max-w-md'>
          <h2 className='text-2xl font-bold'>Agregar VAN</h2>
          <p>Placa-ID: </p>
          <input
            type='text'
            ref={idRef}
            className='w-full p-2 border rounded mb-4'
          />

          <div>
            <label htmlFor='driverSelect'>Seleccione el conductor:</label>
            {driversLoading ? (
              <p>Loading...</p>
            ) : driversError ? (
              <p>Error loading drivers</p>
            ) : (
              <select id='driverSelect' ref={driverIdRef} className='w-full p-2 border rounded mt-1'>
                <option value=''>Seleccione un conductor</option>
                {driversData.map(driver => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className='flex justify-end mt-4'>
            <button
              type='submit'
              onClick={handleAddVan}
              className='bg-green-500 text-white px-4 py-2 w-50px hover:bg-green-200 transition-colors duration-300 ease-in-out rounded mt-4'
            >
              Agregar Van
            </button>
            <button
              type='button'
              onClick={dialogClose}
              className='bg-stone-500 text-white px-4 py-2 w-50px hover:bg-stone-300 transition-colors duration-300 ease-in-out rounded mt-4'
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddVanForm;
