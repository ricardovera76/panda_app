const RouteList = ({ data, rowHandler}) => {
  const selectedRow = (item) => {
    rowHandler(item);
  };
  return (
    <>
      <thead>
        <tr>
          <th className='py-2 px-4 border-b'>ID</th>
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
            <td className='py-2 px-4 border-b'>{item.id}</td>
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
