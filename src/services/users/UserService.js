import { privateAxios } from '../../utils/api/axios';
import { getHeaders } from '../../utils/api/headers';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Fetches all users from the API.
 * @returns {Promise<Object[]>} A list of users.
 * @throws {Error} If the request fails.
 */
export const fetchUsers = async () => {
  const response = await privateAxios.get(
    `${API_URL}/users/?limit=1000&page=1`,
    getHeaders(),
  );
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error fetching users');
  }

  return data;
};

/**
 * Creates a new user and optionally uploads a profile photo.
 * @param {Object} userData - The user data to create.
 * @returns {Promise<Object>} The created user.
 * @throws {Error} If the request fails.
 */
export const createUser = async (userData) => {
  const response = await privateAxios.post(`${API_URL}/users/`, userData);
  const { status, code, data } = response.data;
  if (!status || code !== 201) {
    throw new Error('Error creating user');
  }
  return data;
};

/**
 * Fetches a user by their ID.
 * @param {number} id - The user ID.
 * @returns {Promise<Object>} The user data.
 * @throws {Error} If the request fails.
 */
export const getUserById = async (id) => {
  const response = await privateAxios.get(
    `${API_URL}/users/${id}`,
    getHeaders(),
  );
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error fetching user with ID ${id}`);
  }

  return data;
};

/**
 * Deletes a user by their ID.
 * @param {number} id - The user ID.
 * @returns {Promise<boolean>} True if deletion was successful.
 * @throws {Error} If the request fails.
 */
export const deleteUser = async (id) => {
  const response = await privateAxios.delete(
    `${API_URL}/users/${id}`,
    getHeaders(),
  );
  const { status, code } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error deleting user with ID ${id}`);
  }

  return true;
};

/**
 * Updates a user by their ID and optionally uploads a new photo.
 * @param {number} id - The user ID.
 * @param {Object} userData - The updated user data.
 * @param {File|null} photo - Optional new photo.
 * @returns {Promise<Object>} The updated user.
 * @throws {Error} If the request fails.
 */
export const editUser = async (id, userData, photo = null) => {
  const response = await privateAxios.patch(
    `${API_URL}/users/${id}`,
    userData,
    getHeaders(),
  );

  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error updating user');
  }

  let uploadedPhotoUrl = null;

  if (photo) {
    const formData = new FormData();
    formData.append('photo', photo);

    const uploadResponse = await privateAxios.post(
      `${API_URL}/users/${id}/photo`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );

    uploadedPhotoUrl = uploadResponse.data?.data?.photoUrl || null;
  }

  return {
    ...data,
    photo_url: uploadedPhotoUrl ?? data.photo_url,
  };
};

/**
 * Approves a user by email.
 * @param {string} email - The user's email.
 * @returns {Promise<Object>} The approval response.
 * @throws {Error} If the request fails.
 */
export const approveUser = async (email) => {
  const response = await privateAxios.post(
    `${API_URL}/Users/adminVerification/${email}`,
  );
  const { status, code, data } = response.data;

  if (!status || code !== 201) {
    throw new Error('Error approving user');
  }

  return data;
};

/**
 * Resends an activation email.
 * @param {string} email - The user's email.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the request fails.
 */
export const resendEmail = async (email) => {
  const response = await privateAxios.post(
    `${API_URL}/Users/sendEmail/${email}`,
  );
  const { status, code, data } = response.data;

  if (!status || code !== 201) {
    throw new Error('Error resending email');
  }

  return data;
};

/**
 * Initiates a password recovery request.
 * @param {string} email - The user's email.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the request fails.
 */
export const recoverPassword = async (email) => {
  const response = await privateAxios.post(`${API_URL}/password-recovery`, {
    email,
  });

  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error recovering password');
  }

  return data;
};

/**
 * Changes a user's password.
 * @param {string} email - The user's email.
 * @param {string} newPassword - The new password.
 * @returns {Promise<Object>} The response data.
 * @throws {Error} If the request fails.
 */
export const changeUserPassword = async (token, newPassword) => {
  const response = await privateAxios.post(
    `${API_URL}/password-recovery/reset`,
    {
      token,
      newPassword,
    },
  );
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error changing user password');
  }

  return data;
};
