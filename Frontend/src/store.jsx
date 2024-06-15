import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from './components/inventorySlice';

const store = configureStore({
    reducer: {
        inventory: inventoryReducer,
    },
});

export default store;
