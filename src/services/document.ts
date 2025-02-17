import axios from 'axios';

// URL de base de votre API
const API_BASE_URL = 'https://www.backend.lnb-intranet.globalitnet.org';

// Fonction générique pour effectuer les requêtes GET
const getRequest = async (url: string) => {
  try {
    // Récupération dynamique du token CSRF et d'authentification
    const authToken = localStorage.getItem('authToken');  

    // Configuration des headers
    const headers: Record<string, string> = {
      'Accept': 'application/json', 
      'Content-Type': 'application/json',
    };

    if (authToken) headers['Authorization'] = `Bearer ${authToken}`; 

    // Requête GET avec Axios
    const response = await axios.get(`${API_BASE_URL}${url}`, { headers });
    return response.data;
  } catch (error: any) {
    console.error('❌ Erreur GET:', error?.response?.status, error?.response?.data || error.message);
    throw error;
  }
};


//MEDIA
/**
 * Fonction pour uploader un média.
 * @param file Le fichier à uploader.
 * @returns Les données du média créé.
 */
export const uploadMedia = async (file: File) => {
  try {
    const authToken = localStorage.getItem('authToken');  
    const csrfToken = localStorage.getItem('csrfToken'); 

    const formData = new FormData();
    formData.append('file', file); // Le champ 'file' doit correspondre à celui attendu par l'API

    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };

    if (csrfToken) headers['X-CSRFTOKEN'] = csrfToken; 
    if (authToken) headers['Authorization'] = `Bearer ${authToken}`;

    const response = await axios.post(`${API_BASE_URL}/documents/media/upload/`, formData, {
      headers,
    });

    return response.data;
  } catch (error: any) {
    console.error('Erreur lors de l\'upload du média:', error?.response?.status, error?.response?.data || error.message);
    throw error;
  }
};

// Fonction pour récupérer la liste des médias
export const getMediaList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/documents/media/`);
    return response.data.media; // Assurez-vous que la structure des données est correcte
  } catch (error) {
    console.error("Erreur lors de la récupération des médias:", error);
    throw error; // Permet à la page d'afficher l'erreur
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

// Documents API Functions

// Get list of documents
/**
 * Fonction pour récupérer la liste des documents.
 * @returns Liste des documents.
 */
export const getDocumentsList = async () => {
  return await getRequest('/documents/documents/');
};
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Si l'API attend uniquement la partie base64 sans le préfixe, utilisez :
      // resolve((reader.result as string).split(',')[1]);
      resolve(reader.result as string);
    };
    reader.onerror = (error) => reject(error);
  });
};


// Create a document
export const createDocument = async (
  title: string,
  description: string,
  fileType: string,
  file: File
) => {
  try {
    const authToken = localStorage.getItem('authToken');  

    // Conversion du fichier en base64
    const base64File = await fileToBase64(file);

    // Préparation du payload en JSON
    const payload = {
      title,
      description,
      file_type: fileType,
      file: base64File,
    };

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (authToken) headers['Authorization'] = `Bearer ${authToken}`;

    const response = await axios.post(
      `${API_BASE_URL}/documents/documents/create/`,
      payload,
      { headers }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      '❌ Erreur lors de la création du document:',
      error?.response?.status,
      error?.response?.data || error.message
    );
    throw error;
  }
};


// Update a document
export const updateDocument = (id: string, documentData: any) => {
  return putRequest(`/documents/documents/update/${id}/`, documentData);
};

// Delete a document
export const deleteDocument = (id: string) => {
  return deleteRequest(`/documents/documents/delete/${id}/`);
};

// Export documents
export const exportDocuments = () => {
  return getRequest('/documents/documents/export/');
};

// Import documents
export const importDocuments = (data: any) => {
  return postRequest('/documents/documents/import/', data);
};

// Share a document
export const shareDocument = (id: string, data: any) => {
  return postRequest(`/documents/documents/share/${id}/`, data);
};

// Archive a document
export const archiveDocument = (id: string) => {
  return postRequest(`/documents/documents/${id}/archive/`, {});
};

// Get document by ID
export const getDocumentById = (id: string) => {
  return getRequest(`/documents/documents/${id}/`);
};

// Get document audit history
export const getDocumentAuditHistory = (id: string) => {
  return getRequest(`/documents/documents/${id}/audit_history/`);
};

// Encrypt document
export const encryptDocument = (id: string) => {
  return postRequest(`/documents/documents/${id}/encrypt/`, {});
};

// Decrypt document
export const decryptDocument = (id: string) => {
  return postRequest(`/documents/documents/${id}/decrypt/`, {});
};

// Get document versions
export const getDocumentVersions = (id: string) => {
  return getRequest(`/documents/documents/${id}/versions/`);
};

// Create a new version for a document
export const createDocumentVersion = (id: string, versionData: any) => {
  return postRequest(`/documents/documents/${id}/versions/create/`, versionData);
};

// Get a specific version of a document
export const getDocumentVersion = (id: string, versionNumber: string) => {
  return getRequest(`/documents/documents/${id}/versions/${versionNumber}/`);
};

// Update a document version
export const updateDocumentVersion = (id: string, versionNumber: string, versionData: any) => {
  return putRequest(`/documents/documents/${id}/versions/${versionNumber}/update/`, versionData);
};

// Delete a document version
export const deleteDocumentVersion = (id: string, versionNumber: string) => {
  return deleteRequest(`/documents/documents/${id}/versions/${versionNumber}/delete/`);
};

// Get documents by category
export const getDocumentsByCategory = (categoryId: string) => {
  return getRequest(`/documents/documents/category/${categoryId}/`);
};

// Get documents by tag
export const getDocumentsByTag = (tagName: string) => {
  return getRequest(`/documents/documents/tag/${tagName}/`);
};

// Get documents by page
export const getDocumentsByPage = (slug: string) => {
  return getRequest(`/documents/documents/page/${slug}/`);
};
