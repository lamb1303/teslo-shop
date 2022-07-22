import { createContext } from "react";
import { ICartProduct, ShippingAddress } from "../../interfaces";

interface ContextProps {
  cart: ICartProduct[];
  addToCart: (payload: ICartProduct) => void;
  removeProductInCart: (payload: ICartProduct) => void;
  updateCartQuantity: (payload: ICartProduct, newValue: number) => void;
  numberOfItems: number;
  tax: number;
  total: number;
  subTotal: number;
  isLoaded: boolean;
  shippingAddress?: ShippingAddress;
  updateAddress: (address: ShippingAddress) => void;
  createOrder: () => Promise<{ hasError: boolean; message: string; }>
}

export const CartContext = createContext({} as ContextProps);
