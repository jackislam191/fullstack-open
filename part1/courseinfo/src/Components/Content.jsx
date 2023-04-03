import React from 'react';
import Part from './Part';

const Content = (props) => {
    const contentItem = props.contentCollection.map((content, index) => 
        <Part key={index} part={content.part} exercise={content.exercise} />
    );
    return (
        <div>
            {contentItem}
        </div>
    );
}

export default Content;
