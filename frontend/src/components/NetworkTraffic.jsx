import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { getServerMetrics } from '../services/api';
import { Paper, Typography } from '@mui/material';

export default function NetworkTraffic({ serverId }) {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    getServerMetrics(serverId).then(res => setMetrics(res.data.slice(0, 10).reverse()));
  }, [serverId]);

  const data = {
    labels: metrics.map(m => new Date(m.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Network In (Mbps)',
        data: metrics.map(m => m.network_in),
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1
      },
      {
        label: 'Network Out (Mbps)',
        data: metrics.map(m => m.network_out),
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.1
      }
    ]
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>Network Traffic</Typography>
      <Line data={data} />
    </Paper>
  );
}