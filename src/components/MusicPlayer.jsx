import React, { useState, useRef } from 'react';
import { Play, Pause, Music, Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Audio play failed (interaction needed):", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '80px', // Above the nav bar
            right: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(5px)',
            padding: '10px',
            borderRadius: '30px',
            boxShadow: '0 4px 15px rgba(255, 105, 180, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 1000,
            border: '2px solid var(--hk-pink-medium)'
        }}>
            <audio ref={audioRef} loop>
                <source src="/song.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            <div style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                backgroundColor: 'var(--hk-pink-hot)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: isPlaying ? 'spin 3s linear infinite' : 'none'
            }}>
                <Music size={18} color="white" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--hk-pink-hot)' }}>Nuestra Canción</span>
                <span style={{ fontSize: '0.7rem', color: '#888' }}>{isPlaying ? 'Reproduciendo...' : 'Pausado'}</span>
            </div>

            <button onClick={togglePlay} style={{
                background: 'none',
                border: 'none',
                color: 'var(--hk-text)',
                cursor: 'pointer',
                padding: '5px'
            }}>
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button onClick={toggleMute} style={{
                background: 'none',
                border: 'none',
                color: 'var(--hk-text)',
                cursor: 'pointer',
                padding: '5px'
            }}>
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default MusicPlayer;
