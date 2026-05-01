'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { NotificationProvider } from '@/context/NotificationContext';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    setRole(localStorage.getItem('userRole') || '');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    window.location.href = '/';
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationProvider>
          <nav className="navbar">
            <div className="container">
              <h1 className="logo">JobMatch<span>AI</span></h1>
              <ul className="nav-links">
                <li><a href="/">Jobs</a></li>
                {isLoggedIn ? (
                  <>
                    {role === 'EMPLOYER' && <li><a href="/post-job">Post Job</a></li>}
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="#" onClick={handleLogout}>Logout</a></li>
                  </>
                ) : (
                  <>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                  </>
                )}
              </ul>
            </div>
          </nav>
          <main>{children}</main>
          <footer className="footer">
            <p>&copy; 2026 JobMatch AI. All rights reserved.</p>
          </footer>
        </NotificationProvider>
      </body>
    </html>
  );
}
