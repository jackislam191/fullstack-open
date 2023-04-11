import React from 'react';

const CountryDetail = ({country}) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
              <p>capital {country.capital}</p>
              <p>area {country.area}</p>

              <h3>languages:</h3>
              <ul>
                {Object.values(country.languages).map((lang) => (
                  <li key={lang}>{lang}</li>
                ))}
              </ul>
              <img src={country.flags['png']} alt={country.flags['alt']}></img>
        </div>
    );
}

export default CountryDetail;
