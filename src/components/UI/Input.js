import styles from "./Input.module.css";
import React from "react";

// React.fowardRef wrapped around Input component so MealItemForm can use the ref
//forward ref as a second parameter
//pass ref as props
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/*Key Value pairs added as props to input */}
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
