
import React, { useEffect, useState } from 'react';

// Coordinates for major trade hubs (simplified relative to 1000x500 viewBox)
const HUBS = [
  { id: 'shanghai', x: 780, y: 180, name: 'Shanghai' },
  { id: 'singapore', x: 740, y: 260, name: 'Singapore' },
  { id: 'rotterdam', x: 520, y: 140, name: 'Rotterdam' },
  { id: 'dubai', x: 620, y: 200, name: 'Dubai' },
  { id: 'ny', x: 280, y: 160, name: 'New York' },
  { id: 'la', x: 180, y: 180, name: 'Los Angeles' },
  { id: 'santos', x: 320, y: 350, name: 'Santos' },
];

const GlobalMap: React.FC = () => {
  const [routes, setRoutes] = useState<{from: any, to: any, id: number}[]>([]);

  useEffect(() => {
    // Generate some random routes
    const newRoutes = [];
    for(let i=0; i<10; i++) {
        const from = HUBS[Math.floor(Math.random() * HUBS.length)];
        let to = HUBS[Math.floor(Math.random() * HUBS.length)];
        while(from.id === to.id) to = HUBS[Math.floor(Math.random() * HUBS.length)];
        newRoutes.push({ from, to, id: i });
    }
    setRoutes(newRoutes);
  }, []);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] bg-[#020617] rounded-xl overflow-hidden border border-white/5 shadow-2xl">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
      
      {/* Map SVG */}
      <svg viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-60">
        <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        
        {/* World Map Overlay */}
        <image href="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" x="0" y="0" width="1000" height="500" opacity="0.15" style={{ filter: 'grayscale(100%) invert(1)' }} />

        {/* Trade Routes */}
        {routes.map(route => {
            const midX = (route.from.x + route.to.x) / 2;
            const midY = (route.from.y + route.to.y) / 2 - 50; // Curve upwards
            const pathData = `M${route.from.x},${route.from.y} Q${midX},${midY} ${route.to.x},${route.to.y}`;
            
            return (
                <g key={route.id}>
                    {/* Track Line */}
                    <path d={pathData} fill="none" stroke="#1e293b" strokeWidth="1" />
                    {/* Animated Shipment */}
                    <path d={pathData} fill="none" stroke="url(#pathGradient)" strokeWidth="2" strokeLinecap="round" filter="url(#glow)">
                        <animate attributeName="stroke-dasharray" from="0, 1000" to="1000, 0" dur={`${3 + Math.random() * 2}s`} repeatCount="indefinite" />
                    </path>
                </g>
            );
        })}

        {/* Hubs */}
        {HUBS.map(hub => (
            <g key={hub.id}>
                <circle cx={hub.x} cy={hub.y} r="4" fill="#3b82f6">
                    <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx={hub.x} cy={hub.y} r="2" fill="white" />
                <text x={hub.x} y={hub.y + 12} fill="#94a3b8" fontSize="10" textAnchor="middle" className="uppercase tracking-wider font-semibold opacity-0 hover:opacity-100 transition-opacity select-none">
                    {hub.name}
                </text>
            </g>
        ))}
      </svg>

      {/* Overlay Stats */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <h3 className="text-white font-bold text-xs md:text-sm bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/10 flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2 animate-pulse"></span>
              Live Trade Activity
          </h3>
      </div>
    </div>
  );
};

export default GlobalMap;
