import { useRef, useEffect } from 'react';

const AddDriverForm = ({ closeModal, openModal, addHandler }) => {
  const dialogRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  useEffect(() => {
    if (openModal) {
      dialogRef.current.showModal();
    }
  }, [openModal]);

  const handleAddDriver = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const address = addressRef.current.value;

    addHandler({ name, phone, address });

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
          <h2 className='text-2xl font-bold'>Agregar Driver</h2>
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

          <div className='flex justify-end mt-4'>
            <button
              type='submit'
              onClick={handleAddDriver}
              className='bg-green-500 text-white px-4 py-2 w-50px hover:bg-green-200 transition-colors duration-300 ease-in-out rounded mt-4'
            >
              Agregar Driver
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

export default AddDriverForm;
