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
const postRequest = async (url: string, data: object) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${url}`, data);
    return response.data;
  } catch (error) {
    console.error('Erreur POST:', error);
    throw error;
  }
};

// Fonction générique pour effectuer les requêtes PUT
const putRequest = async (url: string, data: object) => {
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

// Exemple d'utilisation avec les routes de sécurité

// GET : Liste des procédures de sécurité actives
const getActiveSecurityProcedures = async () => {
  return await getRequest('/security/active_security_procedures/');
};

// POST : Créer une nouvelle procédure de sécurité active
const createActiveSecurityProcedure = async (data: object) => {
  return await postRequest('/security/active_security_procedures/', data);
};

// GET : Lire une procédure de sécurité active spécifique
const getActiveSecurityProcedureById = async (id: string) => {
  return await getRequest(`/security/active_security_procedures/${id}/`);
};

// PUT : Mettre à jour une procédure de sécurité active spécifique
const updateActiveSecurityProcedure = async (id: string, data: object) => {
  return await putRequest(`/security/active_security_procedures/${id}/`, data);
};

// DELETE : Supprimer une procédure de sécurité active spécifique
const deleteActiveSecurityProcedure = async (id: string) => {
  return await deleteRequest(`/security/active_security_procedures/${id}/`);
};

// GET : Liste des procédures de sécurité physique
const getPhysicalSecurityProcedures = async () => {
  return await getRequest('/security/physical_security_procedures/');
};

// POST : Créer une nouvelle procédure de sécurité physique
const createPhysicalSecurityProcedure = async (data: object) => {
  return await postRequest('/security/physical_security_procedures/', data);
};

// GET : Lire une procédure de sécurité physique spécifique
const getPhysicalSecurityProcedureById = async (id: string) => {
  return await getRequest(`/security/physical_security_procedures/${id}/`);
};

// PUT : Mettre à jour une procédure de sécurité physique spécifique
const updatePhysicalSecurityProcedure = async (id: string, data: object) => {
  return await putRequest(`/security/physical_security_procedures/${id}/`, data);
};

// DELETE : Supprimer une procédure de sécurité physique spécifique
const deletePhysicalSecurityProcedure = async (id: string) => {
  return await deleteRequest(`/security/physical_security_procedures/${id}/`);
};
