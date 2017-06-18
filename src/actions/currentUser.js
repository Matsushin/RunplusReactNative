export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export function setCurrentUser(user) {
  return {
    type: SIGN_IN,
    user,
  };
}

export function resetCurrentUser() {
  return {
    type: SIGN_OUT,
  };
}
