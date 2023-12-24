// pages/index.js
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ControlBar from 'src/components/ControlBar';
import Table from 'src/components/Table';

const Home = () => {
  const [option, setOption] = useState('driver');
  const [dbData, setDbData] = useState([{}]);

  const optionSelectionHandler = (value) => {
    setDbData([{}]);
    setOption(value);
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${option}`);
        if (!req.ok) {
          throw new Error(`Failed to fetch data. Status: ${req.status}`);
        }
        // Handle the response data here
        const data = await req.json();
        setDbData(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchList();
  }, [option]);

  const titleName = option === 'driver' ? "Drivers" : option === 'employee' ? "Empleados" : "Rutas"

  return (
    <Layout onOptionSelect={optionSelectionHandler}>
      <div className='flex flex-col h-screen'>
        <div  className="h-20vh">
          <h1 className='text-5xl font-bold my-2'>
            {titleName}
          </h1>
          <ControlBar />
        </div>
      <Table data={dbData} category={option}/>
      </div>
    </Layout>
  );
};

export default Home;
