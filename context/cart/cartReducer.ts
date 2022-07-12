import { ICartProduct, IOderSummary } from './../../interfaces';
import { CartState } from './';


type CartActionType =
   | { type: '[Cart] - LoadCart from cookies |storage', payload: ICartProduct[] }
   | { type: '[Cart] - Add Product', payload: ICartProduct[] }
   | { type: '[Cart] - Change product quantity', payload: ICartProduct[] }
   | { type: '[Cart] - Remove product in cart', payload: ICartProduct }
   | { type: '[Cart] - Update order summary', payload: IOderSummary }



export const cartReducer = (state: CartState, action: CartActionType): CartState => {

   switch (action.type) {
      case '[Cart] - LoadCart from cookies |storage':
         return {
            ...state,
            cart: [...action.payload]
         }
      case '[Cart] - Add Product':
         return {
            ...state,
            cart: [...action.payload]
         }
      case '[Cart] - Change product quantity':
         return {
            ...state,
            cart: [...action.payload]
         }
      case '[Cart] - Remove product in cart':
         return {
            ...state,
            cart: state.cart.filter((p) => !(p._id === action.payload._id && p.size === action.payload.size))
         }
      case '[Cart] - Update order summary':
         return {
            ...state,
            ...action.payload
         }


      default:
         return state;
   }

}