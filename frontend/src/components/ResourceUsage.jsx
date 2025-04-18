import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { getServerMetrics } from '../services/api';
import { Paper, Typography } from '@mui/material';

export default function ResourceUsage({ serverId }) {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    getServerMetrics(serverId).then(res => setMetrics(res.data.slice(0, 10).reverse()));
  }, [serverId]);

  const data = {
    labels: metrics.map(m => new Date(m.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'CPU Usage %',
        data: metrics.map(m => m.cpu_usage),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      },
      {
        label: 'Memory Usage %',
        data: metrics.map(m => m.memory_usage),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
      },
      {
        label: 'Disk Usage %',
        data: metrics.map(m => m.disk_usage),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>Resource Usage</Typography>
      <Line data={data} />
    </Paper>
  );}