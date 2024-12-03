import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useNavigate } from 'react-router-dom';
import algeriaMap from '@assets/algeria-map.png';
import serviceUrls from '@service-urls/index';

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

const geoUrl = serviceUrls.base.geological_data;

// Categories to filter markers
const categories: string[] = ['Cities', 'Action Enthusiasts', 'Nature', 'Historical & Cultural', 'Sacred Sites'];
const subCategories: { [key: string]: string[] } = {
  'Action Enthusiasts': ['Conquer the Sahara', 'Climb to New heights', 'Dive into History', 'Surf the waves'],
  Cities: [],
  Nature: ['Nature1', 'Nature2'],
  'Historical & Cultural': [],
  'Sacred Sites': [],
};
const MapChart: React.FC<MapChartProps> = ({ country, markers, center, scale }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Cities');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(subCategories['Cities'][0]);
  const navigate = useNavigate();

  // Filter markers based on selected category
  const filteredCategoryMarkers = markers.filter(
    (marker) => marker.category === selectedCategory && marker.subCategory === undefined
  );
  const filteredSubcategoryMarkers = markers.filter(
    (marker) => marker.subCategory !== undefined && marker.subCategory === selectedSubcategory
  );

  // Handle marker click to navigate to a details page
  const handleMarkerClick = (marker: MarkerType) => {
    navigate(`/details/${marker.name}`);
  };

  const renderCategoryMarkers = (cat: string) => {
    const entries = markers.filter((each) => each.category === cat);
    return entries.map((_entry, index) => (
      <p
        key={index}
        className="ml-2"
        style={{
          fontWeight: 300,
          fontSize: 12,
          backgroundColor: '#fff',
          borderRadius: '50%',
          width: 13, // Circle diameter
          height: 13, // Circle diameter
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {index + 1}
      </p>
    ));
  };

  const renderSubcategoryMarkers = (subCat: string) => {
    const entries = markers.filter((each) => each.subCategory === subCat);
    return entries.map((_entry, index) => (
      <p
        key={index}
        className="ml-2"
        style={{
          fontWeight: 300,
          fontSize: 12,
          backgroundColor: '#fff',
          borderRadius: '50%',
          width: 13, // Circle diameter
          height: 13, // Circle diameter
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {index + 1}
      </p>
    ));
  };

  return (
    <div
      className="flex flex-col md:flex-row justify-center items-start my-12 gap-2 max-w-6xl m-auto p-2 md:p-4 animate-on-scroll"
      style={{ backgroundColor: '#b34302' }}
    >
      {/* <div className="w-[2px] bg-white mx-4 " style={{ height: 500 }}></div> */}
      <div className="flex flex-row min-w-64">
        <div className="flex flex-col justify-start items-start mt-14">
          {categories.map((cat) => (
            <div>
              <div className="flex items-center">
                <p
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedSubcategory(subCategories[cat][0]);
                  }}
                  style={{
                    fontWeight: selectedCategory === cat ? '600' : '300',
                    color: '#fff',
                  }}
                >
                  <i>
                    <u> {cat}</u>
                  </i>
                </p>
                {selectedCategory === cat && subCategories[cat].length === 0 && (
                  <div className="flex">{renderCategoryMarkers(cat)}</div>
                )}
              </div>

              {selectedCategory === cat &&
                subCategories[selectedCategory].map((each) => {
                  return (
                    <div className="flex items-center">
                      <p
                        className="ml-3"
                        style={{
                          color: '#fff',
                          fontWeight: 300,
                          fontSize: 15,
                        }}
                        onClick={() => {
                          setSelectedSubcategory(each);
                        }}
                      >
                        {each}
                      </p>

                      {selectedSubcategory === each && subCategories[cat].length > 0 && (
                        <div className="flex">{renderSubcategoryMarkers(each)}</div>
                      )}
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
      <img src={algeriaMap} width={160} />
      <div></div>
      <div className="md:ml-10 w-full">
        <ComposableMap
          projectionConfig={{ scale: scale, center: center }}
          style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden' }}
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
          {filteredSubcategoryMarkers.map((marker, index) => (
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
                  style={{ fontFamily: 'system-ui', fill: '#fff', textDecoration: 'underline', fontStyle: 'italic' }}
                >
                  {marker.name}
                </text>
                <foreignObject x={10} y={10} width={20} height={20}>
                  <p
                    key={index}
                    style={{
                      fontWeight: 300,
                      fontSize: 13,
                      backgroundColor: '#fff',
                      borderRadius: '50%',
                      width: 20, // Circle diameter
                      height: 20, // Circle diameter
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {index + 1}
                  </p>
                </foreignObject>
              </Marker>
            </>
          ))}
          {filteredCategoryMarkers.map((marker, index) => (
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
                  style={{ fontFamily: 'system-ui', fill: '#fff', textDecoration: 'underline', fontStyle: 'italic' }}
                >
                  {marker.name}
                </text>
                <foreignObject x={10} y={10} width={20} height={20}>
                  <p
                    key={index}
                    style={{
                      fontWeight: 300,
                      fontSize: 13,
                      backgroundColor: '#fff',
                      borderRadius: '50%',
                      width: 20, // Circle diameter
                      height: 20, // Circle diameter
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {index + 1}
                  </p>
                </foreignObject>
              </Marker>
            </>
          ))}
        </ComposableMap>
      </div>
    </div>
  );
};

export default MapChart;
