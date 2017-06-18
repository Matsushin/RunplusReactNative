export const SIGNUP_MODAL_ON = 'SIGNUP_MODAL_ON';
export const SIGNUP_MODAL_OFF = 'SIGNUP_MODAL_OFF';

export function signupModalOn() {
  return {
    type: SIGNUP_MODAL_ON,
  };
}

export function signupModalOff() {
  return {
    type: SIGNUP_MODAL_OFF,
  };
}
