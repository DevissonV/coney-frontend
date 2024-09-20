import { privateAxios } from '../../utils/api/axios'; 

const API_URL = '/static/dashboard.json'

export const fetchDashboardData = async () => {
  const response = await privateAxios.get(API_URL)
  const { status, code, data } = response.data

  if (!status || code !== 200) {
    throw new Error('Error fetching dashboard data')
  }

  return data
}
