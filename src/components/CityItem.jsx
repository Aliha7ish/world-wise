/* eslint-disable no-unused-vars */
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useCity } from "../contexts/CitiesProvider";
CityItem.propTypes = {
  city: PropTypes.object,
  //   onActiveCity: PropTypes.func,
};
export default function CityItem({ city }) {
  const { currentCity, deleteCity } = useCity();
  const { cityName, date, emoji, id, position } = city;
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const local = navigator.language;
  const visitDate = new Intl.DateTimeFormat(local, options).format(
    new Date(date)
  );
  function handleDeleteCity(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles[`cityItem--active`] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>

        <time className={styles.date}>({visitDate})</time>
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  );
}
