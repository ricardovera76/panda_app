// pages/index.js
import React, { useState } from 'react';
import Layout from '../components/Layout';
import ControlBar from 'src/components/ControlBar';
import Table from 'src/components/Table';
import { useQuery } from 'react-query';

const Home = () => {
  const [option, setOption] = useState('driver');

  const optionSelectionHandler = (value) => {
    setOption(value);
  };

  const { data: dbData, isLoading, isError } = useQuery(
    ['data', option],
    async () => {
      const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${option}`);
      if (!req.ok) {
        throw new Error(`Failed to fetch data. Status: ${req.status}`);
      }
      const data = await req.json();
      return data.data;
    }
  );

  const titleName = option === 'driver' ? "Drivers" : option === 'employee' ? "Empleados" : "Rutas";

  return (
    <Layout onOptionSelect={optionSelectionHandler}>
      <div className='flex flex-col h-screen'>
        <div  className="h-20vh">
          <h1 className='text-5xl font-bold my-2'>
            {titleName}
          </h1>
          <ControlBar />
        </div>
        <div>{isLoading && <p>Loading...</p>}</div>
        <div>{isError && <p>Error fetching data...</p>}</div>
        <div>{!isError && !isLoading && <Table data={dbData} category={option}/>}</div>
      </div>
    </Layout>
  );
};

export default Home;
