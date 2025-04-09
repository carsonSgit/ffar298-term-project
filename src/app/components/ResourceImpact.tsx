import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 1rem;
    background: #c0c0c0;
    border: 2px solid #ffffff;
    border-right-color: #808080;
    border-bottom-color: #808080;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

const ResourceItem = styled.div`
    cursor: pointer;
    padding: 0.8rem;
    background: #c0c0c0;
    border: 2px solid #ffffff;
    border-right-color: #808080;
    border-bottom-color: #808080;
    
    &:hover {
        background: #d8d8d8;
    }
`;

const InfoPanel = styled.div`
    padding: 1rem;
    background: #ffffff;
    border: 2px solid #808080;
    border-right-color: #ffffff;
    border-bottom-color: #ffffff;
    margin-top: 1rem;
    font-size: 0.9rem;
`;

const Metric = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0.5rem 0;
`;

const resources = [
    {
        name: 'Data Center Power Usage',
        value: 1000,
        unit: 'TWh energy usage by data centers in 2026',
        context: 'Equivalent to the annual electricity consumption of Japan',
        impact: '"IEA forecasts that data centers’ total electricity consumption could reach more than 1,000 terawatt-hours (TWh) in 2026" (Sean Buckley, 2024). In the same IEA report, they state that that is almost equivalent to the total electricity consumption for the entire country of Japan.',
        source: 'Source: Data Center Frontier, 2024 - <a href="https://www.datacenterfrontier.com/energy/article/33038469/iea-study-sees-ai-cryptocurrency-doubling-data-center-energy-consumption-by-2026" target="_blank" rel="noopener noreferrer">Link</a>'
    },
    {
        name: 'GPT-4 Training impact',
        value: '40+ times the energy use of ',
        unit: 'GPT-3',
        context: 'As AI gets better, the resources needed for training continues to grow',
        impact: 'Training large AI models like GPT-4 results in substantial carbon emissions, which holds heavy environmental costs common with advanced AI development. The approximately 15 metric tons of CO2e is only equivalent to approximately 0.0000375% of the global annual emissions, but it`s not that simple. Training these models takes intense hardware use, and that hardware needs power, it needs energy. It`s estimated that training GPT-4 took over 40x the amount of energy it took to train GPT-3 (approx. 1.287 million kWh for GPT-3). As model complexity grows and thee expectations of capability goes up, the training will be heavier and heavier, further contributing to negative environmental impacts coming from AI related advancements which are ignored with focus being put on improvement and captialistic gain.',
        source: 'Source: Kasper Groes Albin Ludvigsen, 2025 - <a href="https://readmedium.com/the-carbon-footprint-of-gpt-4-d6c676eb21ae" target="_blank" rel="noopener noreferrer">Link</a>'
    },
    {
        name: 'Industry GPU Usage',
        value: 200,
        unit: 'TWh',
        context: 'Equivalent to the electricity consumption of approximately 2 million homes',
        impact: 'Goldman Sachs estimates that data-center power consumption for AI related operations will see an increase in 200 terawatt-hours year-by-year from 2023-2030. Doing some quick math based off of the fact that a Canadian home on average uses about 11,132.5 kWh per year, meaning the 200 TWh / 11,132.5 kWh produces an astounding number. Goldman Sachs`s estimation states that year by year, AI will require an extra 200 TWh of power that is equivalent to the energy consumption of 17.96 million Canadian homes per year.',
        source: 'Source: Goldman Sachs, 2023 - <a href="https://www.goldmansachs.com/insights/articles/AI-poised-to-drive-160-increase-in-power-demand" target="_blank" rel="noopener noreferrer">Link</a>'
    }
];

export default function ResourceImpact() {
    const [selectedResource, setSelectedResource] = useState(resources[0]);

    return (
        <Container>
            <h2 style={{ margin: '0 0 1rem 0', fontWeight: 'normal' }}>AI Environmental Impact</h2>
            <Grid>
                {resources.map(resource => (
                    <ResourceItem 
                        key={resource.name}
                        onClick={() => setSelectedResource(resource)}
                    >
                        <div>{resource.name}</div>
                        <Metric>
                            {resource.value.toLocaleString()} {resource.unit}
                        </Metric>
                        <div style={{ fontSize: '0.9rem', color: '#444' }}>
                            {resource.context}
                        </div>
                    </ResourceItem>
                ))}
            </Grid>
            <InfoPanel>
                <strong>{selectedResource.name} Impact:</strong>
                <p style={{ margin: '0.5rem 0' }}>{selectedResource.impact}</p>
                <span style={{ fontSize: '0.8rem', color: '#666' }} 
                    dangerouslySetInnerHTML={{ __html: selectedResource.source }}>
                </span>
            </InfoPanel>
        </Container>
    );
}
