# 🌤️ Weather Dashboard

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A beautiful, interactive weather dashboard that provides real-time weather forecasts with a modern glassmorphism UI. Search for any location worldwide and get detailed weather information including temperature, humidity, wind speed, and more.


## ✨ Features

- 🔍 **Smart Location Search** - Find weather for any city worldwide
- 📅 **7-Day Forecast** - Clickable daily weather overview
- ⏰ **24-Hour Forecast** - Scrollable hourly weather updates
- 🌡️ **Detailed Metrics** - Temperature, humidity, wind, precipitation, and more
- 🎨 **Dark Theme** - Eye-friendly dark interface with glass effects
- 📱 **Fully Responsive** - Works on all device sizes
- 🔄 **Live Updates** - Real-time weather data
- 🌡️ **Unit Toggle** - Switch between Celsius and Fahrenheit

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lalbahadur24/Weather_App.git
   cd Weather_App/weather_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🛠️ Built With

- [React](https://reactjs.org/) - Frontend library
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Open-Meteo API](https://open-meteo.com/) - Free weather API
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

## 📂 Project Structure

```
weather_frontend/
├── src/
│   ├── assets/           # Images and fonts
│   ├── components/       # Reusable components
│   │   ├── DailyForecast.jsx
│   │   ├── DetailsCard.jsx
│   │   ├── Header.jsx
│   │   ├── HourlyForecast.jsx
│   │   ├── SearchBar.jsx
│   │   └── WeatherCard.jsx
│   ├── pages/            # Page components
│   │   └── Home.jsx
│   ├── services/         # API services
│   │   └── weatherApi.js
│   └── App.jsx           # Main App component
├── public/              # Static files
└── package.json         # Project dependencies
```

## 🔧 Customization

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

- **Lal Bahadur Lohar**
- GitHub: [@Lalbahadur24](https://github.com/Lalbahadur24)

## 🙏 Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for the free weather API
- [Vite](https://vitejs.dev/) for the amazing development experience
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

