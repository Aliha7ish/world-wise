import styles from "./Button.module.css";
import PropTypes from "prop-types";
Button.propTypes = {
  children: PropTypes,
  onClick: PropTypes,
  type: PropTypes,
};
export default function Button({ children, onClick, type }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
