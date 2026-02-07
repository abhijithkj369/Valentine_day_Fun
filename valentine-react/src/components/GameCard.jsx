import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ to, title, description, icon }) => {
    return (
        <Link to={to} className="game-card">
            <div className="icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
            <h2>{title}</h2>
            <p>{description}</p>
        </Link>
    );
};

export default GameCard;
