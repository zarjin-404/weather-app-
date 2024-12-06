'use client';

import { useState } from 'react';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  visibility: number;
}

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const API_KEY = '0a13c18f2384a024c5471af45fb612e6';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather(null);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8 font-sans text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tight">
          Weather Dashboard
        </h1>

        <form onSubmit={handleSubmit} className="mb-12">
          <div className="flex gap-4 bg-slate-800/50 p-6 rounded-2xl shadow-2xl border border-slate-700/50">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for a city..."
              className="flex-1 px-6 py-4 rounded-xl bg-slate-900/50 border border-slate-700 focus:outline-none focus:border-cyan-400 transition-all text-lg placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 font-medium shadow-lg shadow-cyan-500/20"
            >
              Search
            </button>
          </div>
        </form>

        <div className="bg-slate-800/50 rounded-3xl shadow-2xl border border-slate-700/50 backdrop-blur-xl">
          {weather ? (
            <div className="p-10 space-y-8">
              <div className="flex items-center justify-between border-b border-slate-700/50 pb-8">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2">
                    {weather.name}
                  </h2>
                  <p className="text-slate-400">Current Weather Conditions</p>
                </div>
                <div className="text-right">
                  <p className="text-7xl font-bold text-white">
                    {Math.round(weather.main.temp)}°
                  </p>
                  <p className="text-slate-400">Celsius</p>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
                  <p className="text-slate-400 font-medium mb-2">Humidity</p>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-white">
                      {weather.main.humidity}
                    </p>
                    <p className="text-slate-400 ml-1">%</p>
                  </div>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
                  <p className="text-slate-400 font-medium mb-2">Wind Speed</p>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-white">
                      {weather.wind.speed}
                    </p>
                    <p className="text-slate-400 ml-1">km/h</p>
                  </div>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
                  <p className="text-slate-400 font-medium mb-2">Pressure</p>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-white">
                      {weather.main.pressure}
                    </p>
                    <p className="text-slate-400 ml-1">hPa</p>
                  </div>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
                  <p className="text-slate-400 font-medium mb-2">Visibility</p>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-white">
                      {weather.visibility / 1000}
                    </p>
                    <p className="text-slate-400 ml-1">km</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <p className="text-slate-400 text-lg mb-2">
                No weather data to display
              </p>
              <p className="text-slate-500">Enter a city name to get started</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
