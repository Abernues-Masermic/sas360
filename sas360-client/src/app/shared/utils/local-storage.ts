import { UserResponse } from '@shared/models/user.interface';

export function saveLocalUser(
  userresponse: UserResponse,
  username: string
): void {
  //let { userId, message, ...rest } = userresponse;
  let saveUser = {
    token: userresponse.token,
    refreshToken: userresponse.refreshToken,
    role: userresponse.role,
    username: username,
    installation: userresponse.installation,
  };
  console.log('SAVE USER', saveUser);
  localStorage.setItem('user', JSON.stringify(saveUser));
}

export function getLocalUser(): any {
  const item = localStorage.getItem('user');
  if (item) {
    return JSON.parse(item) || null;
  }
  return null;
}

export function getLocalInstallation(): string {
  let installation: string = '';
  const item = localStorage.getItem('user');
  if (item) {
    const user = JSON.parse(item) || null;
    if (user) {
      installation = user.installation;
    }
  }

  return installation;
}
