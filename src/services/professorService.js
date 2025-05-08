
import api from './api';

export const getProfessores = async () => {
  try {
    const response = await api.get('/professor');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfessor = async (id) => {
  try {
    const response = await api.get(`/professor/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProfessor = async (professor) => {
  try {
    const response = await api.post('/professor', professor);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfessor = async (id, professor) => {
  try {
    const response = await api.put(`/professor/${id}`, professor);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProfessor = async (id) => {
  try {
    const response = await api.delete(`/professor/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};