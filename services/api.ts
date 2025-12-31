
import { User, Task } from '../types';

// Use environment variable for API URL or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = (token?: string) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  const storedToken = localStorage.getItem('auth_token') || token;
  if (storedToken) {
    headers['x-auth-token'] = storedToken;
  }
  return headers;
};

// Transform MongoDB document to frontend format
const transformUser = (data: any): User => ({
  id: data._id || data.id,
  name: data.name,
  email: data.email,
  avatar: data.avatar,
  joinedAt: data.joinedAt,
});

const transformTask = (data: any): Task => ({
  id: data._id || data.id,
  userId: data.userId,
  title: data.title,
  description: data.description,
  status: data.status,
  priority: data.priority,
  createdAt: data.createdAt,
});

export const mockApi = {
  login: async (email: string, pass: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password: pass }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ msg: 'Invalid credentials' }));
      throw new Error(errorData.msg || 'Invalid credentials');
    }

    const data = await res.json();
    return { user: transformUser(data.user), token: data.token };
  },

  signup: async (name: string, email: string, pass: string) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password: pass }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ msg: 'Signup failed' }));
      throw new Error(errorData.msg || 'Signup failed');
    }

    const data = await res.json();
    return { user: transformUser(data.user), token: data.token };
  },

  me: async (token: string) => {
    const res = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: getHeaders(token),
    });

    if (!res.ok) {
      throw new Error('Unauthorized');
    }

    const data = await res.json();
    return transformUser(data);
  },

  updateProfile: async (id: string, updates: Partial<User>) => {
    const res = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });

    if (!res.ok) throw new Error('Update failed');
    const data = await res.json();
    return transformUser(data);
  },

  getTasks: async (userId: string) => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!res.ok) throw new Error('Failed to fetch tasks');
    const data = await res.json();
    return Array.isArray(data) ? data.map(transformTask) : [];
  },

  createTask: async (task: Omit<Task, 'id' | 'createdAt'>) => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(task),
    });

    if (!res.ok) throw new Error('Failed to create task');
    const data = await res.json();
    return transformTask(data);
  },

  updateTask: async (id: string, updates: Partial<Task>) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });

    if (!res.ok) throw new Error('Failed to update task');
    const data = await res.json();
    return transformTask(data);
  },

  deleteTask: async (id: string) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!res.ok) throw new Error('Failed to delete task');
  }
};

