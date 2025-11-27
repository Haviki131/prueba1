import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, Calendar, BookHeart, Camera, StickyNote, Ticket, Hourglass } from 'lucide-react';
import MusicPlayer from './components/MusicPlayer';

const Layout = () => {
    const navItems = [
        { path: '/', icon: <Home size={20} />, label: 'Inicio' },
        { path: '/agenda', icon: <BookHeart size={20} />, label: 'Agenda' },
        { path: '/calendar', icon: <Calendar size={20} />, label: 'Cal' },
        { path: '/memories', icon: <Camera size={20} />, label: 'Fotos' },
        { path: '/notes', icon: <StickyNote size={20} />, label: 'Notas' },
        { path: '/coupons', icon: <Ticket size={20} />, label: 'Vales' },
        { path: '/capsule', icon: <Hourglass size={20} />, label: 'Cápsula' },
    ];

    return (
        <div style={{ minHeight: '100vh', maxWidth: '600px', margin: '0 auto', padding: '20px', paddingBottom: '100px' }}>
            <Outlet />

            <MusicPlayer />

            <nav style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid var(--hk-pink-light)',
                padding: '10px 20px',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                zIndex: 1000,
                boxShadow: '0 -5px 20px rgba(0,0,0,0.05)',
                borderRadius: '20px 20px 0 0',
                overflowX: 'auto'
            }}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: isActive ? 'var(--hk-pink-hot)' : '#aaa',
                            fontSize: '0.7rem',
                            gap: '4px',
                            transition: 'all 0.3s ease',
                            transform: isActive ? 'translateY(-5px)' : 'none',
                            minWidth: '50px'
                        })}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Layout;
