import React from 'react';
import { useSiteSettings } from '../context/SiteContext';
import GameCard from '../components/GameCard';
import TimeTogether from '../components/TimeTogether';
import JourneyTimeline from '../components/JourneyTimeline';
import '../styles/Home.css';

const Home = () => {
    const { settings } = useSiteSettings();

    return (
        <>
            <header>
                <h1>Happy Valentine's Day, {settings.valentineName}! ❤️</h1>
            </header>
            <main>
                <TimeTogether />

                <h2>Our Love Games 🎮</h2>
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
                    <GameCard
                        to="/spam"
                        title="⚠️ Don't Click!"
                        description="Warning: Highly Contagious Love!"
                    />
                </div>

                <JourneyTimeline />
            </main>
        </>
    );
};

export default Home;
