'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function ApplyPage() {
  const { jobId } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobId', jobId as string);

    try {
      const res = await fetch('http://localhost:5001/api/applications', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (res.ok) setSuccess(true);
    } catch (err) {
      console.error('Application failed', err);
    } finally {
      setUploading(false);
    }
  };

  if (success) {
    return (
      <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
        <div className="card">
          <div style={{ fontSize: '3rem', color: 'var(--success)', marginBottom: '1rem' }}>✓</div>
          <h2 style={{ marginBottom: '1rem' }}>Application Submitted!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Our AI is matching your resume with the job description. You'll receive a notification soon.</p>
          <a href="/" className="btn btn-primary">Back to Jobs</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem' }}>Apply for Job</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Upload your resume (PDF or Word) to apply. Our AI will analyze your profile for the best match.</p>
        
        <form onSubmit={handleApply}>
          <div className="form-group" style={{ border: '2px dashed var(--border)', padding: '3rem', textAlign: 'center', borderRadius: '1rem', cursor: 'pointer' }}>
            <input 
              type="file" 
              id="resume-upload" 
              hidden 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <label htmlFor="resume-upload" style={{ cursor: 'pointer' }}>
              {file ? (
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{file.name}</span>
              ) : (
                <>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>Upload</div>
                  <p style={{ color: 'var(--text-muted)' }}>Click to browse or drag and drop</p>
                </>
              )}
            </label>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '2rem' }}
            disabled={!file || uploading}
          >
            {uploading ? 'Processing with AI...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}
