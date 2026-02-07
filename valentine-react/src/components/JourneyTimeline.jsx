import React, { useState } from 'react';
import { useSiteSettings } from '../context/SiteContext';
import MemoryModal from './MemoryModal';
import '../styles/JourneyTimeline.css';

const JourneyTimeline = () => {
    const { settings } = useSiteSettings();
    const events = settings.timelineEvents;
    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <div className="timeline-container">
            <h2>Our Journey 🚀</h2>
            <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>(Click on a memory to view photos! 📸)</p>
            <div className="timeline">
                {events.map((event, index) => (
                    <div
                        key={event.id}
                        className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                        onClick={() => setSelectedEvent(event)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="content">
                            <div className="date">{event.date}</div>
                            {/* Display first image as thumbnail if available */}
                            {event.images && event.images.length > 0 && (
                                <img src={event.images[0]} alt={event.title} className="timeline-image" />
                            )}
                            {/* Fallback for old single image format */}
                            {!event.images && event.image && (
                                <img src={event.image} alt={event.title} className="timeline-image" />
                            )}
                            <h3>{event.icon} {event.title}</h3>
                            <p>
                                {event.description.length > 100
                                    ? `${event.description.substring(0, 100)}...`
                                    : event.description}
                                {event.description.length > 100 && <span style={{ color: 'var(--primary-color)', fontSize: '0.9em', marginLeft: '5px' }}>Read More</span>}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedEvent && (
                <MemoryModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>
    );
};

export default JourneyTimeline;
