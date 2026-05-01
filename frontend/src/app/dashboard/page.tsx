'use client';

import { useEffect, useState } from 'react';
import { useNotifications } from '@/context/NotificationContext';

export default function Dashboard() {
  const { notifications } = useNotifications();
  const [role, setRole] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setRole(userRole || '');

    async function fetchDashboardData() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
        const endpoint = userRole === 'EMPLOYER' ? '/api/jobs' : '/api/applications/user';
        const res = await fetch(`${API_URL}${endpoint}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  return (
    <div className="container">
      <h2 style={{ marginBottom: '2rem' }}>User Dashboard</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>{role === 'EMPLOYER' ? 'Jobs you posted' : 'Your Applications'}</h3>
          {loading ? <p>Loading...</p> : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {data.length > 0 ? data.map((item: any) => (
                <div key={item.id} className="card" style={{ padding: '1.5rem' }}>
                  <h4 style={{ marginBottom: '0.5rem' }}>{item.title || item.job?.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    {role === 'EMPLOYER' ? `Total Applications: ${item.applications?.length || 0}` : `Status: ${item.status}`}
                  </p>
                  {item.aiMatchScore !== undefined && (
                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.875rem' }}>AI Match Score:</span>
                      <div style={{ flex: 1, height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${item.aiMatchScore}%`, height: '100%', background: 'var(--success)' }}></div>
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--success)' }}>{item.aiMatchScore}%</span>
                    </div>
                  )}
                </div>
              )) : <p>No records found.</p>}
            </div>
          )}
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Recent Notifications</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {notifications.length > 0 ? notifications.map((notif, i) => (
              <div key={i} style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)', fontSize: '0.875rem' }}>
                <p>{notif.message}</p>
                <span style={{ color: 'var(--primary)', fontSize: '0.75rem' }}>{notif.type}</span>
              </div>
            )) : <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No new notifications.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
