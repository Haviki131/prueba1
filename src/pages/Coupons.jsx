import React, { useState, useEffect } from 'react';
import { Ticket } from 'lucide-react';

const Coupons = () => {
    const [coupons, setCoupons] = useState(() => {
        const saved = localStorage.getItem('hk-coupons');
        return saved ? JSON.parse(saved) : [
            { id: 1, title: "Vale por un Masaje", emoji: "💆‍♀️", redeemed: false },
            { id: 2, title: "Vale por una Cena", emoji: "🍝", redeemed: false },
            { id: 3, title: "Vale por Cine", emoji: "🎬", redeemed: false },
            { id: 4, title: "Vale por un Abrazo", emoji: "🤗", redeemed: false },
            { id: 5, title: "Vale por Perdonarme", emoji: "🥺", redeemed: false },
            { id: 6, title: "Vale por un Beso", emoji: "💋", redeemed: false },
        ];
    });

    useEffect(() => {
        localStorage.setItem('hk-coupons', JSON.stringify(coupons));
    }, [coupons]);

    const redeemCoupon = (id) => {
        if (window.confirm("¿Seguro que quieres canjear este cupón?")) {
            setCoupons(coupons.map(c => c.id === id ? { ...c, redeemed: true } : c));
        }
    };

    return (
        <div>
            <h1 style={{ color: 'var(--hk-pink-hot)', textAlign: 'center', marginBottom: '20px' }}>
                Cupones de Amor <Ticket style={{ verticalAlign: 'middle' }} />
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '15px' }}>
                {coupons.map(coupon => (
                    <div
                        key={coupon.id}
                        onClick={() => !coupon.redeemed && redeemCoupon(coupon.id)}
                        style={{
                            backgroundColor: coupon.redeemed ? '#eee' : 'white',
                            border: `2px dashed ${coupon.redeemed ? '#ccc' : 'var(--hk-pink-hot)'}`,
                            borderRadius: '15px',
                            padding: '20px',
                            textAlign: 'center',
                            cursor: coupon.redeemed ? 'default' : 'pointer',
                            opacity: coupon.redeemed ? 0.6 : 1,
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'transform 0.2s'
                        }}
                    >
                        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{coupon.emoji}</div>
                        <h3 style={{ fontSize: '1rem', color: 'var(--hk-text)', margin: 0 }}>{coupon.title}</h3>
                        {coupon.redeemed && (
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%) rotate(-15deg)',
                                border: '3px solid red',
                                color: 'red',
                                padding: '5px 10px',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                borderRadius: '10px',
                                backgroundColor: 'rgba(255,255,255,0.8)'
                            }}>
                                CANJEADO
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Coupons;
