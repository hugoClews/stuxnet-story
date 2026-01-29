// Custom SVG icons for Attack Flow stages
// Each icon is designed to match the cyber/hacker aesthetic

interface IconProps {
  className?: string;
  size?: number;
  infected?: boolean;
  glowColor?: string;
}

export function USBIcon({ className = "", size = 48, infected = false, glowColor = "#ff3366" }: IconProps) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none"
      style={{ filter: infected ? `drop-shadow(0 0 12px ${glowColor})` : 'none' }}
    >
      <defs>
        <linearGradient id="usbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={infected ? "#ff3366" : "#00f0ff"} />
          <stop offset="100%" stopColor={infected ? "#a855f7" : "#00a8ff"} />
        </linearGradient>
      </defs>
      {/* USB body */}
      <rect x="16" y="12" width="32" height="44" rx="4" fill="url(#usbGrad)" opacity="0.2" />
      <rect x="16" y="12" width="32" height="44" rx="4" stroke="url(#usbGrad)" strokeWidth="2" fill="none" />
      {/* USB connector prongs */}
      <rect x="22" y="2" width="6" height="14" rx="1" fill={infected ? "#ff3366" : "#00f0ff"} opacity="0.8" />
      <rect x="36" y="2" width="6" height="14" rx="1" fill={infected ? "#ff3366" : "#00f0ff"} opacity="0.8" />
      {/* Circuitry lines inside */}
      <path d="M24 28h16M24 36h12M28 36v8M36 28v12" stroke={infected ? "#ff3366" : "#00f0ff"} strokeWidth="1.5" opacity="0.6" />
      {/* Malware indicator when infected */}
      {infected && (
        <g>
          <circle cx="32" cy="44" r="6" fill="#ff3366" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <text x="32" y="48" textAnchor="middle" fontSize="10" fill="#ff3366">☠</text>
        </g>
      )}
    </svg>
  );
}

export function LaptopIcon({ className = "", size = 48, infected = false, glowColor = "#ff3366" }: IconProps) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none"
      style={{ filter: infected ? `drop-shadow(0 0 12px ${glowColor})` : 'none' }}
    >
      <defs>
        <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={infected ? "#ff3366" : "#00f0ff"} />
          <stop offset="100%" stopColor={infected ? "#a855f7" : "#00a8ff"} />
        </linearGradient>
      </defs>
      {/* Screen */}
      <rect x="8" y="8" width="48" height="32" rx="3" fill="url(#laptopGrad)" opacity="0.15" />
      <rect x="8" y="8" width="48" height="32" rx="3" stroke="url(#laptopGrad)" strokeWidth="2" fill="none" />
      {/* Screen content - terminal style */}
      <rect x="12" y="12" width="40" height="24" fill="#0a0a0f" />
      {infected ? (
        <g>
          <text x="16" y="24" fontSize="6" fill="#ff3366" fontFamily="monospace">INFECTED</text>
          <text x="16" y="32" fontSize="5" fill="#ff3366" fontFamily="monospace" opacity="0.7">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="0.5s" repeatCount="indefinite" />
            &gt; executing payload...
          </text>
        </g>
      ) : (
        <g>
          <text x="16" y="22" fontSize="5" fill="#00f0ff" fontFamily="monospace" opacity="0.5">&gt; _</text>
          <rect x="16" y="26" width="20" height="2" fill="#00f0ff" opacity="0.3" />
          <rect x="16" y="30" width="14" height="2" fill="#00f0ff" opacity="0.2" />
        </g>
      )}
      {/* Keyboard base */}
      <path d="M4 44h56l-4 12H8z" fill="url(#laptopGrad)" opacity="0.2" />
      <path d="M4 44h56l-4 12H8z" stroke="url(#laptopGrad)" strokeWidth="2" fill="none" />
      {/* Keyboard keys */}
      <g opacity="0.4">
        {[0, 1, 2, 3].map(i => (
          <rect key={i} x={14 + i * 10} y="48" width="6" height="3" rx="0.5" fill={infected ? "#ff3366" : "#00f0ff"} />
        ))}
      </g>
    </svg>
  );
}

