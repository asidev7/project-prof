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

// Tasks APIs

// Get task detail by ID
export const getTaskDetail = (id: string) => {
  return getRequest(`/workflows/tasks/detail/${id}/`);
};

// Update task detail by ID
export const updateTaskDetail = (id: string, data: any) => {
  return putRequest(`/workflows/tasks/detail/${id}/`, data);
};

// Delete task by ID
export const deleteTask = (id: string) => {
  return deleteRequest(`/workflows/tasks/detail/${id}/`);
};

// Search tasks
export const searchTasks = (query: any) => {
  return getRequest('/workflows/tasks/search/');
};

// Get task statistics
export const getTaskStats = () => {
  return getRequest('/workflows/tasks/stats/');
};

// Get tasks by user ID
export const getTasksByUser = (userId: string) => {
  return getRequest(`/workflows/tasks/user/${userId}/`);
};

// Reassign task by ID
export const reassignTask = (id: string, data: any) => {
  return putRequest(`/workflows/tasks/${id}/reassign/`, data);
};

// Update task status by ID
export const updateTaskStatus = (id: string, data: any) => {
  return putRequest(`/workflows/tasks/${id}/update_status/`, data);
};

// Get tasks by workflow ID
export const fetchTasks = (workflowId: string) => {
  return getRequest(`/workflows/tasks/${workflowId}/`);
};

// Create a new task for a workflow
export const createTask = (workflowId: string, data: any) => {
  return postRequest(`/workflows/tasks/${workflowId}/`, data);
};

// Filter tasks by type and value
export const filterTasks = (workflowId: string, filterType: string, value: string) => {
  return getRequest(`/workflows/tasks/${workflowId}/filter/${filterType}/${value}/`);
};

// Workflows APIs

// Get list of workflows
export const getWorkflowsList = () => {
  return getRequest('/workflows/workflows/');
};

// Create a new workflow
export const createWorkflow = (data: any) => {
  return postRequest('/workflows/workflows/', data);
};

// Search workflows
export const searchWorkflows = (query: any) => {
  return getRequest('/workflows/workflows/search/');
};

// Get workflow statistics
export const getWorkflowStats = () => {
  return getRequest('/workflows/workflows/stats/');
};

// Get workflow by status
export const getWorkflowByStatus = (status: string) => {
  return getRequest(`/workflows/workflows/status/${status}/`);
};

// Get workflows by user ID
export const getWorkflowsByUser = (userId: string) => {
  return getRequest(`/workflows/workflows/user/${userId}/`);
};

// Get workflow details by ID
export const getWorkflowDetail = (id: string) => {
  return getRequest(`/workflows/workflows/${id}/`);
};

// Update workflow details by ID
export const updateWorkflow = (id: string, data: any) => {
  return putRequest(`/workflows/workflows/${id}/`, data);
};

// Delete workflow by ID
export const deleteWorkflow = (id: string) => {
  return deleteRequest(`/workflows/workflows/${id}/`);
};

// Update workflow status by ID
export const updateWorkflowStatus = (id: string, data: any) => {
  return putRequest(`/workflows/workflows/${id}/update_status/`, data);
};
