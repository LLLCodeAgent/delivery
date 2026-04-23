'use client';

import { useMemo } from 'react';
import ProtectedClientRoute from '@/components/ProtectedClientRoute';

export default function DashboardPage() {
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};

  const actions = useMemo(() => {
    const map = {
      admin: ['Manage users', 'Monitor orders', 'Audit shipments'],
      manager: ['Assign drivers', 'Manage warehouse', 'Handle escalations'],
      driver: ['View assignments', 'Update delivery status', 'Report delays'],
      customer: ['Create shipment', 'Track parcel', 'Open support ticket'],
    };
    return map[user.role] || map.customer;
  }, [user.role]);

  return (
    <ProtectedClientRoute>
      <main className="page">
        <h2>Dashboard</h2>
        <div className="grid">
          <article className="card">
            <h3>Welcome, {user.name || 'User'}</h3>
            <p>Role: {user.role || 'guest'}</p>
          </article>
          <article className="card">
            <h3>Role-based actions</h3>
            <ul>
              {actions.map((action) => <li key={action}>{action}</li>)}
            </ul>
          </article>
        </div>
      </main>
    </ProtectedClientRoute>
  );
}
