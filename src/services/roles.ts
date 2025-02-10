import axios from 'axios';

// URL de base de votre API
const API_BASE_URL = 'https://www.backend.lnb-intranet.globalitnet.org';

// Fonction générique pour effectuer les requêtes API
const apiRequest = async (method, url, data = null) => {
  try {
    const config = { method, url: `${API_BASE_URL}${url}`, data };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Gestion des erreurs
const handleError = (error) => {
  if (error.response) {
    console.error(`API Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
  } else if (error.request) {
    console.error(`No response received: ${error.request}`);
  } else {
    console.error(`Request setup error: ${error.message}`);
  }
};

// Assign Role to Group
export const assignRoleToGroup = (groupId, roleId) => {
  return apiRequest('POST', `/roles/assign-role-to-group/${groupId}/${roleId}/`);
};

// Auto Assign Role
export const autoAssignRole = () => {
  return apiRequest('POST', '/roles/auto-assign-role/');
};

// Clone Role
export const cloneRole = (roleId) => {
  return apiRequest('POST', `/roles/clone-role/${roleId}/`);
};

// Create Permission
export const createPermission = (data) => {
  return apiRequest('POST', '/roles/create-permission/', data);
};

// Create Role
export const createRole = (data) => {
  return apiRequest('POST', '/roles/create-role/', data);
};

// Delete Permission
export const deletePermission = (permissionId) => {
  return apiRequest('DELETE', `/roles/delete-permission/${permissionId}/`);
};

// Delete Role
export const deleteRole = (roleId) => {
  return apiRequest('DELETE', `/roles/delete-role/${roleId}/`);
};

// List Permissions
export const listPermissions = () => {
  return apiRequest('GET', '/roles/list-permissions/');
};

// List Roles
export const listRoles = () => {
  return apiRequest('GET', '/roles/list-roles/');
};

// Update Permission
export const updatePermission = (permissionId, data) => {
  return apiRequest('POST', `/roles/update-permission/${permissionId}/`, data);
};

// Update Role
export const updateRole = (roleId, data) => {
  return apiRequest('POST', `/roles/update-role/${roleId}/`, data);
};

// Update User Role
export const updateUserRole = (userId, roleId) => {
  return apiRequest('POST', `/roles/update-user-role/${userId}/${roleId}/`);
};
