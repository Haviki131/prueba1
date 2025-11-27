import React, { useState } from 'react';
import { X } from 'lucide-react';

// Importa tus fotos aquí (descomenta cuando las tengas)
import foto1 from '../assets/images/foto1.jpg';
import foto2 from '../assets/images/foto2.jpg';
import foto3 from '../assets/images/foto3.jpg';
import foto4 from '../assets/images/foto4.jpg';
import foto5 from '../assets/images/foto5.jpg';
import foto6 from '../assets/images/foto6.jpg';

const Memories = () => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    // OPCIÓN 1: Cuando tengas las fotos locales, descomenta esto y comenta el Array de abajo

    const photos = [
        { id: 1, src: foto1, caption: "Nuestro primer día juntos" },
        { id: 2, src: foto2, caption: "En la playa" },
        { id: 3, src: foto3, caption: "Momento especial" },
        { id: 4, src: foto4, caption: "Juntos" },
        { id: 5, src: foto5, caption: "Recuerdo bonito" },
        { id: 6, src: foto6, caption: "Te amo" },
    ];


    // OPCIÓN 2: Placeholders mientras tanto (o usa URLs de fotos online)
    /*
    const photos = Array(6).fill(null).map((_, i) => ({
        id: i + 1,
        src: `https://via.placeholder.com/400x300/FFB7C5/FFFFFF?text=Foto+${i + 1}`,
        caption: `Recuerdo ${i + 1}`
    }));
    */
    return (
        <div>
            <h1 style={{ color: 'var(--hk-pink-hot)', textAlign: 'center', marginBottom: '30px' }}>
                Nuestros Recuerdos 📸
            </h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '15px'
            }}>
                {photos.map(photo => (
                    <div
                        key={photo.id}
                        onClick={() => setSelectedPhoto(photo)}
                        style={{
                            position: 'relative',
                            paddingBottom: '100%',
                            backgroundColor: 'var(--hk-pink-light)',
                            borderRadius: 'var(--hk-radius)',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            boxShadow: 'var(--hk-shadow)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px) rotate(2deg)';
                            e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 105, 180, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) rotate(0deg)';
                            e.currentTarget.style.boxShadow = 'var(--hk-shadow)';
                        }}
                    >
                        <img
                            src={photo.src}
                            alt={photo.caption}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                ))}
            </div>

            {selectedPhoto && (
                <div
                    onClick={() => setSelectedPhoto(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2000,
                        padding: '20px'
                    }}
                >
                    <button
                        onClick={() => setSelectedPhoto(null)}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 2001
                        }}
                    >
                        <X size={24} color="var(--hk-pink-hot)" />
                    </button>
                    <div style={{ maxWidth: '90%', maxHeight: '90%', textAlign: 'center' }}>
                        <img
                            src={selectedPhoto.src}
                            alt={selectedPhoto.caption}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '80vh',
                                borderRadius: '10px',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                            }}
                        />
                        <p style={{
                            color: 'white',
                            marginTop: '20px',
                            fontSize: '1.2rem',
                            fontFamily: 'cursive'
                        }}>
                            {selectedPhoto.caption}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Memories;
