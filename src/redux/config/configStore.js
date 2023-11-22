import { createStore, combineReducers } from 'redux';
import user from 'redux/modules/user';
import feed from 'redux/modules/feed';

const rootReducer = combineReducers({
  user,
  feed
});
const store = createStore(rootReducer);

export default store;

const onChange = () => {
  console.log(store.getState());
};

store.subscribe(onChange);
