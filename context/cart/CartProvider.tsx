import { FC, useEffect, useReducer } from "react";
import { ICartProduct, IOderSummary } from "../../interfaces";
import { CartContext, cartReducer } from "./";
import Cookie from "js-cookie";

interface Props {
  children: React.ReactNode;
}

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number,
  tax: number,
  total: number,
  subTotal: number,
}

const CART_INITIAL_STATE: CartState = {
  cart: Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [],
  numberOfItems: 0,
  tax: 0,
  total: 0,
  subTotal: 0,
};

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      let cookieProducts =
        Cookie.get("cart") !== undefined ? JSON.parse(Cookie.get("cart")!) : [];
      dispatch({
        type: "[Cart] - LoadCart from cookies |storage",
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({
        type: "[Cart] - LoadCart from cookies |storage",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(state.cart), {
      expires: 3,
    });
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const oderSummary: IOderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };

    dispatch({
      type: "[Cart] - Update order summary",
      payload: oderSummary,
    });
  }, [state.cart]);

  const addToCart = (payload: ICartProduct) => {
    // Verify if exist a product with the same id
    const productsInCart = state.cart.some((p) => p._id === payload._id);
    if (!productsInCart)
      return dispatch({
        type: "[Cart] - Add Product",
        payload: [...state.cart, payload],
      });
    // Varify the size
    const productInCartButDiffSize = state.cart.some(
      (p) => p._id === payload._id && p.size === payload.size
    );
    if (!productInCartButDiffSize)
      return dispatch({
        type: "[Cart] - Add Product",
        payload: [...state.cart, payload],
      });

    // Accumulate
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== payload._id) return p;
      if (p.size !== payload.size) return p;

      p.quantity += payload.quantity;

      return p;
    });

    dispatch({ type: "[Cart] - Add Product", payload: updatedProducts });
  };

  const updateCartQuantity = (product: ICartProduct, newValue: number) => {
    const productCartToUpdate = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;
      p.quantity = newValue;
      return p;
    });
    dispatch({
      type: "[Cart] - Change product quantity",
      payload: productCartToUpdate,
    });
  };

  const removeProductInCart = (product: ICartProduct) => {
    dispatch({
      type: "[Cart] - Remove product in cart",
      payload: product,
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        updateCartQuantity,
        removeProductInCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
