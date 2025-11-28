import React from 'react';
import { ActivityItem, ActivityStatus } from '../types';

const statusStyles: { [key in ActivityStatus]: { dot: string; text: string } } = {
  [ActivityStatus.Completed]: { dot: 'bg-green-500', text: 'text-green-400' },
  [ActivityStatus.Pending]: { dot: 'bg-yellow-500', text: 'text-yellow-400' },
  [ActivityStatus.Flagged]: { dot: 'bg-red-500', text: 'text-red-400' },
};

const ActivityItemComponent: React.FC<{ item: ActivityItem }> = ({ item }) => {
  const styles = statusStyles[item.status];
  return (
    <li className="flex space-x-3 py-4 border-b border-white/5 last:border-0">
      <div className={`relative mt-1 flex h-3 w-3 items-center justify-center`}>
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${styles.dot} opacity-75`}></span>
        <span className={`relative inline-flex h-2 w-2 rounded-full ${styles.dot}`}></span>
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-200 font-medium">{item.description}</p>
        <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-gray-500">{item.timestamp}</p>
            <p className={`text-xs font-bold ${styles.text}`}>{item.status}</p>
        </div>
      </div>
    </li>
  );
};

const ActivityFeed: React.FC<{ items: ActivityItem[] }> = ({ items }) => {
  return (
    <div className="glass-card p-6 rounded-xl shadow-lg border border-white/10 h-full">
      <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
      <ul className="">
        {items.map((item) => (
          <ActivityItemComponent key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;