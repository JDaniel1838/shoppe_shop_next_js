import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const Context = createContext();
const initialQty = 1;
const initialDataUser = {
  phoneNumber: "",
  password: "",
  name: "",
  lastName: "",
  address: "",
};

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(initialQty);
  const [dataUser, setDataUser] = useState(initialDataUser);

  let foundProduct, index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (items) => items._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      /* const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          let currentProduct = {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
          console.log(`Coinside ID: ${cartProduct._id}`);
          console.log(`Voy a retornar: `);
          console.log(currentProduct);
          return currentProduct;
        }
        console.log(
          `${cartProduct.name} no coincide con búsqueda,se ejecuto fuera del if`
        );
      });
      setCartItems(updatedCartItems); */

      const updatedCartIndex = cartItems.map((cartProduct, i) => {
        if (cartProduct._id === product._id) return i;
      });

      const updatedCartItems = [...cartItems];

      console.log(updatedCartItems);
      console.log("Recibo :");
      console.log(product);
      console.log(quantity);

      updatedCartItems[updatedCartIndex].quantity =
        updatedCartItems[updatedCartIndex].quantity + quantity;

      setCartItems(updatedCartItems);
    } else {
      console.log(`Este producto aun no esta en el carrito`);
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} se han añadido al carrito`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);

    index = cartItems.findIndex((product) => product._id === id);

    const newCartItems = cartItems.filter((item) => item._id !== id);
    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        dataUser,
        setDataUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
