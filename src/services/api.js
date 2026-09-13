const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === 'string'
        ? data
        : data?.message || data?.error || 'Something went wrong';
    throw new Error(message);
  }

  return data;
}

export const api = {
  registerUser: (payload) =>
    request('/users/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  loginUser: (phoneNo) =>
    request('/users/login', {
      method: 'POST',
      body: JSON.stringify({ phoneNo })
    }),

  createPlan: (payload) =>
    request('/plans', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  addDailyActivity: (planId, payload) =>
    request(`/plans/${encodeURIComponent(planId)}/activities`, {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  getPlan: (planId) =>
    request(`/plans/${encodeURIComponent(planId)}`)
};
