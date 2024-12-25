import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { getOptimizedRoute } from "@/configs/mapConfig";

interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

const MapWithOptimizedRoute = ({ tripPlan }: { tripPlan: any }) => {
  const [routeCoordinates, setRouteCoordinates] = useState<GeoCoordinates[]>([]);
  const [currentLocation, setCurrentLocation] = useState<GeoCoordinates | null>(
    null
  );

  // Extract geo-coordinates from trip plan activities
  const activities = tripPlan || [];
  const activityCoordinates: GeoCoordinates[] = activities
    .flatMap((trip: any) => trip.activities)  
    .filter(
      (activity: any) =>
        activity.location_lat !== undefined && activity.location_lng !== undefined
    )
    .map((activity: any) => ({
      latitude: activity.location_lat,
      longitude: activity.location_lng,
    }));

  // Fetch current location using expo-location
  const fetchCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });
    } catch (error) {
      console.error("Error fetching current location:", error);
    }
  };

  // Fetch the optimized route
  const fetchOptimizedRoute = async () => {
    if (currentLocation && activityCoordinates.length > 0) {
      const points = [currentLocation, ...activityCoordinates];
      const route = await getOptimizedRoute(points, false, "car");
      setRouteCoordinates(route);
    }
  };
  

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      fetchOptimizedRoute();
    }
  }, [currentLocation]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: activityCoordinates[0]?.latitude || 0,
          longitude: activityCoordinates[0]?.longitude || 0,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {activityCoordinates.map(({ latitude, longitude }, index) => (
          <Marker
            key={index}
            coordinate={{ latitude, longitude }}
            title={`Stop ${index + 1}`}
          />
        ))}

        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="You are here"
            pinColor="blue"
          />
        )}

        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#FF0000" // Red color for route
            strokeWidth={3}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapWithOptimizedRoute;
