import { useEffect, useState } from 'react';
import api from '../services/api';

function TrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!trackingId || !result) return undefined;
    const timer = setInterval(async () => {
      try {
        const { data } = await api.get(`/tracking/${trackingId}`);
        setResult(data);
      } catch (_err) {
        // silent polling failure
      }
    }, 15000);

    return () => clearInterval(timer);
  }, [trackingId, result]);

  const track = async () => {
    try {
      setError('');
      setLoading(true);
      const { data } = await api.get(`/tracking/${trackingId}`);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Tracking ID not found');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page card">
      <h2>Track Order</h2>
      <div className="row">
        <input value={trackingId} onChange={(e) => setTrackingId(e.target.value)} placeholder="TRK-..." />
        <button onClick={track} disabled={loading}>{loading ? 'Tracking...' : 'Track'}</button>
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

export default TrackingPage;
