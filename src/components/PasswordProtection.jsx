import React, { useState } from 'react';
import { Lock } from 'lucide-react';

const PasswordProtection = ({ children }) => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // CAMBIA ESTA CONTRASEÑA POR LA QUE QUIERAS
    const CORRECT_PASSWORD = '27082025';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            setIsUnlocked(true);
            setError('');
        } else {
            setError('Contraseña incorrecta 💔');
            setPassword('');
        }
    };

    if (isUnlocked) {
        return children;
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--hk-pink-light)',
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: 'var(--hk-radius)',
                boxShadow: 'var(--hk-shadow)',
                textAlign: 'center',
                maxWidth: '400px',
                width: '100%'
            }}>
                <Lock size={60} color="var(--hk-pink-hot)" style={{ marginBottom: '20px' }} />
                <h1 style={{ color: 'var(--hk-pink-hot)', marginBottom: '10px' }}>
                    Bienvenida mi amor 💖
                </h1>
                <p style={{ color: '#666', marginBottom: '30px' }}>
                    Este es tu regalo especial. Introduce la contraseña que te di.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña..."
                        autoFocus
                        style={{
                            width: '100%',
                            padding: '15px',
                            borderRadius: '10px',
                            border: `2px solid ${error ? 'red' : 'var(--hk-pink-medium)'}`,
                            marginBottom: '10px',
                            fontSize: '1rem',
                            textAlign: 'center'
                        }}
                    />
                    {error && (
                        <p style={{ color: 'red', fontSize: '0.9rem', marginBottom: '10px' }}>
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '15px',
                            backgroundColor: 'var(--hk-pink-hot)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Entrar 💕
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordProtection;
