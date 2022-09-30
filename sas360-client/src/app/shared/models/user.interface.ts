import { Installation } from '@shared/models/installation.interface';

export enum RoleType {
  OPERATOR,
  ADMIN,
  SUPERADMIN,
}

export interface User {
  username: string;
  password: string;
  role: RoleType;
  sRole: string;
  installation: string;
}

export interface UserResponse {
  message: string;
  token: string;
  refreshToken: string;
  userId: number;
  role: RoleType;
  installation: Installation;
}
