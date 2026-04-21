import React from 'react';
import './EvolvingYeti.css';

const EvolvingYeti = ({ strengthLevel, usernameWidth, isPasswordFocused }) => {
  // Posición de las pupilas según el ancho del texto (para el campo usuario)
  const pupilX = Math.min(Math.max(-8 + (usernameWidth / 20), -8), 8);
  const pupilY = 2; // Siempre mirando un poquito abajo al escribir

  return (
    <div className={`evolving-yeti-container level-${strengthLevel} ${isPasswordFocused ? 'hands-up' : ''}`}>
      <svg viewBox="0 0 200 200" className="yeti-body">
        <defs>
          <radialGradient id="bodyGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fdfdfd" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </radialGradient>
          <filter id="yetiShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Capa (Level 3) */}
        {strengthLevel >= 3 && (
          <path className="yeti-cape" d="M40 100 Q100 120 160 100 L180 180 Q100 200 20 180 Z" fill="#e53e3e" filter="url(#yetiShadow)" />
        )}

        {/* Orejas */}
        <circle cx="40" cy="80" r="18" fill="#e2e8f0" />
        <circle cx="40" cy="80" r="10" fill="#cbd5e0" />
        <circle cx="160" cy="80" r="18" fill="#e2e8f0" />
        <circle cx="160" cy="80" r="10" fill="#cbd5e0" />

        {/* Cuerpo Principal */}
        <path d="M40 180 Q100 160 160 180 L160 100 Q160 40 100 40 Q40 40 40 100 Z" fill="url(#bodyGrad)" filter="url(#yetiShadow)" />

        {/* Gorrito (Level 1, 2, 3) */}
        {strengthLevel >= 1 && (
          <g className="yeti-hat">
            <path d="M50 50 Q100 20 150 50 L145 70 Q100 50 55 70 Z" fill="#3182ce" />
            <circle cx="100" cy="25" r="8" fill="white" />
          </g>
        )}

        {/* Cara */}
        <ellipse cx="100" cy="100" rx="45" ry="38" fill="white" opacity="0.5" />

        {/* Ojos */}
        <g className="eyes-group">
          <circle cx="75" cy="95" r="12" fill="white" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="125" cy="95" r="12" fill="white" stroke="#e2e8f0" strokeWidth="1" />
          
          {!isPasswordFocused && (
            <g style={{ transform: `translate(${pupilX}px, ${pupilY}px)` }}>
              <circle cx="75" cy="95" r="5" fill="#2d3748" />
              <circle cx="125" cy="95" r="5" fill="#2d3748" />
              <circle cx="73" cy="93" r="2" fill="white" opacity="0.8" />
              <circle cx="123" cy="93" r="2" fill="white" opacity="0.8" />
            </g>
          )}
        </g>

        {/* Lentes de Sol (Level 2, 3) */}
        {strengthLevel >= 2 && (
          <g className="yeti-sunglasses">
            <rect x="60" y="85" width="30" height="20" rx="5" fill="#2d3748" />
            <rect x="110" y="85" width="30" height="20" rx="5" fill="#2d3748" />
            <path d="M90 95 L110 95" stroke="#2d3748" strokeWidth="3" />
          </g>
        )}

        {/* Nariz */}
        <path d="M92 115 Q100 108 108 115 L100 122 Z" fill="#4a5568" />

        {/* Boca */}
        <path 
          className="yeti-mouth"
          d={strengthLevel >= 2 ? "M85 135 Q100 155 115 135" : "M90 140 Q100 140 110 140"} 
          fill="none" 
          stroke="#2d3748" 
          strokeWidth="3" 
          strokeLinecap="round"
        />

        {/* Brazos/Manos abajo */}
        <g className="yeti-arm-group left">
          <path className="yeti-arm" d="M45 180 Q30 160 40 150" fill="none" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
          <circle className="yeti-hand" cx="40" cy="150" r="18" fill="#e2e8f0" filter="url(#yetiShadow)" />
        </g>
        <g className="yeti-arm-group right">
          <path className="yeti-arm" d="M155 180 Q170 160 160 150" fill="none" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
          <circle className="yeti-hand" cx="160" cy="150" r="18" fill="#e2e8f0" filter="url(#yetiShadow)" />
        </g>
      </svg>
    </div>
  );
};

export default EvolvingYeti;
