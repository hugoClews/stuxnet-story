"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Story data type definitions
interface StatItem {
  value: string;
  label: string;
}

interface NetworkNode {
  id: string;
  label: string;
  x: number;
  y: number;
  infected?: boolean;
}

interface NetworkConnection {
  from: string;
  to: string;
  attack?: boolean;
}

interface TimelineEvent {
  year: string;
  text: string;
}

interface CodeLine {
  text: string;
  type: string;
}

interface Slide {
  type: string;
  title?: string;
  subtitle?: string;
  content?: string;
  subtext?: string;
  number?: string;
  label?: string;
  items?: StatItem[];
  root?: string;
  phases?: string[][];
  nodes?: NetworkNode[];
  connections?: NetworkConnection[];
  events?: TimelineEvent[];
  lines?: CodeLine[];
  stage?: number;
  mapType?: string;
}

interface Story {
  id: string;
  title: string;
  subtitle: string;
  slides: Slide[];
}

// All Stories
const stories: Record<string, Story> = {
  stuxnet: {
    id: "stuxnet",
    title: "Stuxnet",
    subtitle: "The World's First Cyber Weapon",
    slides: [
      {
        type: "text",
        content: "Someone just <span class='highlight-red'>blew up</span> a nuclear facility",
        subtext: "Without firing a single shot."
      },
      {
        type: "bigNumber",
        number: "1,000",
        label: "centrifuges — destroyed"
      },
      {
        type: "text",
        content: "Iran's <span class='highlight-red'>nuclear program</span>",
        subtext: "was under attack. They had no idea."
      },
      {
        type: "text",
        content: "The weapon? <span class='highlight'>A USB stick.</span>",
        subtext: ""
      },
      {
        type: "network",
        title: "It spread like a virus",
        nodes: [
          { id: "usb", label: "USB", x: 8, y: 50 },
          { id: "pc", label: "PC", x: 30, y: 30, infected: true },
          { id: "scada", label: "SCADA", x: 52, y: 50, infected: true },
          { id: "plc", label: "PLC", x: 74, y: 30, infected: true },
          { id: "centrifuge", label: "Target", x: 92, y: 50, infected: true }
        ],
        connections: [
          { from: "usb", to: "pc", attack: true },
          { from: "pc", to: "scada", attack: true },
          { from: "scada", to: "plc", attack: true },
          { from: "plc", to: "centrifuge", attack: true }
        ]
      },
      { type: "attackFlow", stage: 0 },
      { type: "attackFlow", stage: 1 },
      { type: "attackFlow", stage: 2 },
      { type: "attackFlow", stage: 3 },
      { type: "attackFlow", stage: 4 },
      {
        type: "text",
        content: "It made centrifuges <span class='highlight-red'>tear themselves apart</span>",
        subtext: "While screens showed: \"All systems normal.\""
      },
      {
        type: "stats",
        items: [
          { value: "5", label: "Zero-Days Used" },
          { value: "14", label: "Months Hidden" }
        ]
      },
      {
        type: "text",
        content: "This wasn't hackers.",
        subtext: ""
      },
      {
        type: "text",
        content: "This was <span class='highlight'>governments.</span>",
        subtext: "USA + Israel. Codename: Olympic Games."
      },
      {
        type: "text",
        content: "<span class='highlight-purple'>Code</span> became a <span class='highlight-red'>weapon of war.</span>",
        subtext: "And nothing was ever the same."
      },
      {
        type: "title",
        title: "STUXNET",
        subtitle: "The world's first cyber weapon • 2010"
      }
    ]
  },
  
  coupang: {
    id: "coupang",
    title: "Coupang Breach",
    subtitle: "South Korea's Biggest Data Leak",
    slides: [
      {
        type: "title",
        title: "THE COUPANG BREACH",
        subtitle: "When the Insider Became the Threat"
      },
      {
        type: "text",
        content: "In late 2025, South Korea's largest e-commerce platform was breached...",
        subtext: "By one of their own."
      },
      {
        type: "map",
        mapType: "korea-location",
        title: "Seoul, South Korea",
        subtitle: "Coupang Headquarters — Songpa District"
      },
      {
        type: "bigNumber",
        number: "33.7M",
        label: "User accounts compromised"
      },
      {
        type: "text",
        content: "That's <span class='highlight-red'>65%</span> of South Korea's population",
        subtext: "The largest data breach in the country's history"
      },
      {
        type: "stats",
        items: [
          { value: "147", label: "Days Undetected" },
          { value: "65%", label: "Population Affected" },
          { value: "$1.18B", label: "Voucher Payout" },
          { value: "1", label: "Insider" }
        ]
      },
      {
        type: "text",
        content: "The perpetrator: <span class='highlight-red'>A former employee</span>",
        subtext: "Someone who knew the systems inside and out"
      },
      {
        type: "attackTree",
        root: "Exfiltrate Customer Database",
        phases: [
          ["Privileged Access", "Data Collection", "Exfiltration"],
          ["Employee Credentials", "Bulk Queries", "External Transfer"]
        ]
      },
      {
        type: "timeline",
        title: "The 147-Day Breach",
        events: [
          { year: "July 2025", text: "Unauthorized access begins" },
          { year: "Aug-Oct 2025", text: "Data silently exfiltrated over months" },
          { year: "Nov 2025", text: "Breach finally detected by security team" },
          { year: "Nov 30", text: "Public disclosure shocks the nation" },
          { year: "Dec 2025", text: "Suspect flees South Korea" }
        ]
      },
      {
        type: "text",
        content: "When investigators closed in, the suspect <span class='highlight-red'>vanished</span>",
        subtext: "Disappearing across the Yellow Sea..."
      },
      {
        type: "map",
        mapType: "korea-china-flight",
        title: "The Escape",
        subtitle: "Seoul → Somewhere in China"
      },
      {
        type: "text",
        content: "Before fleeing, the suspect <span class='highlight-purple'>threw their laptop into a river</span>",
        subtext: "Destroying evidence... or so they thought."
      },
      {
        type: "text",
        content: "Investigators <span class='highlight'>recovered the laptop</span> from the riverbed",
        subtext: "Digital forensics never sleeps"
      },
      {
        type: "stats",
        items: [
          { value: "CEO", label: "Resigned" },
          { value: "₩1.7T", label: "Compensation Fund" },
          { value: "0.03%", label: "Security Budget" },
          { value: "∞", label: "Trust Lost" }
        ]
      },
      {
        type: "text",
        content: "Coupang spent just <span class='highlight-red'>0.03%</span> of revenue on security",
        subtext: "Far below industry standards"
      },
      {
        type: "code",
        title: "What They Took",
        lines: [
          { text: "// Customer data exfiltrated:", type: "comment" },
          { text: "- Full names", type: "normal" },
          { text: "- Phone numbers", type: "normal" },
          { text: "- Email addresses", type: "normal" },
          { text: "- Home addresses", type: "normal" },
          { text: "- Order history", type: "normal" },
          { text: "- Payment information (partial)", type: "normal" },
          { text: "", type: "normal" },
          { text: "// 33.7 million records", type: "comment" }
        ]
      },
      {
        type: "text",
        content: "The breach sparked <span class='highlight-purple'>nationwide debate</span> about insider threats",
        subtext: "And the true cost of underinvesting in security"
      },
      {
        type: "title",
        title: "LESSONS LEARNED",
        subtitle: "Your biggest threat might already be inside"
      }
    ]
  }
};

