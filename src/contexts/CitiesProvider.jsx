/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";
const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { isLoading: true, ...state };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payLoad,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payLoad],
        currentCity: action.payLoad,
      };
    case "city/got":
      return { ...state, isLoading: false, currentCity: action.payLoad };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payLoad),
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payLoad };
  }
}

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = state;

  useEffect(function () {
    async function citiesAPI() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payLoad: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payLoad: "There was an error fetching data...",
        });
      }
    }
    citiesAPI();
  }, []);

  async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/got", payLoad: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payLoad: "There was an error of getting current city...",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payLoad: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payLoad: "There was an error creating new city...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payLoad: id });
    } catch (err) {
      dispatch({
        type: "rejected",
        payLoad: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCity() {
  const city = useContext(CitiesContext);
  if (city === undefined)
    throw new Error("context is used by outsider component!");
  return city;
}

export { CitiesProvider, useCity };
