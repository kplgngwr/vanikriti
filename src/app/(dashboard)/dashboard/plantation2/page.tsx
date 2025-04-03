'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polygon } from '@react-google-maps/api';
import { ArrowLeftIcon, ArrowRightIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { base } from '@/lib/base';

interface MarkerPosition {
  lat: number;
  lng: number;
  image: string;
}

const containerStyle = {
  width: '81vw',
  height: '95vh',
  marginTop: '-10px'
};

const center = {
  lat: 30.719501131607977,
  lng: 76.75201599220293
};

const paths = [
  { lat: 30.719429242132147, lng: 76.7506715812619 },
  { lat: 30.71842278384273, lng: 76.75150138514417 },
  { lat: 30.719158273626125, lng: 76.75276860502638 },
  { lat: 30.719268873108316, lng: 76.75265925102637 },
  { lat: 30.719362882568426, lng: 76.75280076796754 },
  { lat: 30.719252283194063, lng: 76.7529036893793 },
  { lat: 30.71945689193688, lng: 76.75314169514398 },
  { lat: 30.71976103926572, lng: 76.75324461655573 },
  { lat: 30.720579467313552, lng: 76.75259492514404 },
];

const options = {
  strokeColor: "green",
  fillColor: "#04ff00",
  strokeOpacity: 1,
  strokeWeight: 1,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
};

interface Inventory {
  _id: string;
  image: string;
  name: string;
  number: number;
}

const Page = () => {
  const { toast } = useToast();

  const [mapLoaded, setMapLoaded] = useState(false);
  const [markers, setMarkers] = useState<MarkerPosition[]>([]);
  const [selectedTree, setSelectedTree] = useState('');
  const [selectedTreeImage, setSelectedTreeImage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [trees, setTrees] = useState<Inventory[]>([]);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  }

  const handleTreeClick = (treeName: string, treeImage: string) => {
    setSelectedTree(treeName);
    setSelectedTreeImage(treeImage);
  }

  const mapRef = useRef<GoogleMap | null>(null);

  const handleMapLoad = useCallback(() => {
    setMapLoaded(true);
  }, []);

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (!selectedTree) {
      toast({
        title: 'Failed',
        description: "Please select a tree to plant",
        variant: 'destructive'
      });
      return;
    }

    // Get the selected tree data
    const selectedTreeData = trees.find(tree => tree.name === selectedTree);

    if (selectedTreeData && selectedTreeData.number <= 0) {
      toast({
        title: 'Failed',
        description: "Please purchase more plants to add",
        variant: 'destructive'
      });
      return;
    }

    const clickedPosition: MarkerPosition = {
      lat: event.latLng?.lat() || 0,
      lng: event.latLng?.lng() || 0,
      image: selectedTreeImage
    };

    // Check if the clicked position is inside the polygon
    const isInsidePolygon = google.maps.geometry.poly.containsLocation(
      new google.maps.LatLng(clickedPosition.lat, clickedPosition.lng),
      new google.maps.Polygon({ paths })
    );

    if (!isInsidePolygon) {
      toast({
        title: 'Failed',
        description: "Cannot plant tree outside the provided area",
        variant: 'destructive'
      });
      return;
    }

    // Add marker
    setMarkers(prevMarkers => [...prevMarkers, clickedPosition]);

    // Decrease the count of the selected tree in the backend
    try {
      await axios.post(`${base}/api/v1/auth/plant/tree`, {
        username: 'testing', // Replace with actual username
        plantName: selectedTree,
        latitude: clickedPosition.lat,
        longitude: clickedPosition.lng
      });

      // Update the local state
      setTrees(prevTrees =>
        prevTrees.map(tree =>
          tree.name === selectedTree ? { ...tree, number: tree.number - 1 } : tree
        )
      );
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Failed",
        description: error.response?.data.message,
        variant: 'destructive'
      });
    }
  };

  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [isWatering, setIsWatering] = useState(false);

  const handleMarkerClick = (index: number) => {
    setSelectedMarker(index);
  };

  const handleWaterClick = () => {
    setIsWatering(true);
    setTimeout(() => {
      setIsWatering(false);
      setSelectedMarker(null);
    }, 10000); // 10 seconds for the animation duration
  };

  const [isLoading, setIsLoading] = useState(false);
  const [inventory, setInventory] = useState<Inventory[]>([]);

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${base}/api/v1/auth/plants/testing`);
      setInventory(response.data.message);
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Failed",
        description: error.response?.data.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }

  const fetchAllPlants = async () => {
    try {
      const response = await axios.get(`${base}/api/v1/auth/plants/all`);
      return response.data.message;
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Failed",
        description: error.response?.data.message,
        variant: 'destructive'
      });
      return [];
    }
  }

  useEffect(() => {
    fetchInventory();

    fetchAllPlants().then(plants => {
      const plantMarkers: MarkerPosition[] = plants.map((plant: any) => ({
        lat: plant.latitude,
        lng: plant.longitude,
        image: plant.image, // Assuming each plant has an associated image
      }));
      setMarkers(plantMarkers);
    });
  }, []);

  return (
    <div className='flex flex-row'>
      <div className="w-1/5 bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-4">Plant Trees</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Selected Tree: {selectedTree || 'None'}</h3>
        </div>
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <div className={`h-60 overflow-y-auto ${isOpen ? 'expanded' : ''}`}>
            {inventory.map((tree, index) => (
              <div
                key={index}
                className="flex items-center p-2 mb-2 border rounded cursor-pointer"
                onClick={() => handleTreeClick(tree.name, tree.image)}
              >
                <img src={tree.image} alt={tree.name} className="w-10 h-10 mr-2" />
                <div>
                  <h4 className="font-semibold">{tree.name}</h4>
                  <p>Available: {tree.number}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <Button onClick={toggleContent} className="w-full mt-4">
          {isOpen ? (
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
          ) : (
            <ArrowRightIcon className="w-4 h-4 mr-2" />
          )}
          {isOpen ? 'Hide' : 'Show'} Trees
        </Button>
      </div>
      <div className="w-4/5">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}
          libraries={['geometry']}
          onLoad={handleMapLoad}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={18}
            onClick={handleMapClick}
            ref={mapRef}
          >
            {mapLoaded && (
              <>
                {markers.map((marker, index) => (
                  <React.Fragment key={index}>
                    <Marker
                      position={marker}
                      icon={{ url: marker.image, scaledSize: new google.maps.Size(64, 64) }}
                      onClick={() => handleMarkerClick(index)}
                    />
                    {selectedMarker === index && !isWatering && (
                      <WaterButtonOverlay
                        position={marker}
                        onWaterClick={handleWaterClick}
                      />
                    )}
                    {selectedMarker === index && isWatering && (
                      <WateringAnimationOverlay position={marker} />
                    )}
                  </React.Fragment>
                ))}
                <Polygon paths={paths} options={options} />
              </>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Page;


import { OverlayView } from '@react-google-maps/api';

interface WaterButtonOverlayProps {
  position: google.maps.LatLngLiteral;
  onWaterClick: () => void;
}

const WaterButtonOverlay: React.FC<WaterButtonOverlayProps> = ({ position, onWaterClick }) => {
  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }} className='mt-10'>
        <Button onClick={onWaterClick}>Water Plant</Button>
      </div>
    </OverlayView>
  );
};

interface WateringAnimationOverlayProps {
  position: google.maps.LatLngLiteral;
}

const WateringAnimationOverlay: React.FC<WateringAnimationOverlayProps> = ({ position }) => {
  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }} className='mt-48 -ml-40'>
        <div className='watering-animation'>
          <div className="water-jar"></div>
          <div className="water"></div>
        </div>
      </div>
    </OverlayView>
  );
};