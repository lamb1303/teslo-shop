import { FC, useEffect, useReducer } from "react";
import {
  ICartProduct,
  IOderSummary,
  IOrder,
  ShippingAddress,
} from "../../interfaces";
import { CartContext, cartReducer } from "./";
import Cookie from "js-cookie";
import Cookies from "js-cookie";
import { entriesApi } from "../../apis";
import axios from "axios";

interface Props {
  children: React.ReactNode;
}

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  tax: number;
  total: number;
  subTotal: number;
  shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [],
  numberOfItems: 0,
  tax: 0,
  total: 0,
  subTotal: 0,
  shippingAddress: undefined,
};

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    if (Cookies.get("firstName")) {
      const shippingAddress = {
        firstName: Cookies.get("firstName") || "",
        lastName: Cookies.get("lastName") || "",
        address1: Cookies.get("address1") || "",
        address2: Cookies.get("address2") || "",
        city: Cookies.get("city") || "",
        country: Cookies.get("country") || "",
        phoneNumber: Cookies.get("phoneNumber") || "",
        zipCode: Cookies.get("zipCode") || "",
      };
      dispatch({
        type: "[Cart] - LoadAddress from Cookies",
        payload: shippingAddress,
      });
    }
  }, []);

  useEffect(() => {
    if (state.cart.length > 0) Cookie.set("cart", JSON.stringify(state.cart));
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

  const updateAddress = (address: ShippingAddress) => {
    Cookies.set("firstName", address.firstName);
    Cookies.set("lastName", address.lastName);
    Cookies.set("address1", address.address1);
    Cookies.set("address2", address.address2 || "");
    Cookies.set("country", address.country);
    Cookies.set("phoneNumber", address.phoneNumber);
    Cookies.set("zipCode", address.zipCode);
    Cookies.set("city", address.city);
    Cookies.set("country", address.country);
    dispatch({
      type: "[Cart] - Update Address",
      payload: address,
    });
  };

  const createOrder = async (): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    if (!state.shippingAddress) {
      throw new Error("No hay direccion de entrega");
    }

    const body: IOrder = {
      orderItems: state.cart.map((p) => ({
        ...p,
        size: p.size!,
      })),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      total: state.total,
      tax: state.tax,
      isPaid: false,
    };
    try {
      const { data } = await entriesApi.post<IOrder>("/orders", body);
      dispatch({type:'[Cart] - Order Complete'})
      return {
        hasError: false,
        message: data._id!,
      };
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: "Axios error",
        };
      }
      return {
        hasError: true,
        message: "Error no controlado, hable con el administrador",
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        updateCartQuantity,
        removeProductInCart,
        updateAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
