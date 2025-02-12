import axios from 'axios';

// URL de base de l'API
const API_BASE_URL = 'https://www.backend.lnb-intranet.globalitnet.org';

export const getRequestHistory = async (requestId: string) => {
  try {
    console.log('Request ID:', requestId); // Vérification de la valeur de requestId

    if (!requestId) {
      throw new Error('Request ID is required');
    }

    const csrfToken = getCsrfToken(); // Récupère dynamiquement le CSRF token

    const response = await axios.get(`${API_BASE_URL}/services/request-history/${requestId}/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': csrfToken, // CSRF token
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Auth token
      },
    });

    console.log('Response Data:', response.data); // Vérification de la réponse API
    return response.data; // Retourne les données de l'historique
  } catch (error: any) {
    console.error("Erreur lors de la récupération de l'historique de la demande :", error.response?.data || error.message);
    throw error; // Relance l'erreur pour gestion ultérieure
  }
};

// Fonction pour récupérer le CSRF token depuis les cookies (ou autre méthode si nécessaire)
const getCsrfToken = (): string => {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
  return cookieValue || ''; // Retourne une valeur par défaut vide si non trouvé
};

// Fonction générique pour effectuer les requêtes POST (Unique déclaration)
const postRequest = async (url: string, data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${url}`, data, {
      headers: {
        'Content-Type': 'application/json', // Assurez-vous que l'API attend du JSON
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Erreur lors de la requête POST:', error.response?.data || error.message);
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


export const createService = async (payload: { name: string, description: string, department_id: number, function_id: number, chef_id: number, csrfToken: string }) => {
  try {
    const response = await fetch('/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': payload.csrfToken,
      },
      body: JSON.stringify({
        name: payload.name,
        description: payload.description,
        department_id: payload.department_id,
        function_id: payload.function_id,
        chef_id: payload.chef_id,
      }),
    });
    return response.json();
  } catch (error) {
    throw new Error('Failed to create service');
  }
};

// Fonction pour récupérer la liste des services
export const getServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services/list-services/`);
    return response.data.services; // Assurez-vous que la structure des données est correcte
  } catch (error) {
    console.error("Erreur lors de la récupération des services:", error);
    throw error; // Permet à la page d'afficher l'erreur
  }
};

// Admin Process Service Request
export const createServiceRequestadmin = (requestId: string) => {
  return postRequest(`/services/admin-process-service-request/${requestId}/`, {});
};

// Admin Document Requests
export const getAdminDocumentRequests = () => {
  return getRequest('/services/admin_document_requests/');
};

export const createAdminDocumentRequest = (data: any) => {
  return postRequest('/services/admin_document_requests/create/', data);
};

export const getAdminDocumentRequest = (id: string) => {
  return getRequest(`/services/admin_document_requests/${id}/`);
};

export const acceptAdminDocumentRequest = (id: string) => {
  return postRequest(`/services/admin_document_requests/${id}/accept/`, {});
};

export const deleteAdminDocumentRequest = (id: string) => {
  return deleteRequest(`/services/admin_document_requests/${id}/delete/`);
};

export const rejectAdminDocumentRequest = (id: string) => {
  return postRequest(`/services/admin_document_requests/${id}/reject/`, {});
};

export const updateAdminDocumentRequest = (id: string, data: any) => {
  return putRequest(`/services/admin_document_requests/${id}/update/`, data);
};

// Admin Documents
export const getAdminDocuments = () => {
  return getRequest('/services/admin_documents/');
};

export const createAdminDocument = (data: any) => {
  return postRequest('/services/admin_documents/create/', data);
};

export const getAdminDocument = (id: string) => {
  return getRequest(`/services/admin_documents/${id}/`);
};

export const deleteAdminDocument = (id: string) => {
  return deleteRequest(`/services/admin_documents/${id}/delete/`);
};

export const updateAdminDocument = (id: string, data: any) => {
  return putRequest(`/services/admin_documents/${id}/update/`, data);
};

// Applications
export const deleteApplication = (id: string, userId: string) => {
  return deleteRequest(`/services/applications/${id}/delete/${userId}/`);
};

export const grantApplicationAccess = (id: string, userId: string, grantingUserId: string) => {
  return postRequest(`/services/applications/${id}/grant-access/${userId}/${grantingUserId}/`, {});
};

export const revokeApplicationAccess = (id: string, userId: string, revokingUserId: string) => {
  return postRequest(`/services/applications/${id}/revoke-access/${userId}/${revokingUserId}/`, {});
};

export const updateApplication = (id: string, userId: string, data: any) => {
  return putRequest(`/services/applications/${id}/update/${userId}/`, data);
};

export const getApplication = (id: string, userId: string) => {
  return getRequest(`/services/applications/${id}/${userId}/`);
};

export const getApplicationsByUserId = (userId: string) => {
  return getRequest(`/services/applications/${userId}/`);
};

// Fonction pour créer une nouvelle application
export const createApplication = async (userId: string, data: { name: string; description: string }) => {
  try {
    const token = localStorage.getItem('authToken'); // Récupère le token d'authentification
    const csrfToken = getCsrfToken(); // Récupère dynamiquement le CSRF token

    const response = await axios.post(`${API_BASE_URL}/services/create-application/${userId}/`, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': csrfToken, // Ajoute le CSRF token
        'Authorization': `Bearer ${token}`, // Ajoute le token d'authentification
      },
    });

    return response.data; // Retourne la réponse de l'API
  } catch (error: any) {
    console.error("Erreur lors de la création de l'application:", error.response?.data || error.message);
    throw error; // Relance l'erreur pour gestion
  }
};

export const createServiceRequest = (data: any) => {
  return postRequest('/services/create-service-request/', data);
};

export const deleteServiceRequest = (requestId: string) => {
  return deleteRequest(`/services/delete-service-request/${requestId}/`);
};

export const deleteService = (serviceId: string) => {
  return deleteRequest(`/services/delete-service/${serviceId}/`);
};

// Departments Management
export const getDepartments = () => {
  return getRequest('/services/departments/');
};

export const createDepartment = (data: any) => {
  return postRequest('/services/departments/create/', data);
};

export const getDepartment = (departmentId: string) => {
  return getRequest(`/services/departments/${departmentId}/`);
};

export const deleteDepartment = (departmentId: string) => {
  return deleteRequest(`/services/departments/${departmentId}/delete/`);
};

export const updateDepartment = (departmentId: string, data: any) => {
  return putRequest(`/services/departments/${departmentId}/update/`, data);
};

// Payslip Management
export const getPayslips = () => {
  return getRequest('/services/payslips/');
};

export const createPayslip = (data: any) => {
  return postRequest('/services/payslips/create/', data);
};

export const deletePayslip = (payslipId: string) => {
  return deleteRequest(`/services/payslips/${payslipId}/delete/`);
};

export const updatePayslip = (payslipId: string, data: any) => {
  return putRequest(`/services/payslips/${payslipId}/update/`, data);
};
