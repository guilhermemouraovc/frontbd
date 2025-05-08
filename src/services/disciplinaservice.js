
import api from './api';

export const getDisciplinas = async () => {
  try {
    const response = await api.get('/disciplina');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDisciplina = async (id) => {
  try {
    const response = await api.get(`/disciplina/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createDisciplina = async (disciplina) => {
  try {
    const response = await api.post('/disciplina', disciplina);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDisciplina = async (id, disciplina) => {
  try {
    const response = await api.put(`/disciplina/${id}`, disciplina);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDisciplina = async (id) => {
  try {
    const response = await api.delete(`/disciplina/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};