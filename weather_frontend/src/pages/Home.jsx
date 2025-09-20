import { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import DetailsCard from "../components/DetailsCard";
import DailyForecast from "../components/DailyForecast";
import HourlyForecast from "../components/HourlyForecast";
import { getCoordinates, getWeather } from "../services/weatherApi";

export default function Home() {
  const [unit, setUnit] = useState("celsius");
  const [location, setLocation] = useState("Vadodara");
  const [weather, setWeather] = useState(null);
  const [dailyData, setDailyData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [fullWeatherData, setFullWeatherData] = useState(null);

  // 🔹 Get weather data for selected day
  const getSelectedDayWeather = () => {
    if (!fullWeatherData || !dailyData[selectedDayIndex]) return null;
    
    const selectedDay = dailyData[selectedDayIndex];
    const isToday = selectedDayIndex === 0;
    
    return {
      location: fullWeatherData.locationName,
      date: selectedDay.fullDate,
      temp: isToday ? fullWeatherData.current_weather.temperature : selectedDay.high,
      feelsLike: isToday ? fullWeatherData.current_weather.temperature : selectedDay.high,
      humidity: selectedDay.humidity,
      wind: selectedDay.wind,
      precipitation: selectedDay.precipitation,
      icon: selectedDay.icon,
    };
  };

  // 🔹 Get hourly data for selected day
  const getSelectedDayHourly = () => {
    if (!fullWeatherData || !dailyData[selectedDayIndex]) return [];
    
    const now = new Date();
    const selectedDate = new Date(dailyData[selectedDayIndex].date);
    const isToday = selectedDayIndex === 0;
    
    if (isToday) {
      // For today, start from current hour and show next 24 hours
      const currentHourIndex = fullWeatherData.hourly.time.findIndex(t => {
        const hourTime = new Date(t);
        return hourTime.getHours() >= now.getHours() && 
               hourTime.getDate() === now.getDate();
      });
      
      const startIndex = currentHourIndex >= 0 ? currentHourIndex : 0;
      const endIndex = Math.min(startIndex + 24, fullWeatherData.hourly.time.length);
      
      return fullWeatherData.hourly.time.slice(startIndex, endIndex).map((t, i) => {
        const hourTime = new Date(t);
        return {
          time: hourTime.toLocaleTimeString("en-US", { 
            hour: "numeric",
            hour12: true 
          }),
          temp: fullWeatherData.hourly.temperature_2m[startIndex + i],
          icon: "🌡️",
        };
      });
    } else {
      // For future days, show all 24 hours starting from midnight
      const startHour = selectedDayIndex * 24;
      const endHour = Math.min(startHour + 24, fullWeatherData.hourly.time.length);
      
      return fullWeatherData.hourly.time.slice(startHour, endHour).map((t, i) => {
        const hourTime = new Date(t);
        return {
          time: hourTime.toLocaleTimeString("en-US", { 
            hour: "numeric",
            hour12: true 
          }),
          temp: fullWeatherData.hourly.temperature_2m[startHour + i],
          icon: "🌡️",
        };
      });
    }
  };

  // 🔹 Handle day selection
  const handleDaySelect = (dayIndex) => {
    setSelectedDayIndex(dayIndex);
  };

  // 🔹 Fetch weather when location changes
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { name, latitude, longitude } = await getCoordinates(location);
        const data = await getWeather(latitude, longitude);

        // Store full weather data for day selection
        setFullWeatherData({ ...data, locationName: name });

        // Format Daily Forecast
        const daily = data.daily.time.map((day, i) => ({
          date: day,
          day: new Date(day).toLocaleDateString("en-US", { weekday: "short" }),
          fullDate: new Date(day).toLocaleDateString("en-US", { 
            weekday: "long", 
            year: "numeric", 
            month: "long", 
            day: "numeric" 
          }),
          high: data.daily.temperature_2m_max[i],
          low: data.daily.temperature_2m_min[i],
          humidity: data.hourly.relative_humidity_2m[i * 24] || 50,
          wind: data.daily.windspeed_10m_max[i] || data.current_weather.windspeed,
          precipitation: data.daily.precipitation_sum[i] || 0,
          icon: "☀️", // later: map weathercode to emoji
        }));

        // Format Hourly Forecast (next 8 hours)
        const now = new Date();
        const currentHour = now.getHours();
        const startIndex = data.hourly.time.findIndex(t => {
          const hourTime = new Date(t);
          return hourTime.getHours() >= currentHour;
        });
        const validStartIndex = startIndex >= 0 ? startIndex : 0;
        
        const hourly = data.hourly.time.slice(validStartIndex, validStartIndex + 8).map((t, i) => {
          const hourTime = new Date(t);
          return {
            time: hourTime.toLocaleTimeString("en-US", { 
              hour: "numeric",
              hour12: true 
            }),
            temp: data.hourly.temperature_2m[validStartIndex + i],
            icon: "🌡️",
          };
        });
        

        setWeather({
          location: name,
          date: new Date(data.current_weather.time).toDateString(),
          temp: data.current_weather.temperature,
          feelsLike: data.current_weather.temperature, // Open-Meteo has no "feels like"
          humidity: data.hourly.relative_humidity_2m[validStartIndex] || 50,
          wind: data.current_weather.windspeed,
          precipitation: data.hourly.precipitation[validStartIndex] || 0,
          icon: "☀️", // placeholder
        });
        setDailyData(daily);
        setHourlyData(hourly);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1729] via-[#1a2332] to-[#0f1729] text-white overflow-hidden">
      <Header unit={unit} setUnit={setUnit} />
      <main className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-8">How's the sky looking today?</h1>
          <SearchBar onSearch={(city) => setLocation(city)} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          <div className="flex-1">
            {dailyData.length > 0 && (
              <>
                <WeatherCard
                  location={getSelectedDayWeather()?.location}
                  date={getSelectedDayWeather()?.date}
                  temp={unit === "celsius" ? getSelectedDayWeather()?.temp : (getSelectedDayWeather()?.temp * 9) / 5 + 32}
                  icon={getSelectedDayWeather()?.icon}
                  unit={unit}
                />
                <DetailsCard
                  feelsLike={unit === "celsius" ? getSelectedDayWeather()?.feelsLike : (getSelectedDayWeather()?.feelsLike * 9) / 5 + 32}
                  humidity={getSelectedDayWeather()?.humidity}
                  wind={getSelectedDayWeather()?.wind}
                  precipitation={getSelectedDayWeather()?.precipitation}
                  unit={unit}
                />
                <DailyForecast 
                  forecast={dailyData} 
                  unit={unit} 
                  selectedDayIndex={selectedDayIndex}
                  onDaySelect={handleDaySelect}
                />
              </>
            )}
          </div>
          {getSelectedDayHourly().length > 0 && (
            <div className="lg:w-80">
              <HourlyForecast 
                forecast={getSelectedDayHourly()} 
                unit={unit}
                selectedDay={dailyData[selectedDayIndex]?.day}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
