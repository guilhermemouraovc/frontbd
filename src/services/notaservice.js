import api from './api';

export const getNotas = async () => {
  try {
    const response = await api.get('/notas');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNota = async (id) => {
  try {
    const response = await api.get(`/notas/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createNota = async (nota) => {
  try {
    const response = await api.post('/notas', nota);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateNota = async (id, nota) => {
  try {
    const response = await api.put(`/notas/${id}`, nota);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteNota = async (id) => {
  try {
    const response = await api.delete(`/notas/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
