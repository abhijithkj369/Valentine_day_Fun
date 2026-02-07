import React, { useState } from 'react';
import { useSiteSettings } from '../context/SiteContext';
import { Link } from 'react-router-dom';
import '../styles/Admin.css';

const Admin = () => {
    const { settings, updateSettings, addTimelineEvent, removeTimelineEvent } = useSiteSettings();

    // Local state for timeline form
    const [newEvent, setNewEvent] = useState({ date: '', title: '', description: '', icon: '❤️' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateSettings({ [name]: value });
    };

    const handleEventChange = (e) => {
        const { name, value } = e.target;
        setNewEvent(prev => ({ ...prev, [name]: value }));
    };

    const handleAddEvent = (e) => {
        e.preventDefault();
        if (newEvent.title && newEvent.date) {
            // Split images by comma if provided, formatted as array
            const imagesArray = newEvent.rawImages
                ? newEvent.rawImages.split(',').map(url => url.trim()).filter(url => url.length > 0)
                : [];

            addTimelineEvent({
                ...newEvent,
                images: imagesArray
            });
            setNewEvent({ date: '', title: '', description: '', icon: '❤️', rawImages: '' });
        }
    };

    const resetToDefaults = () => {
        if (window.confirm("Are you sure? This will erase all your custom changes.")) {
            localStorage.removeItem('valentineSiteSettings');
            window.location.reload();
        }
    };

    return (
        <div className="admin-wrapper">
            <header className="admin-header">
                <h1>⚙️ Admin Dashboard</h1>
                <Link to="/" className="home-btn">Go to Home 🏠</Link>
            </header>

            <main className="admin-container">
                <section className="admin-section">
                    <h2>📝 General Info</h2>
                    <div className="form-group">
                        <label>Couple Name (e.g., Romeo & Juliet)</label>
                        <input
                            type="text"
                            name="coupleName"
                            value={settings.coupleName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Valentine's Name</label>
                        <input
                            type="text"
                            name="valentineName"
                            value={settings.valentineName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Secret PIN (Security Check)</label>
                        <input
                            type="text"
                            name="secretPin"
                            value={settings.secretPin}
                            onChange={handleChange}
                            maxLength="4"
                        />
                    </div>
                </section>

                <section className="admin-section">
                    <h2>⏳ Time Together</h2>
                    <div className="form-group">
                        <label>Relationship Start Date</label>
                        <input
                            type="datetime-local"
                            name="startDate"
                            value={settings.startDate}
                            onChange={handleChange}
                        />
                    </div>
                </section>

                <section className="admin-section">
                    <h2>🎵 Music & Media</h2>
                    <div className="form-group">
                        <label>Background Music URL (MP3)</label>
                        <input
                            type="text"
                            name="musicUrl"
                            value={settings.musicUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Puzzle Image URL</label>
                        <input
                            type="text"
                            name="puzzleImage"
                            value={settings.puzzleImage}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Hidden Hearts Background URL</label>
                        <input
                            type="text"
                            name="hiddenHeartsImage"
                            value={settings.hiddenHeartsImage}
                            onChange={handleChange}
                        />
                    </div>
                </section>

                <section className="admin-section">
                    <h2>📅 Journey Timeline</h2>

                    <div className="existing-events">
                        {settings.timelineEvents.map(event => (
                            <div key={event.id} className="event-item">
                                <div>
                                    <strong>{event.date}</strong> - {event.title}
                                </div>
                                <button onClick={() => removeTimelineEvent(event.id)} className="delete-btn">Delete</button>
                            </div>
                        ))}
                    </div>

                    <h3>Add New Event</h3>
                    <div className="add-event-form">
                        <input
                            type="text"
                            name="date"
                            placeholder="Date (e.g., Feb 14, 2024)"
                            value={newEvent.date}
                            onChange={handleEventChange}
                        />
                        <input
                            type="text"
                            name="title"
                            placeholder="Title (e.g., First Kiss)"
                            value={newEvent.title}
                            onChange={handleEventChange}
                        />
                        <input
                            type="text"
                            name="icon"
                            placeholder="Icon (e.g., 💋)"
                            value={newEvent.icon}
                            onChange={handleEventChange}
                            className="short-input"
                        />
                        <input
                            type="text"
                            name="rawImages"
                            placeholder="Image URLs (comma separated)"
                            value={newEvent.rawImages || ''}
                            onChange={handleEventChange}
                        />
                        <textarea
                            name="description"
                            placeholder="Description..."
                            value={newEvent.description}
                            onChange={handleEventChange}
                        />
                        <button onClick={handleAddEvent} className="add-btn">Add Event</button>
                    </div>
                </section>

                <button onClick={resetToDefaults} className="reset-btn">⚠️ Reset All to Defaults</button>
            </main>
        </div>
    );
};

export default Admin;
