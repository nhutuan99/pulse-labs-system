// ============================================
// TypeScript Interfaces — Shared Types
// ============================================

// --- Auth ---
export interface ILoginPayload {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  refreshToken?: string;
  username: string;
}

// --- User ---
export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserPayload {
  username: string;
  email: string;
  fullName: string;
  password: string;
  role?: string;
}

export interface UpdateUserPayload {
  email?: string;
  fullName?: string;
  role?: string;
  status?: string;
}

// --- Contact ---
export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  status: string;
  assigned: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactsResponse {
  items: Contact[];
  page: number;
  limit: number;
  total?: number;
}

export interface ContactQueryParams {
  page?: string;
  limit?: string;
  search?: string;
  type?: string;
  status?: string;
  assigned?: string;
}

export interface CreateContactPayload {
  name: string;
  email: string;
  phone?: string;
  type?: string;
  status?: string;
  assigned?: string;
  notes?: string;
}

export interface UpdateContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
  status?: string;
  assigned?: string;
  notes?: string;
}

// --- Generic API Response ---
export interface ApiResponse<T = any> {
  status: number;
  data?: T;
  error?: {
    code: string;
    type: string;
    message?: string;
  };
}
