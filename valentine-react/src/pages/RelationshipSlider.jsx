import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RelationshipSlider.css';

const RelationshipSlider = () => {
    const questions = [
        {
            id: 1,
            text: "How much do I love you?",
            correctValue: 95,
            minCorrect: 90,
            image: "🍕"
        },
        {
            id: 2,
            text: "How much do I miss you when we're apart?",
            correctValue: 100,
            minCorrect: 98,
            image: "🥺"
        },
        {
            id: 3,
            text: "How excited am I for our future?",
            correctValue: 100,
            minCorrect: 95,
            image: "🚀"
        }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [sliderValue, setSliderValue] = useState(50);
    const [feedback, setFeedback] = useState("Drag the slider to answer!");
    const [showNext, setShowNext] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);

    const handleSliderChange = (e) => {
        const value = parseInt(e.target.value);
        setSliderValue(value);

        const currentQ = questions[currentQuestionIndex];

        if (value >= currentQ.minCorrect) {
            setFeedback("Perfect! You know me so well! ❤️");
            setShowNext(true);
        } else if (value < currentQ.minCorrect && value > currentQ.minCorrect - 20) {
            setFeedback("Higher! Almost there! 🔥");
            setShowNext(false);
        } else if (value > currentQ.correctValue + 5) {
            // Rare case if correct isn't 100
            setFeedback("A bit too much? Nah, just kidding! 😂");
            setShowNext(true);
        } else {
            setFeedback("Higher! Much higher! 🆙");
            setShowNext(false);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSliderValue(50);
            setFeedback("Drag the slider to answer!");
            setShowNext(false);
        } else {
            setIsGameFinished(true);
        }
    };

    return (
        <div className="game-wrapper">
            <header>
                <h1>How Well Do You Know Me? 📏</h1>
            </header>
            <main>
                <div className="game-container slider-container">
                    {!isGameFinished ? (
                        <>
                            <div className="question-card">
                                <div className="question-icon">{questions[currentQuestionIndex].image}</div>
                                <h2>{questions[currentQuestionIndex].text}</h2>
                            </div>

                            <div className="slider-wrapper">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={sliderValue}
                                    onChange={handleSliderChange}
                                    className="love-slider"
                                />
                                <div className="slider-value">{sliderValue}%</div>
                            </div>

                            <p className="feedback-text">{feedback}</p>

                            {showNext && (
                                <button className="next-btn" onClick={nextQuestion}>
                                    {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next Question →"}
                                </button>
                            )}
                        </>
                    ) : (
                        <div className="game-finished">
                            <h2>You got 100/100! 🏆</h2>
                            <p>You know me better than anyone else!</p>
                            <Link to="/">
                                <button>Back to Games</button>
                            </Link>
                        </div>
                    )}
                </div>
                {!isGameFinished && <Link to="/" className="back-link">← Back to Games</Link>}
            </main>
        </div>
    );
};

export default RelationshipSlider;
