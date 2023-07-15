import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';
import Table from './components/Table';
import Button from './components/Button';
import Popup from './components/Popup';

const App = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //const response = await axios.get('http://localhost:4000/api/data');
      const response = await axios.get('https://assign-backend-ik8j.onrender.com/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addData = async (newData) => {
    try {
      //const response = await axios.post('http://localhost:4000/api/data', newData);
      const response = await axios.post('https://assign-backend-ik8j.onrender.com/api/data', newData);
      setData([...data, response.data]);
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const deleteData = async (id) => {
    try {
      //await axios.delete(`http://localhost:4000/api/data/${id}`);
      await axios.delete(`https://assign-backend-ik8j.onrender.com/api/data/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const sendEmail = async () => {
    try {
      const selectedData = data.filter((item) =>
        selectedRows.includes(item._id)
      );
      //await axios.post('http://localhost:4000/api/send-email', { data: selectedData });
      await axios.post('https://assign-backend-ik8j.onrender.com/api/send-email', { data: selectedData });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((row) => row !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <div>
      <h1>Data Management</h1>
      <Form addData={addData} />
      <Table
        data={data}
        selectedRows={selectedRows}
        toggleRowSelection={toggleRowSelection}
        handleDelete={deleteData}
      />
      <Button label="Send" onClick={sendEmail} />
      <Popup addData={addData} />
    </div>
  );
};

export default App;

