import React from 'react';

const Button = (props) => {
    return (
        <div>
            <button onClick={props.feedBackHandler}>{props.text}</button>
        </div>
    );
}

export default Button;
