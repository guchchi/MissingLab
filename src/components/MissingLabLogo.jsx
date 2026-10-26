import React from 'react';

/**
 * MissingLab Official Brand Logo
 * Displays the futuristic flask + quantum star identity with clean modern typography.
 */
export default function MissingLabLogo({ size = 32, showTagline = false }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', userSelect: 'none' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="missinglab-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" />
            <stop offset="100%" stopColor="#4facfe" />
          </linearGradient>
          <linearGradient id="lime-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d1f34d" />
            <stop offset="100%" stopColor="#a3e635" />
          </linearGradient>
        </defs>
        {/* Modern Rounded Hexagon / Flask Outline */}
        <rect width="36" height="36" rx="10" fill="#0b1329" />
        {/* Stylized Flask */}
        <path
          d="M14 8h8v4.5l4 6.5a2 2 0 0 1-1.7 3H9.7A2 2 0 0 1 8 19l4-6.5V8z"
          stroke="url(#missinglab-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Bubble 1 */}
        <circle cx="16" cy="18" r="1.5" fill="url(#lime-glow)" />
        {/* Bubble 2 */}
        <circle cx="20" cy="16" r="1" fill="url(#lime-glow)" />
        {/* Top Rim */}
        <line x1="12" y1="8" x2="24" y2="8" stroke="url(#missinglab-grad)" strokeWidth="2" strokeLinecap="round" />
        {/* Spark Star in Corner */}
        <path
          d="M26 6l.8 1.8L28.6 8.6l-1.8.8L26 11.2l-.8-1.8-1.8-.8 1.8-.8L26 6z"
          fill="url(#lime-glow)"
        />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span
            style={{
              fontFamily: 'Outfit, -apple-system, sans-serif',
              fontWeight: 800,
              fontSize: `${Math.max(14, size * 0.48)}px`,
              letterSpacing: '-0.02em',
              color: 'var(--deep-charcoal)',
              lineHeight: 1.1
            }}
          >
            Missing<span style={{ color: '#0080FF' }}>Lab</span>
          </span>
        </div>

        {showTagline && (
          <span
            style={{
              fontFamily: 'Inter, -apple-system, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 600,
              color: 'var(--slate-gray)',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              marginTop: '1px'
            }}
          >
            The Virtual Science Lab for Students
          </span>
        )}
      </div>
    </div>
  );
}
