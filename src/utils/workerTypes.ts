import { WorkerTypeConfig } from '../types/workers';

export const WORKER_TYPES: Record<string, WorkerTypeConfig> = {
  standard: {
    name: 'Standard',
    description: 'Balanced mining capabilities',
    icon: 'Pickaxe',
    color: 'indigo',
    stats: {
      baseRate: 1,
      speedMultiplier: 1,
      powerMultiplier: 1,
      comboBonus: 0,
      luckChance: 0.01
    },
    cost: 1
  },
  speed: {
    name: 'Speed',
    description: 'Mines faster but with less power',
    icon: 'Zap',
    color: 'yellow',
    stats: {
      baseRate: 0.8,
      speedMultiplier: 1.5,
      powerMultiplier: 0.8,
      comboBonus: 0,
      luckChance: 0.01
    },
    cost: 2
  },
  power: {
    name: 'Power',
    description: 'Higher mining power but slower',
    icon: 'Hammer',
    color: 'red',
    stats: {
      baseRate: 1.2,
      speedMultiplier: 0.8,
      powerMultiplier: 1.5,
      comboBonus: 0,
      luckChance: 0.01
    },
    cost: 2
  },
  combo: {
    name: 'Combo',
    description: 'Gains bonus from adjacent workers',
    icon: 'Sparkles',
    color: 'purple',
    stats: {
      baseRate: 0.9,
      speedMultiplier: 1,
      powerMultiplier: 1,
      comboBonus: 0.2,
      luckChance: 0.01
    },
    cost: 3,
    specialAbility: {
      name: 'Chain Reaction',
      description: 'Triggers mining boost when surrounded by workers',
      trigger: (worker, gameState) => {
        const adjacentCount = gameState.workers.filter(w => 
          w.id !== worker.id && 
          Math.abs(w.position - worker.position) === 1
        ).length;
        return adjacentCount >= 2;
      },
      effect: (worker, gameState) => {
        worker.stats.powerMultiplier *= 1.5;
      }
    }
  },
  lucky: {
    name: 'Lucky',
    description: 'Higher chance of finding bonuses',
    icon: 'Clover',
    color: 'green',
    stats: {
      baseRate: 0.7,
      speedMultiplier: 1,
      powerMultiplier: 1,
      comboBonus: 0,
      luckChance: 0.05
    },
    cost: 3,
    specialAbility: {
      name: 'Fortune Finder',
      description: 'Chance to double mining rewards',
      trigger: (worker) => Math.random() < worker.stats.luckChance,
      effect: (worker) => {
        worker.stats.powerMultiplier *= 2;
      }
    }
  }
};