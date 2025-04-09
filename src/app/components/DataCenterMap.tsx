import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import styled from 'styled-components';
import { Checkbox } from 'react95';

const MapContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const FilterPanel = styled.div`
    background: #c0c0c0;
    border: 2px solid #ffffff;
    border-right-color: #808080;
    border-bottom-color: #808080;
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`;

const MapView = styled.div`
    width: 100%;
    height: 400px;
`;

const InfoWindowContent = styled.div`
    padding: 8px;
    max-width: 300px;
    
    h3 {
        margin: 0 0 8px 0;
        color: #000;
    }
    
    p {
        margin: 4px 0;
        font-size: 0.9rem;
    }
    
    .impact {
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px solid #ccc;
    }
    
    .sources {
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px solid #ccc;
        font-size: 0.8rem;
        font-style: italic;
    }
`;

interface DataCenter {
    name: string;
    location: {
        lat: number;
        lng: number;
    };
    details: string;
    categories: string[];
}

const CATEGORIES = [
    "Water Scarcity",
    "High Carbon Emissions",
    "Employee Rights Issues",
    "Local Community Impact",
    "Power Grid Strain",
    "Coal Dependency",
    "Labor Concerns",
];

const dataCenters: DataCenter[] = [
    {
        name: "OpenAI's Primary Data Center",
        location: { lat: 37.7749, lng: -122.4194 },
        details: "San Francisco, CA - Primary AI Training Facility",
        categories: ["Water Scarcity", "High Carbon Emissions", "Local Community Impact"],
    },
    {
        name: "Microsoft Azure AI Center",
        location: { lat: 47.6425, lng: -122.1308 },
        details: "Seattle, WA - Major AI Infrastructure",
        categories: ["Water Scarcity", "High Carbon Emissions", "Local Community Impact", "Power Grid Strain"],
        
    },
    {
        name: "Google AI Data Center",
        location: { lat: 37.4220, lng: -122.0841 },
        details: "Mountain View, CA - Google AI Operations",
        categories: ["High Carbon Emissions", "Water Scarcity", "Local Community Impact"],
    },
    {
        name: "Meta AI Research Center",
        location: { lat: 37.4852, lng: -122.1484 },
        details: "Menlo Park, CA - Meta AI Infrastructure",
        categories: ["High Carbon Emissions", "Local Community Impact", "Power Grid Strain"],
    },
    {
        name: "Amazon AWS AI Center",
        location: { lat: 47.6147, lng: -122.3359 },
        details: "Seattle, WA - AWS AI Services",
        categories: ["High Carbon Emissions", "Power Grid Strain", "Employee Rights Issues", "Labor Concerns"],
    },
    {
        name: "NVIDIA AI Data Center",
        location: { lat: 37.3382, lng: -121.8863 },
        details: "Santa Clara, CA - AI Training Infrastructure",
        categories: ["High Carbon Emissions", "Water Scarcity", "Power Grid Strain"],
    },
    {
        name: "IBM AI Research Center",
        location: { lat: 41.1132, lng: -73.7181 },
        details: "Yorktown Heights, NY - IBM AI Operations",
        categories: ["High Carbon Emissions", "Local Community Impact"],
    },
    {
        name: "Intel AI Development Center",
        location: { lat: 45.5152, lng: -122.6784 },
        details: "Hillsboro, OR - Intel AI Infrastructure",
        categories: ["Water Scarcity", "High Carbon Emissions", "Local Community Impact"],
    },
    {
        name: "Tesla AI Training Center",
        location: { lat: 37.3948, lng: -122.1497 },
        details: "Palo Alto, CA - Tesla AI Operations",
        categories: [],
    },
    {
        name: "DeepMind Research Center",
        location: { lat: 51.5074, lng: -0.1278 },
        details: "London, UK - DeepMind AI Operations",
        categories: [],
    },
    {
        name: "Baidu AI Data Center",
        location: { lat: 39.9042, lng: 116.4074 },
        details: "Beijing, China - Baidu AI Infrastructure",
        categories: ["Coal Dependency"],
    },
    {
        name: "Alibaba Cloud AI Center",
        location: { lat: 30.2741, lng: 120.1551 },
        details: "Hangzhou, China - Alibaba AI Operations",
        categories: ["Water Scarcity"],
    },
    {
        name: "Tencent AI Research Center",
        location: { lat: 22.5431, lng: 114.0579 },
        details: "Shenzhen, China - Tencent AI Infrastructure",
        categories: [],
    },
    {
        name: "Reliance Jio AI Center",
        location: { lat: 19.0760, lng: 72.8777 },
        details: "Mumbai, India - Jio AI Operations",
        categories: [],
    },
    {
        name: "Tata Consultancy AI Center",
        location: { lat: 12.9716, lng: 77.5946 },
        details: "Bangalore, India - TCS AI Infrastructure",
        categories: ["Water Scarcity"],
    },
    {
        name: "Samsung AI Research Center",
        location: { lat: 37.5665, lng: 126.9780 },
        details: "Seoul, South Korea - Samsung AI Operations",
        categories: [],
    },
    {
        name: "LG AI Development Center",
        location: { lat: 37.5112, lng: 127.0981 },
        details: "Seoul, South Korea - LG AI Infrastructure",
        categories: [],
    },
    {
        name: "Huawei AI Data Center",
        location: { lat: 22.5431, lng: 114.0579 },
        details: "Shenzhen, China - Huawei AI Operations",
        categories: ["Coal Dependency"],
    },
    {
        name: "Xiaomi AI Research Center",
        location: { lat: 39.9042, lng: 116.4074 },
        details: "Beijing, China - Xiaomi AI Infrastructure",
        categories: [],
    },
    {
        name: "Infosys AI Center",
        location: { lat: 12.9716, lng: 77.5946 },
        details: "Bangalore, India - Infosys AI Operations",
        categories: ["Water Scarcity"],
    },
    {
        name: "ByteDance AI Center",
        location: { lat: 39.9042, lng: 116.4074 },
        details: "Beijing, China - TikTok AI Operations",
        categories: ["Employee Rights Issues", "Labor Concerns", "Coal Dependency"],
    },
    {
        name: "Tech Mahindra AI Hub",
        location: { lat: 17.3850, lng: 78.4867 },
        details: "Hyderabad, India - AI Development Center",
        categories: ["Water Scarcity", "Employee Rights Issues", "Labor Concerns"],
    },
    {
        name: "Oracle AI Research",
        location: { lat: 37.4852, lng: -122.2364 },
        details: "Redwood City, CA - AI Development",
        categories: ["Local Community Impact", "High Carbon Emissions"],
    },
    {
        name: "Yandex AI Center",
        location: { lat: 55.7558, lng: 37.6173 },
        details: "Moscow, Russia - AI Research Operations",
        categories: ["Employee Rights Issues", "Coal Dependency", "Labor Concerns"],
    },
    {
        name: "Kakao AI Research",
        location: { lat: 37.5665, lng: 126.9780 },
        details: "Seoul, South Korea - AI Development",
        categories: ["Employee Rights Issues", "Labor Concerns", "Water Scarcity"],
    },
    {
        name: "SenseTime AI Center",
        location: { lat: 31.2304, lng: 121.4737 },
        details: "Shanghai, China - AI Research",
        categories: ["High Carbon Emissions", "Coal Dependency", "Employee Rights Issues"],
    }
];

