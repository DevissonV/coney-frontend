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
  const response = await privateAxios.delete(`${API_URL}/Users/deleteUser/${id}`);
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

export const approveUser = async (email) => {
  const response = await privateAxios.post(`${API_URL}/Users/adminVerification/${email}`);
  const { status, code, data } = response.data;

  if (!status || code !== 201) {
    throw new Error('Error approving user');
  }

  return data;
};

export const resendEmail = async (email) => {
  const response = await privateAxios.post(`${API_URL}/Users/sendEmail/${email}`);
  const { status, code, data } = response.data;

  if (!status || code !== 201) {
    throw new Error('Error resending email');
  }

  return data;
};

export const recoverPassword = async (email) => {
  const response = await privateAxios.post(`${API_URL}/Users/recoveryUserPassword/${email}`);
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error recovering password');
  }

  return data;
};

export const changeUserPassword = async (email, newPassword) => {
  const response = await privateAxios.post(`${API_URL}/Users/changeUserPassword`, {
    NewPassword: newPassword,
    Email: email
  });
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error changing user password');
  }

  return data;
};