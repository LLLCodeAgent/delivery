'use client';

import { useState } from 'react';
import api from '@/lib/api';
import ProtectedClientRoute from '@/components/ProtectedClientRoute';

const STEPS = ['Sender/Receiver', 'Address', 'Review'];

export default function NewOrderPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ sender: '', receiver: '', address: '', status: 'Pending' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trackingId, setTrackingId] = useState('');

  const submit = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/orders', form);
      setTrackingId(data.trackingId);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedClientRoute>
      <main className="page card">
        <h2>Create Order</h2>
        <p>Step {step + 1}: {STEPS[step]}</p>

        {step === 0 && (
          <>
            <input placeholder="Sender" onChange={(e) => setForm({ ...form, sender: e.target.value })} />
            <input placeholder="Receiver" onChange={(e) => setForm({ ...form, receiver: e.target.value })} />
          </>
        )}
        {step === 1 && (
          <input placeholder="Address" onChange={(e) => setForm({ ...form, address: e.target.value })} />
        )}
        {step === 2 && (
          <div>
            <p><b>Sender:</b> {form.sender}</p>
            <p><b>Receiver:</b> {form.receiver}</p>
            <p><b>Address:</b> {form.address}</p>
            <button onClick={submit} disabled={loading}>{loading ? 'Submitting...' : 'Submit Order'}</button>
          </div>
        )}

        <div className="row">
          {step > 0 && <button onClick={() => setStep((s) => s - 1)}>Back</button>}
          {step < STEPS.length - 1 && <button onClick={() => setStep((s) => s + 1)}>Next</button>}
        </div>

        {error && <p className="error">{error}</p>}
        {trackingId && <p className="success">Tracking ID: {trackingId}</p>}
      </main>
    </ProtectedClientRoute>
  );
}
