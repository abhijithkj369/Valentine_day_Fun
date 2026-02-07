import React, { useState, useRef, useEffect } from 'react';
import { useSiteSettings } from '../context/SiteContext';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import '../styles/MusicPlayer.css';

const MusicPlayer = () => {
    const { settings } = useSiteSettings();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Playback failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    useEffect(() => {
        const attemptPlay = async () => {
            if (audioRef.current) {
                try {
                    audioRef.current.volume = 0.3;
                } catch (e) {
                    console.log("Autoplay blocked");
                }
            }
        };
        attemptPlay();
    }, []);

    // Effect to reload audio if URL changes from Admin
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
            if (isPlaying) audioRef.current.play().catch(e => console.log(e));
        }
    }, [settings.musicUrl]);

    return (
        <div className={`music-player ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <audio ref={audioRef} src={settings.musicUrl} loop />

            {!isExpanded ? (
                <button className="music-toggle" onClick={() => setIsExpanded(true)}>
                    <Music size={24} className={isPlaying ? 'spin' : ''} />
                </button>
            ) : (
                <div className="music-expanded-controls">
                    <div className="music-header">
                        <span className="scrolling-text">Our Song 🎵</span>
                        <div className="header-actions">
                            <button className="close-btn" onClick={() => setIsExpanded(false)}>
                                <span style={{ fontSize: '12px' }}>✕</span>
                            </button>
                        </div>
                    </div>

                    <div className="music-actions">
                        <button onClick={toggleMute} className="control-btn">
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        <button onClick={togglePlay} className="control-btn play-btn">
                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MusicPlayer;