const mapStyles = {
    height: "100%",
    width: "100%"
};

const defaultCenter = {
    lat: 39.8283,
    lng: -98.5795
};

export default function DataCenterMap() {
    const [selectedCenter, setSelectedCenter] = React.useState<DataCenter | null>(null);
    const [activeCategories, setActiveCategories] = React.useState<Set<string>>(new Set(CATEGORIES));

    const toggleCategory = (category: string) => {
        const newCategories = new Set(activeCategories);
        if (newCategories.has(category)) {
            newCategories.delete(category);
        } else {
            newCategories.add(category);
        }
        setActiveCategories(newCategories);
    };

    const filteredDataCenters = dataCenters.filter(center => 
        center.categories.some(category => activeCategories.has(category))
    );

    return (
        <MapContainer>
            <FilterPanel>
                {CATEGORIES.map(category => (
                    <Checkbox
                        key={category}
                        checked={activeCategories.has(category)}
                        onChange={() => toggleCategory(category)}
                        label={category}
                    />
                ))}
            </FilterPanel>
            <MapView>
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={3}
                        center={defaultCenter}
                    >
                        {filteredDataCenters.map((center, index) => (
                            <Marker
                                key={index}
                                position={center.location}
                                onClick={() => setSelectedCenter(center)}
                            />
                        ))}

                        {selectedCenter && (
                            <InfoWindow
                                position={selectedCenter.location}
                                onCloseClick={() => setSelectedCenter(null)}
                            >
                                <InfoWindowContent>
                                    <h3>{selectedCenter.name}</h3>
                                    <p>{selectedCenter.details}</p>
                                </InfoWindowContent>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </LoadScript>
            </MapView>
        </MapContainer>
    );
} 