import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';

interface TradeChartProps {
  data: ChartDataPoint[];
}

const TradeChart: React.FC<TradeChartProps> = ({ data }) => {
  return (
    <div className="glass-card p-6 rounded-xl shadow-lg border border-white/10">
      <h3 className="text-lg font-bold text-white mb-6">Import/Export Trends</h3>
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
            <YAxis tick={{ fill: '#9ca3af' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                color: '#f3f4f6'
              }}
            />
            <Legend wrapperStyle={{ color: '#d1d5db' }} />
            <Line type="monotone" dataKey="imports" stroke="#3B82F6" strokeWidth={3} activeDot={{ r: 8 }} name="Imports ($M)" />
            <Line type="monotone" dataKey="exports" stroke="#10B981" strokeWidth={3} name="Exports ($M)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TradeChart;