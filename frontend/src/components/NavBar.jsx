import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <header className="navbar">
      <h1>LogistiX</h1>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/orders/new">Create Order</Link>
        <Link to="/tracking">Track</Link>
        <Link to="/drivers">Drivers</Link>
      </nav>
    </header>
  );
}

export default NavBar;
