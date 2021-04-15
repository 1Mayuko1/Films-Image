import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import filmsReducer from './reducers';

const persistConfig = {
    key: 'auth',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    filmsReducer: persistReducer(persistConfig, filmsReducer)
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
