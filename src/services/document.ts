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
export const getDocumentsList = () => {
  return getRequest('/documents/documents/');
};

// Create a document
export const createDocument = (documentData: any) => {
  return postRequest('/documents/documents/create/', documentData);
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
