import { useState, useRef, useEffect } from 'react';

const DriverDialog = ({
  driverData,
  onUpdate,
  onDelete,
  closeModal,
  openModal,
}) => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [updateType, setUpdateType] = useState('');
  const inputRef = useRef(null);
  const dialogRef = useRef(null);

  const updateOptions = [
    { name: 'direccion', type: 'ad' },
    { name: 'telefono', type: 'ph' },
    { name: 'nombre', type: 'nm' },
  ];

  useEffect(() => {
    if (openModal) {
      dialogRef.current.showModal();
    }
  }, [openModal]);

  const handleRouteChange = (event) => {
    setSelectedRoute(event.target.value);
  };

  const handleUpdateTypeChange = (e) => {
    setUpdateType(
      () => updateOptions.filter((opt) => opt.name === e.target.value)[0].type
    );
  };

  const handleUpdateDriver = () => {
    const title =
      updateType === 'ad' ? 'address' : updateType === 'nm' ? 'name' : 'phone';

    onUpdate({
      type: updateType,
      driverId: driverData.id,
      data: { [title]: inputRef.current.value },
    });
    dialogClose();
  };

  const handleDeleteDriver = () => {
    onDelete(driverData.id);
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
        <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
          <h2 className='text-2xl font-bold'>{driverData?.name}</h2>
          <p>Phone: {driverData?.phone}</p>
          <p>Address: {driverData?.address}</p>

          <label htmlFor='routeSelect' className='block mt-4'>
            Seleccionar Ruta:
          </label>
          <select
            id='routeSelect'
            onChange={handleRouteChange}
            className='w-full p-2 border rounded mt-1'
          >
            <option value=''>Select a Route</option>
            {driverData?.routes?.map((route) => (
              <option key={route.id} value={route.id}>
                {route.descr}
              </option>
            ))}
          </select>

          {selectedRoute && (
            <div className='mt-4'>
              <h3 className='text-xl font-semibold'>Employees</h3>
              <table className='w-full mt-2'>
                <thead>
                  <tr>
                    <th className='py-2'>Name</th>
                    <th className='py-2'>Address</th>
                    <th className='py-2'>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {driverData?.routes
                    ?.find((route) => route.id === parseInt(selectedRoute))
                    .employees.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.name}</td>
                        <td>{employee.address}</td>
                        <td>{employee.phone}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          <label htmlFor='routeSelect' className='block mt-4'>
            Seleccione el tipo de actualizacion:
          </label>
          <select
            id='routeSelect'
            onChange={handleUpdateTypeChange}
            className='w-full p-2 border rounded mt-1'
          >
            <option value=''>Seleccione una opcion</option>
            {updateOptions?.map((opt) => (
              <option key={opt.name} value={opt.value}>
                {opt.name}
              </option>
            ))}
          </select>
          <input
            type='text'
            ref={inputRef}
            className='w-full p-2 border rounded mb-4'
          />
          <div className='flex justify-end mt-4'>
            <button
              onClick={handleDeleteDriver}
              className='bg-red-500 text-white px-4 py-2 rounded mr-2'
            >
              Eliminar Driver
            </button>
            <button
              onClick={handleUpdateDriver}
              className='bg-blue-500 text-white px-4 py-2 rounded'
            >
              Actualizar Driver
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

export default DriverDialog;
