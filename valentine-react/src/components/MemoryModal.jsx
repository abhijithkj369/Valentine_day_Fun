import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/MemoryModal.css';

const MemoryModal = ({ event, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = event.images || (event.image ? [event.image] : []);

    if (images.length === 0) return null;

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-image-container">
                    <img src={images[currentIndex]} alt={`Memory ${currentIndex + 1}`} />

                    {images.length > 1 && (
                        <>
                            <button className="nav-btn prev" onClick={prevImage}>
                                <ChevronLeft size={30} />
                            </button>
                            <button className="nav-btn next" onClick={nextImage}>
                                <ChevronRight size={30} />
                            </button>
                        </>
                    )}
                </div>

                <div className="modal-details">
                    <h3>{event.title}</h3>
                    <p>{event.date}</p>
                    <p className="description">{event.description}</p>
                    {images.length > 1 && (
                        <div className="image-counter">
                            {currentIndex + 1} / {images.length}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MemoryModal;
