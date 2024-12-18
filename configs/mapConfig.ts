import axios from "axios";

export const VIETMAP_API_KEY = "a5a87f8bea7947c7006414f0c1b82eb35c5d9186942d504c"; 

export interface Feature {
  place_name: string;
  geometry: {
    coordinates: [number, number]; // [longitude, latitude]
  };
}

// Interface for the API response
export interface AutocompleteResponse {
  features: Feature[];
}

interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

/**
 * Fetch autocomplete results from Vietmap API.
 * @param query - The search query.
 * @param latitude - The latitude for focus parameter.
 * @param longitude - The longitude for focus parameter.
 * @returns Array of place names.
 */

export const getAutocompleteResults = async (
  query: string,
  latitude: number,
  longitude: number
): Promise<string[]> => {
  try {
    const response = await axios.get<AutocompleteResponse>(
      "https://maps.vietmap.vn/api/autocomplete/v3",
      {
        params: {
          apikey: VIETMAP_API_KEY,
          text: query,
          focus: `${latitude},${longitude}`,
        },
      }
    );

    if (response.data && response.data.features) {
      return response.data.features.map((feature) => feature.place_name);
    }
    return [];
  } catch (error) {
    console.error("Error fetching autocomplete results:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", error.toJSON());
    }
    return [];
  }
};

export const getOptimizedRoute = async (
  points: GeoCoordinates[],
  roundtrip: boolean = false,
  vehicle: "car" | "bike" | "foot" | "motorcycle" = "car"
): Promise<GeoCoordinates[]> => {
  try {
    const validPoints = points.filter(
      (point) => point.latitude && point.longitude
    );

    if (validPoints.length < 2) {
      console.warn("Not enough valid points to generate a route.");
      return [];
    }

    const pointParams = validPoints
      .map(({ latitude, longitude }) => `point=${latitude},${longitude}`)
      .join("&");

    const response = await axios.get(
      `https://maps.vietmap.vn/api/tsp?api-version=1.1`,
      {
        params: {
          apikey: VIETMAP_API_KEY,
          points_encoded: false,
          vehicle,
          roundtrip,
          destinations: "all",
          sources: "0",
        },
        paramsSerializer: (params) => {
          return `${pointParams}&${new URLSearchParams(params).toString()}`;
        },
      }
    );

    if (
      response.data?.paths?.length > 0 &&
      response.data.paths[0].points?.coordinates
    ) {
      return response.data.paths[0].points.coordinates.map(
        ([lon, lat]: [number, number]) => ({
          latitude: lat,
          longitude: lon,
        })
      );
    } else {
      console.warn("No valid route data found in the API response.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching optimized route:", error);
    return [];
  }
};




