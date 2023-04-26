import React from 'react';

const Filter = ({onChange}) => {
    return (
        <div>
            <p>filter shown with  <input onChange={onChange} /></p> 
        </div>
    );
}

export default Filter;
