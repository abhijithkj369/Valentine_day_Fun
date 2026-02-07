import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSiteSettings } from '../context/SiteContext';
import '../styles/MagicTypewriter.css';

const MagicTypewriter = () => {
    const navigate = useNavigate();
    const { settings } = useSiteSettings();
    const [text, setText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const textareaRef = useRef(null);

    // The secret letter
    const secretLetter = `My dearest ${settings.valentineName},

I often struggle to find the right words to tell you how much you mean to me.
But with you, everything just flows.
You are my spark, my joy, and my greatest adventure.

From the moment we started talking, I knew there was something special.
Every memory, from Vettukad Beach to our first movie, is etched in my heart.

I love you more than words can say.

Forever yours,
${settings.coupleName.split(' & ')[0]}`;

    // Focus textarea on click to ensure keyboard opens on mobile
    const handlePaperClick = () => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };

    // Handle input from hidden textarea
    const handleInput = (e) => {
        const value = e.target.value;
        const inputType = e.nativeEvent.inputType; // 'deleteContentBackward' etc.

        // Handle Backspace
        if (inputType === 'deleteContentBackward') {
            setText(prev => prev.slice(0, -1));
            setCurrentIndex(prev => Math.max(0, prev - 1));
            return;
        }

        // Add character if not deleted
        if (currentIndex < secretLetter.length) {
            const nextChar = secretLetter[currentIndex];
            setText(prev => prev + nextChar);
            setCurrentIndex(prev => prev + 1);

            // Scroll to bottom
            window.scrollTo(0, document.body.scrollHeight);
        }
    };

    return (
        <div className="typewriter-container" onClick={handlePaperClick}>
            <button className="back-btn" onClick={(e) => { e.stopPropagation(); navigate('/'); }}>
                <ArrowLeft size={24} /> Back
            </button>

            {/* Hidden textarea to capture input on mobile */}
            <textarea
                ref={textareaRef}
                style={{ opacity: 0, position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 0 }}
                onChange={handleInput}
                autoFocus
            />

            <div className="paper-sheet">
                <div className="typing-area">
                    {text}
                    <span className="cursor">|</span>
                </div>

                {currentIndex === 0 && (
                    <div className="instruction-overlay">
                        <p>Type anything...</p>
                        <p className="sub-instruction">(Tap here and start typing)</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MagicTypewriter;
