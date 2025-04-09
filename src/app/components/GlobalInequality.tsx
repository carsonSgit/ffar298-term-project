import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Progress } from 'react95';

const Container = styled.div`
    padding: 2rem;
    background: #c0c0c0;
    border: 2px solid #ffffff;
    border-right-color: #808080;
    border-bottom-color: #808080;
    min-height: 400px;
    position: relative;
    overflow: hidden;
`;

const AccessDenied = styled.div<{ visible: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff0000;
    font-size: 2rem;
    font-weight: bold;
    opacity: ${props => props.visible ? 1 : 0};
    transition: opacity 0.5s ease;
    z-index: 10;
    pointer-events: none;
`;

const Terminal = styled.div`
    font-family: 'Courier New', monospace;
    background: #000;
    color: #0f0;
    padding: 1rem;
    margin: 1rem 0;
    height: 400px;
    overflow-y: auto;
    border: 1px solid #0f0;
    cursor: text;
    user-select: text;
`;

const Message = styled.div<{ delay: number; isTyping?: boolean }>`
    opacity: 0;
    animation: ${props => props.isTyping ? 'typing 0.1s steps(1)' : 'fadeIn 0.5s ease'} forwards;
    animation-delay: ${props => props.delay}s;
    margin: 0.5rem 0;
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes typing {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 1; }
    }
`;

const RegionInfo = styled.div`
    background: #ffffff;
    border: 2px solid #808080;
    border-right-color: #ffffff;
    border-bottom-color: #ffffff;
    padding: 1rem;
    margin-top: 1rem;
`;

const ProgressBar = styled.div<{ progress: number }>`
    width: 100%;
    height: 20px;
    background: #c0c0c0;
    border: 2px solid #808080;
    border-right-color: #ffffff;
    border-bottom-color: #ffffff;
    margin: 1rem 0;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: ${props => props.progress}%;
        background: #000080;
        transition: width 1s ease;
    }
`;

const CommandInput = styled.input`
    background: transparent;
    border: none;
    color: #0f0;
    font-family: 'Courier New', monospace;
    font-size: 1rem;
    width: 100%;
    outline: none;
    margin-top: 0.5rem;
