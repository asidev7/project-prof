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

// Communication API Functions

// Archive a message
export const archiveMessage = (messageId: string) => {
  return postRequest(`/communication/archive_message/${messageId}/`, {});
};

// Archive a poll
export const archivePoll = (pollId: string) => {
  return postRequest(`/communication/archive_poll/${pollId}/`, {});
};

// Archive a publication
export const archivePublication = (publicationId: string) => {
  return postRequest(`/communication/archive_publication/${publicationId}/`, {});
};

// Comment on a publication
export const commentOnPublication = (publicationId: string, commentData: any) => {
  return postRequest(`/communication/comment_on_publication/${publicationId}/`, commentData);
};

// Create a communication request
export const createCommunicationRequest = (requestData: any) => {
  return postRequest(`/communication/create_communication_request/`, requestData);
};

// Create a conversation
export const createConversation = (conversationData: any) => {
  return postRequest(`/communication/create_conversation/`, conversationData);
};

// Create a poll
export const createPoll = (pollData: any) => {
  return postRequest(`/communication/create_poll/`, pollData);
};

// Create a publication
export const createPublication = (publicationData: any) => {
  return postRequest(`/communication/create_publication/`, publicationData);
};

// Delete a communication request
export const deleteCommunicationRequest = (requestId: string) => {
  return deleteRequest(`/communication/delete_communication_request/${requestId}/`);
};

// Delete a conversation
export const deleteConversation = (conversationId: string) => {
  return deleteRequest(`/communication/delete_conversation/${conversationId}/`);
};

// Delete a message
export const deleteMessage = (messageId: string) => {
  return deleteRequest(`/communication/delete_message/${messageId}/`);
};

// Delete a poll
export const deletePoll = (pollId: string) => {
  return deleteRequest(`/communication/delete_poll/${pollId}/`);
};

// Delete a publication
export const deletePublication = (publicationId: string) => {
  return deleteRequest(`/communication/delete_publication/${publicationId}/`);
};

// Filter messages by conversation ID
export const filterMessages = (conversationId: string) => {
  return getRequest(`/communication/filter_messages/${conversationId}/`);
};

// Forward a message
export const forwardMessage = (messageId: string) => {
  return postRequest(`/communication/forward_message/${messageId}/`, {});
};

// Mark a message as read
export const markMessageAsRead = (messageId: string) => {
  return postRequest(`/communication/mark_message_as_read/${messageId}/`, {});
};

// Reply to a message
export const replyToMessage = (messageId: string, replyData: any) => {
  return postRequest(`/communication/reply_to_message/${messageId}/`, replyData);
};

// Respond to a poll
export const respondToPoll = (pollId: string, responseData: any) => {
  return postRequest(`/communication/respond_to_poll/${pollId}/`, responseData);
};

// Search messages by conversation ID
export const searchMessages = (conversationId: string) => {
  return getRequest(`/communication/search_messages/${conversationId}/`);
};

// Send a group message
export const sendGroupMessage = (groupMessageData: any) => {
  return postRequest(`/communication/send_group_message/`, groupMessageData);
};

// Send a message
export const sendMessage = (messageData: any) => {
  return postRequest(`/communication/send_message/`, messageData);
};

// Update a communication request
export const updateCommunicationRequest = (requestId: string, requestData: any) => {
  return postRequest(`/communication/update_communication_request/${requestId}/`, requestData);
};

// Update a conversation
export const updateConversation = (conversationId: string, conversationData: any) => {
  return postRequest(`/communication/update_conversation/${conversationId}/`, conversationData);
};

// Update a message
export const updateMessage = (messageId: string, messageData: any) => {
  return postRequest(`/communication/update_message/${messageId}/`, messageData);
};

// Update a poll
export const updatePoll = (pollId: string, pollData: any) => {
  return postRequest(`/communication/update_poll/${pollId}/`, pollData);
};

// Update a publication
export const updatePublication = (publicationId: string, publicationData: any) => {
  return postRequest(`/communication/update_publication/${publicationId}/`, publicationData);
};

// View communication requests
export const viewCommunicationRequests = () => {
  return getRequest(`/communication/view_communication_requests/`);
};

// View conversations
export const viewConversations = () => {
  return getRequest(`/communication/view_conversations/`);
};

// View messages in a conversation
export const viewMessages = (conversationId: string) => {
  return getRequest(`/communication/view_messages/${conversationId}/`);
};

// View poll responses
export const viewPollResponses = (pollId: string) => {
  return getRequest(`/communication/view_poll_responses/${pollId}/`);
};

// View poll results
export const viewPollResults = (pollId: string) => {
  return getRequest(`/communication/view_poll_results/${pollId}/`);
};

// View all polls
export const viewPolls = () => {
  return getRequest(`/communication/view_polls/`);
};

// View publication comments
export const viewPublicationComments = (publicationId: string) => {
  return getRequest(`/communication/view_publication_comments/${publicationId}/`);
};

// View all publications
export const viewPublications = () => {
  return getRequest(`/communication/view_publications/`);
};