// Korea Location Map Component
function KoreaLocationMap() {
  return (
    <svg className="map-svg" viewBox="0 0 400 350" preserveAspectRatio="xMidYMid meet">
      {/* South Korea outline */}
      <path className="country-path origin" d="
        M 180 50
        C 200 45, 220 50, 240 55
        C 260 60, 275 75, 280 95
        C 285 115, 290 140, 285 165
        C 280 190, 270 220, 255 250
        C 240 280, 220 300, 195 310
        C 170 320, 145 315, 125 300
        C 105 285, 95 260, 90 235
        C 85 210, 90 180, 100 155
        C 110 130, 125 105, 145 85
        C 165 65, 175 55, 180 50
        Z
      "/>
      
      {/* Seoul marker with pulse */}
      <circle className="location-pulse" cx="195" cy="95" r="8">
        <animate attributeName="r" values="8;15;8" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle className="city-marker" cx="195" cy="95" r="6"/>
      <text className="city-label" x="210" y="100">Seoul</text>
      
      {/* Coupang HQ indicator */}
      <rect x="175" y="105" width="80" height="25" rx="4" fill="rgba(255,51,102,0.2)" stroke="var(--accent2)" strokeWidth="1"/>
      <text x="215" y="122" fill="var(--text)" fontSize="10" textAnchor="middle">Coupang HQ</text>
      
      {/* Other cities */}
      <circle cx="260" cy="180" r="4" fill="rgba(0,240,255,0.5)"/>
      <text className="city-label" x="270" y="185" fontSize="10" fill="var(--text-dim)">Daegu</text>
      
      <circle cx="230" cy="260" r="4" fill="rgba(0,240,255,0.5)"/>
      <text className="city-label" x="245" y="265" fontSize="10" fill="var(--text-dim)">Busan</text>
      
      {/* Sea labels */}
      <text x="60" y="180" fill="var(--text-dim)" fontSize="11" fontStyle="italic">Yellow Sea</text>
      <text x="310" y="140" fill="var(--text-dim)" fontSize="11" fontStyle="italic">East Sea</text>
    </svg>
  );
}

