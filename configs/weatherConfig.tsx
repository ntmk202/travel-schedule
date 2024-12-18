import axios from "axios";

const API_KEY = "1a5ed5fa4f43f12452e407098b871a5c";

export const getWeatherData = async (
  location: string,
  startDate: Date,
  endDate: Date
) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          q: location,
          appid: API_KEY,
          units: "metric",
        },
      }
    );

    const forecasts = response?.data?.list.filter((item: any) => {
      const forecastDate = new Date(item.dt * 1000);
      return forecastDate >= startDate && forecastDate <= endDate
    });

    if (!forecasts || forecasts.length === 0) {
      console.warn("No forecasts found for the specified range.");
      return [];
    }

    return forecasts.map((forecast: any) => ({
      date: new Date(forecast.dt * 1000).toUTCString(),
      temperature: forecast.main?.temp,
      description: forecast.weather[0]?.description,
    }));
  } catch (error : any) {
    console.error("Error fetching weather data:", error.message);
    throw new Error("Could not fetch weather data. Please try again.");
  }
};

