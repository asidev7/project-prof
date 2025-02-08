import axios from 'axios';

// URL de base de votre API
const API_BASE_URL = 'https://www.backend.lnb-intranet.globalitnet.org';

// Fonction générique pour effectuer les requêtes POST
const postRequest = async (url: string, data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${url}`, data);
    return response.data;
  } catch (error) {
    console.error('Erreur POST:', error);
    throw error;
  }
};

// Fonction générique pour effectuer les requêtes PUT
const putRequest = async (url: string, data: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}${url}`, data);
    return response.data;
  } catch (error) {
    console.error('Erreur PUT:', error);
    throw error;
  }
};

// Fonction générique pour effectuer les requêtes DELETE
const deleteRequest = async (url: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}${url}`);
    return response.data;
  } catch (error) {
    console.error('Erreur DELETE:', error);
    throw error;
  }
};

// Fonction générique pour effectuer les requêtes GET
const getRequest = async (url: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${url}`);
    return response.data;
  } catch (error) {
    console.error('Erreur GET:', error);
    throw error;
  }
};

// Report Exports APIs

// Get list of report exports
export const getReportExportsList = () => {
  return getRequest('/sysadmins/report_exports/');
};

// Create a new report export
export const createReportExport = (data: any) => {
  return postRequest('/sysadmins/report_exports/', data);
};

// Get report export details by ID
export const getReportExport = (id: string) => {
  return getRequest(`/sysadmins/report_exports/${id}/`);
};

// Update report export by ID
export const updateReportExport = (id: string, data: any) => {
  return putRequest(`/sysadmins/report_exports/${id}/`, data);
};

// Delete report export by ID
export const deleteReportExport = (id: string) => {
  return deleteRequest(`/sysadmins/report_exports/${id}/`);
};

// Reports APIs

// Get list of reports
export const getReportsList = () => {
  return getRequest('/sysadmins/reports/');
};

// Create a new report
export const createReport = (data: any) => {
  return postRequest('/sysadmins/reports/', data);
};

// Get report details by ID
export const getReport = (id: string) => {
  return getRequest(`/sysadmins/reports/${id}/`);
};

// Update report by ID
export const updateReport = (id: string, data: any) => {
  return putRequest(`/sysadmins/reports/${id}/`, data);
};

// Delete report by ID
export const deleteReport = (id: string) => {
  return deleteRequest(`/sysadmins/reports/${id}/`);
};

// Schedule Report Export APIs

// Schedule a report export
export const scheduleReportExport = (data: any) => {
  return postRequest('/sysadmins/schedule_report_export/', data);
};

// Statistics APIs

// Get list of statistics
export const getStatisticsList = () => {
  return getRequest('/sysadmins/statistics/');
};

// Create new statistics
export const createStatistics = (data: any) => {
  return postRequest('/sysadmins/statistics/', data);
};

// Get statistics details by ID
export const getStatistics = (id: string) => {
  return getRequest(`/sysadmins/statistics/${id}/`);
};

// Update statistics by ID
export const updateStatistics = (id: string, data: any) => {
  return putRequest(`/sysadmins/statistics/${id}/`, data);
};

// Delete statistics by ID
export const deleteStatistics = (id: string) => {
  return deleteRequest(`/sysadmins/statistics/${id}/`);
};
