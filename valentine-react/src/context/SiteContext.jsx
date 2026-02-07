import React, { createContext, useState, useEffect, useContext } from 'react';

const SiteContext = createContext();

export const useSiteSettings = () => useContext(SiteContext);

export const SiteProvider = ({ children }) => {
    // Default Initial State
    const defaultSettings = {
        coupleName: "Abhijith & Rashi",
        valentineName: "Rashi",
        startDate: "2023-02-14T00:00:00",
        musicUrl: "https://cdn.pixabay.com/download/audio/2022/10/18/audio_31c2730e64.mp3",
        puzzleImage: "https://picsum.photos/400/400",
        hiddenHeartsImage: "https://picsum.photos/800/600?grayscale",
        timelineEvents: [
            {
                id: 1,
                date: "Feb 14, 2023",
                title: "First Date",
                description: "We went to that cute coffee shop and talked for hours.",
                icon: "☕"
            },
            {
                id: 2,
                date: "June 20, 2023",
                title: "First Trip",
                description: "Our amazing weekend getaway to the beach.",
                icon: "🏖️"
            },
            {
                id: 3,
                date: "Dec 25, 2023",
                title: "First Christmas",
                description: "Exchanging gifts and drinking hot cocoa.",
                icon: "🎄"
            }
        ]
    };

    // Load from localStorage or use defaults
    const [settings, setSettings] = useState(() => {
        try {
            const saved = localStorage.getItem('valentineSiteSettings');
            // Deep merge to ensure all keys exist even if local data is partial
            return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
        } catch (e) {
            console.error("Failed to parse settings", e);
            localStorage.removeItem('valentineSiteSettings');
            return defaultSettings;
        }
    });

    // Save to localStorage whenever settings change
    useEffect(() => {
        localStorage.setItem('valentineSiteSettings', JSON.stringify(settings));
    }, [settings]);

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
            removeTimelineEvent
        }}>
            {children}
        </SiteContext.Provider>
    );
};
