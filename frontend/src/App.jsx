import { Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ChatWidget from './components/ChatWidget';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import OrderFormPage from './pages/OrderFormPage';
import TrackingPage from './pages/TrackingPage';
import DriverPanelPage from './pages/DriverPanelPage';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/orders/new" element={<OrderFormPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/drivers" element={<DriverPanelPage />} />
      </Routes>
      <ChatWidget />
    </div>
  );
}

export default App;
