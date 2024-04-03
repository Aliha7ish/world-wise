import styles from "./CityList.module.css";
import PropTypes from "prop-types";
import CityItem from "./CityItem.jsx";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import { useCity } from "../contexts/CitiesProvider.jsx";

CityList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default function CityList() {
  const { cities, isLoading } = useCity();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        return <CityItem key={city.id} city={city} />;
      })}
    </ul>
  );
}
