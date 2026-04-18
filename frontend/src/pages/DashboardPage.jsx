function DashboardPage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const panelsByRole = {
    admin: ['Create/Manage all shipments', 'Manage users and roles', 'View analytics'],
    manager: ['Assign drivers', 'Manage warehouse flows', 'Handle escalations'],
    driver: ['View assigned deliveries', 'Update delivery status', 'Capture proof of delivery'],
    customer: ['Create shipment', 'Track parcel', 'Raise support request'],
  };

  const actions = panelsByRole[user.role] || panelsByRole.customer;

  return (
    <main className="page">
      <h2>Dashboard</h2>
      <div className="grid">
        <article className="card">
          <h3>Welcome, {user.name || 'User'}</h3>
          <p>Role: {user.role || 'guest'}</p>
        </article>
        <article className="card">
          <h3>Role-based Actions</h3>
          <ul>
            {actions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </article>
      </div>
    </main>
  );
}

export default DashboardPage;
