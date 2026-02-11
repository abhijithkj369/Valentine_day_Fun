import React, { createContext, useState, useEffect, useContext } from 'react';

const SiteContext = createContext();

export const useSiteSettings = () => useContext(SiteContext);

export const SiteProvider = ({ children }) => {
    // Default Initial State
    const defaultSettings = {
        coupleName: "Abhijith & Rashi",
        valentineName: "Rashi",
        startDate: "2022-08-21T00:00:00",
        musicUrl: "/myimages/banjaara.mp3",
        puzzleImage: "/myimages/puzzle.png",
        hiddenHeartsImage: "/myimages/hiddenHearts.jpeg",
        timelineEvents: [
            {
                id: 1,
                date: "sept 21, 2022",
                title: "The Day Our Story Began",
                description: "That evening at Vettukad Beach still lives in my heart. We with friends in  the sea, and I couldn’t stop smiling while watching you enjoy chicken alfam at the restaurant. It was a simple moment, but that’s when I knew this day would stay with me forever.",
                icon: "🍗",
                images: [
                    "/myimages/day1.jpg",
                    "/myimages/ChatGPT Image Feb 1, 2026, 02_22_24 AM.png"

                ]
            },
            {
                id: 2,
                date: "oct 08, 2022",
                title: "Where It All Started",
                description: "The day I took you on my scooter to Lulu Mall. The day I felt that spark in you. The day I truly spent time with you. I can never forget it, Raash. While riding back, my mind was completely filled with thoughts of you.",
                icon: "🛵",
                images: [
                    "/myimages/day2.jpg",
                    "/myimages/day2_1.jpg"
                ]
            },
            {
                id: 3,
                date: "oct 27, 2022",
                title: "The Day We First Went Out",
                description: "The day you wrote ‘ennennum kannetante’. That was the first time I felt it clearly. The moment I realized you might have love for me too.",
                icon: "📝",
                images: [
                    "/myimages/day3.jpg"
                ]
            },
            {
                id: 4,
                date: "oct 29, 2022",
                title: "The Day We Watched Our First Movie Together",
                description: "We watched Kantara that day. You chose to sit with me instead of going to your friends, and you stayed beside me until the movie ended. It was the first time I ever watched a movie in a theatre with a girl, and that made the moment unforgettable.",
                icon: "🎬",
                images: [
                    "/myimages/day4.jpg"
                ]
            },
            {
                id: 5,
                date: "nov 04, 2022",
                title: "The Day We Spoke About Love",
                description: "Along with Kavya, you and I talked for a long time about love and college relationships. We spoke about what love means, without knowing that in the future, we would fall in love with each other.",
                icon: "📝",
                images: [
                    "/myimages/day5.jpg"
                ]
            },
            {
                id: 6,
                date: "Nov 14, 2022",
                title: "Dancing With the Rain",
                description: "It was raining, and you didn’t run away from it. You took us out to feel the rain together. In that moment, I realized you were different from everyone else, and that difference stayed with me.",
                icon: "🌧️",
                images: [
                    "/myimages/day6.jpg",
                    "/myimages/day6_1.jpg"
                ]
            },
            {
                id: 7,
                date: "Nov 21, 2022",
                title: "The Day We Went to IFFK",
                description: "The day we walked through IFFK together, surrounded by films, crowds, and stories. Even in all that noise, what mattered most to me was being there with you, sharing that moment side by side.",
                icon: "🎬",
                images: [
                    "/myimages/day7.jpg",
                    "/myimages/day7_1.jpg"
                ]
            },
            {
                id: 8,
                date: "Lifelong",
                title: "All Year Together",
                description: " The best year of my life.",
                icon: "�",
                images: [
                    "/myimages/day8.jpg",
                    "/myimages/day9.jpg",
                    "/myimages/day10.jpg",
                    "/myimages/day11.jpg",
                    "/myimages/day12.jpg",
                    "/myimages/day13.jpg",
                    "/myimages/day14.jpg",
                    "/myimages/day15.jpg",
                    "/myimages/day16.jpg",
                    "/myimages/day16_1.jpg",
                    "/myimages/day17.jpg",
                    "/myimages/day18.jpg",
                    "/myimages/day19.jpg",
                    "/myimages/day20.jpg",
                    "/myimages/day21.jpg",
                    "/myimages/day22.jpg",
                    "/myimages/day23.jpg",
                    "/myimages/day24.jpg",
                    "/myimages/day25.jpg",
                    "/myimages/day26.jpg",
                    "/myimages/day27.jpg",
                    "/myimages/day28.jpg",
                    "/myimages/day29.jpg",
                    "/myimages/day30.jpg",
                    "/myimages/day31.jpg",
                    "/myimages/day32.jpg",
                    "/myimages/day33.jpg",
                    "/myimages/day34.jpg",
                    "/myimages/day35.jpg",
                    "/myimages/day36.jpg",
                    "/myimages/day37.jpg",
                    "/myimages/day38.jpg",
                    "/myimages/day39.jpg",
                    "/myimages/day40.jpg",
                    "/myimages/day41.jpg",
                    "/myimages/day42.jpg",
                    "/myimages/day43.jpg",
                    "/myimages/day44.jpg",
                    "/myimages/day45.jpg",
                    "/myimages/day46.jpg",
                    "/myimages/day47.jpg",
                    "/myimages/day48.jpg",
                    "/myimages/day49.jpg",
                    "/myimages/day50.jpg",
                    "/myimages/day51.jpg",
                    "/myimages/day52.jpg",
                    "/myimages/day53.jpg",
                    "/myimages/day54.jpg",
                    "/myimages/day55.jpg",

                ]
            }
        ]
    };

    // Load from localStorage or use defaults
    const [settings, setSettings] = useState(() => {
        try {
            const saved = localStorage.getItem('valentineSiteSettings_v4');
            const parsed = saved ? JSON.parse(saved) : {};
            // Ensure secretPin exists
            if (!parsed.secretPin) parsed.secretPin = "3690";
            return { ...defaultSettings, ...parsed };
        } catch (e) {
            console.error("Failed to parse settings", e);
            localStorage.removeItem('valentineSiteSettings_v4');
            return { ...defaultSettings, secretPin: "3690" };
        }
    });

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Save to localStorage whenever settings change
    useEffect(() => {
        localStorage.setItem('valentineSiteSettings_v4', JSON.stringify(settings));
    }, [settings]);

    const login = (pin) => {
        if (pin === settings.secretPin) {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const addTimelineEvent = (event) => {
        setSettings(prev => ({
            ...prev,
            timelineEvents: [...prev.timelineEvents, { ...event, id: Date.now() }]
        }));
    };

    const removeTimelineEvent = (id) => {
        setSettings(prev => ({
            ...prev,
            timelineEvents: prev.timelineEvents.filter(e => e.id !== id)
        }));
    };

    return (
        <SiteContext.Provider value={{
            settings,
            updateSettings,
            addTimelineEvent,
            removeTimelineEvent,
            isAuthenticated,
            login
        }}>
            {children}
        </SiteContext.Provider>
    );
};
