import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CounterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #c0c0c0;
    border: 2px solid #ffffff;
    border-right-color: #808080;
    border-bottom-color: #808080;
`;

const CounterValue = styled.div`
    font-size: 2rem;
    font-weight: bold;
`;

const CounterLabel = styled.div`
    font-size: 1.2rem;
    text-align: center;
`;

const TOTAL_CO2_PER_YEAR = 1567800; // metric tons emitted by GPT yearly according to: https://piktochart.com/blog/carbon-footprint-of-chatgpt/
const TREE_ABSORPTION = 0.022; // metric tons absorbed per tree according to: https://onetreeplanted.org/blogs/stories/how-much-co2-does-tree-absorb
const TOTAL_TREES_REQUIRED = TOTAL_CO2_PER_YEAR / TREE_ABSORPTION;
const PROMPTS_PER_DAY = 1000000000; // 1 billion prompts per day
const PROMPTS_PER_YEAR = PROMPTS_PER_DAY * 365;

export default function EmissionsCounter() {
    const [currentCO2, setCurrentCO2] = useState(0);
    const [currentTrees, setCurrentTrees] = useState(0);
    const [currentPrompts, setCurrentPrompts] = useState(0);

    useEffect(() => {
        const calculateCurrentValues = () => {
            const now = new Date();
            const startOfYear = new Date(now.getFullYear(), 0, 1);
            const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
            
            const totalSecondsInYear = (endOfYear.getTime() - startOfYear.getTime()) / 1000;
            const elapsedSeconds = (now.getTime() - startOfYear.getTime()) / 1000;
            
            const progress = elapsedSeconds / totalSecondsInYear;
            
            setCurrentCO2(Math.floor(TOTAL_CO2_PER_YEAR * progress));
            setCurrentTrees(Math.floor(TOTAL_TREES_REQUIRED * progress));
            setCurrentPrompts(Math.floor(PROMPTS_PER_YEAR * progress));
        };

        calculateCurrentValues();
        const interval = setInterval(calculateCurrentValues, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <CounterContainer>
            <CounterValue>{currentPrompts.toLocaleString()}</CounterValue>
            <CounterLabel>ChatGPT Prompts This Year</CounterLabel>
            <CounterValue>{currentCO2.toLocaleString()}</CounterValue>
            <CounterLabel>Metric Tons of CO2 Emitted</CounterLabel>
            <CounterValue>{currentTrees.toLocaleString()}</CounterValue>
            <CounterLabel>Trees Required to Offset</CounterLabel>
        </CounterContainer>
    );
} 