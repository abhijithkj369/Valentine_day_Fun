import React from 'react';
import { useSiteSettings } from '../context/SiteContext';
import '../styles/JourneyTimeline.css';

const JourneyTimeline = () => {
    const { settings } = useSiteSettings();
    const events = settings.timelineEvents;

    return (
        <div className="timeline-container">
            <h2>Our Journey 🚀</h2>
            <div className="timeline">
                {events.map((event, index) => (
                    <div key={event.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
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