export function NetworkIcon({ className = "", size = 48, infected = false, glowColor = "#ff3366" }: IconProps) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none"
      style={{ filter: infected ? `drop-shadow(0 0 12px ${glowColor})` : 'none' }}
    >
      <defs>
        <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={infected ? "#ff3366" : "#00f0ff"} />
          <stop offset="100%" stopColor={infected ? "#a855f7" : "#00a8ff"} />
        </linearGradient>
      </defs>
      {/* Central hub */}
      <circle cx="32" cy="32" r="10" fill="url(#netGrad)" opacity="0.2" />
      <circle cx="32" cy="32" r="10" stroke="url(#netGrad)" strokeWidth="2" fill="none" />
      {/* Connection nodes */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 32 + Math.cos(rad) * 22;
        const y = 32 + Math.sin(rad) * 22;
        return (
          <g key={i}>
            <line x1="32" y1="32" x2={x} y2={y} stroke={infected ? "#ff3366" : "#00f0ff"} strokeWidth="1.5" opacity="0.5" strokeDasharray="3 2">
              {infected && (
                <animate attributeName="stroke-dashoffset" values="0;-10" dur="0.5s" repeatCount="indefinite" />
              )}
            </line>
            <circle cx={x} cy={y} r="4" fill={infected ? "#ff3366" : "#00f0ff"} opacity={infected ? 0.8 : 0.5}>
              {infected && (
                <animate attributeName="opacity" values="0.5;1;0.5" dur={`${0.3 + i * 0.1}s`} repeatCount="indefinite" />
              )}
            </circle>
          </g>
        );
      })}
      {/* Center icon */}
      <text x="32" y="36" textAnchor="middle" fontSize="10" fill={infected ? "#ff3366" : "#00f0ff"}>
        {infected ? "⚡" : "◉"}
      </text>
    </svg>
  );
}

