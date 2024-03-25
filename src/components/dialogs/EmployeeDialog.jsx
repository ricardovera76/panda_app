import { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';

const EmployeeDialog = ({
  employeeData,
  onUpdate,
  onDelete,
  closeModal,
  openModal,
}) => {
  const [updateType, setUpdateType] = useState('');
  const dialogRef = useRef(null);
  const inputRef = useRef(null);

  const updateOptions = [
    { name: 'direccion', type: 'ad' },
    { name: 'telefono', type: 'ph' },
    { name: 'nombre', type: 'nm' },
    { name: 'turno', type: 'sf' },
    { name: 'driver', type: 'dr' },
    { name: 'ruta', type: 'rt' },
    { name: 'empresa', type: 'cp' },
    { name: 'comentarios', type: 'cm' },
  ];

  const updateTitles = {
    ad: 'address',
    ph: 'phone',
    nm: 'name',
    sf: 'shift',
    dr: 'driver_id',
    rt: 'route_id',
    cp: 'company',
    cm: 'comments',
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

  const handleUpdateEmployee = () => {
    const title = updateTitles[updateType];
    const value =
      updateType === 'dr'
        ? parseInt(inputRef.current.value)
        : updateType === 'rt'
        ? parseInt(inputRef.current.value)
        : inputRef.current.value;

    onUpdate({
      type: updateType,
      employeeId: employeeData.id,
      data: { [title]: value },
    });
    dialogClose();
  };

  const handleDeleteEmployee = () => {
    onDelete(employeeData.id);
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/driver`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch drivers');
    }
    const responseData = await response.json();
    return responseData.data;
  });

  const {
    data: routesData,
    isLoading: routesLoading,
    isError: routesError,
  } = useQuery('routes', async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/route`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch routes');
    }
    const responseData = await response.json();
    return responseData.data;
  });

  return (
    <dialog
      ref={dialogRef}
      className='fixed inset-0 overflow-y-auto backdrop:bg-black/50 backdrop:backdrop-blur-md'
    >
      <div className='flex items-center justify-center'>
        <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
          <h2 className='text-2xl font-bold'>{employeeData?.name}</h2>
          <p>Teléfono : {employeeData?.phone}</p>
          <p>Dirección : {employeeData?.address}</p>
          <p>Turno : {employeeData?.shift}</p>
          <p>Empresa : {employeeData?.company}</p>
          <p>Nombre de Driver : {employeeData?.driver_name}</p>
          <p>Nombre de Ruta : {employeeData?.route_descr}</p>
          <p>Fecha de Inicio : {employeeData?.started_at?.split('T')[0]}</p>
          <p>Comentarios : {employeeData?.comments}</p>

          <label htmlFor='routeSelect' className='block mt-4'>
            Seleccion el tipo de actualizacion:
          </label>
          <select
            id='routeSelect'
            onChange={handleUpdateTypeChange}
            className='w-full p-2 border rounded mt-1'
          >
            <option value=''>Selecciona una opción</option>
            {updateOptions?.map((opt) => (
              <option key={opt.name} value={opt.value}>
                {opt.name}
              </option>
            ))}
          </select>
          {updateType !== 'dr' && updateType !== 'rt' && (
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
          {updateType === 'rt' && (
            <div>
              <label htmlFor='routeSelect'>Seleccione la ruta:</label>
              {routesLoading ? (
                <p>Loading...</p>
              ) : routesError ? (
                <p>Error loading routes</p>
              ) : (
                <select
                  id='routeSelect'
                  ref={inputRef}
                  className='w-full p-2 border rounded mt-1'
                >
                  <option value=''>Seleccione una ruta</option>
                  {routesData.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.descr}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
          <div className='flex justify-end mt-4'>
            <button
              onClick={handleDeleteEmployee}
              className='bg-red-500 text-white px-4 py-2 rounded mr-2'
            >
              Eliminar Empleado
            </button>
            <button
              onClick={handleUpdateEmployee}
              className='bg-blue-500 text-white px-4 py-2 rounded'
            >
              Actualizar Empleado
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

export default EmployeeDialog;
