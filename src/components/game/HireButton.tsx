import React from 'react';
import { GAME_CONFIG } from '../../utils/constants';
import { UserPlus } from 'lucide-react';

interface HireButtonProps {
  onHire: () => void;
  disabled: boolean;
}

export function HireButton({ onHire, disabled }: HireButtonProps) {
  return (
    <button
      onClick={onHire}
      disabled={disabled}
      className={`
        w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl
        flex items-center justify-center gap-2 sm:gap-3
        transition-all duration-200
        ${disabled
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-[#FFB74D] hover:bg-[#FFA726] active:scale-[0.98] text-white shadow-lg hover:shadow-xl'
        }
        font-bold text-base sm:text-lg
        touch-manipulation
      `}
    >
      <UserPlus className="w-5 h-5 sm:w-6 sm:h-6" />
      <span className="whitespace-nowrap">
        HIRE MINER ({GAME_CONFIG.WORKER_COST} COINS)
      </span>
    </button>
  );
}