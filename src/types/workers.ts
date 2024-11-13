export type WorkerType = 'standard' | 'speed' | 'power' | 'combo' | 'lucky';

export interface WorkerStats {
  baseRate: number;
  speedMultiplier: number;
  powerMultiplier: number;
  comboBonus: number;
  luckChance: number;
}

export interface WorkerTypeConfig {
  name: string;
  description: string;
  icon: string;
  color: string;
  stats: WorkerStats;
  cost: number;
  maxLevel?: number;
  specialAbility?: {
    name: string;
    description: string;
    trigger: (worker: Worker, gameState: GameState) => boolean;
    effect: (worker: Worker, gameState: GameState) => void;
  };
}

export interface WorkerUpgrade {
  level: number;
  cost: number;
  multiplier: number;
  requirements?: {
    minBalance?: number;
    minWorkers?: number;
    minLevel?: number;
  };
}