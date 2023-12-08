import {
  configureStore, combineReducers
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tokenReducer } from './reducers';
import expireReducer from 'redux-persist-expire'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [
    expireReducer("token", {
      expireSeconds: 3599,
      expiredState: {
        token: null,
      },
    }),
  ],
};
const reducer = combineReducers({
  tokenReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);