import { useState, useRef, useEffect } from 'react';

const AddEmployeeForm = ({ closeModal, openModal, addHandler }) => {
  const dialogRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const commentsRef = useRef(null);
  const routeIdRef = useRef(null);
  const driverIdRef = useRef(null);
  const companyRef = useRef(null);
  const shiftRef = useRef(null);

  useEffect(() => {
    if (openModal) {
      dialogRef.current.showModal();
    }
  }, [openModal]);

  const handleAddEmployee = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const address = addressRef.current.value;
    const comments = commentsRef.current.value;
    const routeId = routeIdRef.current.value;
    const driverId = driverIdRef.current.value;
    const company = companyRef.current.value;
    const shift = shiftRef.current.value;

    addHandler({
      name,
      phone,
      address,
      comments,
      route_id: routeId,
      driver_id: driverId,
      company,
      shift
    });

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
          <h2 className='text-2xl font-bold'>Agregar Empleado</h2>
          <p>Nombre: </p>
          <input
            type='text'
            ref={nameRef}
            className='w-full p-2 border rounded mb-4'
          />
          <p>Telefono: </p>
          <input
            type='text'
            ref={phoneRef}
            className='w-full p-2 border rounded mb-4'
          />
          <p>Direccion: </p>
          <input
            type='text'
            ref={addressRef}
            className='w-full p-2 border rounded mb-4'
          />
          <p>Comentarios: </p>
          <input
            type='text'
            ref={commentsRef}
            className='w-full p-2 border rounded mb-4'
          />
          <p>ID de Ruta: </p>
          <input
            type='number'
            ref={routeIdRef}
            className='w-full p-2 border rounded mb-4'
          />
          <p>ID de Driver: </p>
          <input
            type='number'
            ref={driverIdRef}
            className='w-full p-2 border rounded mb-4'
          />
          <p>Turno [AM | PM | OT | SR]: </p>
          <input
            type='text'
            ref={shiftRef}
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
              onClick={handleAddEmployee}
              className='bg-green-500 text-white px-4 py-2 w-50px hover:bg-green-200 transition-colors duration-300 ease-in-out rounded mt-4'
            >
              Agregar Empleado
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

export default AddEmployeeForm;
