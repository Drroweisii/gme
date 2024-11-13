import React from 'react';
import { Layout, Award } from 'lucide-react';

interface NavbarProps {
  currentPage: 'dashboard' | 'achievements';
  onNavigate: (page: 'dashboard' | 'achievements') => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Layout className="h-6 w-6 sm:h-7 sm:w-7 text-indigo-600 flex-shrink-0" />
            <span className="text-lg sm:text-xl font-semibold text-gray-900 hidden sm:block">Mining Game</span>
            <span className="text-lg font-semibold text-gray-900 sm:hidden">MG</span>
          </div>
          
          <div className="flex gap-1 sm:gap-2">
            <NavButton
              isActive={currentPage === 'dashboard'}
              onClick={() => onNavigate('dashboard')}
              icon={<Layout className="w-4 h-4 sm:w-5 sm:h-5" />}
              label="Dashboard"
            />
            <NavButton
              isActive={currentPage === 'achievements'}
              onClick={() => onNavigate('achievements')}
              icon={<Award className="w-4 h-4 sm:w-5 sm:h-5" />}
              label="Achievements"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

interface NavButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function NavButton({ isActive, onClick, icon, label }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg
        transition-colors duration-200 text-sm sm:text-base
        ${isActive 
          ? 'bg-indigo-50 text-indigo-600' 
          : 'text-gray-600 hover:bg-gray-50'
        }
      `}
    >
      {icon}
      <span className="font-medium hidden sm:block">{label}</span>
    </button>
  );
}