import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { sol: 1, solarFlare: 1.03, geological: 0.59, bacterial: 0.15 },
  { sol: 2, solarFlare: 1.03, geological: 0.61, bacterial: 0.19 },
  { sol: 3, solarFlare: 1.08, geological: 0.68, bacterial: 0.17 },
  { sol: 4, solarFlare: 1.48, geological: 0.61, bacterial: 0.13 },
  { sol: 5, solarFlare: 1.08, geological: 0.51, bacterial: 0.16 },
  { sol: 6, solarFlare: 1.12, geological: 0.72, bacterial: 0.13 },
  { sol: 7, solarFlare: 1.20, geological: 0.51, bacterial: 0.19 },
  { sol: 8, solarFlare: 1.17, geological: 0.77, bacterial: 0.15 },
  { sol: 9, solarFlare: 1.39, geological: 0.52, bacterial: 0.18 },
  { sol: 10, solarFlare: 1.42, geological: 0.59, bacterial: 0.13 },
  { sol: 11, solarFlare: 1.22, geological: 0.66, bacterial: 0.17 },
  { sol: 12, solarFlare: 1.26, geological: 0.66, bacterial: 0.15 },
  { sol: 13, solarFlare: 1.22, geological: 0.66, bacterial: 0.15 },
  { sol: 14, solarFlare: 1.45, geological: 0.70, bacterial: 0.19 },
  { sol: 15, solarFlare: 2.48, geological: 0.67, bacterial: 0.13 },
  { sol: 16, solarFlare: 2.12, geological: 0.53, bacterial: 0.13 },
  { sol: 17, solarFlare: 2.80, geological: 0.70, bacterial: 0.13 },
  { sol: 18, solarFlare: 2.40, geological: 1.74, bacterial: 0.13 },
  { sol: 19, solarFlare: 2.89, geological: 1.99, bacterial: 0.17 },
  { sol: 20, solarFlare: 5.60, geological: 1.92, bacterial: 0.70 },
  { sol: 21, solarFlare: 4.50, geological: 1.93, bacterial: 0.78 },
  { sol: 22, solarFlare: 5.28, geological: 3.09, bacterial: 0.79 },
  { sol: 23, solarFlare: 4.83, geological: 4.17, bacterial: 0.67 },
  { sol: 24, solarFlare: 4.74, geological: 3.35, bacterial: 1.99 },
  { sol: 25, solarFlare: 7.54, geological: 3.85, bacterial: 1.50 },
  { sol: 26, solarFlare: 7.41, geological: 3.94, bacterial: 2.08 },
  { sol: 27, solarFlare: 8.92, geological: 6.63, bacterial: 2.16 },
  { sol: 28, solarFlare: 7.58, geological: 5.75, bacterial: 4.09 },
  { sol: 29, solarFlare: 9.63, geological: 6.66, bacterial: 6.11 },
  { sol: 30, solarFlare: 9.57, geological: 6.35, bacterial: 5.50 },
];

const events = [
  { sol: 16, event: "Début de l'augmentation des éruptions solaires" },
  { sol: 20, event: "Anomalies géologiques détectées dans Acidalia Planitia" },
  { sol: 22, event: "Signatures bactériennes inhabituelles détectées" },
  { sol: 24, event: "Éruptions solaires atteignent le niveau X (extrême)" },
  { sol: 26, event: "Événement sismique majeur (4.7 échelle martienne)" },
  { sol: 28, event: "Croissance exponentielle des colonies bactériennes" },
  { sol: 29, event: "ALERTE D'ÉVACUATION ÉMISE" },
];

const MarsBasisEmergencyData = () => {
  return (
    <div className="flex flex-col space-y-8 w-full p-6 bg-gray-50 rounded-lg">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">ALERTE D'ÉVACUATION - BASE MARTIENNE</h1>
        <p className="text-gray-700">Données des 30 derniers sols montrant la corrélation entre les trois menaces</p>
      </div>
      
      {/* Solar Flare Graph */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-yellow-600 mb-2">Activité des Éruptions Solaires</h2>
        <p className="text-sm text-gray-600 mb-4">Intensité mesurée par le satellite orbital MSO-7</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sol" label={{ value: 'Sol (Jour Martien)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Intensité (échelle logarithmique)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [value.toFixed(2), "Intensité"]} />
              <Line 
                type="monotone" 
                dataKey="solarFlare" 
                name="Éruptions Solaires" 
                stroke="#FF9800" 
                strokeWidth={2} 
                dot={{ r: 3 }} 
                activeDot={{ r: 5 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Geological Activity Graph */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-red-700 mb-2">Activité Géologique</h2>
        <p className="text-sm text-gray-600 mb-4">Relevés sismiques de la station Base Martienne</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sol" label={{ value: 'Sol (Jour Martien)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Magnitude (échelle martienne)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [value.toFixed(2), "Magnitude"]} />
              <Line 
                type="monotone" 
                dataKey="geological" 
                name="Activité Géologique" 
                stroke="#D32F2F" 
                strokeWidth={2} 
                dot={{ r: 3 }} 
                activeDot={{ r: 5 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Bacterial Activity Graph */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-green-700 mb-2">Activité Bactérienne</h2>
        <p className="text-sm text-gray-600 mb-4">Concentration des colonies détectées (en millions/cm³)</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sol" label={{ value: 'Sol (Jour Martien)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Concentration (M/cm³)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [value.toFixed(2), "Concentration"]} />
              <Line 
                type="monotone" 
                dataKey="bacterial" 
                name="Colonies Bactériennes" 
                stroke="#2E7D32" 
                strokeWidth={2} 
                dot={{ r: 3 }} 
                activeDot={{ r: 5 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Timeline of Events */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Chronologie des Événements Critiques</h2>
        <div className="space-y-2">
          {events.map((event, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-16 text-right pr-3 font-semibold">Sol {event.sol}</div>
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-3"></div>
              <div className="flex-grow">{event.event}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
        <p className="text-red-700 font-semibold">CONCLUSION SCIENTIFIQUE:</p>
        <p className="text-gray-800">Les données montrent clairement une corrélation temporelle entre les trois phénomènes. Les éruptions solaires inhabituelles ont vraisemblablement déclenché une activité sismique anormale, qui a permis la remontée à la surface de bactéries martiennes anciennes. L'évacuation est impérative.</p>
      </div>
    </div>
  );
};

export default MarsBasisEmergencyData;
