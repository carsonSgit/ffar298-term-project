import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 1rem;
    background: #c0c0c0;
    border: 2px solid #ffffff;
    border-right-color: #808080;
    border-bottom-color: #808080;
`;

const BarContainer = styled.div`
    display: flex;
    align-items: flex-end;
    height: 300px;
    gap: 2rem;
    padding: 1rem;
    margin: 1rem 0;
`;

const BarGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
`;

interface BarProps {
    height: number;
    color: string;
    title: string;
    value: number;
    minHeight: number;
}

const Bar = styled.div<BarProps>`
    width: 100%;
    height: ${props => props.height}%;
    background-color: ${props => props.color};
    transition: height 0.5s ease;
    position: relative;
    cursor: pointer;
    border: 2px solid #ffffff;
    border-right-color: #808080;
    border-bottom-color: #808080;
    min-height: ${props => Math.max(props.minHeight, 10)}px; 
    max-height: 100%;

    &:hover {
        opacity: 0.8;
    }

    &:hover::after {
        content: '${props => props.title}\\A$${props => props.value}B';
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        background: #000;
        color: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        white-space: pre;
        z-index: 1;
    }
`;

const Label = styled.div`
    margin-top: 0.5rem;
    font-size: 0.9rem;
    text-align: center;
`;

const Legend = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    font-size: 0.9rem;
`;

const companies = [
    { name: 'OpenAI', value: 157, color: '#007ACC' }, // source: https://csimagazine.com/csi/AI-startups-vc-valuations-2024.php
    { name: 'Anthropic', value: 40, color: '#00A550' }, // source: https://csimagazine.com/csi/AI-startups-vc-valuations-2024.php
    { name: 'Nvidia', value: 3400, color: '#76B900' }, // source: https://www.barchart.com/story/news/30481526/nvidia-is-predicted-to-become-a-10-trillion-company-is-it-too-late-to-buy-nvda-stock#:~:text=With%20its%20current%20market%20cap,sectors%20and%20seizing%20new%20opportunities.
    { name: 'Alphabet (Google)', value: 2400, color: '#4285F4' },// source: https://stockanalysis.com/stocks/googl/statistics/
    { name: 'Microsoft', value: 4000, color: '#00A4EF' } // source: https://stockanalysis.com/stocks/msft/statistics/
];

export default function WealthDistribution() {
    const maxValue = Math.max(...companies.map(c => c.value));
    
    const minHeightRatio = 5; 
    const containerHeight = 300;  

    return (
        <Container>
            <h2 style={{ margin: '0 0 3.5rem 0', fontWeight: 'normal' }}>AI Company Valuations (Billions USD)</h2>
            <BarContainer>
                {companies.map((company, index) => {
                    const barHeight = (company.value / maxValue) * 100;
                    const barMinHeight = company.value * minHeightRatio; 

                    const finalMinHeight = Math.max(barMinHeight, containerHeight) / 80;

                    return (
                        <BarGroup key={index}>
                            <Bar 
                                height={barHeight}
                                color={company.color}
                                title={company.name}
                                value={company.value}
                                minHeight={finalMinHeight}
                            />
                            <Label>{company.name}</Label>
                        </BarGroup>
                    );
                })}
            </BarContainer>
            <Legend>
                <span>Sources: 
                    <a href="https://csimagazine.com/csi/AI-startups-vc-valuations-2024.php" target='_blank' rel="noopener noreferrer">CSI</a>, 
                    <a href="https://www.barchart.com/story/news/30481526/nvidia-is-predicted-to-become-a-10-trillion-company-is-it-too-late-to-buy-nvda-stock#:~:text=With%20its%20current%20market%20cap,sectors%20and%20seizing%20new%20opportunities." target='_blank' rel="noopener noreferrer">Barchart</a>,
                    <a href="https://stockanalysis.com/stocks/googl/statistics/" target='_blank' rel="noopener noreferrer">StockAnalysis (Google)</a>,
                    <a href="https://stockanalysis.com/stocks/msft/statistics/" target='_blank' rel="noopener noreferrer">StockAnalysis (Microsoft)</a> 
                 </span>
            </Legend>
        </Container>
    );
}