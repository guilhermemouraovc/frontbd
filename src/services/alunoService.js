import api from './api';

export const getAlunos = async () => {
  try {
    const response = await api.get('/alunos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAluno = async (id) => {
  try {
    const response = await api.get(`/alunos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createAluno = async (aluno) => {
  try {
    const response = await api.post('/alunos', aluno);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAluno = async (id, aluno) => {
  try {
    const response = await api.put(`/alunos/${id}`, aluno);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAluno = async (id) => {
  try {
    const response = await api.delete(`/alunos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
