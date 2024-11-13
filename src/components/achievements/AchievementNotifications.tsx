import React, { useState, useEffect } from 'react';
import { Award, X } from 'lucide-react';
import { AchievementNotification } from '../../types/achievements';

interface NotificationsProps {
  notifications: AchievementNotification[];
  onDismiss: (id: string) => void;
}

export function AchievementNotifications({ notifications, onDismiss }: NotificationsProps) {
  return (
    <div className="fixed bottom-4 right-2 sm:right-4 space-y-2 max-w-[calc(100vw-1rem)] sm:max-w-sm z-50">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
}

function Notification({ 
  notification, 
  onDismiss 
}: { 
  notification: AchievementNotification;
  onDismiss: (id: string) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onDismiss(notification.id), 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  return (
    <div
      className={`
        transform transition-all duration-300
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        w-full bg-white rounded-lg shadow-lg border-l-4 border-yellow-500
        flex items-center p-3 sm:p-4 gap-2 sm:gap-3
        touch-manipulation
      `}
    >
      <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 flex-shrink-0" />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">{notification.title}</h4>
        <p className="text-xs sm:text-sm text-gray-500 truncate">{notification.message}</p>
      </div>

      <button
        onClick={() => onDismiss(notification.id)}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
      >
        <X className="w-4 h-4 text-gray-400" />
      </button>
    </div>
  );
}