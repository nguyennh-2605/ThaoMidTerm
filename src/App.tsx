import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LiveTracking from './pages/LiveTracking';
import QRTicketPage from './pages/QRTicketPage';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Support from './pages/Support';
import Notifications from './pages/Notifications';
import Favorites from './pages/Favorites';
import GreenJourney from './pages/GreenJourney';
import AIChat from './pages/AIChat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/live-tracking" element={<LiveTracking />} />
        <Route path="/qr-ticket" element={<QRTicketPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/support" element={<Support />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/green-journey" element={<GreenJourney />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
