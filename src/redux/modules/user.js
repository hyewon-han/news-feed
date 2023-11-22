const CREATE = 'user/CREATE';

export const createUser = (payload) => {
  return { type: CREATE, payload };
};

const initialState = [];

const user = (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      return [action.payload, ...state];
    default:
      return state;
  }
};

export default user;
