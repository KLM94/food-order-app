import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          name={cartItem.name}
          amount={cartItem.amount}
          price={cartItem.price}
          onRemove={cartItemRemoveHandler.bind(null, cartItem.id)}
          onAdd={cartItemAddHandler.bind(null, cartItem)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

//   return (
//     <Modal onClose={props.onClose}>
//       <ul className={styles["cart-items"]}>
//         {cartCtx.items.map((cartItem) => {
//           return (
//             <CartItem
//               key={cartItem.id}
//               name={cartItem.name}
//               amount={cartItem.amount}
//               price={cartItem.price}
//               //bind ensures id is passed to respective functions
//               //bind preconfigures the function with arg
//               onRemove={cartItemRemoveHandler.bind(null, cartItem.id)}
//               onAdd={cartItemAddHandler.bind(null, cartItem.item)}
//             />
//           );
//         })}
//       </ul>
//       <div className={styles.total}>
//         <span>Total Amount</span>
//         <span>{totalAmount}</span>
//       </div>
//       <div className={styles.actions}>
//         {/* hideCartHandler func passed to Close onClick via props */}
//         <button className={styles["button--alt"]} onClick={props.onClose}>
//           Close
//         </button>
//         {hasItems && <button className={styles.button}>Order</button>}
//       </div>
//     </Modal>
//   );
// };

export default Cart;
