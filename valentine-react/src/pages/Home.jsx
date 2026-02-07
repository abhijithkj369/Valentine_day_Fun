import React from 'react';
import { useSiteSettings } from '../context/SiteContext';
import GameCard from '../components/GameCard';
import TimeTogether from '../components/TimeTogether';
import JourneyTimeline from '../components/JourneyTimeline';
import ChromaGrid from '../components/ChromaGrid';
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
                
                <ChromaGrid 
                    items={[
                        {
                            title: "💌 Be My Valentine?",
                            subtitle: "Ask the special question!",
                            icon: "💌",
                            url: "/valentine",
                            borderColor: "#ff4d4d",
                            gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
                        },
                        {
                            title: "💘 Love Calculator",
                            subtitle: "Check your compatibility!",
                            icon: "💘",
                            url: "/calculator",
                            borderColor: "#e91e63",
                            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        },
                        {
                            title: "🎴 Memory Match",
                            subtitle: "Find the matching pairs.",
                            icon: "🎴",
                            url: "/memory",
                            borderColor: "#3f51b5",
                            gradient: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)"
                        },
                        {
                            title: "🧺 Catch the Hearts",
                            subtitle: "Collect as many hearts as you can!",
                            icon: "🧺",
                            url: "/catch",
                            borderColor: "#ff5722",
                            gradient: "linear-gradient(135deg, #ffc3a0 0%, #ffafbd 100%)"
                        },
                        {
                            title: "💌 Love Scramble",
                            subtitle: "Unscramble the secret message!",
                            icon: "📝",
                            url: "/scramble",
                            borderColor: "#9c27b0",
                            gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
                        },
                        {
                            title: "⌨️ Magic Typewriter",
                            subtitle: "Write poetry like a pro!",
                            icon: "⌨️",
                            url: "/typewriter",
                            borderColor: "#607d8b",
                            gradient: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)"
                        },
                        {
                            title: "🌸 Petal Plucker",
                            subtitle: "He loves me, he loves me not...",
                            icon: "🌸",
                            url: "/petal",
                            borderColor: "#e91e63",
                            gradient: "linear-gradient(135deg, #FF69B4 0%, #ffc3a0 100%)"
                        },
                         {
                            title: "🧩 Love Puzzle",
                            subtitle: "Piece together our love!",
                            icon: "🧩",
                            url: "/puzzle",
                            borderColor: "#4caf50",
                            gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
                        },
                        {
                            title: "📏 Quiz",
                            subtitle: "How well do you know me?",
                            icon: "🤔",
                            url: "/slider",
                            borderColor: "#ffc107",
                            gradient: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)"
                        },
                         {
                            title: "🕵️‍♀️ Hidden Hearts",
                            subtitle: "Find 5 hidden hearts!",
                            icon: "🕵️‍♀️",
                            url: "/hidden",
                            borderColor: "#795548",
                            gradient: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)"
                        },
                         {
                            title: "⚠️ Don't Click!",
                            subtitle: "Warning: Highly Contagious Love!",
                            icon: "⚠️",
                            url: "/spam",
                            borderColor: "#f44336",
                            gradient: "linear-gradient(135deg, #eb3349 0%, #f45c43 100%)"
                        }
                    ]}
                    columns={3}
                />

                <JourneyTimeline />
            </main>
        </>
    );
};

export default Home;
