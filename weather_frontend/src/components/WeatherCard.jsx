export default function WeatherCard({ location, date, temp, icon, unit }) {
  const formatTemp = (temperature) => {
    return Math.round(temperature);
  };

  return (
    <div className="bg-gradient-to-br from-[#4c6ef5] via-[#5c7cfa] to-[#748ffc] rounded-3xl p-8 mb-6 text-white shadow-2xl relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-orange-400 rounded-full"></div>
      <div className="absolute bottom-8 left-8 w-2 h-2 bg-orange-300 rounded-full"></div>
      <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-yellow-300 rounded-full"></div>
      
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-1">{location}</h2>
        <p className="text-white/80 text-sm mb-8">{date}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="text-7xl font-light">{formatTemp(temp)}</span>
            <span className="text-2xl font-light ml-1">°</span>
          </div>
          <div className="text-6xl">
            ☀️
          </div>
        </div>
      </div>
    </div>
  );
}
