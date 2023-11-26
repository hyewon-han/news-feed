const SNAPSHOT_USERS = 'feeds/SNAPSHOT_USERS';

export const snapshotUsers = (payload) => {
  return { type: SNAPSHOT_USERS, payload };
};

const initialState = [];

const users = (state = initialState, action) => {
  switch (action.type) {
    case SNAPSHOT_USERS:
      return [...action.payload];
    default:
      return state;
  }
};

export default users;
