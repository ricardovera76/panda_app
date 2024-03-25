import { useRef, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const RouteDialog = ({
  routeData,
  onUpdate,
  onDelete,
  closeModal,
  openModal,
}) => {
  const dialogRef = useRef(null);
  const [updateType, setUpdateType] = useState('');
  const inputRef = useRef(null);

  const updateOptions = [
    { name: 'driver', type: 'dr' },
    { name: 'direccion', type: 'ad' },
    { name: 'turno', type: 'sf' },
    { name: 'descripcion', type: 'dc' },
    { name: 'empresa', type: 'cp' },
  ];

  const updateTitles = {
    dr: 'driver_id',
    ad: 'address',
    sf: 'shift',
    dc: 'descr',
    cp: 'company',
  };

  useEffect(() => {
    if (openModal) {
      dialogRef.current.showModal();
    }
  }, [openModal]);

  const handleUpdateTypeChange = (e) => {
    setUpdateType(
      () => updateOptions.filter((opt) => opt.name === e.target.value)[0].type
    );
  };

  const handleUpdateRoute = async () => {
    const title = updateTitles[updateType];
    const value =
      updateType !== 'dr'
        ? inputRef.current.value
        : parseInt(inputRef.current.value);

    onUpdate({
      type: updateType,
      driverId: routeData.id,
      data: { [title]: value },
    });
    dialogClose();
  };

  const handleDeleteRoute = () => {
    onDelete(routeData.id);
    dialogClose();
  };

  const dialogClose = () => {
    dialogRef.current.close();
    closeModal();
  };

  const {
    data: driversData,
    isLoading: driversLoading,
    isError: driversError,
  } = useQuery('drivers', async () => {
    const response = await fetch(
      `https://panda-back.vercel.app/api/driver`
    );
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
        <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
          <h2 className='text-2xl font-bold'>{routeData?.descr}</h2>
          <p>Nombre: {routeData?.name}</p>
          <p>Dirección: {routeData?.address}</p>
          {/* display driver data */}

          <label htmlFor='routeSelect' className='block mt-4'>
            Seleccion el tipo de actualizacion:
          </label>
          <select
            id='routeSelect'
            onChange={handleUpdateTypeChange}
            className='w-full p-2 border rounded mt-1'
          >
            <option value=''>Select a Route</option>
            {updateOptions?.map((opt) => (
              <option key={opt.name} value={opt.value}>
                {opt.name}
              </option>
            ))}
          </select>
          {updateType !== 'dr' && (
            <input
              type='text'
              ref={inputRef}
              className='w-full p-2 border rounded mb-4'
            />
          )}
          {updateType === 'dr' && (
            <div>
              <label htmlFor='driverSelect'>Seleccione el conductor:</label>
              {driversLoading ? (
                <p>Loading...</p>
              ) : driversError ? (
                <p>Error loading drivers</p>
              ) : (
                <select
                  id='driverSelect'
                  ref={inputRef}
                  className='w-full p-2 border rounded mt-1'
                >
                  <option value=''>Seleccione un conductor</option>
                  {driversData.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
          <div className='flex justify-end mt-4'>
            <button
              onClick={handleDeleteRoute}
              className='bg-red-500 text-white px-4 py-2 rounded mr-2'
            >
              Eliminar Ruta
            </button>
            <button
              onClick={handleUpdateRoute}
              className='bg-blue-500 text-white px-4 py-2 rounded'
            >
              Actualizar Ruta
            </button>
          </div>

          <button
            onClick={dialogClose}
            className='text-gray-600 hover:text-gray-800 mt-4'
          >
            Cerrar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default RouteDialog;
