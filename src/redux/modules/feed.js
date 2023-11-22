const CREATE = 'feed/CREATE';

export const createFeed = (payload) => {
  return { type: CREATE, payload };
};

const initialState = [];

const feed = (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      return [action.payload, ...state];
    default:
      return state;
  }
};

export default feed;
