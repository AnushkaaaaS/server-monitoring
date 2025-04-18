import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell,
  TableContainer, TableHead,
  TableRow, Paper,
} from '@mui/material';
import { getServers } from '../services/api';

export default function ServerList({ onSelectServer, selectedServerId }) {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    getServers().then(res => {
      setServers(res.data);
      if (res.data.length > 0 && !selectedServerId) onSelectServer(res.data[0].id);
    });
  }, [onSelectServer, selectedServerId]);

  return (
    <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>Server Name</TableCell>
            <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>IP Address</TableCell>
            <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {servers.map(server => (
            <TableRow
              key={server.id}
              hover
              onClick={() => onSelectServer(server.id)}
              sx={{
                cursor: 'pointer',
                backgroundColor: server.id === selectedServerId ? 'action.selected' : 'inherit',
                '&:hover': { backgroundColor: 'action.hover' },
              }}
            >
              <TableCell>{server.name}</TableCell>
              <TableCell>{server.ip_address}</TableCell>
              <TableCell sx={{ color: server.status === 'online' ? 'success.main' : 'error.main', fontWeight: 'medium' }}>
                {server.status.charAt(0).toUpperCase() + server.status.slice(1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
