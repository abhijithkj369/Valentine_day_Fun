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
        puzzleImage: "https://picsum.photos/400/400",
        hiddenHeartsImage: "https://picsum.photos/800/600?grayscale",
        timelineEvents: [
            {
                id: 1,
                date: "Feb 14, 2023",
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
                date: "June 20, 2023",
                title: "Where It All Started",
                description: "The day I took you on my scooter to Lulu Mall. The day I felt that spark in you. The day I truly spent time with you. I can never forget it, Raash. While riding back, my mind was completely filled with thoughts of you.",
                icon: "🛵",
                images: [
                    "/myimages/day2.jpg"
                ]
            },
            {
                id: 3,
                date: "Dec 25, 2023",
                title: "First Christmas",
                description: "Exchanging gifts and drinking hot cocoa.",
                icon: "🎄",
                images: [
                    "https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=1000&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1543258103-a62bdc069871?q=80&w=1000&auto=format&fit=crop"
                ]
            }
        ]
    };

    // Load from localStorage or use defaults
    const [settings, setSettings] = useState(() => {
        try {
            const saved = localStorage.getItem('valentineSiteSettings_v3');
            const parsed = saved ? JSON.parse(saved) : {};
            // Ensure secretPin exists
            if (!parsed.secretPin) parsed.secretPin = "3690";
            return { ...defaultSettings, ...parsed };
        } catch (e) {
            console.error("Failed to parse settings", e);
            localStorage.removeItem('valentineSiteSettings_v3');
            return { ...defaultSettings, secretPin: "3690" };
        }
    });

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Save to localStorage whenever settings change
    useEffect(() => {
        localStorage.setItem('valentineSiteSettings_v3', JSON.stringify(settings));
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
