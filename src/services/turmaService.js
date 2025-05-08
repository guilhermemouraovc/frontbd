import api from './api';

export const getTurmas = async () => {
  try {
    const response = await api.get('/turmas');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTurma = async (id) => {
  try {
    const response = await api.get(`/turmas/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTurma = async (turma) => {
  try {
    const response = await api.post('/turmas', turma);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTurma = async (id, turma) => {
  try {
    const response = await api.put(`/turmas/${id}`, turma);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTurma = async (id) => {
  try {
    const response = await api.delete(`/turmas/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
