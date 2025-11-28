import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change.startsWith('+');
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';

  return (
    <div className="glass-card p-6 rounded-xl shadow-lg border border-white/10 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
            {icon}
        </div>
      </div>
      <div className="mt-4">
        <p className={`text-sm font-bold ${changeColor}`}>{change}</p>
      </div>
    </div>
  );
};

export default KpiCard;