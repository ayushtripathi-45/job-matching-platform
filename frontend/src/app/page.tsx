'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  description: string;
  employer: {
    name: string;
  };
  createdAt: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
        const res = await fetch(`${API_URL}/api/jobs`);
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error('Failed to fetch jobs', err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  return (
    <div className="container">
      <header style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Find your next <span style={{ color: 'var(--primary)' }}>dream job</span></h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Browse through AI-matched opportunities tailored for you.</p>
      </header>

      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {jobs.length > 0 ? jobs.map(job => (
            <div key={job.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{job.title}</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>{job.employer.name}</p>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{job.description.substring(0, 150)}...</p>
                </div>
                <Link href={`/apply/${job.id}`} className="btn btn-primary">Apply Now</Link>
              </div>
            </div>
          )) : (
            <div className="card" style={{ textAlign: 'center' }}>
              <p>No jobs found. Check back later!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
