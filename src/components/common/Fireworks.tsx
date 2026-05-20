import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  delay: number;
}

export default function Fireworks() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = ['#fbbf24', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#14b8a6'];
    const pieces: ConfettiPiece[] = [];

    // Create more confetti pieces for better effect
    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100 - 50, // -50 to 50
        y: -20 - Math.random() * 20, // Start above screen
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 720 - 360,
        scale: Math.random() * 0.8 + 0.4,
        delay: Math.random() * 0.5
      });
    }

    setConfetti(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Confetti pieces falling from top */}
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            x: '50vw',
            y: `${piece.y}vh`,
            opacity: 1,
            scale: 0,
            rotate: 0
          }}
          animate={{
            x: `calc(50vw + ${piece.x}vw)`,
            y: '120vh',
            opacity: [1, 1, 0.8, 0],
            scale: piece.scale,
            rotate: piece.rotation
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            ease: 'easeIn',
            delay: piece.delay
          }}
          className="absolute"
          style={{
            width: '12px',
            height: '12px',
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px'
          }}
        />
      ))}

      {/* Celebration text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 0 }}
        animate={{
          opacity: [0, 1, 1, 1, 0],
          scale: [0.5, 1.2, 1, 1, 0.8],
          y: [0, -20, -20, -20, -40]
        }}
        transition={{ duration: 4, times: [0, 0.15, 0.3, 0.85, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="bg-white rounded-3xl px-10 py-6 shadow-2xl border-4 border-yellow-400">
          <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-center">
            🎉 CHÚC MỪNG! 🎉
          </p>
          <p className="text-sm font-bold text-gray-600 text-center mt-2">
            Bạn đã nhận huy hiệu!
          </p>
        </div>
      </motion.div>

      {/* Sparkles around */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{
            x: '50vw',
            y: '50vh',
            opacity: 0,
            scale: 0
          }}
          animate={{
            x: `${20 + Math.random() * 60}vw`,
            y: `${20 + Math.random() * 60}vh`,
            opacity: [0, 1, 1, 0],
            scale: [0, 1.5, 1.5, 0],
            rotate: Math.random() * 360
          }}
          transition={{
            duration: 2,
            ease: 'easeOut',
            delay: Math.random() * 0.8
          }}
          className="absolute text-3xl"
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}
