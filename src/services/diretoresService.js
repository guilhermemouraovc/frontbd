
import api from './api';

// Get all directors
export const getDiretores = async () => {
  try {
    const response = await api.get('/diretores');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get a single director by ID
export const getDiretor = async (id) => {
  try {
    const response = await api.get(`/diretores/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new director
export const createDiretor = async (diretor) => {
  try {
    const response = await api.post('/diretores', diretor);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing director
export const updateDiretor = async (id, diretor) => {
  try {
    const response = await api.put(`/diretores/${id}`, diretor);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a director
export const deleteDiretor = async (id) => {
  try {
    const response = await api.delete(`/diretores/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
