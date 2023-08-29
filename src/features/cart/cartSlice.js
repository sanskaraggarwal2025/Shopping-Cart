import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchItems, addItem, updateItem, deleteItem } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
};

export const fetchAysnc = createAsyncThunk(
  'cart/fetchItems',
  async () => {
    const response = await fetchItems();
    return response.data;
  }
);
export const addAysnc = createAsyncThunk(
  'cart/addItem',
  async (item) => {
    const { id, title, thumbnail, price, brand } = item;
    const response = await addItem({ id, title, thumbnail, price, brand, quantity: 1 });
    return response.data;
  }
);
export const updateAsync = createAsyncThunk(
  'cart/updateItem',
  //thunk mai update mai ek object jata hai issliye humne id,change pe bracket lgaya
  async ({ id, change }) => {
    const response = await updateItem(id, change);
    return response.data;
  }
);
export const deleteAysnc = createAsyncThunk(
  'cart/deleteItem',
  async (id) => {
    await deleteItem(id);
    return id;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAysnc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAysnc.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(addAysnc.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(deleteAysnc.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item) => item.id === action.payload);
        state.items.splice(index, 1);
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        state.items.splice(index, 1, action.payload);
      });
  },
});

// export const { } = cartSlice.actions;


export default cartSlice.reducer;
