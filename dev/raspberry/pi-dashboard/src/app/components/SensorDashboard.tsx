"use client";

import { useEffect, useState } from "react";

type SensorData = {
  temperature_celsius: number | null;
  humidity_percent: number | null;
};

export default function SensorDashboard() {
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature_celsius: null,
    humidity_percent: null,
  });

  const [error, setError] = useState<string | null>(null);

  const apiUrl = "http://192.168.0.18:8000/data";

  const fetchSensorData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: SensorData = await response.json();
      setSensorData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  useEffect(() => {
    fetchSensorData();
    const intervalTimeInMilliseconds = 60000;
    const interval = setInterval(fetchSensorData, intervalTimeInMilliseconds);
    return () => clearInterval(interval);
  }, []);

  const temp = sensorData.temperature_celsius;
  let tempContainerClass = "rounded-lg bg-orange-100 p-6";
  let tempHeaderClass = "text-md font-semibold text-orange-800";
  let tempValueClass = "text-4xl font-extrabold text-orange-600";
  let tempIcon = null;

  if (temp !== null) {
    if (temp < 18) {
      tempContainerClass = "rounded-lg bg-blue-100 p-6";
      tempHeaderClass = "text-md font-semibold text-blue-800";
      tempValueClass = "text-4xl font-extrabold text-blue-600";
      tempIcon = "❄️";
    } else if (temp > 24) {
      tempContainerClass = "rounded-lg bg-red-100 p-6";
      tempHeaderClass = "text-md font-semibold text-red-800";
      tempValueClass = "text-4xl font-extrabold text-red-600";
      tempIcon = "🔥";
    }
  }

  const humidity = sensorData.humidity_percent;
  let humidityContainerClass = "rounded-lg bg-blue-100 p-6";
  let humidityHeaderClass = "text-md font-semibold text-blue-800";
  let humidityValueClass = "text-4xl font-extrabold text-blue-600";
  let humidityIcon = null;

  if (humidity !== null) {
    if (humidity < 40) {
      humidityContainerClass = "rounded-lg bg-yellow-100 p-6";
      humidityHeaderClass = "text-md font-semibold text-yellow-800";
      humidityValueClass = "text-4xl font-extrabold text-yellow-600";
      humidityIcon = "🔼";
    } else if (humidity > 75) {
      humidityContainerClass = "rounded-lg bg-blue-200 p-6";
      humidityHeaderClass = "text-md font-semibold text-blue-900";
      humidityValueClass = "text-4xl font-extrabold text-blue-700";
      humidityIcon = "🌧️";
    }
  }

  return (
    <div className="flex w-full max-w-2xl flex-col justify-around rounded-xl bg-white p-8 text-center shadow-lg">
      <h1 className="mb-2 text-5xl font-bold text-gray-800">🏠</h1>
      {error ? (
        <div className="rounded-md bg-red-100 p-4 text-red-700">{error}</div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className={tempContainerClass}>
            <h2 className={tempHeaderClass}>Temperatura</h2>
            <p className={tempValueClass}>
              {tempIcon && <span className="mr-2">{tempIcon}</span>}{sensorData.temperature_celsius !== null ? sensorData.temperature_celsius.toFixed(2) : "--"}<span className="text-2xl">°C</span>
            </p>
          </div>
          <div className={humidityContainerClass}>
            <h2 className={humidityHeaderClass}>Humitat</h2>
            <p className={humidityValueClass}>
              {humidityIcon && <span className="mr-2">{humidityIcon}</span>}{sensorData.humidity_percent !== null ? sensorData.humidity_percent.toFixed(2) : "--"}<span className="text-3xl">%</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}