// Korea to China Flight Map Component
function KoreaChinaFlightMap() {
  return (
    <svg className="map-svg" viewBox="0 0 500 350" preserveAspectRatio="xMidYMid meet">
      {/* China outline */}
      <path className="country-path highlight" d="
        M 20 30
        C 40 25, 80 20, 120 30
        C 160 40, 180 60, 190 90
        C 200 120, 195 150, 185 180
        C 175 210, 160 240, 140 265
        C 120 290, 95 305, 70 310
        C 45 315, 25 310, 20 290
        C 15 270, 15 240, 20 210
        C 25 180, 30 150, 30 120
        C 30 90, 25 60, 20 30
        Z
      "/>
      <text x="90" y="170" fill="var(--text)" fontSize="16" fontWeight="600">CHINA</text>
      
      {/* Yellow Sea */}
      <text x="200" y="200" fill="var(--accent)" fontSize="12" fontStyle="italic" opacity="0.6">Yellow Sea</text>
      
      {/* South Korea */}
      <path className="country-path origin" d="
        M 330 80
        C 345 75, 360 80, 375 85
        C 390 90, 400 100, 405 115
        C 410 130, 412 150, 408 170
        C 404 190, 395 215, 382 240
        C 369 265, 352 285, 332 295
        C 312 305, 290 300, 275 288
        C 260 276, 252 258, 248 238
        C 244 218, 248 195, 256 175
        C 264 155, 277 135, 293 118
        C 309 101, 322 85, 330 80
        Z
      "/>
      <text x="320" y="185" fill="var(--text)" fontSize="14" fontWeight="600">KOREA</text>
      
      {/* Seoul marker */}
      <circle className="location-pulse" cx="340" cy="118" r="6">
        <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle className="city-marker" cx="340" cy="118" r="5"/>
      <text className="city-label" x="350" y="112" fontSize="11">Seoul</text>
      
      {/* Chinese destination */}
      <circle cx="150" cy="180" r="5" fill="var(--accent2)" opacity="0.8"/>
      <text x="115" y="200" fill="var(--text-dim)" fontSize="10">
        <tspan x="115" dy="0">Destination</tspan>
        <tspan x="115" dy="12">Unknown</tspan>
      </text>
      
      {/* Flight path (animated) */}
      <path className="flight-path" d="
        M 340 118
        Q 250 100 200 140
        Q 170 160 150 180
      ">
        <animate 
          attributeName="stroke-dashoffset" 
          from="1000" 
          to="0" 
          dur="2s" 
          fill="freeze"
          begin="0.3s"
        />
      </path>
      
      {/* Arrow head */}
      <polygon className="flight-arrow" points="150,180 158,172 162,182 152,186">
        <animate 
          attributeName="opacity" 
          from="0" 
          to="1" 
          dur="0.3s" 
          fill="freeze"
          begin="2s"
        />
      </polygon>
      
      {/* Distance */}
      <text x="240" y="90" fill="var(--accent2)" fontSize="11" fontWeight="600">~800 km</text>
    </svg>
  );
}

// Map Slide Component
function MapSlide({ slide }: { slide: Slide }) {
  return (
    <div className="map-slide">
      <h2 className="slide-subtitle mb-2">{slide.title}</h2>
      <p className="slide-subtitle" style={{ fontSize: '14px', marginBottom: '20px' }}>{slide.subtitle}</p>
      <div className="map-container">
        {slide.mapType === 'korea-location' && <KoreaLocationMap />}
        {slide.mapType === 'korea-china-flight' && <KoreaChinaFlightMap />}
      </div>
    </div>
  );
}

