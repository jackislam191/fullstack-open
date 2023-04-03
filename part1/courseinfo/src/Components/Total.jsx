import React from 'react';

const Total = (props) => {
    let total = 0;
    props.execriseArr.map(x => total+= x);
    return (
        <div>
            <p>Number of exercises {total}</p>
        </div>
    );
}

export default Total;
