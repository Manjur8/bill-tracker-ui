import { apartDetailsReducer, userInfoReducer } from '@/utils/slices';
import { combineReducers, configureStore } from '@reduxjs/toolkit'

// ========import for persists=====
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  apartmentDetails: apartDetailsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        // serializableCheck: {
        //   ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        // },
        serializableCheck: false,
        
      }),
})

// Infer the type of makeStore
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);