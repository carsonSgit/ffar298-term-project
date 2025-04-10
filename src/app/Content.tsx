"use client"

import React from 'react';
import { styled } from 'styled-components';
import { GroupBox, WindowContent, Window, WindowHeader } from 'react95';
import EmissionsCounter from './components/EmissionsCounter';
import DataCenterMap from './components/DataCenterMap';
import WealthDistribution from './components/WealthDistribution';
import ResourceImpact from './components/ResourceImpact';
import GlobalInequality from './components/GlobalInequality';

const Container = styled.div`
    display: grid;
    grid-template-columns: 70% 30%;
    height: 100vh;
    padding: 20px;
`;

const LeftColumn = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const RightColumn = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export default function Content(){
    return (
        <div>
            <Container>
                <LeftColumn>
                    <Window shadow={false} style={{padding: "20px", width: "80%"}}>
                        <h1 style={{fontWeight:"normal", marginTop:"0.5rem"}}>Growing Reliance on AI in daily use</h1>
                        <EmissionsCounter />
                        <p style={{fontSize:"1.2rem"}}>
                            According to the CEO of OpenAI, Sam Altman, ChatGPT receives <strong>1 billion+</strong> requests daily. As of May 2024, one GPT prompt produced an estimated 4.32g of CO2, which means based off of the CEO himself, ChatGPT alone produces <strong>4.32 billion grams</strong> of CO2 every single day, times 365 and we find that just OpenAI's LLM produces approximately <strong>1,567,800 metric tons</strong> of CO2 a year, to offset just one year of GPT's carbon emissions you'd need over 71 million mature trees (one tree absorbs 0.022 tons of CO2, so take 1567800/0.022 ≈ 71,263,636 trees).
                        </p>
                        <div className='sources'>
                            <p style={{fontSize:"1.1rem", fontStyle:"italic"}}>
                            Sources:
                                <a href="https://www.theverge.com/2024/12/4/24313097/chatgpt-300-million-weekly-users" target="_blank" rel="noopener noreferrer">The Verge</a>, 
                                <a href="https://piktochart.com/blog/carbon-footprint-of-chatgpt/" target="_blank" rel="noopener noreferrer">Piktochart</a>,
                                <a href="https://onetreeplanted.org/blogs/stories/how-much-co2-does-tree-absorb" target="_blank" rel="noopener noreferrer">ONETREEPLANTED</a>
                            </p>
                        </div>
                    </Window>
                    <Window shadow={false} style={{padding: "20px", width: "80%"}}>
                        <h1 style={{fontWeight:"normal", marginTop:"0.5rem"}}>AI Data Centers: Environmental Impact</h1>
                        <DataCenterMap />
                        <p style={{fontSize:"1.2rem"}}>
                            Data Centers are core to the functioning of AI world-wide. These data centers aren't necessarily problems in of themselves, but with the increasing trend of AI in contemporary times, companies have more and more incentive to produce more computing power (and even building more data centers) in aims to have the most profit possible. When it comes to cooling these data centers, facilities often rely on water-cooling for the GPUs in-facility alongside heavy power consumption. These data centers require <strong>millions</strong> of gallons of water daily as well as <strong>hundreds</strong> of megawatts of electricity.
                            Looking first at the issue of electricity, for now let us ignore the issue of fossil-fuels and coal power to produce this energy, lets simply look at the usage. Take an estimate of 100MW of energy used by these larger data centers to run, lets do some quick math. 100MW = 100,000 kW, multiply that by 24 (these data-centers run 24/7) and we get <strong>2,400,000 kWh per day</strong>. The average Canadian home is estimated to use 11,135 kWh per year, so per day, we get 11,135 / 365 = roughly <strong>30.5 kWh/day</strong>, meaning that just one of these large data centers takes as much power as it takes to power roughly <strong>78,690 Canadian homes</strong> (2.4m kWh / 30.5 kWh ≈ 78,690).
                        </p>
                        <div className='sources'>
                            <p style={{fontSize:"1.1rem", fontStyle:"italic"}}>
                            Sources:
                                <a href="https://energyrates.ca/residential-electricity-natural-gas/#:~:text=Electricity%20Use%20at%20Home&text=The%20average%20Canadian%20household%20uses,kWh%20of%20electricity%20per%20year." target="_blank" rel="noopener noreferrer">EnergyRates.ca</a>, 
                            </p>
                        </div>
                    </Window>
                    <Window shadow={false} style={{padding: "20px", width: "80%"}}>
                        <h1 style={{fontWeight:"normal", marginTop:"0.5rem"}}>AI Industry Wealth Concentration</h1>
                        <WealthDistribution />
                        <p style={{fontSize:"1.2rem"}}>
                            The rapid growth of AI has led to furthering the wealth concentration in the tech industry. While the surgence of companies such as OpenAI and Anthropic adds new companies to the list of tech giants, they pale in comparison to the financial grasp the larger tech congolmerates hold over the market. It may seem like more and more AI companies are popping up day-by-day, the grand majority of these startups are known as "GPT Wrappers", companies that leverage OpenAI's ChatGPT API as the core of their company (i.e. most AI startups add to a pseudo-pyramid scheme, with companies like OpenAI at the top)
                        </p>
                    </Window>
                    <Window shadow={false} style={{padding: "20px", width: "80%"}}>
                        <h1 style={{fontWeight:"normal", marginTop:"0.5rem"}}>Resource Extraction & Impact</h1>
                        <ResourceImpact />
                    </Window>
                    <Window shadow={false} style={{padding: "20px", width: "80%"}}>
                        <h1 style={{fontWeight:"normal", marginTop:"0.5rem"}}>Global AI Development Inequality</h1>
                        <GlobalInequality />
                        <div className='sources'>
                        <p style={{fontSize:"1.1rem", fontStyle:"italic"}}>
                            Sources:
                            <a href="https://www.abiresearch.com/news-resources/chart-data/report-artificial-intelligence-market-size-global" target="_blank" rel="noopener noreferrer">ABI Research</a>, 
                            <a href="https://ascendixtech.com/how-many-ai-companies-are-there/" target="_blank" rel="noopener noreferrer">Ascendix Tech</a>, 
                            <a href="https://datacentremagazine.com/critical-environments/north-america-data-centre-construction-surges-due-to-ai" target="_blank" rel="noopener noreferrer">Data Centre Magazine</a>, 
                            <a href="https://www.lightreading.com/data-centers/data-center-capacity-in-asia-north-america-grew-10-in-h1" target="_blank" rel="noopener noreferrer">Light Reading</a>, 
                            <a href="https://apnews.com/article/rwanda-ai-summit-7b6a83e5592f78de9c0d38da97f9fbff" target="_blank" rel="noopener noreferrer">AP News</a>, 
                            <a href="https://www.cbre.ca/insights/reports/global-data-center-trends-2023" target="_blank" rel="noopener noreferrer">CBRE</a>, 
                            <a href="https://apnews.com/article/rwanda-ai-summit-7b6a83e5592f78de9c0d38da97f9fbff" target="_blank" rel="noopener noreferrer">AP News</a>, 
                            <a href="https://www.reuters.com/technology/trump-tariffs-could-stymie-big-techs-us-data-center-spending-spree-2025-04-03" target="_blank" rel="noopener noreferrer">Reuters</a>
                        </p>
                    </div>
                    </Window>
                </LeftColumn>
                <RightColumn>
                    <Window shadow={false}>
                        <WindowHeader style={{fontWeight:"normal", fontSize:"1.3rem"}}>The Invisible Archive</WindowHeader>
                        <WindowContent>
                        <GroupBox label="Ignorance for gains" disabled={false}>
                        <p style={{fontSize:"1.2rem", lineHeight:"1.2"}}>
                            Every digital interaction by man leaves some invisible trace in our physical world. Be it a carbon signature, water footprint, energy echo, these traces form an archive of human ambition, documented not in pictures or words but by an altered composition of our atmosphere and a transformed flow of life in the Holocene. This archive grows from each AI query, each new model trained, each data transfer, each resource farmed in search of further advancement. Our environment progressively becomes a living document of our digital age, written in the language of environmental change, each entry being a record of human thought and a modification of the planet's systems. This archive is invisible to ones' eye yet visible in it's consequences, a testament to man's pursuit of the Capitalocene.
                        </p>
                        </GroupBox>
                        </WindowContent>
                    </Window>
                    <Window shadow={false}>
                        <WindowHeader style={{fontWeight:"normal", fontSize:"1.3rem"}}>The Cumulative Moment</WindowHeader>
                        <WindowContent>
                        <GroupBox label="Human desire shapes the past and future" disabled={false}>
                        <p style={{fontSize:"1.2rem", lineHeight:"1.2"}}>
                            Time collapses in the data center. A single AI operation, completed in milliseconds, draws power generated over millions of years by ancient sunlight, stored as fossil fuels. Water that fell as rain centuries ago is consumed in seconds to cool processors. The present moment becomes a compression of geological time, where the slow processes of Earth's history are accelerated into the rapid pulses of computation. Each data center is a temporal anomaly, a place where time scales from the planetary to the digital converge, creating a new kind of chronometry that measures progress not in seconds or years, but in environmental transformations.
                        </p>
                        </GroupBox>
                        </WindowContent>
                    </Window>
                    <Window shadow={false}>
                        <WindowHeader style={{fontWeight:"normal", fontSize:"1.3rem"}}>The Absent Presence</WindowHeader>
                        <WindowContent>
                        <GroupBox label="Hidden in plain sight" disabled={false}>
                        <p style={{fontSize:"1.2rem", lineHeight:"1.2"}}>
                            The things that power the technology we use day-by-day, the things that light our homes and cities, the things we take for granted, these power plants, server farms, water systems, all of it, they all exist in a parallel landscape hidden from most of us. We do not see the things that go into everything we rely on every day, and because of that, we lose appreciation and understanding of their impact on the environment. We form a paradox, the digital world which promises to make everything visible and accessible entirely depends on physical infrastructure that is deliberately obscured from us. The environmental impact stemming from all things related to AI exists in this space of absence, documented only through data and only experienced through it's consequences. An exhibition with no visitors, performance with no audience, a global transformation with no witnesses.
                        </p>
                        </GroupBox>
                        </WindowContent>
                    </Window>
                    <Window shadow={false}>
                        <WindowHeader style={{fontWeight:"normal", fontSize:"1.3rem"}}>The Ghost in the Machine</WindowHeader>
                        <WindowContent>
                        <GroupBox label="Poison for profit" disabled={false}>
                        <p style={{fontSize:"1.2rem", lineHeight:"1.2"}}>
                        AI's environmental impacts exist only in a space of absence. The ghost in the machine is not just this form of "intelligence" that we've created, but the environmental cost that we tuck away, out of sight, both incidentally and purposefully. Just like the Fukushima exclusion zone, there are spaces that we cannot, and choose not, to see. Spaces where the consequences of our capitalistic desires in pursuit of technological advancement accumulates. The heat generated by the data centers handling AI computations dissipates into the atmosphere, the water used by the cooling systems either evaporates or is not reused, the CO2 released by power generation disperses into the air, polluting our planet. These are ghosts of the digital age, invisible yet present in our every day, progressing as our desires for economic growth continue onwards in the Holocene.
                        </p>
                        </GroupBox>
                        </WindowContent>
                    </Window>
                </RightColumn>
            </Container>
        </div>
    );
};
