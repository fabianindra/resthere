import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from './fratures/propertySlice';

const store = configureStore({
  reducer: {
    property: propertyReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
