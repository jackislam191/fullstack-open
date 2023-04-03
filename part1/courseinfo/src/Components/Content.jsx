import React from 'react';

const Content = (props) => {
    const contentItem = props.contentCollection.map((content) => 
        <p>{content.part} {content.exercise}</p>
    );
    return (
        <div>
            {contentItem}
        </div>
    );
}

export default Content;
