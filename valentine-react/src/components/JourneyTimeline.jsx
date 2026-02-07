import React from 'react';
import '../styles/JourneyTimeline.css';

const JourneyTimeline = () => {
    const events = [
        {
            date: "Feb 14, 2023",
            title: "First Date",
            description: "We went to that cute coffee shop and talked for hours.",
            icon: "☕"
        },
        {
            date: "June 20, 2023",
            title: "First Trip",
            description: "Our amazing weekend getaway to the beach.",
            icon: "🏖️"
        },
        {
            date: "Dec 25, 2023",
            title: "First Christmas",
            description: "Exchanging gifts and drinking hot cocoa.",
            icon: "🎄"
        },
        {
            date: "Feb 14, 2024",
            title: "One Year Anniversary",
            description: "Celebrating a whole year of love!",
            icon: "❤️"
        },
        {
            date: "Today",
            title: "Still Going Strong",
            description: "Creating more beautiful memories together.",
            icon: "✨"
        }
    ];

    return (
        <div className="timeline-container">
            <h2>Our Journey 🚀</h2>
            <div className="timeline">
                {events.map((event, index) => (
                    <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                        <div className="content">
                            <div className="date">{event.date}</div>
                            <h3>{event.icon} {event.title}</h3>
                            <p>{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JourneyTimeline;
