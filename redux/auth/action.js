//Action Types
export const MAKE_LOGIN = "MAKE_LOGIN";
export const MAKE_LOGOUT = "MAKE_LOGOUT";

//Action Creator
export const makeLogin = payload => ({ type: MAKE_LOGIN, payload })
export const makeLogout = () => ({ type: MAKE_LOGOUT })