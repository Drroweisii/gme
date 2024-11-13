import React from 'react';
import { ACHIEVEMENTS } from '../../utils/achievements';
import { GameState } from '../../types/game';
import { Award, ChevronRight } from 'lucide-react';

interface AchievementListProps {
  gameState: GameState;
  onClaimReward: (achievementId: string) => void;
}

export function AchievementList({ gameState, onClaimReward }: AchievementListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-yellow-500" />
        <h2 className="text-lg font-semibold text-gray-700">Achievements</h2>
      </div>
      
      <div className="space-y-3">
        {ACHIEVEMENTS.map(achievement => {
          const progress = achievement.progress(gameState);
          const isCompleted = achievement.condition(gameState);
          const canClaim = isCompleted && !achievement.claimed;
          
          return (
            <div
              key={achievement.id}
              className={`
                p-3 rounded-lg border
                ${isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'}
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-700">{achievement.title}</h3>
                  <p className="text-sm text-gray-500">{achievement.description}</p>
                </div>
                
                {canClaim ? (
                  <button
                    onClick={() => onClaimReward(achievement.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-colors"
                  >
                    Claim
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="text-sm font-medium text-gray-500">
                    {Math.round(progress * 100)}%
                  </div>
                )}
              </div>
              
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}