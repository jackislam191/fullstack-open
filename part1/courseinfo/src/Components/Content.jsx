import React from 'react';
import Part from './Part';

const Content = (props) => {
    const contentItem = props.parts.map((content, index) => 
        <Part key={index} part={content.name} exercise={content.exercise} />
    );
    return (
        <div>
            {contentItem}
        </div>
    );
}

export default Content;
