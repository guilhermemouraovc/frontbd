
import api from './api';

export const getLeciona = async () => {
  try {
    const response = await api.get('/leciona');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLecionaById = async (id) => {
  try {
    const response = await api.get(`/leciona/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createLeciona = async (leciona) => {
  try {
    const response = await api.post('/leciona', leciona);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateLeciona = async (id, leciona) => {
  try {
    const response = await api.put(`/leciona/${id}`, leciona);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteLeciona = async (id) => {
  try {
    const response = await api.delete(`/leciona/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};