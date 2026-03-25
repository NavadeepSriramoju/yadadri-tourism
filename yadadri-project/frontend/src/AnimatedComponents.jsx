// AnimatedBackground.jsx - Floating particles and animated elements
export function ParticleBackground() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden'
    }}>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            background: ['#FFD700', '#FF6B1A', '#D4AF37', '#FF8C42', '#00D9FF'][i % 5],
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
            animation: `float${i % 3} ${8 + Math.random() * 10}s ease-in-out infinite`,
            boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255, 215, 0, 0.6)`,
            transition: 'all 0.3s ease'
          }}
        />
      ))}
      <style>{`
        @keyframes float0 {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-50px) translateX(20px) scale(1.2); opacity: 0.8; }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-80px) translateX(-30px) scale(0.9); opacity: 0.6; }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.35; }
          50% { transform: translateY(-60px) translateX(40px) scale(1.1); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

// Enhanced animated button component
export function AnimatedButton({ children, onClick, variant = 'primary', style = {} }) {
  return (
    <button
      onClick={onClick}
      className={`btn-${variant}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = 'glow-effect';
      }}
    >
      <span style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </span>
    </button>
  );
}

// Glowing text component
export function GlowingText({ text, className = '', style = {} }) {
  return (
    <span
      className={className}
      style={{
        background: 'linear-gradient(135deg, #FFD700, #FF6B1A, #FFD700)',
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'gradientShift 3s ease infinite',
        ...style
      }}
    >
      {text}
    </span>
  );
}
