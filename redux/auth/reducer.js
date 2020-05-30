import {MAKE_LOGIN, MAKE_LOGOUT} from './action';

const initialState = {
  user: null,
  loggedIn: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_LOGIN:
      return {...state, user: action.payload, loggedIn: true};
    case MAKE_LOGOUT:
      return {...state, user: null, loggedIn: false};
    default:
      return {...state};
  }
};

export default reducer;