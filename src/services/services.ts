import axios from 'axios';

// URL de base de l'API
const API_BASE_URL = 'https://www.backend.lnb-intranet.globalitnet.org';


export const createApplication = async (data: { name: string; description: string }) => {
    try {
        const token = localStorage.getItem('authToken');
        const csrfToken = getCsrfToken();
        
        console.log(`Token d'authentification : ${token}`);
        console.log(`CSRF Token : ${csrfToken}`);
        console.log(`Envoi à l'URL: ${API_BASE_URL}/services/create-application/`);
        console.log("Données envoyées :", data);

        const response = await axios.post(`${API_BASE_URL}/services/create-application/`, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': csrfToken,
                'Authorization': `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Erreur lors de la création de l'application:", error.response?.data || error.message);
        throw error;
    }
};



export const getRequestHistory = async (requestId: string) => {
  try {
    console.log('Request ID:', requestId); // Vérification de la valeur de requestId

    if (!requestId) {
      throw new Error('Request ID is required');
    }
    const response = await axios.get(`${API_BASE_URL}/services/request-history/${requestId}/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
    console.log("Envoi de la requête à:", `${API_BASE_URL}${url}`);
    console.log("Données envoyées:", JSON.stringify(data, null, 2));

    const response = await axios.post(`${API_BASE_URL}${url}`, data, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log("Réponse du serveur:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Erreur lors de la requête POST:", error.message);

    if (error.response) {
      console.error("Statut HTTP:", error.response.status);
      console.error("Détails de l'erreur:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Erreur réseau:", error.message);
    }

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

// Fonction pour créer un nouveau service
export const createService = async (data: {
  name: string;
  description: string;
  department_id: number;
  function_id: number;
  chef_id: number;
}) => {
  try {
    const token = localStorage.getItem("authToken"); // Récupère le token d'authentification

    const response = await axios.post(
      `${API_BASE_URL}/services/create-service/`,
      data,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}), // Ajoute l'authentification si disponible
        },
      }
    );

    return response.data; // Retourne les données de la réponse
  } catch (error: any) {
    console.error(
      "Erreur lors de la création du service:",
      error.response?.data || error.message
    );
    throw error; // Relance l'erreur pour une gestion ultérieure
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

export const getDepartmentSupervisor = (departmentId: string) => {
  return getRequest(`/services/departments/${departmentId}/supervisor/`);
};

export const updateDepartment = (departmentId: string, data: any) => {
  return putRequest(`/services/departments/${departmentId}/update/`, data);
};

// Export Applications
export const exportApplications = (userId: string) => {
  return getRequest(`/services/export-applications/${userId}/`);
};

// Service Request Notifications
export const getServiceRequestNotifications = () => {
  return getRequest('/services/service-request-notifications/');
};

// Payslips Management
export const getPayslips = () => {
  return getRequest('/services/payslips/');
};

export const createPayslip = (data: any) => {
  return postRequest('/services/payslips/create/', data);
};

export const getPayslip = (id: string) => {
  return getRequest(`/services/payslips/${id}/`);
};

export const deletePayslip = (id: string) => {
  return deleteRequest(`/services/payslips/${id}/delete/`);
};

export const updatePayslip = (id: string, data: any) => {
  return putRequest(`/services/payslips/${id}/update/`, data);
};

// Group Services
export const associateServiceToGroup = (groupId: string, serviceId: string) => {
  return postRequest(`/services/associate-service-to-group/${groupId}/${serviceId}/`, {});
};

export const removeServiceFromGroup = (groupId: string, serviceId: string) => {
  return postRequest(`/services/remove-service-from-group/${groupId}/${serviceId}/`, {});
};

export const getGroupServices = (groupId: string) => {
  return getRequest(`/services/view-group-services/${groupId}/`);
};

// Support Requests
export const createSupportRequest = (userId: string, data: any) => {
  return postRequest(`/services/support-requests/create/${userId}/`, data);
};

export const exportSupportRequests = (userId: string) => {
  return getRequest(`/services/support-requests/export/${userId}/`);
};

export const acceptSupportRequest = (id: string, userId: string) => {
  return postRequest(`/services/support-requests/${id}/accept/${userId}/`, {});
};

export const deleteSupportRequest = (id: string, userId: string) => {
  return deleteRequest(`/services/support-requests/${id}/delete/${userId}/`);
};

export const rejectSupportRequest = (id: string, userId: string) => {
  return postRequest(`/services/support-requests/${id}/reject/${userId}/`, {});
};

export const updateSupportRequest = (id: string, userId: string, data: any) => {
  return putRequest(`/services/support-requests/${id}/update/${userId}/`, data);
};

export const getSupportRequest = (id: string, userId: string) => {
  return getRequest(`/services/support-requests/${id}/${userId}/`);
};

export const getSupportRequestsByUserId = (userId: string) => {
  return getRequest(`/services/support-requests/${userId}/`);
};

// Service Requests
export const getServiceRequests = () => {
  return getRequest('/services/list-service-requests/');
};

export const filterServiceRequests = (params: any) => {
  return getRequest(`/services/filter-service-requests/?${new URLSearchParams(params).toString()}`);
};

// Update Service and Requests
export const updateRequestStatus = (requestId: string, data: any) => {
  return postRequest(`/services/update-request-status/${requestId}/`, data);
};

export const updateServiceRequest = (requestId: string, data: any) => {
  return postRequest(`/services/update-service-request/${requestId}/`, data);
};

export const updateService = (serviceId: string, data: any) => {
  return postRequest(`/services/update-service/${serviceId}/`, data);
};

// View Service Request Details
export const viewServiceRequestDetails = (requestId: string) => {
  return getRequest(`/services/view-service-request-details/${requestId}/`);
};