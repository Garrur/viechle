import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchInventory = createAsyncThunk('inventory/fetchInventory', async () => {
    const response = await axios.get('http://localhost:5000/api/inventory');
    return response.data;
});

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        filters: {
            vehicleMake: [],  // Initialize as an array
            duration: [],     // Initialize as an array
        },
    },
    reducers: {
        setVehicleMake: (state, action) => {
            state.filters.vehicleMake = action.payload;
        },
        setDuration: (state, action) => {
            state.filters.duration = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInventory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchInventory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchInventory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setVehicleMake, setDuration } = inventorySlice.actions;
export default inventorySlice.reducer;
