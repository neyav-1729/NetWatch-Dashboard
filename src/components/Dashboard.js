import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/metrics')
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const chartData = {
    labels: data.map(entry => entry.timestamp),
    datasets: [{
      label: 'Network Traffic',
      data: data.map(entry => entry.value),
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
    }],
  };

  return (
    <div>
      <h2>Network Monitoring Dashboard</h2>
      <Line data={chartData} />
    </div>
  );
};

export default Dashboard;
