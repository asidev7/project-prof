import axios from 'axios';

// URL de base de votre API
const API_BASE_URL = 'https://www.backend.lnb-intranet.globalitnet.org';

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

// Access Logs API Functions

// Export all access logs information to Excel
export const exportAllInfoToExcel = () => {
  return getRequest('/api/access_logs/export_all_information_to_excel/');
};

// Export all access logs information to PDF
export const exportAllInfoToPDF = () => {
  return getRequest('/api/access_logs/export_all_information_to_pdf/');
};

// View active users
export const viewActiveUsers = () => {
  return getRequest('/api/access_logs/view_active_users/');
};

// View all access logs
export const viewAllAccessLogs = () => {
  return getRequest('/api/access_logs/view_all_access_logs/');
};

// View all information
export const viewAllInformation = () => {
  return getRequest('/api/access_logs/view_all_information/');
};

// View deleted users
export const viewDeletedUsers = () => {
  return getRequest('/api/access_logs/view_deleted_users/');
};

// View offline users
export const viewOfflineUsers = () => {
  return getRequest('/api/access_logs/view_offline_users/');
};

// View online users
export const viewOnlineUsers = () => {
  return getRequest('/api/access_logs/view_online_users/');
};

// View suspended users
export const viewSuspendedUsers = () => {
  return getRequest('/api/access_logs/view_suspended_users/');
};

// View user activities by user ID
export const viewUserActivities = (userId: string) => {
  return getRequest(`/api/access_logs/view_user_activities/${userId}/`);
};

// View user logs (you can add more filters if needed)
export const viewUserLogs = (userId: string) => {
  return getRequest(`/api/access_logs/view_user_logs/${userId}/`);
};

// View all information related to a specific user
export const viewUserInformation = (userId: string) => {
  return getRequest(`/api/access_logs/view_user_information/${userId}/`);
};
