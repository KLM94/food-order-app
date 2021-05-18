import React from "react";

// Cart context created to use data in multiple places of the app

const CartContext = React.createContext({
  //Store items
  items: [],
  totalAmount: 0,
  // recieves item that will be added
  addItem: (item) => {},
  // recieves id which identifies item to be removed
  removeItem: (id) => {},
});

export default CartContext;
