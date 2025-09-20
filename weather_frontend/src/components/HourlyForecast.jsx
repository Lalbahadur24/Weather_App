export default function HourlyForecast({ forecast, unit, selectedDay }) {
  const formatTemp = (temp) => Math.round(temp);
  
  const getHourlyIcon = (index, time) => {
    // Parse hour from time string
    const hour = parseInt(time.split(':')[0]);
    const isPM = time.includes('PM');
    const hour24 = isPM && hour !== 12 ? hour + 12 : (!isPM && hour === 12 ? 0 : hour);
    
    // Return different icons based on time of day
    if (hour24 >= 6 && hour24 < 12) {
      return ['🌅', '☀️', '🌤️'][index % 3]; // Morning
    } else if (hour24 >= 12 && hour24 < 18) {
      return ['☀️', '🌤️', '⛅'][index % 3]; // Afternoon
    } else if (hour24 >= 18 && hour24 < 21) {
      return ['🌤️', '⛅', '🌥️'][index % 3]; // Evening
    } else {
      return ['🌙', '⭐', '🌌'][index % 3]; // Night
    }
  };

  const getDayName = () => {
    return selectedDay || 'Today';
  };

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/30 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Hourly forecast</h3>
        <select className="bg-gray-700/50 text-white text-sm px-3 py-1 rounded-lg border border-gray-600/30 focus:outline-none">
          <option>{getDayName()}</option>
        </select>
      </div>
      
      <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50 pr-2">
        <div className="space-y-3">
          {forecast.map((hour, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 px-2 hover:bg-gray-700/30 rounded-xl transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getHourlyIcon(idx, hour.time)}</span>
                <span className="text-white font-medium">{hour.time}</span>
              </div>
              <span className="text-white font-medium">
                {formatTemp(unit === "celsius" ? hour.temp : (hour.temp * 9) / 5 + 32)}°
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
