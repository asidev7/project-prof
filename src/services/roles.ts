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

// Assign Role to Group
export const assignRoleToGroup = (groupId: string, roleId: string) => {
  return postRequest(`/roles/assign-role-to-group/${groupId}/${roleId}/`, {});
};

// Auto Assign Role
export const autoAssignRole = () => {
  return postRequest('/roles/auto-assign-role/', {});
};

// Clone Role
export const cloneRole = (roleId: string) => {
  return postRequest(`/roles/clone-role/${roleId}/`, {});
};

// Create Permission
export const createPermission = (data: any) => {
  return postRequest('/roles/create-permission/', data);
};

// Create Role
export const createRole = (data: any) => {
  return postRequest('/roles/create-role/', data);
};

// Delete Permission
export const deletePermission = (permissionId: string) => {
  return deleteRequest(`/roles/delete-permission/${permissionId}/`);
};

// Delete Role
export const deleteRole = (roleId: string) => {
  return deleteRequest(`/roles/delete-role/${roleId}/`);
};

// List Permissions
export const listPermissions = () => {
  return getRequest('/roles/list-permissions/');
};

// List Roles
export const listRoles = () => {
  return getRequest('/roles/list-roles/');
};

// Update Permission
export const updatePermission = (permissionId: string, data: any) => {
  return postRequest(`/roles/update-permission/${permissionId}/`, data);
};

// Update Role
export const updateRole = (roleId: string, data: any) => {
  return postRequest(`/roles/update-role/${roleId}/`, data);
};

// Update User Role
export const updateUserRole = (userId: string, roleId: string) => {
  return postRequest(`/roles/update-user-role/${userId}/${roleId}/`, {});
};
