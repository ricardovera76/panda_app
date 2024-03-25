import { useQuery } from 'react-query';

const RouteList = ({ data, rowHandler }) => {
  const selectedRow = (item) => {
    rowHandler(item);
  };

  // Fetch drivers data using React Query
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

  return (
    <>
      <thead>
        <tr>
          {/* <th className='py-2 px-4 border-b'>ID</th> */}
          <th className='py-2 px-4 border-b'>Driver</th>
          <th className='py-2 px-4 border-b'>Nombre</th>
          <th className='py-2 px-4 border-b'>Descripción</th>
          <th className='py-2 px-4 border-b'>Empresa</th>
          <th className='py-2 px-4 border-b'>Turno</th>
          <th className='py-2 px-4 border-b'>Dirección</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} onClick={() => selectedRow(item)}>
            {/* <td className='py-2 px-4 border-b'>{item.id}</td> */}
            {/* Display driver name instead of driver ID */}
            <td className='py-2 px-4 border-b'>
              {driversLoading ? 'Loading...' : driversError ? 'Error' : driversData.find(driver => driver.id === item.driver_id)?.name}
            </td>
            <td className='py-2 px-4 border-b'>{item.name}</td>
            <td className='py-2 px-4 border-b'>{item.descr}</td>
            <td className='py-2 px-4 border-b'>{item.company}</td>
            <td className='py-2 px-4 border-b'>{item.shift}</td>
            <td className='py-2 px-4 border-b'>{item.address}</td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default RouteList;
