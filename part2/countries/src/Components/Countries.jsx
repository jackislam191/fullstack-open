import React from "react";
import { useState } from "react";
import CountryDetail from "./CountryDetail";

const Countries = ({ countries }) => {

    const [showDetail, setShowDetail] = useState({});
    const showHideDetailHandler = (nameKey) => {
        setShowDetail({...showDetail,
        [nameKey]: !showDetail[nameKey]
        });
    }
  return (
    <div>
      {countries.length > 10
        ? "Too many matches, specify another filter"
        : countries.map((country, index) => (
            <div key={country.name.common}>
                <div>
                    <p>{country.name.common} <button onClick={() => showHideDetailHandler(country.name.common)}>{showDetail[country.name.common] ? `hide` : `show`}</button></p>
                </div>
                {showDetail[country.name.common] ? <CountryDetail country={country}/> : null}
            </div>
          ))}
    </div>
  );
};

export default Countries;
