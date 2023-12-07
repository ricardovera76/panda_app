// components/Table.js
import React from 'react';

const EmployeeList = ({ data, rowHandler }) => {
  const selectedRow = (item) => {
    rowHandler(item)
  }
  return (
    <>
      <thead>
        <tr>
          <th className='py-2 px-4 border-b'>ID</th>
          <th className='py-2 px-4 border-b'>Name</th>
          <th className='py-2 px-4 border-b'>Shift</th>
          <th className='py-2 px-4 border-b'>Address</th>
          <th className='py-2 px-4 border-b'>Phone</th>
          <th className='py-2 px-4 border-b'>Company</th>
          <th className='py-2 px-4 border-b'>Driver</th>
          <th className='py-2 px-4 border-b'>Comments</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} onClick={() => selectedRow(item)}>
            <td className='py-2 px-4 border-b'>{item.id}</td>
            <td className='py-2 px-4 border-b'>{item.name}</td>
            <td className='py-2 px-4 border-b'>{item.shift}</td>
            <td className='py-2 px-4 border-b'>{item.address}</td>
            <td className='py-2 px-4 border-b'>{item.phone}</td>
            <td className='py-2 px-4 border-b'>{item.company}</td>
            <td className='py-2 px-4 border-b'>{item.driver_name}</td>
            <td className='py-2 px-4 border-b'>{item.comments}</td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default EmployeeList;
