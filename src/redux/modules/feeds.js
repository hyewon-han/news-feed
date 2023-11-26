const SNAPSHOT_FEEDS = 'feeds/SNAPSHOT_FEEDS';

export const snapshotFeeds = (payload) => {
  return { type: SNAPSHOT_FEEDS, payload };
};

const initialState = [];

const feeds = (state = initialState, action) => {
  switch (action.type) {
    case SNAPSHOT_FEEDS:
      return [...action.payload];
    default:
      return state;
  }
};

export default feeds;
