import axios, { AxiosError, AxiosResponse } from 'axios';

// Définition des types
interface ApiResponse<T = any> {
  error?: boolean;
  status?: number;
  message?: string;
  data?: T;
}

// URL de base de l'API
const API_BASE_URL = 'https://www.backend.lnb-intranet.globalitnet.org';

// Création d'une instance Axios avec des configs par défaut
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Timeout de 10 secondes
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fonction générique pour effectuer les requêtes API
const apiRequest = async <T>(method: string, url: string, data?: any): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await api({ method, url, data });
    return { data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Gestion des erreurs
const handleError = (error: unknown): ApiResponse => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    if (axiosError.response) {
      console.error(`API Error: ${axiosError.response.status} - ${axiosError.response.data.message || axiosError.response.statusText}`);
      return { error: true, status: axiosError.response.status, message: axiosError.response.data.message || "Une erreur est survenue." };
    } else if (axiosError.request) {
      console.error(`No response received from server.`);
      return { error: true, message: "Le serveur ne répond pas. Vérifiez votre connexion internet." };
    }
  }
  console.error(`Request setup error: ${(error as Error).message}`);
  return { error: true, message: "Erreur de configuration de la requête." };
};

// Fonctions API
const apiServices = {
  assignRoleToGroup: (groupId: number, roleId: number) => apiRequest('POST', `/roles/assign-role-to-group/${groupId}/${roleId}/`),
  autoAssignRole: () => apiRequest('POST', '/roles/auto-assign-role/'),
  cloneRole: (roleId: number) => apiRequest('POST', `/roles/clone-role/${roleId}/`),
  createPermission: (data: object) => apiRequest('POST', '/roles/create-permission/', data),
  createRole: (data: object) => apiRequest('POST', '/roles/create-role/', data),
  deletePermission: (permissionId: number) => apiRequest('DELETE', `/roles/delete-permission/${permissionId}/`),
  deleteRole: (roleId: number) => apiRequest('DELETE', `/roles/delete-role/${roleId}/`),
  listPermissions: () => apiRequest('GET', '/roles/list-permissions/'),
  listRoles: () => apiRequest('GET', '/roles/list-roles/'),
  updatePermission: (permissionId: number, data: object) => apiRequest('POST', `/roles/update-permission/${permissionId}/`, data),
  updateRole: (roleId: number, data: object) => apiRequest('POST', `/roles/update-role/${roleId}/`, data),
  updateUserRole: (userId: number, roleId: number) => apiRequest('POST', `/roles/update-user-role/${userId}/${roleId}/`),
};

export default apiServices;
