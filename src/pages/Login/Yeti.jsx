import React from 'react';
import './Yeti.css';

const Yeti = ({ usernameWidth, isPasswordFocused, isSuccess, isError }) => {
  // Mapeamos el ancho del texto (0 a ~300px) a un rango de pupilas (-8 a 8)
  // El divisor 20 es ajustable según qué tan "exagerado" querés el movimiento
  const pupilX = Math.min(Math.max(-8 + (usernameWidth / 20), -8), 8);
  
  // El Yeti mira un poquito hacia abajo cuando escribe (Y = 2) 
  // y hacia arriba cuando se tapa los ojos (Y = -5)
  const pupilY = isPasswordFocused ? -5 : 2;

  return (
    <div className={`yeti-container ${isPasswordFocused ? 'hands-up' : ''} ${isSuccess ? 'success' : ''} ${isError ? 'error' : ''}`}>
      <svg viewBox="0 0 200 200" className="yeti-body">
        <defs>
          <radialGradient id="bodyGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fdfdfd" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </radialGradient>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Orejas */}
        <circle cx="40" cy="80" r="18" fill="#e2e8f0" />
        <circle cx="40" cy="80" r="10" fill="#cbd5e0" />
        <circle cx="160" cy="80" r="18" fill="#e2e8f0" />
        <circle cx="160" cy="80" r="10" fill="#cbd5e0" />

        {/* Cuerpo Principal */}
        <path d="M40 180 Q100 160 160 180 L160 100 Q160 40 100 40 Q40 40 40 100 Z" fill="url(#bodyGradient)" filter="url(#shadow)" />

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

        {/* Nariz */}
        <path d="M92 115 Q100 108 108 115 L100 122 Z" fill="#4a5568" />

        {/* Boca */}
        <path 
          className="yeti-mouth"
          d={isSuccess ? "M85 135 Q100 155 115 135" : isError ? "M85 145 Q100 135 115 145" : "M90 140 Q100 140 110 140"} 
          fill="none" 
          stroke="#2d3748" 
          strokeWidth="3" 
          strokeLinecap="round"
        />

        {/* Grupos de Brazos y Manos */}
        <g className="yeti-arm-group left">
          <path className="yeti-arm" d="M45 180 Q30 160 40 150" fill="none" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
          <circle className="yeti-hand" cx="40" cy="150" r="18" fill="#e2e8f0" filter="url(#shadow)" />
        </g>

        <g className="yeti-arm-group right">
          <path className="yeti-arm" d="M155 180 Q170 160 160 150" fill="none" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
          <circle className="yeti-hand" cx="160" cy="150" r="18" fill="#e2e8f0" filter="url(#shadow)" />
        </g>
      </svg>
    </div>
  );
};

export default Yeti;