// Mobile Attack Stage - Card-based vertical flow
function MobileAttackStage({ stage }: { stage: number }) {
  const stages = [
    { icon: '💾', from: 'USB Drive', to: '💻', toLabel: 'Engineer PC', title: 'USB INSERTION', desc: 'Infected USB planted by contractor' },
    { icon: '💻', from: 'Engineer PC', to: '🌐', toLabel: 'Air-Gapped Network', title: 'INITIAL INFECTION', desc: 'Worm exploits Windows zero-days' },
    { icon: '🌐', from: 'Network', to: '🖥️', toLabel: 'SCADA System', title: 'NETWORK SPREAD', desc: 'Propagates through shared drives' },
    { icon: '🖥️', from: 'SCADA', to: '⚙️', toLabel: 'Siemens PLC', title: 'SCADA COMPROMISE', desc: 'Targets WinCC/Step 7 software' },
    { icon: '⚙️', from: 'PLC', to: '☢️', toLabel: 'Centrifuges', title: 'PAYLOAD DELIVERY', desc: 'Injects malicious code into PLCs' },
  ];
  
  const current = stages[stage];
  
  return (
    <div className="mobile-attack">
      <div className="mobile-attack-header">
        <span className="mobile-stage-num">STAGE {stage + 1}/5</span>
        <h3 className="mobile-stage-title">{current.title}</h3>
      </div>
      
      <div className="mobile-attack-visual">
        <div className="mobile-node source">
          <span className="mobile-node-icon">{current.icon}</span>
          <span className="mobile-node-label">{current.from}</span>
        </div>
        
        <div className="mobile-arrow">
          <div className="mobile-arrow-line" />
          <div className="mobile-arrow-pulse" />
          <span className="mobile-arrow-icon">▼</span>
        </div>
        
        <div className="mobile-node target">
          <span className="mobile-node-icon">{current.to}</span>
          <span className="mobile-node-label">{current.toLabel}</span>
        </div>
      </div>
      
      <p className="mobile-stage-desc">{current.desc}</p>
      
      <div className="mobile-progress">
        {stages.map((_, i) => (
          <div key={i} className={`mobile-progress-dot ${i <= stage ? 'active' : ''} ${i === stage ? 'current' : ''}`} />
        ))}
      </div>
    </div>
  );
}

