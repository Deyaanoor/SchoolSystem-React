import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProduct,
  getProducts,
  updateProduct,
} from "../firebase/storeService";

export const addNewProduct = createAsyncThunk(
  "store/addProduct",
  async (productData, { dispatch, rejectWithValue }) => {
    try {
      const productWithImage = {
        name: productData.name,
        price: parseFloat(productData.price),
        imageUrl: productData.imageUrl,
      };

      await addProduct(productWithImage);

      dispatch(fetchProducts({ reset: true }));

      return productWithImage;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ lastDoc, reset }, { rejectWithValue }) => {
    try {
      const response = await getProducts(lastDoc, 10);
      return { products: response.products, lastDoc: response.lastDoc, reset };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "teachers/editProduct",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      await updateProduct(id, updatedData);
      return { id, updatedData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
    hasMore: true,
    lastDoc: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload && action.payload.products) {
          if (action.payload.reset) {
            state.products = action.payload.products;
          } else {
            const existingIds = new Set(
              state.products.map((product) => product.id)
            );
            const newproducts = action.payload.products.filter(
              (product) => !existingIds.has(product.id)
            );
            state.products = state.products.concat(newproducts);
          }

          state.hasMore = action.payload.products.length > 0;
          state.lastDoc = action.payload.lastDoc;
        } else {
          state.hasMore = false;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const { id, updatedData } = action.payload;
        const index = state.products.findIndex((product) => product.id === id);
        if (index !== -1) {
          state.products[index] = { ...state.products[index], ...updatedData };
        }
        state.loading = false;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
