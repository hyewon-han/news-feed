import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user from 'redux/modules/user';
import feeds from 'redux/modules/feeds';
import users from 'redux/modules/users';

const rootReducer = combineReducers({
  user,
  feeds,
  users
});

const persistConfig = {
  key: 'users', // 스토리지에 저장될 키
  storage // 사용할 스토리지 (로컬 스토리지)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };

const onChange = () => {
  console.log(store.getState());
};

store.subscribe(onChange);
