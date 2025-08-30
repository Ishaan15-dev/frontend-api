import { SALARY_API } from '../config/apiEndpoints';

// Salary list laane ke liye
export const fetchSalaries = async () => {
  const response = await fetch(`${SALARY_API}/salaries`);
  if (!response.ok) {
    throw new Error('Failed to fetch salaries');
  }
  return await response.json();
};
