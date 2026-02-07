import React, { useState, useRef, useEffect } from 'react';
import { useSiteSettings } from '../context/SiteContext';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import '../styles/MusicPlayer.css';

const MusicPlayer = () => {
    const { settings } = useSiteSettings();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
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
                    // await audioRef.current.play(); // Auto-play might be blocked
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
        <div className="music-player">
            <audio ref={audioRef} src={settings.musicUrl} loop />

            <div className="music-controls">
                <div className="music-info">
                    <Music size={18} className="music-icon spin" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
                    <span className="scrolling-text">
                        <span>Us Against The World 🎵</span>
                    </span>
                </div>

                <div className="buttons">
                    <button onClick={toggleMute} className="control-btn">
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <button onClick={togglePlay} className="control-btn play-btn">
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
