import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Clock } from 'lucide-react';

const TimeCapsule = () => {
    const [message, setMessage] = useState('');
    const [isLocked, setIsLocked] = useState(false);
    const [unlockDate, setUnlockDate] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('hk-capsule');
        if (saved) {
            const data = JSON.parse(saved);
            setMessage(data.message);
            setIsLocked(data.isLocked);
            setUnlockDate(data.unlockDate);
        }
    }, []);

    const handleLock = () => {
        if (!message.trim() || !unlockDate) return;
        const data = { message, isLocked: true, unlockDate };
        localStorage.setItem('hk-capsule', JSON.stringify(data));
        setIsLocked(true);
    };

    const canUnlock = new Date(unlockDate) <= new Date();

    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ color: 'var(--hk-pink-hot)', marginBottom: '20px' }}>Cápsula del Tiempo ⏳</h1>

            {!isLocked ? (
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: 'var(--hk-radius)', boxShadow: 'var(--hk-shadow)' }}>
                    <p style={{ marginBottom: '15px' }}>Escribe un mensaje para el futuro...</p>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Querida yo del futuro..."
                        style={{
                            width: '100%',
                            height: '150px',
                            padding: '15px',
                            borderRadius: '10px',
                            border: '2px solid var(--hk-pink-medium)',
                            marginBottom: '15px',
                            resize: 'none',
                            fontFamily: 'inherit'
                        }}
                    />
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Abrir el día:</label>
                        <input
                            type="date"
                            value={unlockDate}
                            onChange={(e) => setUnlockDate(e.target.value)}
                            style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <button
                        onClick={handleLock}
                        style={{
                            backgroundColor: 'var(--hk-pink-hot)',
                            color: 'white',
                            padding: '10px 30px',
                            borderRadius: '20px',
                            border: 'none',
                            fontSize: '1.1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            margin: '0 auto'
                        }}
                    >
                        <Lock size={20} /> Bloquear Mensaje
                    </button>
                </div>
            ) : (
                <div style={{
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: 'var(--hk-radius)',
                    boxShadow: 'var(--hk-shadow)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    {canUnlock ? (
                        <>
                            <Unlock size={60} color="var(--hk-pink-hot)" />
                            <h2 style={{ color: 'var(--hk-pink-hot)' }}>¡Ya puedes abrirla!</h2>
                            <div style={{
                                backgroundColor: 'var(--hk-pink-light)',
                                padding: '20px',
                                borderRadius: '10px',
                                width: '100%',
                                textAlign: 'left'
                            }}>
                                {message}
                            </div>
                        </>
                    ) : (
                        <>
                            <Lock size={60} color="#ccc" />
                            <h2 style={{ color: '#999' }}>Cápsula Bloqueada</h2>
                            <p>Disponible el: <strong>{new Date(unlockDate).toLocaleDateString()}</strong></p>
                            <div style={{ fontSize: '0.9rem', color: '#aaa', fontStyle: 'italic' }}>
                                "La paciencia es la clave del amor verdadero"
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default TimeCapsule;
