import { useState } from 'react';
import api from '../services/api';

const steps = ['Sender/Receiver', 'Address', 'Review'];

function OrderFormPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ sender: '', receiver: '', address: '', status: 'Pending' });
  const [trackingId, setTrackingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/orders', form);
      setTrackingId(data.trackingId);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page card">
      <h2>Create Order</h2>
      <p>Step {step + 1}: {steps[step]}</p>
      {step === 0 && (
        <>
          <input placeholder="Sender" onChange={(e) => setForm({ ...form, sender: e.target.value })} />
          <input placeholder="Receiver" onChange={(e) => setForm({ ...form, receiver: e.target.value })} />
        </>
      )}
      {step === 1 && (
        <input placeholder="Delivery Address" onChange={(e) => setForm({ ...form, address: e.target.value })} />
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
        {step > 0 && <button onClick={prev}>Back</button>}
        {step < steps.length - 1 && <button onClick={next}>Next</button>}
      </div>

      {error && <p className="error">{error}</p>}
      {trackingId && <p className="success">Order placed. Tracking ID: {trackingId}</p>}
    </main>
  );
}

export default OrderFormPage;
