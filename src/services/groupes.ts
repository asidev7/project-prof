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

// Add Members to Group
export const addMembersToGroup = (groupId: string, data: any) => {
  return postRequest(`/utilisateurs_groupes/add-members-to-group/${groupId}/`, data);
};

// Add Members to Subgroup
export const addMembersToSubgroup = (subgroupId: string, data: any) => {
  return postRequest(`/utilisateurs_groupes/add-members-to-subgroup/${subgroupId}/`, data);
};

// Add User to Group
export const addUserToGroup = (data: any) => {
  return postRequest('/utilisateurs_groupes/add-user-to-group/', data);
};

// Auto Assign Users to Group
export const autoAssignUsersToGroup = (groupId: string) => {
  return postRequest(`/utilisateurs_groupes/auto-assign-users-to-group/${groupId}/`, {});
};

// Create Group
export const createGroup = (data: any) => {
  return postRequest('/utilisateurs_groupes/create-group/', data);
};

// Create Subgroup
export const createSubgroup = (data: any) => {
  return postRequest('/utilisateurs_groupes/create-subgroup/', data);
};

// Delete Subgroup
export const deleteSubgroup = (subgroupId: string) => {
  return deleteRequest(`/utilisateurs_groupes/delete-subgroup/${subgroupId}/`);
};

// Fragment Group
export const fragmentGroup = (groupId: string) => {
  return postRequest(`/utilisateurs_groupes/fragment-group/${groupId}/`, {});
};

// Link Groups
export const linkGroups = (data: any) => {
  return postRequest('/utilisateurs_groupes/link-groups/', data);
};

// Link Subgroup to Group
export const linkSubgroupToGroup = (data: any) => {
  return postRequest('/utilisateurs_groupes/link-subgroup-to-group/', data);
};

// Link Subgroups
export const linkSubgroups = (data: any) => {
  return postRequest('/utilisateurs_groupes/link-subgroups/', data);
};

// List Groups
export const listGroups = async () => {
  try {
    const response = await getRequest('/utilisateurs_groupes/list-groups/');
    return response.groups || []; // S'assurer de retourner le tableau "groups"
  } catch (error) {
    console.error("Erreur lors de la récupération des groupes:", error);
    throw error;
  }
};


// List Subgroups
export const listSubgroups = () => {
  return getRequest('/utilisateurs_groupes/list-subgroups/');
};

// Login
export const login = (data: any) => {
  return postRequest('/utilisateurs_groupes/login/', data);
};

// Logout
export const logout = () => {
  return postRequest('/utilisateurs_groupes/logout/', {});
};

// Merge Groups
export const mergeGroups = (data: any) => {
  return postRequest('/utilisateurs_groupes/merge-groups/', data);
};

// Remove Members from Group
export const removeMembersFromGroup = (groupId: string, data: any) => {
  return postRequest(`/utilisateurs_groupes/remove-members-from-group/${groupId}/`, data);
};

// Remove Members from Subgroup
export const removeMembersFromSubgroup = (subgroupId: string, data: any) => {
  return postRequest(`/utilisateurs_groupes/remove-members-from-subgroup/${subgroupId}/`, data);
};

// Update Group
export const updateGroup = (groupId: string, data: any) => {
  return postRequest(`/utilisateurs_groupes/update-group/${groupId}/`, data);
};

// Update Subgroup
export const updateSubgroup = (subgroupId: string, data: any) => {
  return postRequest(`/utilisateurs_groupes/update-subgroup/${subgroupId}/`, data);
};

// View Group
export const viewGroup = (groupId: string) => {
  return getRequest(`/utilisateurs_groupes/view-group/${groupId}/`);
};

// View Subgroup
export const viewSubgroup = (subgroupId: string) => {
  return getRequest(`/utilisateurs_groupes/view-subgroup/${subgroupId}/`);
};
