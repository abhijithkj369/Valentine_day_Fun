import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Rewards.css';

const Rewards = () => {
    const coupons = [
        { id: 1, title: "Massage Time 💆‍♂️", desc: "Redeem for a 20-minute massage.", redeemed: false },
        { id: 2, title: "Movie Night 🎬", desc: "Your choice of movie & snacks!", redeemed: false },
        { id: 3, title: "Breakfast in Bed 🥞", desc: "Pancakes, coffee, the works.", redeemed: false },
        { id: 4, title: "Dish Duty Free 🍽️", desc: "No dishes for you for a whole day!", redeemed: false }
    ];

    const [couponState, setCouponState] = useState(coupons);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleRedeem = (id) => {
        const newCoupons = couponState.map(c =>
            c.id === id ? { ...c, redeemed: !c.redeemed } : c
        );
        setCouponState(newCoupons);
    };

    const dateOptions = [
        { id: 1, title: "Candlelit Dinner 🍝", desc: "Fancy homemade pasta & wine." },
        { id: 2, title: "Cozy Movie Fort 🏰", desc: "Blankets, pillows, & fairy lights." },
        { id: 3, title: "Bowling & Tacos 🎳", desc: "Fun competition and yummy food." }
    ];

    return (
        <div className="game-wrapper rewards-wrapper">
            <header>
                <h1>💖 YAY! You said YES! 💖</h1>
                <p>Since you are my Valentine, here are your rewards!</p>
            </header>
            <main>
                <section className="coupons-section">
                    <h2>🎟️ Love Coupon Book</h2>
                    <p>Click a coupon to reveal/redeem it!</p>
                    <div className="coupons-grid">
                        {couponState.map(coupon => (
                            <div
                                key={coupon.id}
                                className={`coupon-card ${coupon.redeemed ? 'redeemed' : ''}`}
                                onClick={() => handleRedeem(coupon.id)}
                            >
                                <div className="coupon-content">
                                    <h3>{coupon.title}</h3>
                                    <p>{coupon.desc}</p>
                                    {coupon.redeemed && <div className="stamp">REDEEMED!</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="date-picker-section">
                    <h2>📅 Pick Our Valentine's Date</h2>
                    <p>Lock in your choice for the big night!</p>
                    <div className="date-options">
                        {dateOptions.map(option => (
                            <div
                                key={option.id}
                                className={`date-card ${selectedDate === option.id ? 'selected' : ''}`}
                                onClick={() => setSelectedDate(option.id)}
                            >
                                <h3>{option.title}</h3>
                                <p>{option.desc}</p>
                                {selectedDate === option.id && <span className="check-mark">✅ Locked In</span>}
                            </div>
                        ))}
                    </div>
                </section>

                <Link to="/" className="back-link">Back to Home 🏠</Link>
            </main>
        </div>
    );
};

export default Rewards;
