import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import '../styles/MusicPlayer.css';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);

    // Using a reliable public domain or creative commons MP3 as placeholder
    // User should replace this URL with their own hosted file or local asset
    const AUDIO_URL = "https://cdn.pixabay.com/download/audio/2022/10/18/audio_31c2730e64.mp3";

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

    // Auto-play attempt on mount (often blocked by browsers without interaction)
    useEffect(() => {
        const attemptPlay = async () => {
            if (audioRef.current) {
                try {
                    audioRef.current.volume = 0.3; // Low volume start
                    // await audioRef.current.play();
                    // setIsPlaying(true);
                } catch (e) {
                    console.log("Autoplay blocked, waiting for user interaction");
                }
            }
        };
        attemptPlay();
    }, []);

    return (
        <div className="music-player">
            <audio ref={audioRef} src={AUDIO_URL} loop />

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
