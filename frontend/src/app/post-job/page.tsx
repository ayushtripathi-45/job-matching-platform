'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PostJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5001/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.push('/');
      } else {
        alert('Failed to post job');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div className="card">
        <h2 style={{ marginBottom: '2rem' }}>Post a New Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title</label>
            <input 
              type="text" 
              className="form-input" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g. Senior Full Stack Developer"
              required 
            />
          </div>
          <div className="form-group">
            <label>Job Description</label>
            <textarea 
              className="form-input" 
              style={{ minHeight: '200px', resize: 'vertical' }}
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Describe the role, requirements, and responsibilities..."
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Posting...' : 'Publish Job'}
          </button>
        </form>
      </div>
    </div>
  );
}
