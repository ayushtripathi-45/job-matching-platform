'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Notification {
  type: string;
  message: string;
  applicationId?: string;
}

interface NotificationContextType {
  notifications: Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5001');
    setSocket(newSocket);

    // In a real app, you'd get the userId from the auth state
    const userId = localStorage.getItem('userId');
    if (userId) {
      newSocket.emit('authenticate', localStorage.getItem('token'));
      
      newSocket.on(`notification:${userId}`, (notification: Notification) => {
        setNotifications((prev) => [notification, ...prev]);
        // Show a browser alert or custom toast
        alert(`Notification: ${notification.message}`);
      });
    }

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
  return context;
};