// Desktop Attack Stage - Network diagram with packet animation
function DesktopAttackStage({ stage }: { stage: number }) {
  const [packetProgress, setPacketProgress] = useState(0);
  const prevStageRef = useRef(stage);
  
  useEffect(() => {
    if (prevStageRef.current !== stage) {
      setPacketProgress(0);
      prevStageRef.current = stage;
    }
    const interval = setInterval(() => {
      setPacketProgress(p => Math.min(1, p + 0.015));
    }, 30);
    return () => clearInterval(interval);
  }, [stage]);
  
  const nodes = [
    { id: 'usb', label: 'USB Drive', x: 6, y: 70, icon: '💾' },
    { id: 'laptop', label: 'Engineer PC', x: 23, y: 30, icon: '💻' },
    { id: 'network', label: 'Air-Gapped', x: 41, y: 70, icon: '🌐' },
    { id: 'scada', label: 'SCADA', x: 59, y: 30, icon: '🖥️' },
    { id: 'plc', label: 'PLC', x: 77, y: 70, icon: '⚙️' },
    { id: 'centrifuge', label: 'Centrifuges', x: 94, y: 30, icon: '☢️' },
  ];
  
  const stageInfo = [
    { title: "USB INSERTION", desc: "Infected USB planted by contractor", from: 0, to: 1 },
    { title: "INITIAL INFECTION", desc: "Worm exploits Windows zero-days", from: 1, to: 2 },
    { title: "NETWORK SPREAD", desc: "Propagates through shared drives", from: 2, to: 3 },
    { title: "SCADA COMPROMISE", desc: "Targets WinCC/Step 7 software", from: 3, to: 4 },
    { title: "PAYLOAD DELIVERY", desc: "Injects malicious code into PLCs", from: 4, to: 5 },
  ];
  
  const currentStage = stageInfo[stage] || stageInfo[0];
  const fromNode = nodes[currentStage.from];
  const toNode = nodes[currentStage.to];
  
  const packetX = fromNode.x + (toNode.x - fromNode.x) * packetProgress;
  const packetY = fromNode.y + (toNode.y - fromNode.y) * packetProgress;
  
  return (
    <div className="attack-flow">
      <div className="attack-header">
        <span className="attack-stage-num">STAGE {stage + 1}/5</span>
        <h3 className="attack-stage-title">{currentStage.title}</h3>
        <p className="attack-stage-desc">{currentStage.desc}</p>
      </div>
      
      <div className="attack-diagram">
        <svg className="attack-paths" viewBox="0 0 100 100" preserveAspectRatio="none">
          {nodes.slice(0, -1).map((node, i) => {
            const next = nodes[i + 1];
            const isActive = i <= stage;
            const isCurrent = i === stage;
            return (
              <line
                key={i}
                x1={node.x}
                y1={node.y}
                x2={next.x}
                y2={next.y}
                className={`attack-path-line ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}
              />
            );
          })}
        </svg>
        
        <div
          className="attack-packet"
          style={{
            left: `${packetX}%`,
            top: `${packetY}%`,
          }}
        />
        
        {nodes.map((node, i) => {
          const isInfected = i <= stage;
          const isTarget = i === stage + 1;
          const isSource = i === stage;
          return (
            <div
              key={node.id}
              className={`attack-node ${isInfected ? 'infected' : ''} ${isTarget ? 'target' : ''} ${isSource ? 'source' : ''}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
            >
              <span className="attack-node-icon">{node.icon}</span>
              <span className="attack-node-label">{node.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Compact Attack Stage for small 16:9 viewports
function CompactAttackStage({ stage }: { stage: number }) {
  const stages = [
    { icon: '💾', label: 'USB → PC', title: 'USB INSERTION' },
    { icon: '💻', label: 'PC → Network', title: 'INITIAL INFECTION' },
    { icon: '🌐', label: 'Network → SCADA', title: 'NETWORK SPREAD' },
    { icon: '🖥️', label: 'SCADA → PLC', title: 'SCADA COMPROMISE' },
    { icon: '⚙️', label: 'PLC → Target', title: 'PAYLOAD DELIVERY' },
  ];
  
  const current = stages[stage];
  
  return (
    <div className="compact-attack">
      <div className="compact-stage-badge">STAGE {stage + 1}/5</div>
      <div className="compact-icon">{current.icon}</div>
      <div className="compact-title">{current.title}</div>
      <div className="compact-flow">{current.label}</div>
      <div className="compact-dots">
        {stages.map((_, i) => (
          <span key={i} className={`compact-dot ${i <= stage ? 'active' : ''} ${i === stage ? 'current' : ''}`} />
        ))}
      </div>
    </div>
  );
}

// Wrapper component that chooses between mobile and desktop layouts
function AttackStage({ stage, isMobile = false, isCompact = false }: { stage: number; isMobile?: boolean; isCompact?: boolean }) {
  if (isMobile) {
    return <MobileAttackStage stage={stage} />;
  }
  if (isCompact) {
    return <CompactAttackStage stage={stage} />;
  }
  return <DesktopAttackStage stage={stage} />;
}

// Particle Network Background Component
function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;
    let particles: Array<{x: number, y: number, vx: number, vy: number}> = [];
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    const init = () => {
      resize();
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
        ctx.fill();
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    init();
    animate();
    window.addEventListener('resize', init);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', init);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="particle-canvas" />;
}

export default function Home() {
  const [currentStory, setCurrentStory] = useState<string>("stuxnet");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ratio, setRatio] = useState<"16:9" | "9:16">("16:9");
  const [animationKey, setAnimationKey] = useState(0);
  const [isSmallViewport, setIsSmallViewport] = useState(false);
  
  const story = stories[currentStory];
  
  // Detect small viewport for compact mode
  useEffect(() => {
    const checkSize = () => {
      setIsSmallViewport(window.innerWidth < 500);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < story.slides.length) {
      const prevSlide = story.slides[currentSlide];
      const nextSlide = story.slides[index];
      if (prevSlide.type !== nextSlide.type) {
        setAnimationKey(prev => prev + 1);
      }
      setCurrentSlide(index);
    }
  }, [currentSlide, story.slides]);

  const switchStory = useCallback((storyId: string) => {
    setCurrentStory(storyId);
    setCurrentSlide(0);
    setAnimationKey(prev => prev + 1);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goToSlide(currentSlide + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, goToSlide]);

  const renderSlide = (slide: Slide, index: number) => {
    if (index !== currentSlide) return null;

    switch (slide.type) {
      case "title":
        return (
          <div className="slide-content" key={animationKey}>
            <h1 className="slide-title">{slide.title}</h1>
            <p className="slide-subtitle">{slide.subtitle}</p>
          </div>
        );

      case "text":
        return (
          <div className="slide-content" key={animationKey}>
            <p className="slide-text" dangerouslySetInnerHTML={{ __html: slide.content || "" }} />
            {slide.subtext && <p className="slide-subtitle mt-5">{slide.subtext}</p>}
          </div>
        );

      case "bigNumber":
        return (
          <div className="slide-content" key={animationKey}>
            <div className="big-number">{slide.number}</div>
            <p className="big-label">{slide.label}</p>
          </div>
        );

      case "stats":
        return (
          <div className="slide-content" key={animationKey}>
            <div className="stat-grid">
              {slide.items?.map((item, i) => (
                <div key={i} className="stat-card" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="stat-value">{item.value}</div>
                  <div className="stat-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "attackTree":
        return (
          <div className="slide-content" key={animationKey}>
            <div className="attack-tree">
              <div className="tree-level">
                <div className="tree-node root">{slide.root}</div>
              </div>
              {slide.phases?.map((phase, pi) => (
                <div key={pi}>
                  <div className="tree-connector" />
                  <div className="tree-level">
                    {phase.map((node, ni) => (
                      <div 
                        key={ni} 
                        className="tree-node phase"
                        style={{ animationDelay: `${(pi * 0.3) + (ni * 0.1)}s` }}
                      >
                        {node}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "network":
        return (
          <div className="slide-content" key={animationKey}>
            <h2 className="slide-subtitle mb-6">{slide.title}</h2>
            <div className="flow-diagram">
              {slide.nodes?.map((node, i) => (
                <div key={i} className="flow-item" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className={`flow-node ${node.infected ? "infected" : ""}`}>
                    {node.label}
                  </div>
                  {i < (slide.nodes?.length || 0) - 1 && (
                    <div className="flow-arrow">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "attackFlow":
        return (
          <div className="slide-content attack-flow-slide" key={animationKey}>
            <AttackStage stage={slide.stage || 0} isMobile={ratio === "9:16"} isCompact={ratio === "16:9" && isSmallViewport} />
          </div>
        );

      case "timeline":
        return (
          <div className="slide-content" key={animationKey}>
            <h2 className="slide-subtitle mb-6">{slide.title}</h2>
            <div className="timeline">
              {slide.events?.map((event, i) => (
                <div 
                  key={i} 
                  className="timeline-item"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="timeline-year">{event.year}</div>
                  <div className="timeline-text">{event.text}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "code":
        return (
          <div className="slide-content" key={animationKey}>
            <h2 className="slide-subtitle mb-5">{slide.title}</h2>
            <div className="code-block">
              {slide.lines?.map((line, i) => (
                <div 
                  key={i} 
                  className="code-line"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {line.type === "comment" ? (
                    <span className="code-comment">{line.text}</span>
                  ) : (
                    line.text || "\u00A0"
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "map":
        return (
          <div className="slide-content" key={animationKey}>
            <MapSlide slide={slide} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="player-container">
      {/* Story Selector */}
      <div className="story-selector">
        <select 
          value={currentStory} 
          onChange={(e) => switchStory(e.target.value)}
        >
          <option value="stuxnet">🦠 Stuxnet</option>
          <option value="coupang">🛒 Coupang Breach</option>
        </select>
      </div>
      
      {/* Ratio Controls */}
      <div className="controls">
        <button
          className={ratio === "16:9" ? "active" : ""}
          onClick={() => setRatio("16:9")}
        >
          16:9
        </button>
        <button
          className={ratio === "9:16" ? "active" : ""}
          onClick={() => setRatio("9:16")}
        >
          9:16
        </button>
      </div>

      {/* Stage */}
      <div className={`stage ${ratio === "16:9" ? "ratio-16-9" : "ratio-9-16"}`}>
        <ParticleNetwork />
        <div className="slide active">
          {renderSlide(story.slides[currentSlide], currentSlide)}
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <button
          className="nav-btn"
          onClick={() => goToSlide(currentSlide - 1)}
          disabled={currentSlide === 0}
        >
          ←
        </button>
        <div className="progress">
          <span>{currentSlide + 1}</span> / <span>{story.slides.length}</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentSlide + 1) / story.slides.length) * 100}%` }}
          />
        </div>
        <button
          className="nav-btn"
          onClick={() => goToSlide(currentSlide + 1)}
          disabled={currentSlide === story.slides.length - 1}
        >
          →
        </button>
      </nav>
    </div>
  );
}
