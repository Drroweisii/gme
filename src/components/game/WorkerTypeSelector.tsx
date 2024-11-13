import React from 'react';
import { WORKER_TYPES } from '../../utils/workerTypes';
import { WorkerType } from '../../types/workers';
import { Pickaxe, Zap, Hammer, Sparkles, Clover } from 'lucide-react';

interface WorkerTypeSelectorProps {
  selectedType: WorkerType;
  onSelect: (type: WorkerType) => void;
  balance: number;
}

const IconMap = {
  Pickaxe,
  Zap,
  Hammer,
  Sparkles,
  Clover
};

export function WorkerTypeSelector({ selectedType, onSelect, balance }: WorkerTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-2 sm:p-4 bg-white rounded-lg shadow-md overflow-x-auto">
      {Object.entries(WORKER_TYPES).map(([type, config]) => {
        const Icon = IconMap[config.icon as keyof typeof IconMap];
        const canAfford = balance >= config.cost;
        const colorClass = `${config.color}-500`;
        
        return (
          <button
            key={type}
            onClick={() => canAfford && onSelect(type as WorkerType)}
            disabled={!canAfford}
            className={`
              relative p-2 sm:p-3 rounded-lg flex flex-col items-center gap-1
              transition-all duration-200 min-w-[100px]
              ${selectedType === type ? 'bg-indigo-50 ring-2 ring-indigo-500' : 'bg-gray-50'}
              ${canAfford ? 'hover:bg-gray-100 cursor-pointer active:scale-95' : 'opacity-50 cursor-not-allowed'}
              touch-manipulation
            `}
            title={config.description}
          >
            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${colorClass}`} />
            <span className="text-xs font-medium text-gray-700">{config.name}</span>
            <span className="text-xs text-gray-500">{config.cost} USDT</span>
            
            {selectedType === type && (
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-indigo-500 rounded-full" />
            )}
            
            <div className="mt-1 text-[10px] sm:text-xs text-gray-500 truncate w-full text-center">
              {Object.entries(config.stats)
                .filter(([_, value]) => value !== 1 && value !== 0)
                .map(([key, value]) => (
                  <div key={key} className="whitespace-nowrap">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}: {value > 1 ? `+${(value - 1) * 100}%` : `${value * 100}%`}
                  </div>
                ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}