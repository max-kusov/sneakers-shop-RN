import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type CartItem = {
  id: number
  category: string
  productName: string
  description: string
  price: number
  isAvailable: boolean
  productImg: string
  productImgList: string[]
  count: number
}
interface ICartState {
  totalPrice: number
  productCart: CartItem[]
}

const initialState: ICartState = {
  totalPrice: 0,
  productCart: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartItem>) => {
      const findProduct = state.productCart.find(obj => obj.id === action.payload.id)

      if (findProduct) {
        findProduct.count++
      } else {
        state.productCart.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalPrice = state.productCart.reduce((sum: number, obj: CartItem) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    minusProduct: (state, action: PayloadAction<number>) => {
      const findProduct = state.productCart.find((obj: CartItem) => obj.id === action.payload)
      if (findProduct) {
        findProduct.count--
      }
      state.totalPrice = state.productCart.reduce((sum: number, obj: CartItem) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.productCart = state.productCart.filter((obj: CartItem) => obj.id != action.payload)

      state.totalPrice = state.productCart.reduce((sum: number, obj: CartItem) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    clearProduct: (state) => {
      state.productCart = []
      state.totalPrice = 0
    },
  },
})

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: number) => (state: RootState) => state.cart.productCart.find((obj) => obj.id === id)


export const { addProduct, removeProduct, clearProduct, minusProduct } = cartSlice.actions

export default cartSlice.reducer