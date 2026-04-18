function DashboardPage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <main className="page">
      <h2>Dashboard</h2>
      <div className="grid">
        <article className="card">
          <h3>Welcome, {user.name || 'User'}</h3>
          <p>Role: {user.role || 'guest'}</p>
        </article>
        <article className="card">
          <h3>Quick Actions</h3>
          <ul>
            <li>Create shipment</li>
            <li>Assign driver</li>
            <li>Track deliveries</li>
          </ul>
        </article>
      </div>
    </main>
  );
}

export default DashboardPage;
