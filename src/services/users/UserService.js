import { privateAxios } from '../../utils/api/axios'; 

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = async () => {
  const response = await privateAxios.get(`${API_URL}/Users/getAllUsers`);
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error fetching users');
  }

  return data;
};

export const createUser = async (userData) => {
  const response = await privateAxios.post(`${API_URL}/Users/createUser`, userData);
  const { status, code, data } = response.data;

  if (!status || code !== 201) {
    throw new Error('Error creating user');
  }

  return data;
};

export const getUserById = async (id) => {
  const response = await privateAxios.get(`${API_URL}/Users/getUser/${id}`);
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error fetching user with ID ${id}`);
  }

  return data;
};

export const deleteUser = async (id) => {
  const response = await privateAxios.delete(`${API_URL}/User/deleteUser/${id}`);
  const { status, code } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error deleting user with ID ${id}`);
  }

  return true; 
};

export const editUser = async (id, userData) => {
  const response = await privateAxios.put(`${API_URL}/Users/updateUser/${id}`, userData);
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error updating user');
  }

  return data;
};


