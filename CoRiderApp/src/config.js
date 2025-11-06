// src/config.js
const BASE_URL = 'http://10.0.2.2:5000'; // OR your IP address (e.g., http://192.168.x.x:5000)

export const API = {
  RIDES: `${BASE_URL}/api/rides`,
  PAYMENTS: `${BASE_URL}/api/payments`,
  RATINGS: `${BASE_URL}/api/ratings`,
  REPORTS: `${BASE_URL}/api/reports`,
  USERS: `${BASE_URL}/api/users`
};

export default BASE_URL;
