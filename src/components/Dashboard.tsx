import React from 'react';
import { GameLayout } from './game/GameLayout';

interface DashboardProps {
  gameState: any;
  achievements: any;
}

export function Dashboard({ gameState, achievements }: DashboardProps) {
  return (
    <main>
      <GameLayout />
    </main>
  );
}