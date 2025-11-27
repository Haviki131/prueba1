import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import WeatherWidget from '../components/WeatherWidget';

const Home = () => {
    const startDate = new Date('2025-08-27T00:00:00');
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [reason, setReason] = useState("Pulsa el corazón ❤️");

    const reasons = [
        "Por tu sonrisa que ilumina mi día",
        "Por cómo me abrazas",
        "Por tu risa contagiosa",
        "Por ser mi mejor amiga",
        "Por apoyarme siempre",
        "Por ser la más guapa del mundo",
        "Por hacerme mejor persona",
        "Por nuestros momentos juntos"
    ];

    function calculateTimeLeft() {
        const difference = +new Date() - +startDate;
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                días: Math.floor(difference / (1000 * 60 * 60 * 24)),
                horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutos: Math.floor((difference / 1000 / 60) % 60),
                segundos: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const showNewReason = () => {
        const random = reasons[Math.floor(Math.random() * reasons.length)];
        setReason(random);
    };

    return (
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
            <WeatherWidget />

            <h1 style={{
                color: 'var(--hk-pink-hot)',
                fontSize: '2.5rem',
                marginBottom: '10px',
                animation: 'float 3s ease-in-out infinite'
            }}>
                ¡Felices 3 Meses!
            </h1>

            <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#666' }}>
                Eres lo mejor que me ha pasado 💖
            </p>

            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: 'var(--hk-radius)',
                boxShadow: 'var(--hk-shadow)',
                marginBottom: '30px',
                display: 'inline-block',
                minWidth: '300px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    {Object.keys(timeLeft).map(interval => (
                        <div key={interval} style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hk-pink-hot)' }}>
                                {timeLeft[interval]}
                            </span>
                            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#999' }}>
                                {interval}
                            </span>
                        </div>
                    ))}
                </div>
                <p style={{ marginTop: '15px', fontSize: '0.9rem', color: 'var(--hk-pink-medium)' }}>
                    Juntos desde el 27 de Agosto
                </p>
            </div>

            {/* Reasons Section */}
            <div style={{ marginTop: '20px' }}>
                <h2 style={{ color: 'var(--hk-pink-hot)', marginBottom: '15px' }}>¿Por qué te quiero?</h2>
                <button
                    onClick={showNewReason}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}
                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Heart size={80} color="var(--hk-red)" fill="var(--hk-pink-light)" strokeWidth={1} />
                </button>
                <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--hk-text)',
                    marginTop: '15px',
                    minHeight: '30px',
                    fontWeight: 'bold',
                    animation: 'fadeIn 0.5s'
                }}>
                    {reason}
                </p>
            </div>

            <div style={{ marginTop: '40px' }}>
                <img
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW54eXl6eXl6eXl6eXl6eXl6eXl6eXl6eXl6eXl6eXl6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/LpDmM2wSt6Hm5fKJVa/giphy.gif"
                    alt="Hello Kitty"
                    style={{ width: '200px', maxWidth: '100%' }}
                />
            </div>
        </div>
    );
};

export default Home;
