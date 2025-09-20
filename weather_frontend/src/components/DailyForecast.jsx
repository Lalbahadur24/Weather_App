export default function DailyForecast({ forecast, unit, selectedDayIndex, onDaySelect }) {
  const formatTemp = (temp) => Math.round(temp);
  
  const getWeatherIcon = (index) => {
    const icons = ['🌧️', '🌧️', '☀️', '⛅', '🌦️', '🌧️', '🌊'];
    return icons[index] || '☀️';
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-white">Daily forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {forecast.slice(0, 7).map((day, idx) => (
          <div
            key={idx}
            onClick={() => onDaySelect(idx)}
            className={`p-4 rounded-2xl text-white border text-center cursor-pointer transition-all duration-200 ${
              selectedDayIndex === idx
                ? 'bg-blue-600/60 border-blue-400/50 shadow-lg shadow-blue-500/20 scale-105'
                : 'bg-gray-800/40 backdrop-blur-sm border-gray-700/30 hover:bg-gray-700/40 hover:scale-102'
            }`}
          >
            <p className={`text-sm font-medium mb-2 ${
              selectedDayIndex === idx ? 'text-white' : 'text-gray-300'
            }`}>
              {idx === 0 ? 'Today' : day.day}
            </p>
            <div className="text-3xl mb-2">{getWeatherIcon(idx)}</div>
            <p className="text-sm font-bold">
              {formatTemp(day.high)}°
            </p>
            <p className={`text-xs ${
              selectedDayIndex === idx ? 'text-blue-200' : 'text-gray-400'
            }`}>
              {formatTemp(day.low)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
