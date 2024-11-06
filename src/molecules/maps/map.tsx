import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useNavigate } from 'react-router-dom';
import algeriaMap from '../../assets/algeria-map.png';

interface MarkerType {
  name: string;
  coordinates: [number, number];
  category: string;
  subCategory?: string;
}

interface MapChartProps {
  country: string | undefined;
  markers: MarkerType[];
  center: [number, number];
  scale: number;
}

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Categories to filter markers
const categories: string[] = ['Cities', 'Action Enthusiasts', 'Nature', 'Historical & Cultural', 'Sacred Sites'];
const subCategories: { [key: string]: string[] } = {
  'Action Enthusiasts': ['Conquer the Sahara', 'Sahara search'],
  Cities: ['City1', 'City2'],
  Nature: ['Nature1', 'Nature2'],
  'Historical & Cultural': ['HC1', 'HC2'],
  'Sacred Sites': [],
};
const MapChart: React.FC<MapChartProps> = ({ country, markers, center, scale }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Action Enthusiasts');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(subCategories['Cities'][0]);
  const navigate = useNavigate();

  // Filter markers based on selected category
  const filteredMarkers = markers.filter((marker) => marker.category === selectedCategory);

  // Handle marker click to navigate to a details page
  const handleMarkerClick = (marker: MarkerType) => {
    navigate(`/details/${marker.name}`);
  };

  return (
    <div
      className="flex flex-row justify-center items-start my-12 p-5 gap-2 m-auto max-w-6xl animate-on-scroll"
      style={{ backgroundColor: '#b34302' }}
    >
      <div className="w-[2px] bg-white mx-4" style={{ height: 500 }}></div>
      <div className="flex flex-row">
        <div className="flex flex-col justify-start items-start mt-10">
          {categories.map((cat) => (
            <div>
              <p
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  fontWeight: selectedCategory === cat ? '600' : '300',
                  color: '#fff',
                }}
              >
                <i>
                  <u> {cat}</u>
                </i>
              </p>
              {selectedCategory === cat &&
                subCategories[selectedCategory].map((each) => {
                  return (
                    <p
                      className="ml-3"
                      style={{
                        color: '#fff',
                        fontWeight: 300,
                        fontSize: 15,
                      }}
                      onClick={() => setSelectedSubcategory(each)}
                    >
                      {each}
                    </p>
                  );
                })}
            </div>
          ))}
        </div>
        <img src={algeriaMap} width={200} />
      </div>
      <div className="ml-10">
        <ComposableMap
          projectionConfig={{ scale: scale, center: center }}
          style={{ width: 500, height: 500, overflow: 'hidden' }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isSelectedCountry = geo.properties.name === country;
                // fc813e or ff943f for main country
                // b34302 or c35300for others
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: isSelectedCountry ? '#fc813e' : '#b34302',
                        outline: 'none',
                        stroke: '#fff',
                        strokeWidth: 2,
                      },
                      hover: {
                        fill: isSelectedCountry ? '#fc813e' : '#b34302',
                        outline: 'none',
                        stroke: '#fff',
                        strokeWidth: 2,
                      },
                      pressed: {
                        fill: isSelectedCountry ? '#fc813e' : '#b34302',
                        outline: 'none',
                        stroke: '#fff',
                        strokeWidth: 2,
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
          {filteredMarkers.map((marker, index) => (
            <>
              <Marker key={marker.name} coordinates={marker.coordinates}>
                <circle
                  r={6}
                  fill="#fff"
                  stroke="#fff"
                  strokeWidth={2}
                  onClick={() => handleMarkerClick(marker)}
                  style={{ cursor: 'pointer' }}
                />
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{ fontFamily: 'system-ui', fill: '#fff', textDecoration: 'underline' }}
                >
                  {marker.name}
                </text>
                <circle
                  r={6}
                  fill="#fff"
                  stroke="#fff"
                  strokeWidth={2}
                  onClick={() => handleMarkerClick(marker)}
                  style={{ cursor: 'pointer' }}
                />
              </Marker>
            </>
          ))}
        </ComposableMap>
      </div>
    </div>
  );
};

export default MapChart;
