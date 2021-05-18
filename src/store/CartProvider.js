import CartContext from "./cart-context";
// Manage Cart context data and
// provide context to all components that want access
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  // action dispatched by me later in code
  // state is last state snapshot of state managed by reducer
  if (action.type === "ADD") {
    //state.totalamount = old amount
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //gives us index of item if exists
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    //only works if we have the item already.
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItem;
    let updatedItems;
    //if item is already apart of the items array (...grouping)
    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      //concat similar to push but adds items and returns a new state array
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  //useReducer points at reducer func and state
  // First arg -> state
  //Second arg -> dispatch func
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      //Forward item to reducer
      type: "ADD",
      item: item,
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {/* Wraps any components that should get access to context with this component*/}
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
