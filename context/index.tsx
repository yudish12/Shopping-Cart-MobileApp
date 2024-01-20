import * as React from 'react';

export type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type ContextType = {
  cartProducts: CartType;
  setCartProducts: React.Dispatch<React.SetStateAction<CartType>>;
  addToCart: (product: ProductType) => void;
  removeFromCart: (product: ProductType) => void;
  removeFromFav: (product: ProductType) => void;
  addToFav: (product: ProductType) => void;
  favProducts: ProductType[] | [];
};

export type CartType = {
  cartProducts:
    | {
        id: number;
        title: string;
        description: string;
        price: number;
        discountPercentage: number;
        rating: number;
        stock: number;
        brand: string;
        category: string;
        thumbnail: string;
        images: string[];
        quantity: number;
      }[]
    | [];
  totalPrice: number;
  DeliveryPrice: number;
  totalQuantity: number;
};

const initCart: CartType = {
  cartProducts: [],
  totalPrice: 0,
  DeliveryPrice: 0,
  totalQuantity: 0,
};

export const CartContext = React.createContext<ContextType | null>(null);

const CartProvider = ({children}: {children: React.ReactNode}) => {
  const [cartProducts, setCartProducts] = React.useState<CartType>(initCart);
  const [favProducts, setFavProducts] = React.useState<ProductType[] | []>([]);

  const addToCart = (product: ProductType) =>
    setCartProducts(prev => {
      const updatedCart: CartType = JSON.parse(JSON.stringify(prev));
      const existingProduct = updatedCart.cartProducts.find(
        cartProduct => cartProduct.id === product.id,
      );

      if (existingProduct) {
        // Product already exists in the cart, update quantity
        existingProduct.quantity++;
      } else {
        // Product doesn't exist in the cart, add it
        const obj = {...product, quantity: 1};
        updatedCart.cartProducts = [...updatedCart.cartProducts, obj];
      }

      // Update totalQuantity and totalPrice
      updatedCart.totalQuantity++;
      updatedCart.totalPrice += product.price;

      return updatedCart;
    });

  const removeFromCart = (product: ProductType) =>
    setCartProducts(prev => {
      const updatedCart: CartType = JSON.parse(JSON.stringify(prev));
      const existingProduct = updatedCart.cartProducts.find(
        cartProduct => cartProduct.id === product.id,
      );

      if (existingProduct) {
        // Product already exists in the cart, update quantity
        if (existingProduct.quantity === 1) {
          updatedCart.cartProducts = updatedCart.cartProducts.filter(
            e => e.id !== existingProduct.id,
          );
        } else {
          existingProduct.quantity--;
        }
      } else {
        // Product doesn't exist in the cart
        return updatedCart;
      }

      // Update totalQuantity and totalPrice
      updatedCart.totalQuantity--;
      updatedCart.totalPrice -= product.price;

      return updatedCart;
    });

  const addToFav = (product: ProductType) =>
    setFavProducts(prev => [...prev, product]);

  const removeFromFav = (product: ProductType) =>
    setFavProducts(prev => prev.filter(e => e.id !== product.id));

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addToCart,
        removeFromFav,
        addToFav,
        removeFromCart,
        favProducts,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
