import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Agenda from './pages/Agenda';
import CalendarPage from './pages/CalendarPage';
import Memories from './pages/Memories';
import Notes from './pages/Notes';
import Coupons from './pages/Coupons';
import TimeCapsule from './pages/TimeCapsule';
import PasswordProtection from './components/PasswordProtection';

function App() {
  return (
    <PasswordProtection>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="agenda" element={<Agenda />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="memories" element={<Memories />} />
            <Route path="notes" element={<Notes />} />
            <Route path="coupons" element={<Coupons />} />
            <Route path="capsule" element={<TimeCapsule />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PasswordProtection>
  );
}

export default App;
