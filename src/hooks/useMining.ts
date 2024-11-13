import { useEffect, useState, useCallback } from 'react';
import { Worker } from '../types/game';
import { GAME_CONFIG } from '../utils/constants';

export function useMining(workers: Worker[]) {
  const [totalRate, setTotalRate] = useState(0);

  const calculateWorkerRate = useCallback((worker: Worker) => {
    const baseRate = GAME_CONFIG.BASE_MINING_RATE * 
                    worker.stats.baseRate * 
                    Math.pow(GAME_CONFIG.LEVEL_MULTIPLIER, worker.level - 1);
    
    const speedMultiplier = worker.stats.speedMultiplier;
    const powerMultiplier = worker.stats.powerMultiplier;
    
    return baseRate * speedMultiplier * powerMultiplier;
  }, []);

  const calculateComboBonus = useCallback((worker: Worker, workers: Worker[]) => {
    if (!worker.stats.comboBonus) return 1;

    const adjacentWorkers = workers.filter(w => 
      w.id !== worker.id && 
      Math.abs(w.position - worker.position) === 1
    );

    return 1 + (adjacentWorkers.length * worker.stats.comboBonus);
  }, []);

  useEffect(() => {
    const calculateTotalRate = () => {
      return workers.reduce((total, worker) => {
        const baseRate = calculateWorkerRate(worker);
        const comboMultiplier = calculateComboBonus(worker, workers);
        return total + (baseRate * comboMultiplier);
      }, 0);
    };

    setTotalRate(calculateTotalRate());
  }, [workers, calculateWorkerRate, calculateComboBonus]);

  return { totalRate };
}