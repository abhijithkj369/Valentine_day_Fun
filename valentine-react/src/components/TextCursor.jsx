import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import '../styles/TextCursor.css';

const TextCursor = ({
    text = '⚛️',
    spacing = 50, // Reduced spacing for smoother trail
    followMouseDirection = true,
    randomFloat = true,
    exitDuration = 0.5,
    removalInterval = 30,
    maxPoints = 12 // Increased points
}) => {
    const [trail, setTrail] = useState([]);
    const containerRef = useRef(null);
    const lastMoveTimeRef = useRef(Date.now());
    const idCounter = useRef(0);

    const handleMouseMove = e => {
        // If we want it global, we might attach to window, but let's try container first
        // or just use window coordinates if this is a global overlay
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const createRandomData = () =>
            randomFloat
                ? {
                    randomX: Math.random() * 10 - 5,
                    randomY: Math.random() * 10 - 5,
                    randomRotate: Math.random() * 10 - 5
                }
                : {};

        setTrail(prev => {
            const newTrail = [...prev];

            if (newTrail.length === 0) {
                newTrail.push({
                    id: idCounter.current++,
                    x: mouseX,
                    y: mouseY,
                    angle: 0,
                    ...createRandomData()
                });
            } else {
                const last = newTrail[newTrail.length - 1];
                const dx = mouseX - last.x;
                const dy = mouseY - last.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance >= spacing) {
                    let rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
                    const computedAngle = followMouseDirection ? rawAngle : 0;
                    const steps = Math.floor(distance / spacing);

                    for (let i = 1; i <= steps; i++) {
                        const t = (spacing * i) / distance;
                        const newX = last.x + dx * t;
                        const newY = last.y + dy * t;

                        newTrail.push({
                            id: idCounter.current++,
                            x: newX,
                            y: newY,
                            angle: computedAngle,
                            ...createRandomData()
                        });
                    }
                }
            }

            return newTrail.length > maxPoints ? newTrail.slice(newTrail.length - maxPoints) : newTrail;
        });

        lastMoveTimeRef.current = Date.now();
    };

    useEffect(() => {
        // Attach to window for global effect
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Date.now() - lastMoveTimeRef.current > 100) {
                setTrail(prev => (prev.length > 0 ? prev.slice(1) : prev));
            }
        }, removalInterval);
        return () => clearInterval(interval);
    }, [removalInterval]);

    return (
        <div className="text-cursor-overlay">
            <AnimatePresence>
                {trail.map(item => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 1, rotate: item.angle }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: randomFloat ? [0, item.randomX || 0, 0] : 0,
                            y: randomFloat ? [0, item.randomY || 0, 0] : 0,
                            rotate: randomFloat ? [item.angle, item.angle + (item.randomRotate || 0), item.angle] : item.angle
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                            opacity: { duration: exitDuration, ease: 'easeOut' },
                            ...(randomFloat && {
                                x: { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' },
                                y: { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' },
                                rotate: { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }
                            })
                        }}
                        className="text-cursor-item"
                        style={{ left: item.x, top: item.y }}
                    >
                        {text}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default TextCursor;
