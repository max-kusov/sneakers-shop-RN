import { configureStore } from '@reduxjs/toolkit'
import cart from './slices/cartSlice'
import products from './slices/fetchSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    cart,
    products
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch