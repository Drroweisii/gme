export interface GameState {
  balance: number;
  workers: Worker[];
  totalMiningRate: number;
  gridState: GridCell[];
  lastUpdate?: number;
}

export interface Worker {
  id: string;
  type: string;
  level: number;
  position: number;
  miningRate: number;
  stats: WorkerStats;
  lastCollected?: number;
}

export interface GridCell {
  position: number;
  workerId: string | null;
  isOccupied: boolean;
  isHighlighted?: boolean;
}

export interface MiningStats {
  totalRate: number;
  workerCount: number;
  highestLevel: number;
  totalEarned?: number;
  efficiency?: number;
}

export interface WorkerStats {
  baseRate: number;
  speedMultiplier: number;
  powerMultiplier: number;
  comboBonus: number;
  luckChance: number;
}