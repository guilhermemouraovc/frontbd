
import api from './api';

export const getClubes = async () => {
  try {
    const response = await api.get('/clube');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getClube = async (id) => {
  try {
    const response = await api.get(`/clube/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createClube = async (clube) => {
  try {
    const response = await api.post('/clube', clube);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateClube = async (id, clube) => {
  try {
    const response = await api.put(`/clube/${id}`, clube);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteClube = async (id) => {
  try {
    const response = await api.delete(`/clube/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};