const CREATE = 'user/CREATE';
const LOGIN_USER = 'user/LOGIN_USER';
const LOGOUT_USER = 'user/LOGOUT_USER';

export const createUser = (payload) => {
  return { type: CREATE, payload };
};

export const logInUser = (payload) => {
  return { type: LOGIN_USER, payload };
};

export const logOutUser = () => {
  return { type: LOGOUT_USER };
};

const initialState = [];

const user = (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      return [action.payload, ...state];
    case LOGIN_USER:
      return action.payload;
    case LOGOUT_USER:
      return state;
    default:
      return state;
  }
};

export default user;
