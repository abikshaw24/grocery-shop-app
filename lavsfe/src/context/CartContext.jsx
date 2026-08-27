import {
  createContext,
  useContext,
  useState
} from "react";


// =====================================
// CREATE CART CONTEXT
// =====================================

const CartContext = createContext();


// =====================================
// CART PROVIDER
// =====================================

export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);


  // =====================================
  // ADD TO CART
  // =====================================

  const addToCart = (product) => {

    setCart((previousCart) => {

      const existingProduct =
        previousCart.find(
          (item) =>
            item._id === product._id
        );


      // PRODUCT ALREADY EXISTS
      if (existingProduct) {

        return previousCart.map(
          (item) =>

            item._id === product._id

              ? {
                  ...item,

                  quantity:
                    item.quantity + 1
                }

              : item
        );

      }


      // NEW PRODUCT

      return [

        ...previousCart,

        {
          ...product,
          quantity: product.quantity || 1
        }

      ];

    });

  };


  // =====================================
  // INCREASE QUANTITY
  // =====================================

  const increaseQuantity = (id) => {

    setCart((previousCart) =>

      previousCart.map((item) =>

        item._id === id

          ? {
              ...item,

              quantity:
                item.quantity + 1
            }

          : item

      )

    );

  };


  // =====================================
  // DECREASE QUANTITY
  // =====================================

  const decreaseQuantity = (id) => {

    setCart((previousCart) =>

      previousCart.map((item) =>

        item._id === id

          ? {
              ...item,

              quantity:
                Math.max(
                  item.quantity - 1,
                  1
                )

            }

          : item

      )

    );

  };


  // =====================================
  // REMOVE PRODUCT
  // =====================================

  const removeFromCart = (id) => {

    setCart((previousCart) =>

      previousCart.filter(
        (item) =>
          item._id !== id
      )

    );

  };


  // =====================================
  // CLEAR CART
  // =====================================

  const clearCart = () => {

    console.log(
      "CLEARING CART..."
    );

    setCart([]);

  };


  // =====================================
  // GET CART COUNT
  // =====================================

  const getCartCount = () => {

    return cart.reduce(

      (total, item) =>
        total + Number(item.quantity),

      0

    );

  };


  // =====================================
  // GET CART TOTAL
  // =====================================

  const getCartTotal = () => {

    return cart.reduce(

      (total, item) =>

        total +
        Number(item.price) *
        Number(item.quantity),

      0

    );

  };


  // =====================================
  // PROVIDER
  // =====================================

  return (

    <CartContext.Provider

      value={{

        cart,

        addToCart,

        increaseQuantity,

        decreaseQuantity,

        removeFromCart,

        clearCart,

        getCartCount,

        getCartTotal

      }}

    >

      {children}

    </CartContext.Provider>

  );

}


// =====================================
// USE CART
// =====================================

export function useCart() {

  return useContext(
    CartContext
  );

}