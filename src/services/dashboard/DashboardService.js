import { privateAxios } from '../../utils/api/axios';

const API_URL = '/static/dashboard.json';

/**
 * Fetches dashboard data from a static JSON file.
 * @returns {Promise<Object>} The dashboard data.
 * @throws {Error} If the request fails.
 */
export const fetchDashboardData = async () => {
  const response = await privateAxios.get(API_URL);
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error fetching dashboard data');
  }

  return data;
};
