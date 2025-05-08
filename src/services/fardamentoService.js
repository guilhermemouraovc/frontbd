
import api from './api';

export const getFardamentos = async () => {
  try {
    const response = await api.get('/fardamento');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFardamento = async (id) => {
  try {
    const response = await api.get(`/fardamento/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createFardamento = async (fardamento) => {
  try {
    const response = await api.post('/fardamento', fardamento);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFardamento = async (id, fardamento) => {
  try {
    const response = await api.put(`/fardamento/${id}`, fardamento);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFardamento = async (id) => {
  try {
    const response = await api.delete(`/fardamento/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};