import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const libraries = ["places"];
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const SupermarketFinder: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [nearbySupermarkets, setNearbySupermarkets] = useState<
    google.maps.places.PlaceResult[]
  >([]);
  const [selectedSupermarket, setSelectedSupermarket] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [mapVisible, setMapVisible] = useState(false);

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: apiKey as string,
  //   libraries,
  // });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting user location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const findNearbySupermarkets = () => {
    if (userLocation) {
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );
      const request = {
        location: userLocation,
        radius: 10000, // 10 kilometers
        type: "supermarket",
        keyword: "Shufersal", // Find Shufersal supermarkets
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setNearbySupermarkets(results || []);
          setMapVisible(true); // Show the map with results
        } else {
          console.error("Error fetching nearby supermarkets:", status);
        }
      });
    } else {
      console.error("User location not set yet.");
    }
  };

  return (
    <div className="flex flex-col items-center text-center p-8">
      <h1 className="text-4xl font-bold mb-6">Supermarket Finder</h1>
      <Button onClick={findNearbySupermarkets} className="mb-4">
        Find Nearby Shufersal
      </Button>
      {mapVisible && userLocation && (
        <GoogleMap
          center={userLocation}
          zoom={12}
          mapContainerStyle={{ width: "100%", height: "500px" }}
        >
          {/* User's Location Marker */}
          <Marker
            position={userLocation}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />

          {/* Nearby Supermarkets Markers */}
          {nearbySupermarkets.map((supermarket, index) => (
            <Marker
              key={index}
              position={{
                lat: supermarket.geometry?.location?.lat() || 0,
                lng: supermarket.geometry?.location?.lng() || 0,
              }}
              onClick={() => setSelectedSupermarket(supermarket)}
            />
          ))}

          {/* InfoWindow for Selected Supermarket */}
          {selectedSupermarket && (
            <InfoWindow
              position={{
                lat: selectedSupermarket.geometry?.location?.lat() || 0,
                lng: selectedSupermarket.geometry?.location?.lng() || 0,
              }}
              onCloseClick={() => setSelectedSupermarket(null)}
            >
              <div>
                <h2>{selectedSupermarket.name}</h2>
                <p>{selectedSupermarket.vicinity}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default SupermarketFinder;
