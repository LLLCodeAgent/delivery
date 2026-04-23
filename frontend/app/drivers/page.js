'use client';

import { useState } from 'react';
import api from '@/lib/api';
import ProtectedClientRoute from '@/components/ProtectedClientRoute';

export default function DriversPage() {
  const [driver, setDriver] = useState({ name: '', phone: '' });
  const [assignment, setAssignment] = useState({ orderId: '', driverId: '' });
  const [message, setMessage] = useState('');

  const addDriver = async () => {
    try {
      await api.post('/drivers', driver);
      setMessage('Driver added successfully');
      setDriver({ name: '', phone: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add driver');
    }
  };

  const assign = async () => {
    try {
      await api.put(`/drivers/assign/${assignment.orderId}`, { driverId: assignment.driverId });
      setMessage('Driver assigned successfully');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to assign driver');
    }
  };

  return (
    <ProtectedClientRoute>
      <main className="page">
        <h2>Driver Panel</h2>
        <div className="grid">
          <section className="card">
            <h3>Add Driver</h3>
            <input value={driver.name} placeholder="Name" onChange={(e) => setDriver({ ...driver, name: e.target.value })} />
            <input value={driver.phone} placeholder="Phone" onChange={(e) => setDriver({ ...driver, phone: e.target.value })} />
            <button onClick={addDriver}>Add</button>
          </section>
          <section className="card">
            <h3>Assign Driver</h3>
            <input value={assignment.orderId} placeholder="Order ID" onChange={(e) => setAssignment({ ...assignment, orderId: e.target.value })} />
            <input value={assignment.driverId} placeholder="Driver ID" onChange={(e) => setAssignment({ ...assignment, driverId: e.target.value })} />
            <button onClick={assign}>Assign</button>
          </section>
        </div>
        {message && <p className="success">{message}</p>}
      </main>
    </ProtectedClientRoute>
  );
}