`;

interface Command {
    name: string;
    description: string;
    action: (region: RegionData) => string[];
}

const commands: { [key: string]: Command } = {
    help: {
        name: 'help',
        description: 'Show available commands',
        action: () => [
            'Available commands:',
            'help - Show this help message',
            'info - Show region information',
            'stats - Display AI investment statistics',
            'impact - Show environmental and labor impacts',
            'access - Check current access level',
            'sources - View data sources',
            'compare <region> - Compare with another region',
            'clear - Clear terminal'
        ]
    },
    info: {
        name: 'info',
        description: 'Show information about the current region',
        action: (region) => [
            `Region: ${region.name}`,
            `Access Level: ${region.accessLevel}%`,
            `AI Investment: ${region.aiInvestment}% of global investment`,
            `Data Centers: ${region.dataCenter}% of global capacity`,
            '\nType `impact` for detailed impact information',
            'Type `sources` to view data sources'
        ]
    },
    stats: {
        name: 'stats',
        description: 'Show AI investment statistics',
        action: (region) => [
            'Global AI Investment Distribution:',
            'North America: 43%',
            'Asia-Pacific: 33%',
            'EMEA: 24%',
            'Latin America: 14%',
            `\nCurrent region (${region.name}) investment: ${region.aiInvestment}%`,
            '\nType `sources` to view data sources'
        ]
    },
    impact: {
        name: 'impact',
        description: 'Show environmental and labor impacts',
        action: (region) => [
            'Environmental Impact:',
            region.environmentalImpact,
            '\nLabor Impact:',
            region.laborImpact,
            '\nType `sources` to view data sources'
        ]
    },
    access: {
        name: 'access',
        description: 'Check current access level and restrictions',
        action: (region) => [
            `Current Access Level: ${region.accessLevel}%`,
            region.accessLevel < 50 ? 'Status: ACCESS DENIED' : 'Status: ACCESS GRANTED',
            region.accessLevel < 50 ? 'Reason: Insufficient infrastructure and resources' : 'Reason: Adequate infrastructure and resources',
            '\nType `compare <region>` to compare with other regions'
        ]
    },
    sources: {
        name: 'sources',
        description: 'View data sources',
        action: (region) => [
            'Data Sources:',
            'Market Size: ABI Research (2024)',
            'Data Center Trends: CBRE Global Data Center Trends 2023',
            'Labor Impact: AP News, Reuters',
            'Environmental Impact: Data Centre Magazine, Light Reading',
            '\nType `help` for more commands'
        ]
    },
    compare: {
        name: 'compare',
        description: 'Compare with another region',
        action: (region) => [
            'Usage: compare <region>',
            'Example: compare Asia-Pacific',
            '\nAvailable regions:',
            'North America',
            'Asia-Pacific',
            'EMEA',
            'Latin America',
            'Africa'
        ]
    },
    clear: {
        name: 'clear',
        description: 'Clear the terminal',
        action: () => []
    }
};

interface RegionData {
    name: string;
    aiInvestment: number;
    dataCenter: number;
    laborImpact: string;
    environmentalImpact: string;
    accessLevel: number;
    messages: string[];
}

const regions: RegionData[] = [
    {
        name: 'North America',
        aiInvestment: 43,
        dataCenter: 10,
        laborImpact: 'White-collar job displacement risk in U.S. urban centers',
        environmentalImpact: 'High energy use from AI-driven data center boom, especially in Northern Virginia and Dallas',
        accessLevel: 100,
        messages: [
            'Access granted to AI development resources',
            'Full access to training data and computing infrastructure',
            'Priority access to AI research facilities',
            'Complete access to AI development tools'
        ]
    },
    {
        name: 'Asia-Pacific',
        aiInvestment: 33,
        dataCenter: 30,
        laborImpact: 'Automation risks in logistics and manufacturing sectors',
        environmentalImpact: 'Rapid data center growth increasing carbon emissions',
        accessLevel: 80,
        messages: [
            'Partial access to AI development resources',
            'Limited access to training data',
            'Restricted access to computing infrastructure',
            'Basic access to AI development tools'
        ]
    },
    {
        name: 'EMEA',
        aiInvestment: 24,
        dataCenter: 28,
        laborImpact: 'Mixed job displacement across sectors',
        environmentalImpact: 'Grid strain from AI-related energy demand increases',
        accessLevel: 70,
        messages: [
            'Moderate access to AI development resources',
            'Partial access to training data',
            'Access to mid-level computing infrastructure',
            'Some advanced AI tools available'
        ]
    },
    {
        name: 'Latin America',
        aiInvestment: 14,
        dataCenter: 10,
        laborImpact: 'Need for upskilling amid automation threats',
        environmentalImpact: 'Brazil\'s data center expansion straining energy resources',
        accessLevel: 40,
        messages: [
            'Access denied to advanced AI models',
            'Limited access to computing resources',
            'Restricted access to training data',
            'Basic infrastructure only'
        ]
    },
    {
        name: 'Africa',
        aiInvestment: 2,
        dataCenter: 6,
        laborImpact: 'Women in outsourcing sector at higher risk of displacement',
        environmentalImpact: 'Digital infrastructure growth stressing limited energy systems',
        accessLevel: 20,
        messages: [
            'Access denied to AI development',
            'No access to computing infrastructure',
            'No access to training data',
            'Resource extraction only'
        ]
    }
];

export default function GlobalInequality() {
    const [selectedRegion, setSelectedRegion] = useState<RegionData>(regions[0]);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [showAccessDenied, setShowAccessDenied] = useState(false);
    const [command, setCommand] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex(prev => (prev + 1) % selectedRegion.messages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [selectedRegion]);

    const handleRegionClick = (region: RegionData) => {
        console.log('Region clicked:', region.name);
        setSelectedRegion(region);
        setShowAccessDenied(region.accessLevel < 50);
        setCommandHistory([]);
        setCommand('');
    };

    const handleCommandSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && command.trim()) {
            const cmdParts = command.toLowerCase().trim().split(' ');
            const cmd = cmdParts[0];
            const args = cmdParts.slice(1);
            
            const newHistory = [...commandHistory, `> ${command}`];
            
            if (cmd === 'clear') {
                setCommandHistory([]);
            } else if (cmd === 'compare' && args.length > 0) {
                const targetRegion = regions.find(r => 
                    r.name.toLowerCase() === args.join(' ').toLowerCase()
                );
                if (targetRegion) {
                    const comparison = [
                        `\nComparing ${selectedRegion.name} with ${targetRegion.name}:`,
                        `\nAI Investment:`,
                        `${selectedRegion.name}: ${selectedRegion.aiInvestment}%`,
                        `${targetRegion.name}: ${targetRegion.aiInvestment}%`,
                        `\nData Centers:`,
                        `${selectedRegion.name}: ${selectedRegion.dataCenter}%`,
                        `${targetRegion.name}: ${targetRegion.dataCenter}%`,
                        `\nAccess Level:`,
                        `${selectedRegion.name}: ${selectedRegion.accessLevel}%`,
                        `${targetRegion.name}: ${targetRegion.accessLevel}%`
                    ];
                    setCommandHistory([...newHistory, ...comparison]);
                } else {
                    setCommandHistory([
                        ...newHistory,
                        'Region not found. Type `compare` for available regions.'
                    ]);
                }
            } else if (commands[cmd]) {
                const responses = commands[cmd].action(selectedRegion);
                setCommandHistory([...newHistory, ...responses]);
            } else {
                setCommandHistory([
                    ...newHistory,
                    'Command not found. Type `help` to see available commands.'
                ]);
            }
            
            setCommand('');
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 100);
        }
    };

    return (
        <Container>
            <h2 style={{ margin: '0 0 1rem 0', fontWeight: 'normal' }}>Global AI Development Access</h2>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {regions.map(region => (
                    <Button
                        key={region.name}
                        onClick={() => handleRegionClick(region)}
                        active={selectedRegion.name === region.name}
                        style={{ minWidth: '120px', margin: '4px' }}
                    >
                        {region.name}
                    </Button>
                ))}
            </div>

            <AccessDenied visible={showAccessDenied}>
                ACCESS DENIED
            </AccessDenied>

            <Terminal>
                {selectedRegion.messages.map((message, index) => (
                    <Message key={index} delay={index * 0.5}>
                        {`> ${message}`}
                    </Message>
                ))}
                {commandHistory.map((cmd, index) => (
                    <Message key={`cmd-${index}`} delay={0}>
                        {cmd}
                    </Message>
                ))}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#0f0' }}>{'>'}</span>
                    <CommandInput
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyDown={handleCommandSubmit}
                        placeholder="Type `help` for available commands..."
                    />
                </div>
            </Terminal>
        </Container>
    );
} 