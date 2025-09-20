import axios from "axios";

const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";

// 🔹 Get lat/lon from city name
export const getCoordinates = async (city) => {
  const res = await axios.get(GEO_URL, {
    params: { name: city, count: 1 },
  });
  if (res.data.results && res.data.results.length > 0) {
    const place = res.data.results[0];
    return {
      name: `${place.name}, ${place.country}`,
      latitude: place.latitude,
      longitude: place.longitude,
    };
  } else {
    throw new Error("City not found");
  }
};

// 🔹 Get weather data
export const getWeather = async (lat, lon) => {
  const res = await axios.get(WEATHER_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      current_weather: true,
      hourly: "temperature_2m,relative_humidity_2m,precipitation,windspeed_10m,weathercode",
      daily: "temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,windspeed_10m_max",
      timezone: "auto",
      forecast_days: 7,
    },
  });
  return res.data;
};
