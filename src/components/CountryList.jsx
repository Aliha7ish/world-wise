import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import CountryItem from "./CountryItem.jsx";
import styles from "./CountryList.module.css";
import PropTypes from "prop-types";
import { useCity } from "../contexts/CitiesProvider.jsx";
CountryList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};
export default function CountryList() {
  const { cities, isLoading } = useCity();
  if (isLoading) return <Spinner />;
  const countries = cities.reduce((acc, curCity) => {
    if (!acc.map((el) => el.country).includes(curCity.country)) {
      return [...acc, { country: curCity.country, emoji: curCity.emoji }];
    } else {
      return acc;
    }
  }, []);
  console.log(countries);
  if (!countries.length)
    return <Message message="No country has been visited yet!" />;
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => {
        return <CountryItem country={country} key={country.id} />;
      })}
    </ul>
  );
}
