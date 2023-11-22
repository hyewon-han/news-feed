import { createStore, combineReducers } from 'redux';
import user from 'redux/modules/user';

const rootReducer = combineReducers({
  user
});
const store = createStore(rootReducer);

export default store;

const onChange = () => {
  console.log(store.getState());
};

store.subscribe(onChange);
