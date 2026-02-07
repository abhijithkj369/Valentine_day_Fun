import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../context/SiteContext';
import { X, Heart, MessageCircle, Image as ImageIcon } from 'lucide-react';
import '../styles/SpamHeartAttack.css';

const MESSAGES = [
    "Your smile is my favorite! 😍",
    "Reason #1: You are kind.",
    "ACCESS GRANTED TO MY HEART 🔓",
    "Warning: Too cute to handle! ⚠️",
    "System Overload: ✨✨✨",
    "Do you know how amazing you are?",
    "Thinking of you... always! 💭",
    "You + Me = ❤️",
    "Glitch in the matrix: You're too perfect.",
    "File 'MyHeart.exe' has stopped responding.",
    "Virus Detected: LOVE-BUG-99 🦠",
    "Sending virtual hugs... 🤗",
    "Uploading kisses... 100% 💋"
];

const SpamHeartAttack = () => {
    const { settings } = useSiteSettings();
    const [popups, setPopups] = useState([]);
    const [cleared, setCleared] = useState(false);

    useEffect(() => {
        // Generate random popups on mount
        const newPopups = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            x: Math.random() * (window.innerWidth - 320), // Keep within bounds
            y: Math.random() * (window.innerHeight - 200),
            message: MESSAGES[i % MESSAGES.length],
            img: i % 3 === 0 ? settings.puzzleImage : null, // Occasionally show an image
            type: i % 4 === 0 ? 'image' : 'error' // Variety of window types
        }));
        setPopups(newPopups);
    }, [settings]);

    const closePopup = (id) => {
        setPopups(prev => {
            const remaining = prev.filter(p => p.id !== id);
            if (remaining.length === 0) {
                setCleared(true);
            }
            return remaining;
        });
    };

    return (
        <div className="spam-wrapper">
            {cleared ? (
                <div className="win-screen">
                    <h1>⚠️ SYSTEM SECURE ⚠️</h1>
                    <p>All viruses cleared. You are the one!</p>
                    <Link to="/valentine" className="final-btn">
                        Will you be my Valentine? 🌹
                    </Link>
                </div>
            ) : (
                popups.map(popup => (
                    <div
                        key={popup.id}
                        className={`popup-window ${popup.type}`}
                        style={{ top: popup.y, left: popup.x }}
                    >
                        <div className="popup-header">
                            <span>{popup.type === 'error' ? 'System Alert' : 'Message from Heart'}</span>
                            <button onClick={() => closePopup(popup.id)} className="popup-close">
                                <X size={14} />
                            </button>
                        </div>
                        <div className="popup-body">
                            {popup.img ? (
                                <img src={popup.img} alt="Cute" />
                            ) : (
                                <>
                                    <div className="icon-area">
                                        {popup.type === 'error' ? <Heart fill="red" color="red" /> : <MessageCircle />}
                                    </div>
                                    <p>{popup.message}</p>
                                </>
                            )}
                            <button onClick={() => closePopup(popup.id)} className="popup-ok-btn">
                                OK
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default SpamHeartAttack;
