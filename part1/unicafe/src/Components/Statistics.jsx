import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = (props) => {
    const {good, neutral, bad} = props;
    let all = good + neutral + bad;
    let average = all === 0 ? 0 : (good - bad) / all;
    let postive = all === 0 ? 0 : (good / all) * 100 + "%";
  
    return (
        <table>
            <tbody>
                <StatisticLine text={"good"} value={good}></StatisticLine>
                <StatisticLine text={"neutral"} value={neutral}></StatisticLine>
                <StatisticLine text={"bad"} value={bad}></StatisticLine>
                <StatisticLine text={"All"} value={all}></StatisticLine>
                <StatisticLine text={"average"} value={average}></StatisticLine>
                <StatisticLine text={"positive"} value={postive}></StatisticLine>
            </tbody>
        </table>
    );
  };
export default Statistics;
