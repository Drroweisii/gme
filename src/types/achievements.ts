export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (state: GameState) => boolean;
  reward: {
    type: 'balance' | 'multiplier' | 'worker' | 'special';
    value: number;
    description?: string;
  };
  progress: (state: GameState) => number;
  maxProgress: number;
  completed: boolean;
  claimed: boolean;
  category?: 'mining' | 'workers' | 'upgrades' | 'special';
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  hidden?: boolean;
}

export interface AchievementNotification {
  id: string;
  achievementId: string;
  title: string;
  message: string;
  timestamp: number;
  type?: 'success' | 'milestone' | 'special';
  duration?: number;
}

export interface AchievementCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}