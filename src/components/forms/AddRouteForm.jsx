import { useState, useRef, useEffect } from 'react';

const AddRouteForm = ({ closeModal, openModal, addHandler }) => {
  const dialogRef = useRef(null);
  const descrRef = useRef(null);
  const shiftRef = useRef(null);
  const addressRef = useRef(null);
  const driverIdRef = useRef(null);
  const companyRef = useRef(null);

  useEffect(() => {
    if (openModal) {
      dialogRef.current.showModal();
    }
  }, [openModal]);

  const handleAddRoute = (e) => {
    e.preventDefault();
    const descr = descrRef.current.value;
    const shift = shiftRef.current.value;
    const address = addressRef.current.value;
    const driverId = driverIdRef.current.value;
    const company = companyRef.current.value;

    addHandler({ descr, address, shift, driver_id: driverId, company });

    dialogClose();
  };

  const dialogClose = () => {
    dialogRef.current.close();
    closeModal();
  };

  return (
    <dialog
      ref={dialogRef}
      className='fixed inset-0 overflow-y-auto backdrop:bg-black/50 backdrop:backdrop-blur-md rounded'
    >
      <div className='flex items-center justify-center'>
        <form className='bg-white p-8 rounded shadow-md w-full max-w-md'>
          <h2 className='text-2xl font-bold'>Agregar Ruta</h2>
          <p>Nombre/Descripcion: </p>
          <input
            type='text'
            ref={descrRef}
            className='w-full p-2 border rounded mb-4'
          />
          <p>Turno: </p>
          <input
            type='text'
            ref={shiftRef}
            className='w-full p-2 border rounded mb-4'
          />
          <p>Direccion: </p>
          <input
            type='text'
            ref={addressRef}
            className='w-full p-2 border rounded mb-4'
          />
          <p>ID de Driver: </p>
          <input
            type='number'
            ref={driverIdRef}
            className='w-full p-2 border rounded mb-4'
          />
          <p>Empresa: </p>
          <input
            type='text'
            ref={companyRef}
            className='w-full p-2 border rounded mb-4'
          />

          <div className='flex justify-end mt-4'>
            <button
              type='submit'
              onClick={handleAddRoute}
              className='bg-green-500 text-white px-4 py-2 w-50px hover:bg-green-200 transition-colors duration-300 ease-in-out rounded mt-4'
            >
              Agregar Ruta
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

export default AddRouteForm;
