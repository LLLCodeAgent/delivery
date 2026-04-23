'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTracking = async () => {
    const { data } = await api.get(`/tracking/${trackingId}`);
    setResult(data);
  };

  useEffect(() => {
    if (!result || !trackingId) return undefined;
    const timer = setInterval(async () => {
      try { await fetchTracking(); } catch (_err) { /* noop */ }
    }, 15000);
    return () => clearInterval(timer);
  }, [result, trackingId]);

  const onTrack = async () => {
    setLoading(true);
    setError('');
    try {
      await fetchTracking();
    } catch (err) {
      setError(err.response?.data?.message || 'Tracking failed');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page card">
      <h2>Track Shipment</h2>
      <div className="row">
        <input value={trackingId} onChange={(e) => setTrackingId(e.target.value)} placeholder="TRK-..." />
        <button onClick={onTrack} disabled={loading}>{loading ? 'Tracking...' : 'Track'}</button>
      </div>
      {error && <p className="error">{error}</p>}
      {result && (
        <div>
          <p>Current status: <b>{result.order.status}</b></p>
          <h4>Timeline</h4>
          <ul>
            {result.timeline.map((item) => (
              <li key={item.id}>{item.status} - {new Date(item.timestamp).toLocaleString()}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
