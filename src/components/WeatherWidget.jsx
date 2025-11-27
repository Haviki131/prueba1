import React, { useState, useEffect } from 'react';
import { CloudSun, Sun, CloudRain, Cloud } from 'lucide-react';

const WeatherWidget = () => {
    const [weather, setWeather] = useState({
        temp: '...',
        condition: 'Loading',
        location: 'Alhaurín el Grande'
    });

    useEffect(() => {
        // Usando API gratuita de Open-Meteo (no requiere API key)
        fetch('https://api.open-meteo.com/v1/forecast?latitude=36.6333&longitude=-4.6833&current=temperature_2m,weathercode&timezone=Europe/Madrid')
            .then(res => res.json())
            .then(data => {
                const temp = Math.round(data.current.temperature_2m);
                const code = data.current.weathercode;

                // Códigos de clima: 0=despejado, 1-3=parcialmente nublado, 45-48=niebla, 51-67=lluvia, 71-77=nieve, 80-99=tormenta
                let condition = 'Sunny';
                if (code >= 51 && code <= 67) condition = 'Rainy';
                else if (code >= 1 && code <= 48) condition = 'Cloudy';

                setWeather({
                    temp: temp,
                    condition: condition,
                    location: 'Alhaurín el Grande'
                });
            })
            .catch(err => {
                console.error('Error fetching weather:', err);
                setWeather({
                    temp: '24',
                    condition: 'Sunny',
                    location: 'Alhaurín el Grande'
                });
            });
    }, []);

    const getIcon = () => {
        switch (weather.condition) {
            case 'Sunny': return <Sun size={30} color="#FFD700" />;
            case 'Rainy': return <CloudRain size={30} color="#4FC3F7" />;
            default: return <CloudSun size={30} color="#FFB7C5" />;
        }
    };

    const getConditionText = () => {
        switch (weather.condition) {
            case 'Sunny': return 'Soleado ☀️';
            case 'Rainy': return 'Lluvioso 🌧️';
            default: return 'Nublado ☁️';
        }
    };

    return (
        <div style={{
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
            marginBottom: '20px',
            border: '1px solid var(--hk-pink-light)'
        }}>
            <div style={{
                backgroundColor: 'var(--hk-pink-light)',
                padding: '10px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {getIcon()}
            </div>
            <div>
                <h3 style={{ margin: 0, color: 'var(--hk-text)', fontSize: '1rem' }}>{weather.location}</h3>
                <p style={{ margin: 0, color: 'var(--hk-pink-hot)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {weather.temp}°C - {getConditionText()}
                </p>
            </div>
        </div>
    );
};

export default WeatherWidget;
