import { useState, useCallback, useEffect } from 'react';
import { GameState } from '../types/game';
import { Achievement, AchievementNotification } from '../types/achievements';
import { ACHIEVEMENTS } from '../utils/achievements';

let notificationCounter = 0;

export function useAchievements(gameState: GameState) {
  const [achievements, setAchievements] = useState(ACHIEVEMENTS);
  const [notifications, setNotifications] = useState<AchievementNotification[]>([]);

  const checkAchievements = useCallback(() => {
    let hasNewAchievement = false;
    
    const newAchievements = achievements.map(achievement => {
      if (!achievement.completed && achievement.condition(gameState)) {
        hasNewAchievement = true;
        const notification: AchievementNotification = {
          id: `achievement-notification-${Date.now()}-${notificationCounter++}`,
          achievementId: achievement.id,
          title: 'Achievement Unlocked!',
          message: achievement.title,
          timestamp: Date.now(),
        };
        setNotifications(prev => [...prev, notification]);
        return { ...achievement, completed: true };
      }
      return achievement;
    });

    if (hasNewAchievement) {
      setAchievements(newAchievements);
    }
  }, [gameState, achievements]);

  useEffect(() => {
    checkAchievements();
  }, [checkAchievements]);

  const claimReward = useCallback((achievementId: string) => {
    setAchievements(prev => prev.map(achievement => 
      achievement.id === achievementId && achievement.completed && !achievement.claimed
        ? { ...achievement, claimed: true }
        : achievement
    ));
  }, []);

  const dismissNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const getProgress = useCallback((achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId);
    return achievement ? achievement.progress(gameState) : 0;
  }, [achievements, gameState]);

  return {
    achievements,
    notifications,
    checkAchievements,
    claimReward,
    dismissNotification,
    getProgress,
  };
}