import React from 'react';
import Header from './Header';
import Content from './Content';

const Course = (props) => {
    const parts = props.course.parts;

    return (
        <div>
            <Header key={props.course.id} name={props.course.name}></Header>
            <Content parts={parts}></Content>
        </div>
    );
}

export default Course;
