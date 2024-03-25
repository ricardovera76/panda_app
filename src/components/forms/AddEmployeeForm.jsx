import { useRef, useEffect } from 'react';
import { useQuery } from 'react-query';

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


  const { data: driversData, isLoading: driversLoading, isError: driversError } = useQuery('drivers', async () => {
    const response = await fetch(`https://panda-back.vercel.app/api/driver`);
    if (!response.ok) {
      throw new Error('Failed to fetch drivers');
    }
    const responseData = await response.json();
    return responseData.data;
  });

  const { data: routesData, isLoading: routesLoading, isError: routesError } = useQuery('routes', async () => {
    const response = await fetch(`https://panda-back.vercel.app/api/route`);
    if (!response.ok) {
      throw new Error('Failed to fetch routes');
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
        <form className='bg-white p-8 rounded shadow-md w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-4'>
          <h2 className='text-2xl font-bold col-span-2'>Agregar Empleado</h2>
          <div>
            <p>Nombre:</p>
            <input
              type='text'
              ref={nameRef}
              className='w-full p-2 border rounded mb-4'
            />
          </div>
          <div>
            <p>Telefono:</p>
            <input
              type='text'
              ref={phoneRef}
              className='w-full p-2 border rounded mb-4'
            />
          </div>
          <div>
            <p>Direccion:</p>
            <input
              type='text'
              ref={addressRef}
              className='w-full p-2 border rounded mb-4'
            />
          </div>
          <div>
            <p>Comentarios:</p>
            <input
              type='text'
              ref={commentsRef}
              className='w-full p-2 border rounded mb-4'
            />
          </div>
          <div>
            <p>Turno [AM | PM | OT | SR]:</p>
            <input
              type='text'
              ref={shiftRef}
              className='w-full p-2 border rounded mb-4'
            />
          </div>
          <div>
            <p>Empresa:</p>
            <input
              type='text'
              ref={companyRef}
              className='w-full p-2 border rounded mb-4'
            />
          </div>
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
          <div>
            <label htmlFor='routeSelect'>Seleccione la ruta:</label>
            {routesLoading ? (
              <p>Loading...</p>
            ) : routesError ? (
              <p>Error loading routes</p>
            ) : (
              <select id='routeSelect' ref={routeIdRef} className='w-full p-2 border rounded mt-1'>
                <option value=''>Seleccione una ruta</option>
                {routesData.map(route => (
                  <option key={route.id} value={route.id}>
                    {route.descr}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className='flex justify-end col-span-2'>
            <button
              type='submit'
              onClick={handleAddEmployee}
              className='bg-green-500 text-white px-4 py-2 hover:bg-green-200 transition-colors duration-300 ease-in-out rounded mt-4'
            >
              Agregar Empleado
            </button>
            <button
              type='button'
              onClick={dialogClose}
              className='bg-stone-500 text-white px-4 py-2 hover:bg-stone-300 transition-colors duration-300 ease-in-out rounded mt-4 ml-4'
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
