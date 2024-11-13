import React from 'react';
import { Award, Trophy, Target, Zap } from 'lucide-react';
import { AchievementList } from '../achievements/AchievementList';
import { GameState } from '../../types/game';

interface AchievementsPageProps {
  gameState: GameState;
  onClaimReward: (achievementId: string) => void;
}

const categories = [
  { id: 'mining', name: 'Mining', icon: Zap, color: 'blue' },
  { id: 'workers', name: 'Workers', icon: Trophy, color: 'yellow' },
  { id: 'upgrades', name: 'Upgrades', icon: Target, color: 'green' },
  { id: 'special', name: 'Special', icon: Award, color: 'purple' },
];

export function AchievementsPage({ gameState, onClaimReward }: AchievementsPageProps) {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {categories.map(({ id, name, icon: Icon, color }) => (
          <div 
            key={id}
            className={`
              bg-white rounded-lg shadow-md p-4
              border-l-4 border-${color}-500
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-${color}-50`}>
                <Icon className={`w-6 h-6 text-${color}-500`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{name}</h3>
                <p className="text-sm text-gray-500">
                  {getProgressForCategory(gameState, id)}% Complete
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900">All Achievements</h2>
        </div>
        <div className="p-4">
          <AchievementList
            gameState={gameState}
            onClaimReward={onClaimReward}
          />
        </div>
      </div>
    </div>
  );
}

function getProgressForCategory(gameState: GameState, category: string): number {
  // This is a placeholder - implement actual category progress calculation
  return Math.floor(Math.random() * 100);
}