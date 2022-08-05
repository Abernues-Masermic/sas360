export type Roles = null | 'OPERATOR' | 'ADMIN';

export interface User {
  username: string;
  password: string;
  role: Roles;
  installation: string;
}

export interface UserResponse {
  message: string;
  token: string;
  refreshToken: string;
  userId: number;
  role: Roles;
}
