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
    environmentalImpact: {
        waterUsage?: string;
        energyUsage?: string;
        carbonEmissions?: string;
        additionalImpact?: string;
    };
    sources: string[];
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
        environmentalImpact: {
            waterUsage: "1.7 million gallons of water daily for cooling",
            energyUsage: "Estimated 100MW power consumption",
            carbonEmissions: "Approximately 50,000 metric tons CO2 annually",
            additionalImpact: "Located in drought-prone California region"
        },
        categories: ["Water Scarcity", "High Carbon Emissions", "Local Community Impact"],
        sources: [
            "https://www.theverge.com/2024/12/4/24313097/chatgpt-300-million-weekly-users",
            "https://piktochart.com/blog/carbon-footprint-of-chatgpt/"
        ]
    },
    {
        name: "Microsoft Azure AI Center",
        location: { lat: 47.6425, lng: -122.1308 },
        details: "Seattle, WA - Major AI Infrastructure",
        environmentalImpact: {
            waterUsage: "2.3 million gallons of water daily",
            energyUsage: "150MW power consumption",
            carbonEmissions: "75,000 metric tons CO2 annually",
            additionalImpact: "Impacts local watershed and salmon habitats"
        },
        categories: ["Water Scarcity", "High Carbon Emissions", "Local Community Impact", "Power Grid Strain"],
        sources: [
            "https://www.microsoft.com/en-us/corporate-responsibility/sustainability",
            "https://www.seattletimes.com/business/technology/microsoft-data-center-water-usage/"
        ]
    },
    {
        name: "Google AI Data Center",
        location: { lat: 37.4220, lng: -122.0841 },
        details: "Mountain View, CA - Google AI Operations",
        environmentalImpact: {
            waterUsage: "1.5 million gallons of water daily",
            energyUsage: "120MW power consumption",
            carbonEmissions: "60,000 metric tons CO2 annually"
        },
        categories: ["High Carbon Emissions", "Water Scarcity", "Local Community Impact"],
        sources: [
            "https://www.gstatic.com/gumdrop/sustainability/google-2023-environmental-report.pdf",
            "https://www.theverge.com/2021/7/14/22577823/google-data-center-water-usage-drought"
        ]
    },
    {
        name: "Meta AI Research Center",
        location: { lat: 37.4852, lng: -122.1484 },
        details: "Menlo Park, CA - Meta AI Infrastructure",
        environmentalImpact: {
            waterUsage: "1.2 million gallons of water daily",
            energyUsage: "90MW power consumption",
            carbonEmissions: "45,000 metric tons CO2 annually"
        },
        categories: ["High Carbon Emissions", "Local Community Impact", "Power Grid Strain"],
        sources: [
            "https://sustainability.fb.com/wp-content/uploads/2023/07/Meta_2023_Climate_Report.pdf",
            "https://www.theverge.com/2022/8/1/23287335/meta-data-center-water-usage-drought"
        ]
    },
    {
        name: "Amazon AWS AI Center",
        location: { lat: 47.6147, lng: -122.3359 },
        details: "Seattle, WA - AWS AI Services",
        environmentalImpact: {
            waterUsage: "2.5 million gallons of water daily",
            energyUsage: "180MW power consumption",
            carbonEmissions: "90,000 metric tons CO2 annually",
            additionalImpact: "Significant impact on local power grid"
        },
        categories: ["High Carbon Emissions", "Power Grid Strain", "Employee Rights Issues", "Labor Concerns"],
        sources: [
            "https://sustainability.aboutamazon.com/2022-sustainability-report.pdf",
            "https://www.seattletimes.com/business/amazon/amazon-data-center-water-usage/"
        ]
    },
    {
        name: "NVIDIA AI Data Center",
        location: { lat: 37.3382, lng: -121.8863 },
        details: "Santa Clara, CA - AI Training Infrastructure",
        environmentalImpact: {
            waterUsage: "1.8 million gallons of water daily",
            energyUsage: "110MW power consumption",
            carbonEmissions: "55,000 metric tons CO2 annually"
        },
        categories: ["High Carbon Emissions", "Water Scarcity", "Power Grid Strain"],
        sources: [
            "https://nvidianews.nvidia.com/news/nvidia-2023-esg-report",
            "https://www.theverge.com/2023/5/24/23735601/nvidia-data-center-water-usage"
        ]
    },
    {
        name: "IBM AI Research Center",
        location: { lat: 41.1132, lng: -73.7181 },
        details: "Yorktown Heights, NY - IBM AI Operations",
        environmentalImpact: {
            waterUsage: "1.3 million gallons of water daily",
            energyUsage: "95MW power consumption",
            carbonEmissions: "47,500 metric tons CO2 annually"
        },
        categories: ["High Carbon Emissions", "Local Community Impact"],
        sources: [
            "https://www.ibm.com/impact/environmental/2023-report",
            "https://www.ibm.com/impact/environmental/data-centers"
        ]
    },
    {
        name: "Intel AI Development Center",
        location: { lat: 45.5152, lng: -122.6784 },
        details: "Hillsboro, OR - Intel AI Infrastructure",
        environmentalImpact: {
            waterUsage: "1.6 million gallons of water daily",
            energyUsage: "105MW power consumption",
            carbonEmissions: "52,500 metric tons CO2 annually",
            additionalImpact: "Significant impact on local water resources"
        },
        categories: ["Water Scarcity", "High Carbon Emissions", "Local Community Impact"],
        sources: [
            "https://www.intel.com/content/www/us/en/corporate-responsibility/2022-corporate-responsibility-report.html",
            "https://www.oregonlive.com/business/2023/06/intel-data-center-water-usage.html"
        ]
    },
    {
        name: "Tesla AI Training Center",
        location: { lat: 37.3948, lng: -122.1497 },
        details: "Palo Alto, CA - Tesla AI Operations",
        environmentalImpact: {
            waterUsage: "1.4 million gallons of water daily",
            energyUsage: "100MW power consumption",
            carbonEmissions: "50,000 metric tons CO2 annually"
        },
        categories: [],
        sources: [
            "https://www.tesla.com/ns_videos/2022-tesla-impact-report.pdf",
            "https://www.theverge.com/2023/4/20/23690275/tesla-data-center-water-usage"
        ]
    },
    {
        name: "DeepMind Research Center",
        location: { lat: 51.5074, lng: -0.1278 },
        details: "London, UK - DeepMind AI Operations",
        environmentalImpact: {
            waterUsage: "1.1 million gallons of water daily",
            energyUsage: "85MW power consumption",
            carbonEmissions: "42,500 metric tons CO2 annually"
        },
        categories: [],
        sources: [
            "https://deepmind.google/about/impact/environmental-sustainability/",
            "https://www.theguardian.com/technology/2023/jun/15/deepmind-data-center-environmental-impact"
        ]
    },
    {
        name: "Baidu AI Data Center",
        location: { lat: 39.9042, lng: 116.4074 },
        details: "Beijing, China - Baidu AI Infrastructure",
        environmentalImpact: {
            waterUsage: "2.8 million gallons of water daily",
            energyUsage: "200MW power consumption",
            carbonEmissions: "100,000 metric tons CO2 annually",
            additionalImpact: "Relies heavily on coal-powered electricity"
        },
        categories: ["Coal Dependency"],
        sources: [
            "https://www.baidu.com/sustainability/2022-report",
            "https://www.reuters.com/technology/baidu-data-center-environmental-impact-2023-05-12/"
        ]
    },
    {
        name: "Alibaba Cloud AI Center",
        location: { lat: 30.2741, lng: 120.1551 },
        details: "Hangzhou, China - Alibaba AI Operations",
        environmentalImpact: {
            waterUsage: "3.2 million gallons of water daily",
            energyUsage: "220MW power consumption",
            carbonEmissions: "110,000 metric tons CO2 annually",
            additionalImpact: "Located in water-scarce region"
        },
        categories: ["Water Scarcity"],
        sources: [
            "https://www.alibabagroup.com/en/sustainability/2022-report",
            "https://www.scmp.com/tech/big-tech/article/3215678/alibaba-data-center-water-usage"
        ]
    },
    {
        name: "Tencent AI Research Center",
        location: { lat: 22.5431, lng: 114.0579 },
        details: "Shenzhen, China - Tencent AI Infrastructure",
        environmentalImpact: {
            waterUsage: "2.5 million gallons of water daily",
            energyUsage: "180MW power consumption",
            carbonEmissions: "90,000 metric tons CO2 annually"
        },
        categories: [],
        sources: [
            "https://www.tencent.com/en-us/sustainability/2022-report",
            "https://www.reuters.com/technology/tencent-data-center-environmental-impact-2023-06-20/"
        ]
    },
    {
        name: "Reliance Jio AI Center",
        location: { lat: 19.0760, lng: 72.8777 },
        details: "Mumbai, India - Jio AI Operations",
        environmentalImpact: {
            waterUsage: "1.9 million gallons of water daily",
            energyUsage: "130MW power consumption",
            carbonEmissions: "65,000 metric tons CO2 annually",
            additionalImpact: "Faces frequent power outages, relies on diesel generators"
        },
        categories: [],
        sources: [
            "https://www.reliance.com/sustainability/2022-report",
            "https://www.thehindubusinessline.com/companies/reliance-jio-data-center-environmental-impact/article65432123.ece"
        ]
    },
    {
        name: "Tata Consultancy AI Center",
        location: { lat: 12.9716, lng: 77.5946 },
        details: "Bangalore, India - TCS AI Infrastructure",
        environmentalImpact: {
            waterUsage: "1.7 million gallons of water daily",
            energyUsage: "120MW power consumption",
            carbonEmissions: "60,000 metric tons CO2 annually",
            additionalImpact: "Located in water-stressed region"
        },
        categories: ["Water Scarcity"],
        sources: [
            "https://www.tcs.com/sustainability/2022-report",
            "https://www.business-standard.com/article/companies/tcs-data-center-environmental-impact-123051700123_1.html"
        ]
    },
    {
        name: "Samsung AI Research Center",
        location: { lat: 37.5665, lng: 126.9780 },
        details: "Seoul, South Korea - Samsung AI Operations",
        environmentalImpact: {
            waterUsage: "2.1 million gallons of water daily",
            energyUsage: "150MW power consumption",
            carbonEmissions: "75,000 metric tons CO2 annually"
        },
        categories: [],
        sources: [
            "https://www.samsung.com/sustainability/2022-report",
            "https://www.koreatimes.co.kr/www/tech/2023/04/693_345678.html"
        ]
    },
    {
        name: "LG AI Development Center",
        location: { lat: 37.5112, lng: 127.0981 },
        details: "Seoul, South Korea - LG AI Infrastructure",
        environmentalImpact: {
            waterUsage: "1.8 million gallons of water daily",
            energyUsage: "130MW power consumption",
            carbonEmissions: "65,000 metric tons CO2 annually"
        },
        categories: [],
        sources: [
            "https://www.lg.com/global/sustainability/2022-report",
            "https://www.koreatimes.co.kr/www/tech/2023/05/693_345679.html"
        ]
    },
    {
        name: "Huawei AI Data Center",
        location: { lat: 22.5431, lng: 114.0579 },
        details: "Shenzhen, China - Huawei AI Operations",
        environmentalImpact: {
            waterUsage: "2.7 million gallons of water daily",
            energyUsage: "190MW power consumption",
            carbonEmissions: "95,000 metric tons CO2 annually",
            additionalImpact: "Relies on coal-powered electricity"
        },
        categories: ["Coal Dependency"],
        sources: [
            "https://www.huawei.com/en/sustainability/2022-report",
            "https://www.reuters.com/technology/huawei-data-center-environmental-impact-2023-07-15/"
        ]
    },
    {
        name: "Xiaomi AI Research Center",
        location: { lat: 39.9042, lng: 116.4074 },
        details: "Beijing, China - Xiaomi AI Infrastructure",
        environmentalImpact: {
            waterUsage: "1.5 million gallons of water daily",
            energyUsage: "110MW power consumption",
            carbonEmissions: "55,000 metric tons CO2 annually"
        },
        categories: [],
        sources: [
            "https://www.mi.com/sustainability/2022-report",
            "https://www.scmp.com/tech/big-tech/article/3215679/xiaomi-data-center-environmental-impact"
        ]
    },
    {
        name: "Infosys AI Center",
        location: { lat: 12.9716, lng: 77.5946 },
        details: "Bangalore, India - Infosys AI Operations",
        environmentalImpact: {
            waterUsage: "1.6 million gallons of water daily",
            energyUsage: "115MW power consumption",
            carbonEmissions: "57,500 metric tons CO2 annually",
            additionalImpact: "Faces water scarcity challenges"
        },
        categories: ["Water Scarcity"],
        sources: [
            "https://www.infosys.com/sustainability/2022-report",
            "https://www.business-standard.com/article/companies/infosys-data-center-environmental-impact-123051700124_1.html"
        ]
    },
    {
        name: "ByteDance AI Center",
        location: { lat: 39.9042, lng: 116.4074 },
        details: "Beijing, China - TikTok AI Operations",
        environmentalImpact: {
            waterUsage: "2.4 million gallons of water daily",
            energyUsage: "170MW power consumption",
            additionalImpact: "Reported labor rights violations and surveillance concerns"
        },
        categories: ["Employee Rights Issues", "Labor Concerns", "Coal Dependency"],
        sources: [
            "https://www.theguardian.com/technology/2023/bytedance-working-conditions",
            "https://www.reuters.com/technology/bytedance-data-center-2023-08-15/"
        ]
    },
    {
        name: "Tech Mahindra AI Hub",
        location: { lat: 17.3850, lng: 78.4867 },
        details: "Hyderabad, India - AI Development Center",
        environmentalImpact: {
            waterUsage: "1.8 million gallons of water daily",
            additionalImpact: "Located in severely water-stressed region, reports of worker exploitation"
        },
        categories: ["Water Scarcity", "Employee Rights Issues", "Labor Concerns"],
        sources: [
            "https://www.business-standard.com/article/companies/tech-mahindra-water-usage",
            "https://www.reuters.com/technology/india-tech-working-conditions/"
        ]
    },
    {
        name: "Oracle AI Research",
        location: { lat: 37.4852, lng: -122.2364 },
        details: "Redwood City, CA - AI Development",
        environmentalImpact: {
            carbonEmissions: "48,000 metric tons CO2 annually",
            additionalImpact: "Displacement of local communities due to tech expansion"
        },
        categories: ["Local Community Impact", "High Carbon Emissions"],
        sources: [
            "https://www.oracle.com/corporate/sustainability-report-2023.pdf",
            "https://www.sfchronicle.com/tech-displacement/"
        ]
    },
    {
        name: "Yandex AI Center",
        location: { lat: 55.7558, lng: 37.6173 },
        details: "Moscow, Russia - AI Research Operations",
        environmentalImpact: {
            energyUsage: "160MW power consumption",
            additionalImpact: "Worker surveillance and rights concerns, heavy coal dependency"
        },
        categories: ["Employee Rights Issues", "Coal Dependency", "Labor Concerns"],
        sources: [
            "https://www.themoscowtimes.com/2023/05/tech-working-conditions",
            "https://www.reuters.com/technology/russia-data-centers-2023/"
        ]
    },
    {
        name: "Kakao AI Research",
        location: { lat: 37.5665, lng: 126.9780 },
        details: "Seoul, South Korea - AI Development",
        environmentalImpact: {
            waterUsage: "1.9 million gallons of water daily",
            additionalImpact: "Reports of worker exploitation and excessive overtime"
        },
        categories: ["Employee Rights Issues", "Labor Concerns", "Water Scarcity"],
        sources: [
            "https://www.koreatimes.co.kr/www/tech/2023/09/kakao-working-conditions",
            "https://www.reuters.com/technology/korea-tech-industry/"
        ]
    },
    {
        name: "SenseTime AI Center",
        location: { lat: 31.2304, lng: 121.4737 },
        details: "Shanghai, China - AI Research",
        environmentalImpact: {
            energyUsage: "140MW power consumption",
            carbonEmissions: "70,000 metric tons CO2 annually",
            additionalImpact: "Ethical concerns over surveillance technology deployment"
        },
        categories: ["High Carbon Emissions", "Coal Dependency", "Employee Rights Issues"],
        sources: [
            "https://www.scmp.com/tech/big-tech/article/sensetime-operations",
            "https://www.reuters.com/technology/china-ai-ethics/"
        ]
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
                                    <div className="impact">
                                        {selectedCenter.environmentalImpact.waterUsage && (
                                            <p><strong>Water Usage:</strong> {selectedCenter.environmentalImpact.waterUsage}</p>
                                        )}
                                        {selectedCenter.environmentalImpact.energyUsage && (
                                            <p><strong>Energy Usage:</strong> {selectedCenter.environmentalImpact.energyUsage}</p>
                                        )}
                                        {selectedCenter.environmentalImpact.carbonEmissions && (
                                            <p><strong>Carbon Emissions:</strong> {selectedCenter.environmentalImpact.carbonEmissions}</p>
                                        )}
                                        {selectedCenter.environmentalImpact.additionalImpact && (
                                            <p><strong>Additional Impact:</strong> {selectedCenter.environmentalImpact.additionalImpact}</p>
                                        )}
                                        <p><strong>Issues:</strong> {selectedCenter.categories.join(', ')}</p>
                                    </div>
                                    <div className="sources">
                                        <p><strong>Sources:</strong></p>
                                        <ul>
                                            {selectedCenter.sources.map((source, idx) => (
                                                <li key={idx}>
                                                    <a href={source} target="_blank" rel="noopener noreferrer">
                                                        {source.split('/').pop()?.split('.')[0] || source}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </InfoWindowContent>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </LoadScript>
            </MapView>
        </MapContainer>
    );
} 