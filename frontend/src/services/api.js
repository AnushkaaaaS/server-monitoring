import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const getServers = () => axios.get(`${API_BASE_URL}/servers`);
export const getServerMetrics = (serverId) => axios.get(`${API_BASE_URL}/metrics/${serverId}`);
export const getAlerts = () => axios.get(`${API_BASE_URL}/alerts`);