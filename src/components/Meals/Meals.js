import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
// import styles from "./Meals.module.css";
import { Fragment } from "react";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
