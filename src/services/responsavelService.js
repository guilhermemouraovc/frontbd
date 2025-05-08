
import api from './api';

export const getResponsaveis = async () => {
  try {
    const response = await api.get('/responsavel');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getResponsavel = async (id) => {
  try {
    const response = await api.get(`/responsavel/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createResponsavel = async (responsavel) => {
  try {
    const response = await api.post('/responsavel', responsavel);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateResponsavel = async (id, responsavel) => {
  try {
    const response = await api.put(`/responsavel/${id}`, responsavel);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteResponsavel = async (id) => {
  try {
    const response = await api.delete(`/responsavel/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};