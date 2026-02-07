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
                    <GameCard
                        to="/wordle"
                        title="🤔 Love Wordle"
                        description="Guess the secret love word!"
                    />
                    <GameCard
                        to="/puzzle"
                        title="🧩 Love Puzzle"
                        description="Piece together our love!"
                    />
                    <GameCard
                        to="/slider"
                        title="📏 How Well Do You Know Me?"
                        description="Test your knowledge!"
                    />
                    <GameCard
                        to="/hidden"
                        title="🕵️‍♀️ Hidden Hearts"
                        description="Find 5 hidden hearts!"
                    />
                </div>
            </main>
        </>
    );
};

export default Home;
