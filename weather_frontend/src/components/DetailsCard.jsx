export default function DetailsCard({ feelsLike, humidity, wind, precipitation, unit }) {
  const formatTemp = (temp) => Math.round(temp);
  const formatWind = (speed) => Math.round(speed);
  const formatPrecipitation = (precip) => precip ? precip.toFixed(1) : '0';

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl text-white border border-gray-700/30">
        <p className="text-gray-300 text-sm mb-2">Feels Like</p>
        <h3 className="text-2xl font-bold">{formatTemp(feelsLike)}°</h3>
      </div>
      <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl text-white border border-gray-700/30">
        <p className="text-gray-300 text-sm mb-2">Humidity</p>
        <h3 className="text-2xl font-bold">{Math.round(humidity)}%</h3>
      </div>
      <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl text-white border border-gray-700/30">
        <p className="text-gray-300 text-sm mb-2">Wind</p>
        <h3 className="text-2xl font-bold">{formatWind(wind)} mph</h3>
      </div>
      <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl text-white border border-gray-700/30">
        <p className="text-gray-300 text-sm mb-2">Precipitation</p>
        <h3 className="text-2xl font-bold">{formatPrecipitation(precipitation)} in</h3>
      </div>
    </div>
  );
}
