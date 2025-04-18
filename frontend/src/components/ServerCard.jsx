import React from 'react';
import { Stack } from '@mui/material';
import AlertSummary from './AlertSummary';
import ResourceUsage from './ResourceUsage';
import NetworkTraffic from './NetworkTraffic';

export default function ServerCard({ serverId }) {
  return (
    <Stack spacing={3} sx={{ maxWidth: 900, margin: '0 auto' }}>
      <AlertSummary />
      <ResourceUsage serverId={serverId} />
      <NetworkTraffic serverId={serverId} />
    </Stack>
  );
}
