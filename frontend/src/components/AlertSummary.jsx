import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Stack } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import { getAlerts } from '../services/api';

export default function AlertSummary() {
  const [alerts, setAlerts] = useState({ critical: 0, medium: 0, low: 0 });

  useEffect(() => {
    getAlerts().then(res => setAlerts(res.data));
  }, []);

  return (
    <Paper elevation={4} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Alert Summary
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={4}
        justifyContent="space-around"
        alignItems="center"
      >
        <Box textAlign="center" sx={{ flex: 1 }}>
          <ErrorIcon sx={{ color: 'error.main', fontSize: 48, mb: 1 }} />
          <Typography variant="h4" color="error.main" fontWeight="bold">
            {alerts.critical}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Critical
          </Typography>
        </Box>
        <Box textAlign="center" sx={{ flex: 1 }}>
          <WarningIcon sx={{ color: 'warning.main', fontSize: 48, mb: 1 }} />
          <Typography variant="h4" color="warning.main" fontWeight="bold">
            {alerts.medium}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Medium
          </Typography>
        </Box>
        <Box textAlign="center" sx={{ flex: 1 }}>
          <InfoIcon sx={{ color: 'info.main', fontSize: 48, mb: 1 }} />
          <Typography variant="h4" color="info.main" fontWeight="bold">
            {alerts.low}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Low
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
