// ── Login ─────────────────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

// Shape mentah dari backend (token ada di dalam users)
export interface BackendLoginResponse {
  message: string;
  users: {
    userID: string;
    username: string;
    token: string;
  };
}

// Shape yang dikirim dari /api/login ke frontend (token sudah dipisah ke cookie)
export interface LoginApiResponse {
  message: string;
  user: {
    userID: string;
    username: string;
  };
}

// ── Register ──────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  is_affiliated: boolean;
}

export interface RegisterApiResponse {
  success: string;
  message: string;
}
