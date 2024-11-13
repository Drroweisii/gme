import React, { useState } from 'react';
import { GameBoard } from './GameBoard';
import { BalanceDisplay } from './BalanceDisplay';
import { HireButton } from './HireButton';
import { WorkerTypeSelector } from './WorkerTypeSelector';
import { AchievementNotifications } from '../achievements/AchievementNotifications';
import { useGameState } from '../../hooks/useGameState';
import { useAchievements } from '../../hooks/useAchievements';
import { WorkerType } from '../../types/workers';
import { WORKER_TYPES } from '../../utils/workerTypes';

export function GameLayout() {
  const [selectedWorkerType, setSelectedWorkerType] = useState<WorkerType>('standard');
  
  const { 
    gameState, 
    hireWorker, 
    handleWorkerClick,
    canHireWorker,
    stats,
    selectedWorkerId,
    canMergeWorkers,
  } = useGameState();

  const {
    notifications,
    checkAchievements,
    dismissNotification,
  } = useAchievements(gameState);

  const handleHire = () => {
    const success = hireWorker(selectedWorkerType);
    if (success) {
      checkAchievements();
    }
  };

  const handleCellClick = (position: number) => {
    const worker = gameState.workers.find(w => w.position === position);
    handleWorkerClick(worker?.id || '', position);
  };

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 min-h-0 grid grid-rows-[auto_1fr_auto_auto] gap-2 sm:gap-3 py-2 sm:py-3">
        <BalanceDisplay 
          balance={gameState.balance} 
          miningRate={stats.totalRate}
          workerCount={stats.workerCount}
          highestLevel={stats.highestLevel}
        />
        
        <div className="min-h-0 bg-white rounded-lg shadow-md overflow-hidden">
          <GameBoard
            gridState={gameState.gridState}
            workers={gameState.workers}
            onCellClick={handleCellClick}
            balance={gameState.balance}
            selectedWorkerId={selectedWorkerId}
            canMergeWorkers={canMergeWorkers}
          />
        </div>

        <WorkerTypeSelector
          selectedType={selectedWorkerType}
          onSelect={setSelectedWorkerType}
          balance={gameState.balance}
        />

        <HireButton
          onHire={handleHire}
          disabled={!canHireWorker}
          workerType={WORKER_TYPES[selectedWorkerType]}
        />
      </div>

      <AchievementNotifications
        notifications={notifications}
        onDismiss={dismissNotification}
      />
    </div>
  );
}