import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './Components/Countries';

const App = () => {
    const [countries, setCountries] = useState([]);
    const [countriesFilter, setCountriesFilter] = useState('');
    const restCountriesUrl = 'https://restcountries.com';

    useEffect(() => {
        axios.get(`${restCountriesUrl}/v3.1/all`)
        .then((response) => {
            setCountries(response.data);
        });
    }, []);

    const countriesInputFilter = (event) => {
        setCountriesFilter(event.target.value);
    }

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(countriesFilter));
    return (
        <div>
            find countries<input type="text" onChange={countriesInputFilter} />
            <Countries countries={filteredCountries}></Countries>
            
        </div>
    );
}

export default App;
