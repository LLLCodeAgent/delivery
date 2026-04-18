import { useState } from 'react';
import api from '../services/api';

function DriverPanelPage() {
  const [driver, setDriver] = useState({ name: '', phone: '' });
  const [assignment, setAssignment] = useState({ orderId: '', driverId: '' });
  const [message, setMessage] = useState('');

  const addDriver = async () => {
    try {
      await api.post('/drivers', driver);
      setDriver({ name: '', phone: '' });
      setMessage('Driver added successfully');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Could not add driver');
    }
  };

  const assign = async () => {
    try {
      await api.put(`/drivers/assign/${assignment.orderId}`, { driverId: assignment.driverId });
      setMessage('Driver assigned successfully');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Could not assign driver');
    }
  };

  return (
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
          <input
            value={assignment.orderId}
            placeholder="Order ID"
            onChange={(e) => setAssignment({ ...assignment, orderId: e.target.value })}
          />
          <input
            value={assignment.driverId}
            placeholder="Driver ID"
            onChange={(e) => setAssignment({ ...assignment, driverId: e.target.value })}
          />
          <button onClick={assign}>Assign</button>
        </section>
      </div>
      {message && <p className="success">{message}</p>}
    </main>
  );
}

export default DriverPanelPage;
