import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Dashboard } from './components/Dashboard';
import { AchievementsPage } from './components/pages/AchievementsPage';
import { Navbar } from './components/layout/Navbar';
import { useGameState } from './hooks/useGameState';
import { useAchievements } from './hooks/useAchievements';

type Page = 'dashboard' | 'achievements';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const gameState = useGameState();
  const achievements = useAchievements(gameState.gameState);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      
      {currentPage === 'dashboard' ? (
        <Dashboard 
          gameState={gameState} 
          achievements={achievements}
        />
      ) : (
        <AchievementsPage
          gameState={gameState.gameState}
          onClaimReward={achievements.claimReward}
        />
      )}
    </div>
  );
}