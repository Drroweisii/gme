export const GRID_SIZE = {
  ROWS: 3,
  COLS: 4,
  TOTAL_CELLS: 12,
  MIN_CELLS: 6,
  MAX_CELLS: 24,
};

export const GAME_CONFIG = {
  INITIAL_BALANCE: 100,
  BASE_MINING_RATE: 0.0001,
  MAX_LEVEL: 50,
  WORKER_COST: 1,
  UPDATE_INTERVAL: 1000,
  LEVEL_MULTIPLIER: 1.5,
  UPGRADE_COST_MULTIPLIER: 2,
  AUTO_SAVE_INTERVAL: 60000,
  OFFLINE_MINING_RATE: 0.5,
  MAX_OFFLINE_TIME: 24 * 60 * 60 * 1000, // 24 hours
};

export const MINING_MULTIPLIER = 1.5;

export const MERGE_RULES = {
  REQUIRED_LEVEL_MATCH: true,
  MUST_BE_ADJACENT: true,
  MAX_LEVEL: 50,
  MERGE_BONUS: 1.1,
};

export const ANIMATIONS = {
  DURATION: 300,
  MINING_PULSE: 1000,
  MERGE_DURATION: 500,
  UPGRADE_DURATION: 400,
  COIN_COLLECT: 800,
};

export const ACHIEVEMENT_CONFIG = {
  NOTIFICATION_DURATION: 5000,
  MAX_VISIBLE_NOTIFICATIONS: 3,
  PROGRESS_UPDATE_INTERVAL: 1000,
};

export const WORKER_RARITY = {
  COMMON: { color: 'gray', chance: 0.6, multiplier: 1 },
  RARE: { color: 'blue', chance: 0.25, multiplier: 1.5 },
  EPIC: { color: 'purple', chance: 0.1, multiplier: 2.5 },
  LEGENDARY: { color: 'yellow', chance: 0.05, multiplier: 5 },
};