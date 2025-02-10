import axios from 'axios';

// URL de base de l'API
const API_URL = 'https://www.backend.lnb-intranet.globalitnet.org/';

// Création d'une instance axios pour les appels API
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Ajoutez d'autres en-têtes ici si nécessaire, par exemple un token d'authentification
    // 'Authorization': `Bearer ${token}`
  },
});

// Fonction pour gérer les appels GET
const getRequest = async (url: string) => {
  try {
    const response = await apiClient.get(url);
    // Assurez-vous que la réponse contient des données valides au format JSON
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Réponse de l\'API vide ou invalide');
    }
  } catch (error) {
    console.error('Erreur lors de la requête GET', error);
    throw error;
  }
};

// Fonction pour gérer les appels POST
const postRequest = async (url: string, data: any) => {
  try {
    const response = await apiClient.post(url, data);
    // Vérifiez la validité de la réponse
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Réponse de l\'API vide ou invalide');
    }
  } catch (error) {
    console.error('Erreur lors de la requête POST', error);
    throw error;
  }
};

// Fonction pour gérer les appels PUT
const putRequest = async (url: string, data: any) => {
  try {
    const response = await apiClient.put(url, data);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Réponse de l\'API vide ou invalide');
    }
  } catch (error) {
    console.error('Erreur lors de la requête PUT', error);
    throw error;
  }
};

// Fonction pour gérer les appels DELETE
const deleteRequest = async (url: string) => {
  try {
    const response = await apiClient.delete(url);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Réponse de l\'API vide ou invalide');
    }
  } catch (error) {
    console.error('Erreur lors de la requête DELETE', error);
    throw error;
  }
};

// --- Fonctions API spécifiques aux utilisateurs ---

// Accéder aux tendances des utilisateurs
export const getAccessTrends = async () => {
  return await getRequest('/utilisateurs/access-trends/');
};

// Activer la vérification 2FA
export const activate2FA = async (userId: string) => {
  return await postRequest('/utilisateurs/activate-2fa/', { userId });
};

// Ajouter une adresse IP à la liste noire
export const addIpToBlacklist = async (ipAddress: string) => {
  return await postRequest('/utilisateurs/add-ip-to-blacklist/', { ipAddress });
};

// Obtenir les adresses des utilisateurs
export const getUserAddresses = async () => {
  return await getRequest('/utilisateurs/addresses/');
};

// Créer une adresse utilisateur
export const createUserAddress = async (addressData: { userId: string, address: string }) => {
  return await postRequest('/utilisateurs/addresses/create/', addressData);
};

// Supprimer une adresse utilisateur
export const deleteUserAddress = async (addressId: string) => {
  return await deleteRequest(`/utilisateurs/addresses/delete/${addressId}/`);
};

// Mettre à jour une adresse utilisateur
export const updateUserAddress = async (addressId: string, addressData: { address: string }) => {
  return await putRequest(`/utilisateurs/addresses/update/${addressId}/`, addressData);
};

// Analyser les tendances d'accès
export const analyzeAccessTrends = async () => {
  return await getRequest('/utilisateurs/analyze-access-trends/');
};

// Annuler une demande de congé
export const cancelLeaveRequest = async (leaveRequestId: string) => {
  return await postRequest('/utilisateurs/cancel-leave-request/', { leaveRequestId });
};

// Changer le supérieur d'un utilisateur
export const changeSuperior = async (userId: string, superiorId: string) => {
  return await postRequest('/utilisateurs/change-superieur/', { userId, superiorId });
};

// Vérifier l'inactivité des utilisateurs
export const checkInactivity = async () => {
  return await getRequest('/utilisateurs/check-inactivity/');
};

// Connexion d'un utilisateur
export const loginUser = async (credentials: { username: string, password: string }) => {
  return await postRequest('/utilisateurs/connexion/', credentials);
};

// Créer une demande de congé
export const createLeaveRequest = async (leaveData: { userId: string, startDate: string, endDate: string }) => {
  return await postRequest('/utilisateurs/create-leave-request/', leaveData);
};

// Déconnexion d'un utilisateur
export const logoutUser = async (userId: string) => {
  return await postRequest('/utilisateurs/deconnexion/', { userId });
};

// Déduire un solde de congé
export const deductLeaveBalance = async (leaveData: { userId: string, days: number }) => {
  return await postRequest('/utilisateurs/deduct-leave-balance/', leaveData);
};

// Supprimer un utilisateur
export const deleteUser = async (userId: string) => {
  return await deleteRequest(`/utilisateurs/delete-user/${userId}/`);
};

// Détecter les anomalies d'accès
export const detectAccessAnomalies = async () => {
  return await getRequest('/utilisateurs/detect-access-anomalies/');
};

// Exporter un rapport
export const exportReport = async (reportData: { userId: string, startDate: string, endDate: string }) => {
  return await postRequest('/utilisateurs/export-report/', reportData);
};

// Générer un rapport personnalisé
export const generateCustomReport = async (reportData: { userId: string, parameters: any }) => {
  return await postRequest('/utilisateurs/generate-custom-report/', reportData);
};

// Obtenir l'organigramme
export const getOrganigram = async () => {
  return await getRequest('/utilisateurs/get-organigramme/');
};

// Inscription d'un utilisateur
export const registerUser = async (userData: { username: string, password: string, email: string }) => {
  return await postRequest('/utilisateurs/inscription/', userData);
};

// Obtenir la liste des utilisateurs
export const getUsersList = async () => {
  try {
    const data = await getRequest('/utilisateurs/list-users/');
    if (Array.isArray(data)) {
      return data;
    } else {
      throw new Error('La réponse de l\'API n\'est pas un tableau');
    }
  } catch (error) {
    console.error('Erreur lors de l\'obtention de la liste des utilisateurs', error);
    throw error;
  }
};

// Obtenir le profil d'un utilisateur
export const getUserProfile = async (userId: string) => {
  return await getRequest(`/utilisateurs/user-profile/${userId}`);
};

// Mettre à jour les préférences d'un utilisateur
export const updateUserPreferences = async (userId: string, preferences: any) => {
  return await putRequest(`/utilisateurs/update-user-preferences/`, { userId, preferences });
};

// Mettre à jour un utilisateur
export const updateUser = async (userId: string, userData: any) => {
  return await putRequest(`/utilisateurs/update-user/${userId}/`, userData);
};

// Restaurer un utilisateur
export const restoreUser = async (userId: string) => {
  return await putRequest(`/utilisateurs/restore-user/`, { userId });
};
