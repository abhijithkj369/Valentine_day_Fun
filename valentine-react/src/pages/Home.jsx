import React from 'react';
import GameCard from '../components/GameCard';

const Home = () => {
    return (
        <>
            <header>
                <h1>Happy Valentine's Day! ❤️</h1>
            </header>
            <main>
                <div className="games-grid">
                    <GameCard
                        to="/valentine"
                        title="💌 Be My Valentine?"
                        description="Ask the special question!"
                    />
                    <GameCard
                        to="/calculator"
                        title="💘 Love Calculator"
                        description="Check your compatibility!"
                    />
                    <GameCard
                        to="/memory"
                        title="🎴 Memory Match"
                        description="Find the matching pairs."
                    />
                    <GameCard
                        to="/catch"
                        title="🧺 Catch the Hearts"
                        description="Collect as many hearts as you can!"
                    />
                </div>
            </main>
        </>
    );
};

export default Home;
