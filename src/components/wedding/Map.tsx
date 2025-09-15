"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

export default function WeddingMap() {
  const position = { lat: 34.052235, lng: -118.243683 }; // Example: Los Angeles City Hall
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center text-center p-4">
        <p className="text-muted-foreground">
          Google Maps requires an API key. Please add <code className="bg-secondary p-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your environment variables.
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className="w-full h-full min-h-[300px] rounded-lg overflow-hidden">
        <Map
          zoom={15}
          center={position}
          mapId={"ricardo-rocio-wedding-map"}
          disableDefaultUI={true}
          gestureHandling={'greedy'}
        >
          <AdvancedMarker position={position}>
            <span className="text-3xl">❤️</span>
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}
