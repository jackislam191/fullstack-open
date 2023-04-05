import React from 'react';
import Part from './Part';

const Content = (props) => {
    const contentItem = props.parts.map((content) => 
        <Part key={content.id} part={content.name} exercise={content.exercises} />
    );
    return (
        <div>
            {contentItem}
        </div>
    );
}

export default Content;
