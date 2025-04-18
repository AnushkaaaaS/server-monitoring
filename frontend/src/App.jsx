import React, { useState } from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import ServerList from './components/ServerList';
import ServerCard from './components/ServerCard';

export default function App() {
  const [selectedServer, setSelectedServer] = useState(1); // Default to first server

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        Server Monitoring Dashboard
      </Typography>
      <ServerList onSelectServer={setSelectedServer} />
      {selectedServer && <ServerCard serverId={selectedServer} />}
    </Container>
  );
}