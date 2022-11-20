import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from '../store';

export type ProductType = {
  id: number
  category: string
  productName: string
  description: string
  price: number
  isAvailable: boolean
  productImg: string
  productImgList: string[]
  count?: number // ????????????
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface IProducts {
  products: ProductType[],
  status: Status
}

const initialState: IProducts = {
  products: [],
  status: Status.LOADING
}
//AsyncThunkAction

export const fetchItems = createAsyncThunk(
  'products/fetchItemsStatus',
  async () => {
    const { data } = await axios.get<ProductType[]>('https://6367b15cedc85dbc84d9a86f.mockapi.io/items')
    return data as ProductType[]
  }
)
export const fetchSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.status = Status.LOADING
      state.products = []
    }),
      builder.addCase(fetchItems.fulfilled, (state, action) => {
        state.products = action.payload
        state.status = Status.SUCCESS
      }),
      builder.addCase(fetchItems.rejected, (state) => {
        state.status = Status.ERROR
        state.products = []
      })
  }
})

export const selectProducts = (state: RootState) => state.products

export const { setProducts } = fetchSlice.actions

export default fetchSlice.reducer