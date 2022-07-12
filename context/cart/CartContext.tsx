import { createContext } from "react";
import { ICartProduct } from "../../interfaces";

interface ContextProps {
  cart: ICartProduct[];
  addToCart: (payload: ICartProduct) => void;
  removeProductInCart: (payload: ICartProduct) => void;
  updateCartQuantity: (payload: ICartProduct, newValue: number) => void;
  numberOfItems: number;
  tax: number;
  total: number;
  subTotal: number;
}

export const CartContext = createContext({} as ContextProps);
