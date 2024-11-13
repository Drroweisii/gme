import React from 'react';
import { Worker as WorkerType } from '../../types/game';
import { HardHat, Pickaxe, Gem, Zap, Star } from 'lucide-react';
import { calculateUpgradeCost } from '../../utils/calculations';
import { ANIMATIONS } from '../../utils/constants';

const MinerIcons = {
  standard: HardHat,
  speed: Zap,
  power: Pickaxe,
  combo: Star,
  lucky: Gem,
};

interface WorkerProps {
  worker: WorkerType;
  onClick: () => void;
  balance: number;
  isSelected?: boolean;
  canMerge?: boolean;
}

export function Worker({ worker, onClick, balance, isSelected, canMerge }: WorkerProps) {
  const upgradeCost = calculateUpgradeCost(worker.level);
  const canUpgrade = balance >= upgradeCost;
  const Icon = MinerIcons[worker.type as keyof typeof MinerIcons] || HardHat;

  return (
    <div
      onClick={onClick}
      className={`
        relative w-full h-full flex items-center justify-center
        transition-all duration-200 p-2
        ${canUpgrade ? 'cursor-pointer' : 'cursor-not-allowed'}
        ${isSelected ? 'scale-95' : ''}
        touch-manipulation
      `}
      style={{
        animationDuration: `${ANIMATIONS.MINING_PULSE}ms`,
      }}
    >
      <div className={`
        relative aspect-square w-full max-w-[80%] rounded-xl
        flex items-center justify-center
        ${isSelected ? 'bg-[#FFB74D]' : 'bg-[#FFA726]'}
        ${canMerge ? 'bg-[#81C784]' : ''}
        transition-colors duration-200 shadow-md
      `}>
        <Icon className={`
          w-1/2 h-1/2 transition-colors duration-200
          ${isSelected ? 'text-white' : 'text-white'}
          ${canMerge ? 'text-white animate-bounce' : ''}
        `} />
        
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                      bg-[#FFB74D] text-white px-2 py-0.5 
                      rounded-full text-xs font-bold shadow-md
                      whitespace-nowrap min-w-[2.5rem] text-center">
          Lvl {worker.level}
        </div>
        
        {canUpgrade && !isSelected && !canMerge && (
          <div className="absolute -top-1 -right-1 
                        bg-[#4CAF50] text-white px-1.5 py-0.5 
                        rounded-full text-[10px] font-bold shadow-md
                        whitespace-nowrap">
            +{upgradeCost}
          </div>
        )}
      </div>
    </div>
  );
}