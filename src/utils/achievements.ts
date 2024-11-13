import { Achievement } from '../types/achievements';
import { GameState } from '../types/game';
import { Award, Gem, Users, TrendingUp, Target, Star, Zap, Crown } from 'lucide-react';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_worker',
    title: 'First Steps',
    description: 'Hire your first worker',
    icon: 'Users',
    condition: (state: GameState) => state.workers.length >= 1,
    reward: {
      type: 'balance',
      value: 5,
      description: 'Bonus 5 USDT'
    },
    progress: (state: GameState) => Math.min(state.workers.length, 1),
    maxProgress: 1,
    completed: false,
    claimed: false,
    category: 'workers',
    rarity: 'common'
  },
  {
    id: 'mining_rate_01',
    title: 'Mining Novice',
    description: 'Reach 0.01 USDT/s mining rate',
    icon: 'TrendingUp',
    condition: (state: GameState) => state.totalMiningRate >= 0.01,
    reward: {
      type: 'multiplier',
      value: 1.1,
      description: '+10% Mining Speed'
    },
    progress: (state: GameState) => Math.min(state.totalMiningRate / 0.01, 1),
    maxProgress: 1,
    completed: false,
    claimed: false,
    category: 'mining',
    rarity: 'common'
  },
  {
    id: 'worker_level_5',
    title: 'Level Master',
    description: 'Get a worker to level 5',
    icon: 'Target',
    condition: (state: GameState) => state.workers.some(w => w.level >= 5),
    reward: {
      type: 'worker',
      value: 1,
      description: 'Free Worker'
    },
    progress: (state: GameState) => {
      const maxLevel = Math.max(...state.workers.map(w => w.level), 0);
      return Math.min(maxLevel / 5, 1);
    },
    maxProgress: 1,
    completed: false,
    claimed: false,
    category: 'upgrades',
    rarity: 'rare'
  },
  {
    id: 'balance_100',
    title: 'First Fortune',
    description: 'Accumulate 100 USDT',
    icon: 'Gem',
    condition: (state: GameState) => state.balance >= 100,
    reward: {
      type: 'multiplier',
      value: 1.2,
      description: '+20% Mining Speed'
    },
    progress: (state: GameState) => Math.min(state.balance / 100, 1),
    maxProgress: 1,
    completed: false,
    claimed: false,
    category: 'mining',
    rarity: 'rare'
  },
  {
    id: 'combo_master',
    title: 'Combo Master',
    description: 'Have 3 combo workers adjacent to each other',
    icon: 'Star',
    condition: (state: GameState) => {
      const comboWorkers = state.workers.filter(w => w.type === 'combo');
      return comboWorkers.some(w1 =>
        comboWorkers.filter(w2 => w2 !== w1).some(w2 =>
          Math.abs(w1.position - w2.position) === 1
        )
      );
    },
    reward: {
      type: 'special',
      value: 2,
      description: 'Double Combo Bonus'
    },
    progress: (state: GameState) => {
      const comboWorkers = state.workers.filter(w => w.type === 'combo').length;
      return Math.min(comboWorkers / 3, 1);
    },
    maxProgress: 1,
    completed: false,
    claimed: false,
    category: 'special',
    rarity: 'epic'
  }
];