export function SCADAIcon({ className = "", size = 48, infected = false, glowColor = "#ff3366" }: IconProps) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none"
      style={{ filter: infected ? `drop-shadow(0 0 12px ${glowColor})` : 'none' }}
    >
      <defs>
        <linearGradient id="scadaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={infected ? "#ff3366" : "#00f0ff"} />
          <stop offset="100%" stopColor={infected ? "#a855f7" : "#00a8ff"} />
        </linearGradient>
      </defs>
      {/* Monitor frame */}
      <rect x="6" y="4" width="52" height="40" rx="3" fill="url(#scadaGrad)" opacity="0.15" />
      <rect x="6" y="4" width="52" height="40" rx="3" stroke="url(#scadaGrad)" strokeWidth="2" fill="none" />
      {/* Screen */}
      <rect x="10" y="8" width="44" height="32" fill="#0a0a0f" />
      {/* SCADA display elements */}
      {infected ? (
        <g>
          {/* Warning indicators */}
          <rect x="14" y="12" width="36" height="6" fill="#ff3366" opacity="0.3">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="0.4s" repeatCount="indefinite" />
          </rect>
          <text x="32" y="17" textAnchor="middle" fontSize="5" fill="#ff3366" fontFamily="monospace">⚠ SYSTEM COMPROMISED ⚠</text>
          {/* Fake normal readings */}
          <text x="14" y="26" fontSize="4" fill="#00ff00" fontFamily="monospace">TEMP: 145°C ✓</text>
          <text x="14" y="32" fontSize="4" fill="#00ff00" fontFamily="monospace">RPM: 1200 ✓</text>
          <text x="14" y="38" fontSize="4" fill="#00ff00" fontFamily="monospace">STATUS: NORMAL ✓</text>
        </g>
      ) : (
        <g>
          {/* Normal SCADA display */}
          <rect x="14" y="12" width="16" height="10" stroke="#00f0ff" strokeWidth="0.5" fill="none" opacity="0.5" />
          <rect x="34" y="12" width="16" height="10" stroke="#00f0ff" strokeWidth="0.5" fill="none" opacity="0.5" />
          <text x="22" y="19" textAnchor="middle" fontSize="4" fill="#00f0ff" opacity="0.6">FLOW</text>
          <text x="42" y="19" textAnchor="middle" fontSize="4" fill="#00f0ff" opacity="0.6">PRESS</text>
          {/* Bars */}
          <rect x="14" y="26" width="36" height="3" fill="#00f0ff" opacity="0.2" />
          <rect x="14" y="26" width="24" height="3" fill="#00f0ff" opacity="0.5" />
          <rect x="14" y="32" width="36" height="3" fill="#00f0ff" opacity="0.2" />
          <rect x="14" y="32" width="18" height="3" fill="#00f0ff" opacity="0.5" />
        </g>
      )}
      {/* Stand */}
      <rect x="26" y="44" width="12" height="4" fill="url(#scadaGrad)" opacity="0.3" />
      <rect x="20" y="48" width="24" height="4" rx="1" fill="url(#scadaGrad)" opacity="0.4" />
      {/* Indicator lights */}
      <circle cx="12" cy="48" r="2" fill={infected ? "#ff3366" : "#00ff00"}>
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="52" cy="48" r="2" fill={infected ? "#ff3366" : "#00f0ff"}>
        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function PLCIcon({ className = "", size = 48, infected = false, glowColor = "#ff3366" }: IconProps) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none"
      style={{ filter: infected ? `drop-shadow(0 0 12px ${glowColor})` : 'none' }}
    >
      <defs>
        <linearGradient id="plcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={infected ? "#ff3366" : "#00f0ff"} />
          <stop offset="100%" stopColor={infected ? "#a855f7" : "#00a8ff"} />
        </linearGradient>
      </defs>
      {/* PLC Housing */}
      <rect x="10" y="6" width="44" height="52" rx="3" fill="url(#plcGrad)" opacity="0.15" />
      <rect x="10" y="6" width="44" height="52" rx="3" stroke="url(#plcGrad)" strokeWidth="2" fill="none" />
      {/* Top vents */}
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={16 + i * 9} y="10" width="5" height="2" fill={infected ? "#ff3366" : "#00f0ff"} opacity="0.4" />
      ))}
      {/* Status LEDs */}
      <g>
        <circle cx="18" cy="20" r="3" fill={infected ? "#ff3366" : "#00ff00"}>
          <animate attributeName="opacity" values="0.5;1;0.5" dur={infected ? "0.2s" : "2s"} repeatCount="indefinite" />
        </circle>
        <circle cx="28" cy="20" r="3" fill={infected ? "#ff3366" : "#ffaa00"}>
          <animate attributeName="opacity" values="1;0.5;1" dur={infected ? "0.3s" : "1.5s"} repeatCount="indefinite" />
        </circle>
        <circle cx="38" cy="20" r="3" fill={infected ? "#ff3366" : "#00f0ff"}>
          <animate attributeName="opacity" values="0.7;1;0.7" dur={infected ? "0.15s" : "1s"} repeatCount="indefinite" />
        </circle>
        <text x="18" y="28" textAnchor="middle" fontSize="4" fill={infected ? "#ff3366" : "#00f0ff"} opacity="0.6">RUN</text>
        <text x="28" y="28" textAnchor="middle" fontSize="4" fill={infected ? "#ff3366" : "#00f0ff"} opacity="0.6">ERR</text>
        <text x="38" y="28" textAnchor="middle" fontSize="4" fill={infected ? "#ff3366" : "#00f0ff"} opacity="0.6">COM</text>
      </g>
      {/* Connection ports */}
      <rect x="14" y="34" width="36" height="18" rx="2" fill="#0a0a0f" />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <g key={i}>
          <rect x={18 + i * 5} y="38" width="3" height="10" fill={infected ? "#ff3366" : "#00f0ff"} opacity={0.3 + (i % 2) * 0.3}>
            {infected && (
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${0.2 + i * 0.05}s`} repeatCount="indefinite" />
            )}
          </rect>
        </g>
      ))}
      {/* Siemens-style label */}
      <text x="32" y="55" textAnchor="middle" fontSize="5" fill={infected ? "#ff3366" : "#00f0ff"} opacity="0.7" fontFamily="monospace">
        {infected ? "PWNED" : "S7-300"}
      </text>
    </svg>
  );
}

export function CentrifugeIcon({ className = "", size = 48, infected = false, glowColor = "#ff3366" }: IconProps) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none"
      style={{ filter: infected ? `drop-shadow(0 0 12px ${glowColor})` : 'none' }}
    >
      <defs>
        <linearGradient id="centGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={infected ? "#ff3366" : "#00f0ff"} />
          <stop offset="100%" stopColor={infected ? "#a855f7" : "#00a8ff"} />
        </linearGradient>
      </defs>
      {/* Outer casing */}
      <ellipse cx="32" cy="32" rx="26" ry="28" fill="url(#centGrad)" opacity="0.1" />
      <ellipse cx="32" cy="32" rx="26" ry="28" stroke="url(#centGrad)" strokeWidth="2" fill="none" />
      {/* Inner rotating drum */}
      <ellipse cx="32" cy="32" rx="18" ry="20" fill="none" stroke={infected ? "#ff3366" : "#00f0ff"} strokeWidth="1.5" opacity="0.6">
        <animateTransform 
          attributeName="transform" 
          type="rotate" 
          from={infected ? "0 32 32" : "0 32 32"}
          to={infected ? "360 32 32" : "360 32 32"}
          dur={infected ? "0.3s" : "2s"}
          repeatCount="indefinite"
        />
      </ellipse>
      {/* Spinning rotor blades */}
      <g>
        <animateTransform 
          attributeName="transform" 
          type="rotate" 
          from="0 32 32"
          to={infected ? "-360 32 32" : "360 32 32"}
          dur={infected ? "0.2s" : "1.5s"}
          repeatCount="indefinite"
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x2 = 32 + Math.cos(rad) * 14;
          const y2 = 32 + Math.sin(rad) * 14;
          return (
            <line 
              key={i}
              x1="32" 
              y1="32" 
              x2={x2} 
              y2={y2} 
              stroke={infected ? "#ff3366" : "#00f0ff"} 
              strokeWidth="2" 
              opacity={infected ? 0.8 : 0.5}
            />
          );
        })}
      </g>
      {/* Center hub */}
      <circle cx="32" cy="32" r="6" fill={infected ? "#ff3366" : "#00f0ff"} opacity="0.3" />
      <circle cx="32" cy="32" r="4" fill={infected ? "#ff3366" : "#00f0ff"} opacity="0.5">
        {infected && (
          <animate attributeName="r" values="4;6;4" dur="0.15s" repeatCount="indefinite" />
        )}
      </circle>
      {/* Radiation symbol when infected (representing nuclear context) */}
      {infected && (
        <g opacity="0.9">
          <circle cx="32" cy="32" r="2" fill="#ffff00" />
          {[0, 120, 240].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 32 + Math.cos(rad) * 10;
            const y = 32 + Math.sin(rad) * 10;
            return (
              <path
                key={i}
                d={`M32,32 L${32 + Math.cos((rad - 0.5)) * 12},${32 + Math.sin((rad - 0.5)) * 12} A12,12 0 0,1 ${32 + Math.cos((rad + 0.5)) * 12},${32 + Math.sin((rad + 0.5)) * 12} Z`}
                fill="#ffff00"
                opacity="0.7"
              >
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="0.5s" repeatCount="indefinite" />
              </path>
            );
          })}
        </g>
      )}
      {/* Warning vibration effect when infected */}
      {infected && (
        <>
          <ellipse cx="32" cy="32" rx="28" ry="30" fill="none" stroke="#ff3366" strokeWidth="1" opacity="0.4">
            <animate attributeName="rx" values="28;30;28" dur="0.1s" repeatCount="indefinite" />
            <animate attributeName="ry" values="30;32;30" dur="0.1s" repeatCount="indefinite" />
          </ellipse>
        </>
      )}
    </svg>
  );
}

// Data packet animation icon
export function DataPacketIcon({ className = "", size = 24, color = "#ff3366" }: { className?: string; size?: number; color?: string }) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none"
    >
      <defs>
        <radialGradient id="packetGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#packetGlow)" opacity="0.5" />
      <circle cx="16" cy="16" r="8" fill={color}>
        <animate attributeName="r" values="6;8;6" dur="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="16" cy="16" r="4" fill="#fff" opacity="0.8" />
      {/* Binary data effect */}
      <text x="16" y="18" textAnchor="middle" fontSize="6" fill="#000" fontFamily="monospace" fontWeight="bold">01</text>
    </svg>
  );
}

// ============================================
// REVERSE SHELL STAGE ICONS
// ============================================

export function ReconIcon({ className = "", size = 48, infected = false, glowColor = "#00ff41" }: IconProps) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none"
      style={{ filter: infected ? `drop-shadow(0 0 12px ${glowColor})` : 'none' }}
    >
      <defs>
        <linearGradient id="reconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff41" />
          <stop offset="100%" stopColor="#00f0ff" />
        </linearGradient>
      </defs>
      {/* Magnifying glass */}
      <circle cx="26" cy="26" r="16" fill="rgba(0, 255, 65, 0.1)" stroke="url(#reconGrad)" strokeWidth="3" />
      <line x1="38" y1="38" x2="56" y2="56" stroke="url(#reconGrad)" strokeWidth="4" strokeLinecap="round" />
      {/* Scan lines inside */}
      <g opacity="0.6">
        <line x1="16" y1="22" x2="36" y2="22" stroke="#00ff41" strokeWidth="1.5">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="16" y1="26" x2="36" y2="26" stroke="#00ff41" strokeWidth="1.5">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" begin="0.2s" repeatCount="indefinite" />
        </line>
        <line x1="16" y1="30" x2="36" y2="30" stroke="#00ff41" strokeWidth="1.5">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" begin="0.4s" repeatCount="indefinite" />
        </line>
      </g>
      {/* IP addresses floating */}
      <text x="8" y="58" fontSize="6" fill="#00ff41" fontFamily="monospace" opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
        10.0.0.x
      </text>
    </svg>
  );
}

export function ListenerIcon({ className = "", size = 48, infected = false, glowColor = "#00ff41" }: IconProps) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none"
      style={{ filter: infected ? `drop-shadow(0 0 12px ${glowColor})` : 'none' }}
    >
      <defs>
        <linearGradient id="listenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff41" />
          <stop offset="100%" stopColor="#00f0ff" />
        </linearGradient>
      </defs>
      {/* Satellite dish / antenna */}
      <ellipse cx="32" cy="35" rx="20" ry="8" fill="rgba(0, 255, 65, 0.15)" stroke="url(#listenGrad)" strokeWidth="2" />
      <path d="M 32 35 L 32 12" stroke="url(#listenGrad)" strokeWidth="3" />
      <circle cx="32" cy="10" r="4" fill="#00ff41">
        <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
      </circle>
      {/* Signal waves */}
      {[12, 18, 24].map((r, i) => (
        <circle key={i} cx="32" cy="10" r={r} fill="none" stroke="#00ff41" strokeWidth="1" opacity="0.4">
          <animate attributeName="r" values={`${r};${r+6};${r}`} dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Port number */}
      <text x="32" y="55" textAnchor="middle" fontSize="8" fill="#00ff41" fontFamily="monospace">:4444</text>
    </svg>
  );
}

export function CraftIcon({ className = "", size = 48, infected = false, glowColor = "#00ff41" }: IconProps) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none"
      style={{ filter: infected ? `drop-shadow(0 0 12px ${glowColor})` : 'none' }}
    >
      <defs>
        <linearGradient id="craftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff41" />
          <stop offset="100%" stopColor="#ff3366" />
        </linearGradient>
      </defs>
      {/* Gear 1 */}
      <g transform="translate(20, 24)">
        <circle cx="0" cy="0" r="10" fill="rgba(0, 255, 65, 0.2)" stroke="url(#craftGrad)" strokeWidth="2" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <rect 
              key={i}
              x={Math.cos(rad) * 10 - 2}
              y={Math.sin(rad) * 10 - 2}
              width="4"
              height="4"
              fill="#00ff41"
            />
          );
        })}
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite" additive="sum" />
      </g>
      {/* Gear 2 */}
      <g transform="translate(44, 36)">
        <circle cx="0" cy="0" r="8" fill="rgba(255, 51, 102, 0.2)" stroke="#ff3366" strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <rect 
              key={i}
              x={Math.cos(rad) * 8 - 2}
              y={Math.sin(rad) * 8 - 2}
              width="3"
              height="3"
              fill="#ff3366"
            />
          );
        })}
        <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="3s" repeatCount="indefinite" additive="sum" />
      </g>
      {/* Code snippet */}
      <text x="10" y="52" fontSize="5" fill="#00ff41" fontFamily="monospace" opacity="0.7">
        msfvenom -p
      </text>
    </svg>
  );
}

export function DeliverIcon({ className = "", size = 48, infected = false, glowColor = "#ff3366" }: IconProps) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none"
      style={{ filter: infected ? `drop-shadow(0 0 12px ${glowColor})` : 'none' }}
    >
      <defs>
        <linearGradient id="deliverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff3366" />
          <stop offset="100%" stopColor="#ffaa00" />
        </linearGradient>
      </defs>
      {/* Email envelope */}
      <rect x="8" y="16" width="48" height="32" rx="3" fill="rgba(255, 51, 102, 0.15)" stroke="url(#deliverGrad)" strokeWidth="2" />
      <path d="M 8 16 L 32 34 L 56 16" stroke="url(#deliverGrad)" strokeWidth="2" fill="none" />
      {/* Malware symbol inside */}
      <g transform="translate(32, 32)">
        <circle cx="0" cy="0" r="8" fill="#ff3366" opacity="0.3">
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1s" repeatCount="indefinite" />
        </circle>
        <text x="0" y="4" textAnchor="middle" fontSize="10" fill="#ff3366">☠</text>
      </g>
      {/* Flying motion lines */}
      <line x1="2" y1="28" x2="6" y2="28" stroke="#ff3366" strokeWidth="2" opacity="0.5">
        <animate attributeName="x1" values="2;-2;2" dur="0.5s" repeatCount="indefinite" />
      </line>
      <line x1="0" y1="32" x2="5" y2="32" stroke="#ff3366" strokeWidth="2" opacity="0.3">
        <animate attributeName="x1" values="0;-4;0" dur="0.5s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

export function ExecuteIcon({ className = "", size = 48, infected = false, glowColor = "#ff3366" }: IconProps) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none"
      style={{ filter: infected ? `drop-shadow(0 0 12px ${glowColor})` : 'none' }}
    >
      <defs>
        <linearGradient id="execGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff3366" />
          <stop offset="100%" stopColor="#00ff41" />
        </linearGradient>
      </defs>
      {/* Play button / execute triangle */}
      <polygon points="20,12 52,32 20,52" fill="rgba(255, 51, 102, 0.2)" stroke="url(#execGrad)" strokeWidth="3">
        <animate attributeName="fill-opacity" values="0.2;0.4;0.2" dur="0.8s" repeatCount="indefinite" />
      </polygon>
      {/* Inner glow */}
      <polygon points="26,20 44,32 26,44" fill="#ff3366" opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="0.8s" repeatCount="indefinite" />
      </polygon>
      {/* Electric sparks */}
      <g opacity="0.8">
        <path d="M 50 20 L 54 24 L 50 22 L 56 26" stroke="#00ff41" strokeWidth="1.5" fill="none">
          <animate attributeName="opacity" values="0;1;0" dur="0.3s" repeatCount="indefinite" />
        </path>
        <path d="M 52 38 L 58 36 L 54 40 L 60 38" stroke="#00ff41" strokeWidth="1.5" fill="none">
          <animate attributeName="opacity" values="0;1;0" dur="0.3s" begin="0.15s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}

export function ConnectIcon({ className = "", size = 48, infected = false, glowColor = "#00ff41" }: IconProps) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none"
      style={{ filter: infected ? `drop-shadow(0 0 12px ${glowColor})` : 'none' }}
    >
      <defs>
        <linearGradient id="connectGrad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff3366" />
          <stop offset="100%" stopColor="#00ff41" />
        </linearGradient>
      </defs>
      {/* Two endpoints */}
      <circle cx="12" cy="32" r="8" fill="rgba(255, 51, 102, 0.3)" stroke="#ff3366" strokeWidth="2" />
      <circle cx="52" cy="32" r="8" fill="rgba(0, 255, 65, 0.3)" stroke="#00ff41" strokeWidth="2" />
      {/* Connection line */}
      <line x1="20" y1="32" x2="44" y2="32" stroke="url(#connectGrad)" strokeWidth="3" />
      {/* Data packets flowing backwards (victim to attacker) */}
      <circle cx="32" cy="32" r="3" fill="#00ff41">
        <animate attributeName="cx" values="44;20;44" dur="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
      </circle>
      {/* Arrow pointing left (reverse connection) */}
      <polygon points="24,28 20,32 24,36" fill="#00ff41">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="0.5s" repeatCount="indefinite" />
      </polygon>
      {/* Labels */}
      <text x="12" y="50" textAnchor="middle" fontSize="6" fill="#ff3366" fontFamily="monospace">ATK</text>
      <text x="52" y="50" textAnchor="middle" fontSize="6" fill="#00ff41" fontFamily="monospace">VIC</text>
    </svg>
  );
}

export function ShellIcon({ className = "", size = 48, infected = false, glowColor = "#00ff41" }: IconProps) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none"
      style={{ filter: infected ? `drop-shadow(0 0 12px ${glowColor})` : 'none' }}
    >
      <defs>
        <linearGradient id="shellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff41" />
          <stop offset="100%" stopColor="#00f0ff" />
        </linearGradient>
      </defs>
      {/* Terminal window */}
      <rect x="6" y="8" width="52" height="48" rx="4" fill="#0a0a0f" stroke="url(#shellGrad)" strokeWidth="2" />
      {/* Title bar */}
      <rect x="6" y="8" width="52" height="10" rx="4" fill="rgba(0, 255, 65, 0.2)" />
      <circle cx="14" cy="13" r="2" fill="#ff3366" />
      <circle cx="22" cy="13" r="2" fill="#ffaa00" />
      <circle cx="30" cy="13" r="2" fill="#00ff41" />
      {/* Terminal text */}
      <text x="10" y="28" fontSize="5" fill="#00ff41" fontFamily="monospace">root@target:~#</text>
      <text x="10" y="36" fontSize="5" fill="#00f0ff" fontFamily="monospace">whoami</text>
      <text x="10" y="44" fontSize="5" fill="#fff" fontFamily="monospace">root</text>
      {/* Cursor */}
      <rect x="10" y="48" width="6" height="2" fill="#00ff41">
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

export function PwnedIcon({ className = "", size = 48, infected = false, glowColor = "#ff3366" }: IconProps) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none"
      style={{ filter: `drop-shadow(0 0 15px ${glowColor})` }}
    >
      <defs>
        <linearGradient id="pwnedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff3366" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <radialGradient id="pwnedGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff3366" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff3366" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Pulsing glow background */}
      <circle cx="32" cy="32" r="28" fill="url(#pwnedGlow)">
        <animate attributeName="r" values="24;30;24" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.5s" repeatCount="indefinite" />
      </circle>
      {/* Skull */}
      <ellipse cx="32" cy="28" rx="18" ry="16" fill="url(#pwnedGrad)" opacity="0.2" />
      <ellipse cx="32" cy="28" rx="18" ry="16" fill="none" stroke="url(#pwnedGrad)" strokeWidth="2" />
      {/* Eyes */}
      <ellipse cx="24" cy="26" rx="5" ry="6" fill="#0a0a0f" />
      <ellipse cx="40" cy="26" rx="5" ry="6" fill="#0a0a0f" />
      <circle cx="24" cy="26" r="2" fill="#ff3366">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="40" cy="26" r="2" fill="#ff3366">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="0.5s" repeatCount="indefinite" />
      </circle>
      {/* Nose */}
      <polygon points="32,30 29,36 35,36" fill="#0a0a0f" />
      {/* Teeth */}
      <rect x="22" y="40" width="20" height="8" rx="2" fill="#fff" opacity="0.9" />
      <line x1="26" y1="40" x2="26" y2="48" stroke="#0a0a0f" strokeWidth="1" />
      <line x1="30" y1="40" x2="30" y2="48" stroke="#0a0a0f" strokeWidth="1" />
      <line x1="34" y1="40" x2="34" y2="48" stroke="#0a0a0f" strokeWidth="1" />
      <line x1="38" y1="40" x2="38" y2="48" stroke="#0a0a0f" strokeWidth="1" />
      {/* PWNED text */}
      <text x="32" y="60" textAnchor="middle" fontSize="7" fill="#ff3366" fontFamily="monospace" fontWeight="bold">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="0.8s" repeatCount="indefinite" />
        PWNED
      </text>
    </svg>
  );
}

export function AttackerIcon({ className = "", size = 48, active = false }: { className?: string; size?: number; active?: boolean }) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none"
      style={{ filter: active ? 'drop-shadow(0 0 10px #00ff41)' : 'none' }}
    >
      <defs>
        <linearGradient id="attackerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff41" />
          <stop offset="100%" stopColor="#00f0ff" />
        </linearGradient>
      </defs>
      {/* Hooded figure */}
      <path d="M 32 8 C 18 8 12 20 12 32 L 12 48 C 12 52 16 56 20 56 L 44 56 C 48 56 52 52 52 48 L 52 32 C 52 20 46 8 32 8 Z" 
        fill="rgba(0, 255, 65, 0.15)" stroke="url(#attackerGrad)" strokeWidth="2" />
      {/* Face shadow */}
      <ellipse cx="32" cy="30" rx="12" ry="10" fill="#0a0a0f" />
      {/* Glowing eyes */}
      <circle cx="26" cy="28" r="2" fill={active ? "#00ff41" : "#333"}>
        {active && <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />}
      </circle>
      <circle cx="38" cy="28" r="2" fill={active ? "#00ff41" : "#333"}>
        {active && <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />}
      </circle>
      {/* Keyboard/laptop hint */}
      <rect x="20" y="46" width="24" height="6" rx="1" fill={active ? "#00ff41" : "#333"} opacity="0.5" />
    </svg>
  );
}

export function VictimIcon({ className = "", size = 48, infected = false, pwned = false }: { className?: string; size?: number; infected?: boolean; pwned?: boolean }) {
  const color = pwned ? "#ff3366" : infected ? "#ffaa00" : "#00f0ff";
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none"
      style={{ filter: (infected || pwned) ? `drop-shadow(0 0 10px ${color})` : 'none' }}
    >
      <defs>
        <linearGradient id="victimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={pwned ? "#a855f7" : infected ? "#ff3366" : "#00a8ff"} />
        </linearGradient>
      </defs>
      {/* Computer monitor */}
      <rect x="8" y="8" width="48" height="36" rx="3" fill="rgba(0, 240, 255, 0.1)" stroke="url(#victimGrad)" strokeWidth="2" />
      {/* Screen */}
      <rect x="12" y="12" width="40" height="28" fill="#0a0a0f" />
      {/* Screen content based on state */}
      {pwned ? (
        <g>
          <text x="32" y="28" textAnchor="middle" fontSize="14" fill="#ff3366">💀</text>
          <text x="32" y="38" textAnchor="middle" fontSize="6" fill="#ff3366" fontFamily="monospace">PWNED</text>
        </g>
      ) : infected ? (
        <g>
          <text x="32" y="26" textAnchor="middle" fontSize="6" fill="#ffaa00" fontFamily="monospace">WARNING</text>
          <text x="32" y="34" textAnchor="middle" fontSize="5" fill="#ff3366" fontFamily="monospace">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="0.5s" repeatCount="indefinite" />
            PAYLOAD ACTIVE
          </text>
        </g>
      ) : (
        <g>
          <rect x="16" y="16" width="32" height="3" fill="#00f0ff" opacity="0.3" />
          <rect x="16" y="22" width="24" height="3" fill="#00f0ff" opacity="0.2" />
          <rect x="16" y="28" width="28" height="3" fill="#00f0ff" opacity="0.2" />
        </g>
      )}
      {/* Stand */}
      <rect x="26" y="44" width="12" height="4" fill="url(#victimGrad)" opacity="0.5" />
      <rect x="20" y="48" width="24" height="4" rx="1" fill="url(#victimGrad)" opacity="0.4" />
    </svg>
  );
}

export function FirewallIcon({ className = "", size = 48, bypassed = false }: { className?: string; size?: number; bypassed?: boolean }) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none"
      style={{ filter: bypassed ? 'drop-shadow(0 0 8px #ff3366)' : 'drop-shadow(0 0 8px #00f0ff)' }}
    >
      <defs>
        <linearGradient id="fwGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={bypassed ? "#ff3366" : "#00f0ff"} />
          <stop offset="100%" stopColor={bypassed ? "#ffaa00" : "#00ff41"} />
        </linearGradient>
      </defs>
      {/* Brick wall */}
      <rect x="8" y="12" width="48" height="40" fill={bypassed ? "rgba(255, 51, 102, 0.1)" : "rgba(0, 240, 255, 0.1)"} stroke="url(#fwGrad)" strokeWidth="2" rx="2" />
      {/* Bricks pattern */}
      {[0, 1, 2, 3].map(row => (
        <g key={row}>
          {[0, 1, 2].map(col => (
            <rect 
              key={col}
              x={12 + col * 14 + (row % 2) * 7} 
              y={16 + row * 9} 
              width="12" 
              height="7" 
              fill="none" 
              stroke={bypassed ? "#ff3366" : "#00f0ff"} 
              strokeWidth="1" 
              opacity={bypassed ? 0.3 : 0.5}
            />
          ))}
        </g>
      ))}
      {/* Status indicator */}
      {bypassed ? (
        <g>
          <line x1="20" y1="20" x2="44" y2="44" stroke="#ff3366" strokeWidth="3" />
          <line x1="44" y1="20" x2="20" y2="44" stroke="#ff3366" strokeWidth="3" />
        </g>
      ) : (
        <circle cx="32" cy="32" r="8" fill="#00ff41" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}

export const stageIcons = {
  usb: USBIcon,
  laptop: LaptopIcon,
  network: NetworkIcon,
  scada: SCADAIcon,
  plc: PLCIcon,
  centrifuge: CentrifugeIcon,
};

export const reverseShellIcons = {
  recon: ReconIcon,
  listen: ListenerIcon,
  craft: CraftIcon,
  deliver: DeliverIcon,
  execute: ExecuteIcon,
  connect: ConnectIcon,
  shell: ShellIcon,
  pwned: PwnedIcon,
  attacker: AttackerIcon,
  victim: VictimIcon,
  firewall: FirewallIcon,
};
