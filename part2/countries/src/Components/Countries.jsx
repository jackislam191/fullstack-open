import React from "react";
import { useState } from "react";
import CountryDetail from "./CountryDetail";

const Countries = ({ countries }) => {

    const [showDetail, setShowDetail] = useState(false);
    const showHideDetailHandler = () => {
        setShowDetail(!showDetail);
    }
  return (
    <div>
      {countries.length > 10
        ? "Too many matches, specify another filter"
        : countries.map((country) => (
            <div key={country.name.common}>
                <div>
                    <p>{country.name.common}</p><button onClick={showHideDetailHandler}>show</button>
                </div>
                {showDetail ? <CountryDetail country={country}/> : null}
            </div>
          ))}
    </div>
  );
};

export default Countries;
