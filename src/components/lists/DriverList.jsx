const DriverList = ({ data, rowHandler}) => {
  const selectedRow = (item) => {
    rowHandler(item);
  };
  return (
    <>
      <thead>
        <tr>
          {/* <th className='py-2 px-4 border-b'>ID</th> */}
          <th className='py-2 px-4 border-b'>Name</th>
          <th className='py-2 px-4 border-b'>Phone</th>
          <th className='py-2 px-4 border-b'>Address</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr key={item.id} onClick={() => selectedRow(item)}>
            {/* <td className='py-2 px-4 border-b' key={`${item.id}`}>{item.id}</td> */}
            <td className='py-2 px-4 border-b' key={`${item.name}`}>{item.name}</td>
            <td className='py-2 px-4 border-b' key={`${item.phone}`}>{item.phone}</td>
            <td className='py-2 px-4 border-b' key={`${item.address}`}>{item.address}</td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default DriverList;
