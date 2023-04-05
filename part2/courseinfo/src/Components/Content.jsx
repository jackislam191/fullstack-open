import React from 'react';
import Part from './Part';

const Content = (props) => {
    const contentItem = props.parts.map((content) => 
        <Part key={content.id} part={content.name} exercise={content.exercises} />
    );

    let sum = props.parts.reduce((total, currentVal) => total + currentVal.exercises, 0);

    return (
        <div>
            {contentItem}
            <p>total of {sum} exercises</p>
        </div>
    );
}

export default Content;
