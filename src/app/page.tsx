"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import type L from "leaflet";
import "leaflet/dist/leaflet.css";
import { 
  USBIcon, LaptopIcon, NetworkIcon, SCADAIcon, PLCIcon, CentrifugeIcon,
  ReconIcon, ListenerIcon, CraftIcon, DeliverIcon, ExecuteIcon, ConnectIcon, ShellIcon, PwnedIcon,
  AttackerIcon, VictimIcon, FirewallIcon
} from "@/components/StageIcons";

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Icon component mapping for attack stages
const IconComponents: Record<string, React.ComponentType<{ size?: number; infected?: boolean; className?: string }>> = {
  usb: USBIcon,
  laptop: LaptopIcon,
  network: NetworkIcon,
  scada: SCADAIcon,
  plc: PLCIcon,
  centrifuge: CentrifugeIcon,
};

// Reverse Shell icon components
const RSIconComponents: Record<string, React.ComponentType<{ size?: number; infected?: boolean; className?: string }>> = {
  recon: ReconIcon,
  listen: ListenerIcon,
  craft: CraftIcon,
  deliver: DeliverIcon,
  execute: ExecuteIcon,
  connect: ConnectIcon,
  shell: ShellIcon,
  pwned: PwnedIcon,
};

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
  delay?: number;
}

interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'comment' | 'prompt' | 'error' | 'success';
  delay?: number;
}

interface TerminalConfig {
  title: string;
  lines: TerminalLine[];
  side?: 'attacker' | 'victim';
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
  terminals?: TerminalConfig[];
  transition?: 'fade' | 'slide-right' | 'slide-left' | 'slide-up' | 'scale' | 'scale-up' | 'glitch' | 'wipe';
}

interface Story {
  id: string;
  title: string;
  subtitle: string;
  slides: Slide[];
}

// All Stories
const stories: Record<string, Story> = {
  reverseShell: {
    id: "reverseShell",
    title: "Reverse Shell",
    subtitle: "How Hackers Get Remote Access",
    slides: [
      {
        type: "hackerTitle",
        title: "REVERSE_SHELL",
        subtitle: "// How hackers bypass your firewall",
        transition: "glitch"
      },
      {
        type: "hackerText",
        content: "What if the <span class='glow-red'>victim</span> connects to <span class='glow-green'>you</span>?",
        subtext: "The attacker never touches the firewall.",
        transition: "fade"
      },
      {
        type: "hackerText",
        content: "Firewalls block <span class='glow-red'>INBOUND</span>",
        subtext: "But outbound? That's usually trusted...",
        transition: "slide-right"
      },
      {
        type: "hackerText",
        content: "<span class='glow-green'>REVERSE SHELL</span>",
        subtext: "Target initiates. Firewall allows. Attacker wins.",
        transition: "scale-up"
      },
      { type: "hackerStage", stage: 0, transition: "wipe" },
      { type: "hackerStage", stage: 1, transition: "slide-right" },
      { type: "hackerStage", stage: 2, transition: "slide-right" },
      { type: "hackerStage", stage: 3, transition: "slide-right" },
      { type: "hackerStage", stage: 4, transition: "glitch" },
      { type: "hackerStage", stage: 5, transition: "slide-left" },
      { type: "hackerStage", stage: 6, transition: "scale" },
      { type: "hackerStage", stage: 7, transition: "glitch" },
      {
        type: "hackerTerminal",
        title: "LIVE ATTACK",
        transition: "scale",
        lines: [
          { text: "root@kali:~# ", type: "prompt" },
          { text: "listener --port 4444", type: "command" },
          { text: "[*] Listening on 0.0.0.0:4444...", type: "output", delay: 600 },
          { text: "[+] Connection from 10.10.10.50:52413", type: "success", delay: 1200 },
          { text: "[+] Shell session established!", type: "success", delay: 400 },
          { text: "", type: "output", delay: 200 },
          { text: "target$ ", type: "prompt", delay: 300 },
          { text: "whoami", type: "command" },
          { text: "www-data", type: "output", delay: 500 },
          { text: "target$ ", type: "prompt", delay: 200 },
          { text: "hostname", type: "command" },
          { text: "PROD-WEB-01", type: "output", delay: 500 },
          { text: "target$ ", type: "prompt", delay: 200 },
          { text: "id", type: "command" },
          { text: "uid=33(www-data) gid=33(www-data)", type: "output", delay: 500 }
        ]
      },
      {
        type: "hackerStats",
        title: "COMMON PORTS",
        transition: "slide-up",
        items: [
          { value: "4444", label: "Classic Port" },
          { value: "443", label: "Looks like HTTPS" },
          { value: "53", label: "Looks like DNS" },
          { value: "80", label: "Looks like HTTP" }
        ]
      },
      {
        type: "hackerCode",
        title: "THE MECHANISM",
        transition: "wipe",
        lines: [
          { text: "// What happens on the victim:", type: "comment" },
          { text: "", type: "normal" },
          { text: "1. CREATE socket connection", type: "normal" },
          { text: "2. CONNECT to attacker IP:PORT", type: "normal" },
          { text: "3. REDIRECT stdin  → socket", type: "normal" },
          { text: "4. REDIRECT stdout → socket", type: "normal" },
          { text: "5. SPAWN /bin/sh", type: "normal" },
          { text: "", type: "normal" },
          { text: "// Attacker types. Victim executes.", type: "comment" }
        ]
      },
      {
        type: "hackerText",
        content: "<span class='glow-amber'>DEFENSE</span>",
        subtext: "Monitor outbound connections. Egress filtering. EDR.",
        transition: "fade"
      },
      {
        type: "hackerTitle",
        title: "ACCESS_GRANTED",
        subtitle: "// Victim connects out • Firewall bypassed • Game over",
        transition: "glitch"
      }
    ]
  },
  
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

// Dynamic import for Leaflet components (no SSR)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const Circle = dynamic(
  () => import("react-leaflet").then((mod) => mod.Circle),
  { ssr: false }
);
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);

// Custom marker icon (fixes default Leaflet icon issue in Next.js)
function useLeafletIcon() {
  const [icon, setIcon] = useState<L.Icon | null>(null);
  
  useEffect(() => {
    import("leaflet").then((L) => {
      const customIcon = new L.Icon({
        iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff3366'%3E%3Ccircle cx='12' cy='12' r='10' stroke='%23fff' stroke-width='2'/%3E%3C/svg%3E",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12],
      });
      setIcon(customIcon);
    });
  }, []);
  
  return icon;
}

// Korea Location Map using Leaflet
function KoreaLocationMap() {
  const [mounted, setMounted] = useState(false);
  const icon = useLeafletIcon();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className="leaflet-loading">Loading map...</div>;
  }
  
  // Coupang HQ coordinates (Songpa District, Seoul)
  const coupangHQ: [number, number] = [37.5045, 127.0245];
  
  return (
    <div className="leaflet-container-wrapper">
      <MapContainer
        center={coupangHQ}
        zoom={12}
        className="leaflet-map"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {icon && (
          <Marker position={coupangHQ} icon={icon}>
            <Popup className="custom-popup">
              <div className="popup-content">
                <strong>🏢 Coupang HQ</strong>
                <br />
                <span>Songpa District, Seoul</span>
                <br />
                <small>Ground zero of the breach</small>
              </div>
            </Popup>
          </Marker>
        )}
        <Circle
          center={coupangHQ}
          radius={2000}
          pathOptions={{
            color: "#ff3366",
            fillColor: "#ff3366",
            fillOpacity: 0.15,
            weight: 2,
          }}
        />
      </MapContainer>
      <div className="map-label">
        <span className="map-label-icon">📍</span>
        <span>Coupang HQ • Seoul, South Korea</span>
      </div>
    </div>
  );
}

// Korea to China Flight Map using Leaflet
function KoreaChinaFlightMap() {
  const [mounted, setMounted] = useState(false);
  const [iconOrigin, setIconOrigin] = useState<L.Icon | null>(null);
  const [iconDest, setIconDest] = useState<L.Icon | null>(null);
  
  useEffect(() => {
    setMounted(true);
    import("leaflet").then((L) => {
      setIconOrigin(new L.Icon({
        iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2300f0ff'%3E%3Ccircle cx='12' cy='12' r='10' stroke='%23fff' stroke-width='2'/%3E%3C/svg%3E",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10],
      }));
      setIconDest(new L.Icon({
        iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff3366'%3E%3Ccircle cx='12' cy='12' r='10' stroke='%23fff' stroke-width='2'/%3E%3C/svg%3E",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10],
      }));
    });
  }, []);
  
  if (!mounted) {
    return <div className="leaflet-loading">Loading map...</div>;
  }
  
  // Coordinates
  const seoul: [number, number] = [37.5665, 126.9780];
  const qingdao: [number, number] = [36.0671, 120.3826]; // Possible destination
  const flightPath: [number, number][] = [
    seoul,
    [37.2, 124.5], // Over Yellow Sea
    [36.5, 122.5], // Curve point
    qingdao
  ];
  
  return (
    <div className="leaflet-container-wrapper">
      <MapContainer
        center={[36.5, 123]}
        zoom={5}
        className="leaflet-map"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {iconOrigin && (
          <Marker position={seoul} icon={iconOrigin}>
            <Popup className="custom-popup">
              <div className="popup-content">
                <strong>✈️ Seoul</strong>
                <br />
                <span>Point of departure</span>
              </div>
            </Popup>
          </Marker>
        )}
        {iconDest && (
          <Marker position={qingdao} icon={iconDest}>
            <Popup className="custom-popup">
              <div className="popup-content">
                <strong>❓ Destination Unknown</strong>
                <br />
                <span>Somewhere in China</span>
              </div>
            </Popup>
          </Marker>
        )}
        <Polyline
          positions={flightPath}
          pathOptions={{
            color: "#ff3366",
            weight: 3,
            opacity: 0.8,
            dashArray: "10, 5",
          }}
        />
      </MapContainer>
      <div className="map-label flight">
        <span className="map-label-icon">✈️</span>
        <span>Seoul → China • ~550 km</span>
      </div>
    </div>
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

// Mobile Attack Stage - Card-based vertical flow with custom SVGs
function MobileAttackStage({ stage }: { stage: number }) {
  const [lottieData, setLottieData] = useState<object | null>(null);
  
  useEffect(() => {
    fetch('/animations/data-packet.json')
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(() => {});
  }, []);
  
  const stages = useMemo(() => [
    { iconType: 'usb', from: 'USB Drive', toIcon: 'laptop', toLabel: 'Engineer PC', title: 'USB INSERTION', desc: 'Infected USB planted by contractor' },
    { iconType: 'laptop', from: 'Engineer PC', toIcon: 'network', toLabel: 'Air-Gapped Network', title: 'INITIAL INFECTION', desc: 'Worm exploits Windows zero-days' },
    { iconType: 'network', from: 'Network', toIcon: 'scada', toLabel: 'SCADA System', title: 'NETWORK SPREAD', desc: 'Propagates through shared drives' },
    { iconType: 'scada', from: 'SCADA', toIcon: 'plc', toLabel: 'Siemens PLC', title: 'SCADA COMPROMISE', desc: 'Targets WinCC/Step 7 software' },
    { iconType: 'plc', from: 'PLC', toIcon: 'centrifuge', toLabel: 'Centrifuges', title: 'PAYLOAD DELIVERY', desc: 'Injects malicious code into PLCs' },
  ], []);
  
  const current = stages[stage];
  const SourceIcon = IconComponents[current.iconType];
  const TargetIcon = IconComponents[current.toIcon];
  
  return (
    <div className="mobile-attack">
      <div className="mobile-attack-header">
        <span className="mobile-stage-num">STAGE {stage + 1}/5</span>
        <h3 className="mobile-stage-title">{current.title}</h3>
      </div>
      
      <div className="mobile-attack-visual">
        <div className="mobile-node source">
          <div className="mobile-node-icon-svg">
            {SourceIcon && <SourceIcon size={56} infected={true} />}
          </div>
          <span className="mobile-node-label">{current.from}</span>
        </div>
        
        <div className="mobile-arrow">
          <div className="mobile-arrow-line" />
          <div className="mobile-arrow-lottie">
            {lottieData ? (
              <Lottie 
                animationData={lottieData} 
                loop 
                style={{ width: 32, height: 32 }}
              />
            ) : (
              <div className="mobile-arrow-pulse" />
            )}
          </div>
          <span className="mobile-arrow-icon">▼</span>
        </div>
        
        <div className="mobile-node target">
          <div className="mobile-node-icon-svg">
            {TargetIcon && <TargetIcon size={56} infected={false} />}
          </div>
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

// Desktop Attack Stage - Network diagram with Lottie packet animation
function DesktopAttackStage({ stage }: { stage: number }) {
  const [packetProgress, setPacketProgress] = useState(0);
  const [lottieData, setLottieData] = useState<object | null>(null);
  const prevStageRef = useRef(stage);
  const animationRef = useRef<HTMLDivElement>(null);
  
  // Load Lottie animation data
  useEffect(() => {
    fetch('/animations/data-packet.json')
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(() => console.log('Lottie animation not loaded'));
  }, []);
  
  useEffect(() => {
    if (prevStageRef.current !== stage) {
      setPacketProgress(0);
      prevStageRef.current = stage;
    }
    // Eased animation progress using requestAnimationFrame
    let startTime: number | null = null;
    const duration = 2500; // 2.5 seconds for smoother animation
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-in-out cubic for smooth movement
      const eased = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      setPacketProgress(eased);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [stage]);
  
  const nodes = useMemo(() => [
    { id: 'usb', label: 'USB Drive', x: 6, y: 70, iconType: 'usb' },
    { id: 'laptop', label: 'Engineer PC', x: 23, y: 30, iconType: 'laptop' },
    { id: 'network', label: 'Air-Gapped', x: 41, y: 70, iconType: 'network' },
    { id: 'scada', label: 'SCADA', x: 59, y: 30, iconType: 'scada' },
    { id: 'plc', label: 'PLC', x: 77, y: 70, iconType: 'plc' },
    { id: 'centrifuge', label: 'Centrifuges', x: 94, y: 30, iconType: 'centrifuge' },
  ], []);
  
  const stageInfo = useMemo(() => [
    { title: "USB INSERTION", desc: "Infected USB planted by contractor", from: 0, to: 1 },
    { title: "INITIAL INFECTION", desc: "Worm exploits Windows zero-days", from: 1, to: 2 },
    { title: "NETWORK SPREAD", desc: "Propagates through shared drives", from: 2, to: 3 },
    { title: "SCADA COMPROMISE", desc: "Targets WinCC/Step 7 software", from: 3, to: 4 },
    { title: "PAYLOAD DELIVERY", desc: "Injects malicious code into PLCs", from: 4, to: 5 },
  ], []);
  
  const currentStage = stageInfo[stage] || stageInfo[0];
  const fromNode = nodes[currentStage.from];
  const toNode = nodes[currentStage.to];
  
  // Calculate packet position with bezier curve for more natural movement
  const midX = (fromNode.x + toNode.x) / 2;
  const midY = Math.min(fromNode.y, toNode.y) - 15; // Arc above the direct line
  
  // Quadratic bezier interpolation
  const t = packetProgress;
  const packetX = (1-t)*(1-t)*fromNode.x + 2*(1-t)*t*midX + t*t*toNode.x;
  const packetY = (1-t)*(1-t)*fromNode.y + 2*(1-t)*t*midY + t*t*toNode.y;
  
  return (
    <div className="attack-flow">
      <div className="attack-header">
        <span className="attack-stage-num">STAGE {stage + 1}/5</span>
        <h3 className="attack-stage-title">{currentStage.title}</h3>
        <p className="attack-stage-desc">{currentStage.desc}</p>
      </div>
      
      <div className="attack-diagram">
        <svg className="attack-paths" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pathGradActive" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ff3366" stopOpacity="0.6" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {nodes.slice(0, -1).map((node, i) => {
            const next = nodes[i + 1];
            const isActive = i <= stage;
            const isCurrent = i === stage;
            const midPtX = (node.x + next.x) / 2;
            const midPtY = Math.min(node.y, next.y) - 15;
            return (
              <g key={i}>
                {/* Curved path using quadratic bezier */}
                <path
                  d={`M ${node.x} ${node.y} Q ${midPtX} ${midPtY} ${next.x} ${next.y}`}
                  className={`attack-path-curve ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}
                  fill="none"
                />
                {/* Animated dash for current path */}
                {isCurrent && (
                  <path
                    d={`M ${node.x} ${node.y} Q ${midPtX} ${midPtY} ${next.x} ${next.y}`}
                    className="attack-path-animated"
                    fill="none"
                  />
                )}
              </g>
            );
          })}
        </svg>
        
        {/* Lottie animated packet */}
        <div
          ref={animationRef}
          className="attack-packet-lottie"
          style={{
            left: `${packetX}%`,
            top: `${packetY}%`,
            transform: 'translate(-50%, -50%)',
            opacity: packetProgress > 0 && packetProgress < 1 ? 1 : 0.5,
          }}
        >
          {lottieData ? (
            <Lottie 
              animationData={lottieData} 
              loop 
              style={{ width: 'clamp(24px, 5vmin, 50px)', height: 'clamp(24px, 5vmin, 50px)' }}
            />
          ) : (
            <div className="attack-packet-fallback" />
          )}
        </div>
        
        {nodes.map((node, i) => {
          const isInfected = i <= stage;
          const isTarget = i === stage + 1;
          const isSource = i === stage;
          const IconComponent = IconComponents[node.iconType];
          return (
            <div
              key={node.id}
              className={`attack-node-svg ${isInfected ? 'infected' : ''} ${isTarget ? 'target' : ''} ${isSource ? 'source' : ''}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
            >
              <div className="attack-node-icon-wrapper">
                {IconComponent && <IconComponent size={48} infected={isInfected} />}
              </div>
              <span className="attack-node-label">{node.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Terminal Component with typing animation
function Terminal({ config, isActive }: { config: TerminalConfig; isActive: boolean }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typingIndex, setTypingIndex] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>("");
  
  useEffect(() => {
    if (!isActive) {
      setVisibleLines(0);
      setTypingIndex(0);
      setCurrentText("");
      return;
    }
    
    const lines = config.lines;
    if (visibleLines >= lines.length) return;
    
    const currentLine = lines[visibleLines];
    const fullText = currentLine.text;
    const delay = currentLine.delay || 0;
    
    // If it's a command type, type it character by character
    if (currentLine.type === 'command' && typingIndex < fullText.length) {
      const timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, typingIndex + 1));
        setTypingIndex(prev => prev + 1);
      }, 30 + Math.random() * 40);
      return () => clearTimeout(timer);
    }
    
    // When typing is complete or it's not a command, show full line and move to next
    if (currentLine.type !== 'command' || typingIndex >= fullText.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
        setTypingIndex(0);
        setCurrentText("");
      }, currentLine.type === 'command' ? 200 : delay + 100);
      return () => clearTimeout(timer);
    }
  }, [isActive, visibleLines, typingIndex, config.lines]);
  
  return (
    <div className={`terminal ${config.side || 'default'}`}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-btn red" />
          <span className="terminal-btn yellow" />
          <span className="terminal-btn green" />
        </div>
        <span className="terminal-title">{config.title}</span>
      </div>
      <div className="terminal-body">
        {config.lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={`terminal-line ${line.type}`}>
            {line.text}
          </div>
        ))}
        {visibleLines < config.lines.length && config.lines[visibleLines].type === 'command' && (
          <div className={`terminal-line ${config.lines[visibleLines].type}`}>
            {config.lines[visibleLines - 1]?.type === 'prompt' ? '' : ''}
            {currentText}
            <span className="cursor">▊</span>
          </div>
        )}
        {visibleLines < config.lines.length && config.lines[visibleLines].type === 'prompt' && (
          <div className="terminal-line prompt">
            {config.lines[visibleLines].text}
            <span className="cursor">▊</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Terminal Slide Component
function TerminalSlide({ slide }: { slide: Slide }) {
  return (
    <div className="terminal-slide">
      <h2 className="slide-subtitle mb-4">{slide.title}</h2>
      <div className={`terminals-container ${slide.terminals?.length === 2 ? 'dual' : 'single'}`}>
        {slide.terminals?.map((terminal, i) => (
          <Terminal key={i} config={terminal} isActive={true} />
        ))}
      </div>
    </div>
  );
}

// Reverse Shell Flow - shows the connection stages
function ReverseShellFlow({ stage, isMobile = false }: { stage: number; isMobile?: boolean }) {
  const [packetProgress, setPacketProgress] = useState(0);
  const prevStageRef = useRef(stage);
  
  useEffect(() => {
    if (prevStageRef.current !== stage) {
      setPacketProgress(0);
      prevStageRef.current = stage;
    }
    const interval = setInterval(() => {
      setPacketProgress(p => Math.min(1, p + 0.02));
    }, 30);
    return () => clearInterval(interval);
  }, [stage]);
  
  const stages = [
    { 
      title: "ATTACKER LISTENS", 
      desc: "Opens a port and waits for incoming connection",
      attacker: { icon: '🎧', label: 'Listening', status: 'waiting' },
      victim: { icon: '💻', label: 'Target', status: 'normal' },
      direction: 'none'
    },
    { 
      title: "PAYLOAD DELIVERED", 
      desc: "Malicious code reaches the victim (phishing, exploit, etc.)",
      attacker: { icon: '🎧', label: 'Listening', status: 'waiting' },
      victim: { icon: '📧', label: 'Payload', status: 'infected' },
      direction: 'to-victim'
    },
    { 
      title: "VICTIM EXECUTES", 
      desc: "Victim unknowingly runs the reverse shell payload",
      attacker: { icon: '🎧', label: 'Listening', status: 'waiting' },
      victim: { icon: '💥', label: 'Executing', status: 'infected' },
      direction: 'none'
    },
    { 
      title: "CONNECTION ESTABLISHED", 
      desc: "Victim connects OUTBOUND to attacker — Shell access granted!",
      attacker: { icon: '🖥️', label: 'Shell!', status: 'success' },
      victim: { icon: '🔓', label: 'Compromised', status: 'infected' },
      direction: 'to-attacker'
    }
  ];
  
  const current = stages[stage];
  
  if (isMobile) {
    return (
      <div className="mobile-attack reverse-shell">
        <div className="mobile-attack-header">
          <span className="mobile-stage-num">STAGE {stage + 1}/4</span>
          <h3 className="mobile-stage-title">{current.title}</h3>
        </div>
        
        <div className="reverse-shell-visual-mobile">
          <div className={`rs-node ${current.attacker.status}`}>
            <span className="rs-icon">{current.attacker.icon}</span>
            <span className="rs-label">ATTACKER</span>
            <span className="rs-status">{current.attacker.label}</span>
          </div>
          
          {current.direction !== 'none' && (
            <div className={`rs-arrow ${current.direction}`}>
              <div className="rs-arrow-line" />
              <div className="rs-packet" style={{ 
                animationDirection: current.direction === 'to-attacker' ? 'reverse' : 'normal' 
              }} />
              <span className="rs-arrow-icon">{current.direction === 'to-attacker' ? '▲' : '▼'}</span>
            </div>
          )}
          {current.direction === 'none' && <div className="rs-spacer" />}
          
          <div className={`rs-node ${current.victim.status}`}>
            <span className="rs-icon">{current.victim.icon}</span>
            <span className="rs-label">VICTIM</span>
            <span className="rs-status">{current.victim.label}</span>
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
  
  // Desktop horizontal layout
  return (
    <div className="attack-flow reverse-shell-flow">
      <div className="attack-header">
        <span className="attack-stage-num">STAGE {stage + 1}/4</span>
        <h3 className="attack-stage-title">{current.title}</h3>
        <p className="attack-stage-desc">{current.desc}</p>
      </div>
      
      <div className="rs-diagram">
        <div className={`rs-endpoint attacker ${current.attacker.status}`}>
          <div className="rs-endpoint-icon">{current.attacker.icon}</div>
          <div className="rs-endpoint-label">ATTACKER</div>
          <div className="rs-endpoint-status">{current.attacker.label}</div>
          <div className="rs-ip">10.10.14.5:4444</div>
        </div>
        
        <div className="rs-connection">
          <div className="rs-firewall">
            <span>🧱</span>
            <span className="rs-firewall-label">Firewall</span>
          </div>
          <svg className="rs-line" viewBox="0 0 100 20">
            <line x1="0" y1="10" x2="100" y2="10" className={`rs-path ${current.direction !== 'none' ? 'active' : ''}`} />
          </svg>
          {current.direction !== 'none' && (
            <div 
              className={`rs-packet-desktop ${current.direction}`}
              style={{ left: current.direction === 'to-attacker' ? `${(1 - packetProgress) * 100}%` : `${packetProgress * 100}%` }}
            />
          )}
        </div>
        
        <div className={`rs-endpoint victim ${current.victim.status}`}>
          <div className="rs-endpoint-icon">{current.victim.icon}</div>
          <div className="rs-endpoint-label">VICTIM</div>
          <div className="rs-endpoint-status">{current.victim.label}</div>
          <div className="rs-ip">10.10.10.100</div>
        </div>
      </div>
      
      <div className="rs-progress">
        {stages.map((s, i) => (
          <div key={i} className={`rs-progress-step ${i <= stage ? 'active' : ''} ${i === stage ? 'current' : ''}`}>
            <div className="rs-progress-dot" />
            <span className="rs-progress-label">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Compact Attack Stage for small 16:9 viewports with custom SVGs
function CompactAttackStage({ stage }: { stage: number }) {
  const stages = useMemo(() => [
    { iconType: 'usb', label: 'USB → PC', title: 'USB INSERTION' },
    { iconType: 'laptop', label: 'PC → Network', title: 'INITIAL INFECTION' },
    { iconType: 'network', label: 'Network → SCADA', title: 'NETWORK SPREAD' },
    { iconType: 'scada', label: 'SCADA → PLC', title: 'SCADA COMPROMISE' },
    { iconType: 'plc', label: 'PLC → Target', title: 'PAYLOAD DELIVERY' },
  ], []);
  
  const current = stages[stage];
  const IconComponent = IconComponents[current.iconType];
  
  return (
    <div className="compact-attack">
      <div className="compact-stage-badge">STAGE {stage + 1}/5</div>
      <div className="compact-icon-svg">
        {IconComponent && <IconComponent size={64} infected={true} />}
      </div>
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

// Matrix Rain Background Component (for Reverse Shell theme)
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resize();
    
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Brighter leading character
        ctx.fillStyle = Math.random() > 0.98 ? '#fff' : '#00ff41';
        ctx.globalAlpha = Math.random() * 0.5 + 0.3;
        ctx.fillText(char, x, y);
        ctx.globalAlpha = 1;
        
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    window.addEventListener('resize', resize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="matrix-canvas" />;
}

// Glitch Text Component
function GlitchText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`glitch-text ${className}`} data-text={children}>
      {children}
    </span>
  );
}

// Hacker Terminal with enhanced typing effect
function HackerTerminal({ lines, title, isActive = true }: { 
  lines: { text: string; type: string; delay?: number }[];
  title: string;
  isActive?: boolean;
}) {
  const [displayedLines, setDisplayedLines] = useState<{ text: string; type: string }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  
  useEffect(() => {
    if (!isActive) {
      setDisplayedLines([]);
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
      return;
    }
    
    if (currentLineIndex >= lines.length) return;
    
    const currentLine = lines[currentLineIndex];
    const isCommand = currentLine.type === 'command';
    const baseDelay = currentLine.delay || 0;
    
    if (isCommand) {
      // Type character by character for commands
      if (currentCharIndex < currentLine.text.length) {
        const timer = setTimeout(() => {
          setDisplayedLines(prev => {
            const newLines = [...prev];
            if (newLines.length === currentLineIndex) {
              newLines.push({ text: '', type: currentLine.type });
            }
            newLines[currentLineIndex] = {
              text: currentLine.text.slice(0, currentCharIndex + 1),
              type: currentLine.type
            };
            return newLines;
          });
          setCurrentCharIndex(prev => prev + 1);
        }, 25 + Math.random() * 35);
        return () => clearTimeout(timer);
      } else {
        // Command finished typing, move to next line
        const timer = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      // Instant display for non-commands
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, { text: currentLine.text, type: currentLine.type }]);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, baseDelay + 50);
      return () => clearTimeout(timer);
    }
  }, [isActive, currentLineIndex, currentCharIndex, lines]);
  
  const isTyping = currentLineIndex < lines.length && lines[currentLineIndex]?.type === 'command';
  
  return (
    <div className="hacker-terminal">
      <div className="hacker-terminal-header">
        <div className="hacker-terminal-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <span className="hacker-terminal-title">{title}</span>
      </div>
      <div className="hacker-terminal-body">
        {displayedLines.map((line, i) => (
          <div key={i} className={`hacker-line ${line.type}`}>
            {line.text}
          </div>
        ))}
        {isTyping && <span className="hacker-cursor">█</span>}
      </div>
      <div className="scanlines" />
    </div>
  );
}

// 8-Stage Reverse Shell Attack Animation
function ReverseShellStages({ stage }: { stage: number }) {
  const [lottieData, setLottieData] = useState<object | null>(null);
  
  useEffect(() => {
    fetch('/animations/data-packet.json')
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(() => {});
  }, []);
  
  const stages = useMemo(() => [
    { id: 'recon', iconType: 'recon', title: 'RECONNAISSANCE', desc: 'Scanning target network for open services', visual: 'scan' },
    { id: 'listen', iconType: 'listen', title: 'OPEN LISTENER', desc: 'Attacker opens port and waits', visual: 'listen' },
    { id: 'craft', iconType: 'craft', title: 'CRAFT PAYLOAD', desc: 'Building the reverse shell payload', visual: 'craft' },
    { id: 'deliver', iconType: 'deliver', title: 'DELIVER PAYLOAD', desc: 'Payload reaches target via exploit/phishing', visual: 'deliver' },
    { id: 'execute', iconType: 'execute', title: 'EXECUTE', desc: 'Victim unknowingly runs malicious code', visual: 'execute' },
    { id: 'connect', iconType: 'connect', title: 'OUTBOUND CONNECTION', desc: 'Target connects BACK to attacker', visual: 'connect' },
    { id: 'shell', iconType: 'shell', title: 'SHELL ACCESS', desc: 'Interactive command line established', visual: 'shell' },
    { id: 'pwned', iconType: 'pwned', title: 'SYSTEM COMPROMISED', desc: 'Attacker has full remote access', visual: 'pwned' },
  ], []);
  
  const current = stages[stage];
  const IconComponent = RSIconComponents[current.iconType];
  
  return (
    <div className="rs-stages">
      <div className="rs-stages-header">
        <div className="rs-stage-counter">
          <span className="rs-stage-num">{String(stage + 1).padStart(2, '0')}</span>
          <span className="rs-stage-total">/ 08</span>
        </div>
        <GlitchText className="rs-stages-title">{current.title}</GlitchText>
        <p className="rs-stages-desc">{current.desc}</p>
      </div>
      
      <div className="rs-stages-visual">
        <div className={`rs-visual-icon-svg ${current.visual}`}>
          {IconComponent && <IconComponent size={72} infected={true} />}
        </div>
        
        <div className="rs-stages-progress">
          {stages.map((s, i) => (
            <div 
              key={s.id} 
              className={`rs-progress-node ${i < stage ? 'completed' : ''} ${i === stage ? 'active' : ''}`}
            >
              <div className="rs-progress-dot" />
              {i < stages.length - 1 && (
                <div className={`rs-progress-line ${i < stage ? 'completed' : ''}`} />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="rs-network-visual">
        <div className={`rs-node attacker ${stage >= 1 ? 'active' : ''}`}>
          <div className="rs-node-icon-svg">
            <AttackerIcon size={48} active={stage >= 1} />
          </div>
          <span className="rs-node-label">ATTACKER</span>
          {stage >= 1 && <span className="rs-node-port">:4444</span>}
        </div>
        
        <div className="rs-connection-line">
          <svg viewBox="0 0 200 40" className="rs-line-svg">
            <defs>
              <linearGradient id="rsPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00ff41" />
                <stop offset="100%" stopColor="#ff3366" />
              </linearGradient>
            </defs>
            <path 
              d="M 10 20 Q 100 5 190 20" 
              className={`rs-path-curve ${stage >= 5 ? 'active' : ''} ${stage >= 6 ? 'connected' : ''}`}
              fill="none"
            />
            {stage >= 3 && stage < 6 && (
              <circle className="rs-packet outbound" r="5" fill="#ff3366">
                <animateMotion dur="1.5s" repeatCount="indefinite" path="M 10 20 Q 100 5 190 20" />
              </circle>
            )}
            {stage >= 5 && (
              <circle className="rs-packet inbound" r="5" fill="#00ff41">
                <animateMotion dur="1s" repeatCount="indefinite" path="M 190 20 Q 100 35 10 20" />
              </circle>
            )}
          </svg>
          <div className="rs-firewall-icon-svg">
            <FirewallIcon size={36} bypassed={stage >= 5} />
            <span className="rs-firewall-status">{stage >= 5 ? 'BYPASSED' : 'ACTIVE'}</span>
          </div>
          {/* Lottie packet animation overlay */}
          {stage >= 5 && lottieData && (
            <div className="rs-lottie-packet">
              <Lottie animationData={lottieData} loop style={{ width: 32, height: 32 }} />
            </div>
          )}
        </div>
        
        <div className={`rs-node victim ${stage >= 4 ? 'infected' : ''} ${stage >= 7 ? 'pwned' : ''}`}>
          <div className="rs-node-icon-svg">
            <VictimIcon size={48} infected={stage >= 4} pwned={stage >= 7} />
          </div>
          <span className="rs-node-label">TARGET</span>
          {stage >= 4 && <span className="rs-node-status">{stage >= 7 ? 'PWNED' : 'INFECTED'}</span>}
        </div>
      </div>
    </div>
  );
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
  const [currentStory, setCurrentStory] = useState<string>("reverseShell");
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

  const getTransitionClass = (slide: Slide) => {
    if (slide.transition) {
      return `transition-${slide.transition}`;
    }
    // Default transitions based on slide type
    switch (slide.type) {
      case 'title':
      case 'hackerTitle':
        return 'transition-scale';
      case 'bigNumber':
        return 'transition-scale-up';
      case 'stats':
      case 'hackerStats':
        return 'transition-slide-up';
      case 'code':
      case 'hackerCode':
        return 'transition-wipe';
      case 'terminal':
      case 'hackerTerminal':
        return 'transition-scale';
      case 'attackFlow':
      case 'reverseShellFlow':
      case 'hackerStage':
        return 'transition-slide-right';
      default:
        return 'transition-fade';
    }
  };

  const renderSlide = (slide: Slide, index: number) => {
    if (index !== currentSlide) return null;
    
    const transitionClass = getTransitionClass(slide);

    switch (slide.type) {
      case "title":
        return (
          <div className={`slide-content ${transitionClass}`} key={animationKey}>
            <h1 className="slide-title">{slide.title}</h1>
            <p className="slide-subtitle">{slide.subtitle}</p>
          </div>
        );

      case "text":
        return (
          <div className={`slide-content ${transitionClass}`} key={animationKey}>
            <p className="slide-text" dangerouslySetInnerHTML={{ __html: slide.content || "" }} />
            {slide.subtext && <p className="slide-subtitle mt-5">{slide.subtext}</p>}
          </div>
        );

      case "bigNumber":
        return (
          <div className={`slide-content ${transitionClass}`} key={animationKey}>
            <div className="big-number">{slide.number}</div>
            <p className="big-label">{slide.label}</p>
          </div>
        );

      case "stats":
        return (
          <div className={`slide-content ${transitionClass}`} key={animationKey}>
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
          <div className={`slide-content ${transitionClass}`} key={animationKey}>
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
          <div className={`slide-content ${transitionClass}`} key={animationKey}>
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
          <div className={`slide-content attack-flow-slide ${transitionClass}`} key={animationKey}>
            <AttackStage stage={slide.stage || 0} isMobile={ratio === "9:16"} isCompact={ratio === "16:9" && isSmallViewport} />
          </div>
        );

      case "timeline":
        return (
          <div className={`slide-content ${transitionClass}`} key={animationKey}>
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
          <div className={`slide-content ${transitionClass}`} key={animationKey}>
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
          <div className={`slide-content ${transitionClass}`} key={animationKey}>
            <MapSlide slide={slide} />
          </div>
        );

      case "terminal":
        return (
          <div className={`slide-content terminal-content ${transitionClass}`} key={animationKey}>
            <TerminalSlide slide={slide} />
          </div>
        );

      case "reverseShellFlow":
        return (
          <div className={`slide-content attack-flow-slide ${transitionClass}`} key={animationKey}>
            <ReverseShellFlow stage={slide.stage || 0} isMobile={ratio === "9:16"} />
          </div>
        );

      // Hacker theme slide types
      case "hackerTitle":
        return (
          <div className={`slide-content hacker-slide ${transitionClass}`} key={animationKey}>
            <GlitchText className="hacker-title">{slide.title}</GlitchText>
            <p className="hacker-subtitle">{slide.subtitle}</p>
          </div>
        );

      case "hackerText":
        return (
          <div className={`slide-content hacker-slide ${transitionClass}`} key={animationKey}>
            <p className="hacker-text" dangerouslySetInnerHTML={{ __html: slide.content || "" }} />
            {slide.subtext && <p className="hacker-subtext">{slide.subtext}</p>}
          </div>
        );

      case "hackerStage":
        return (
          <div className={`slide-content hacker-slide ${transitionClass}`} key={animationKey}>
            <ReverseShellStages stage={slide.stage || 0} />
          </div>
        );

      case "hackerTerminal":
        return (
          <div className={`slide-content hacker-slide terminal-slide ${transitionClass}`} key={animationKey}>
            <HackerTerminal 
              title={slide.title || "TERMINAL"} 
              lines={slide.lines?.map(l => ({ text: l.text, type: l.type, delay: 0 })) || []}
              isActive={true}
            />
          </div>
        );

      case "hackerStats":
        return (
          <div className={`slide-content hacker-slide ${transitionClass}`} key={animationKey}>
            <div className="hacker-stats">
              {slide.items?.map((item, i) => (
                <div key={i} className="hacker-stat" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="hacker-stat-value">{item.value}</div>
                  <div className="hacker-stat-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "hackerCode":
        return (
          <div className={`slide-content hacker-slide ${transitionClass}`} key={animationKey}>
            <h2 className="hacker-code-title">{slide.title}</h2>
            <div className="hacker-code-block">
              {slide.lines?.map((line, i) => (
                <div key={i} className={`hacker-code-line ${line.type}`} style={{ animationDelay: `${i * 0.08}s` }}>
                  {line.text || '\u00A0'}
                </div>
              ))}
            </div>
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
          <option value="reverseShell">🐚 Reverse Shell</option>
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
      <div className={`stage ${ratio === "16:9" ? "ratio-16-9" : "ratio-9-16"} theme-${currentStory}`}>
        {currentStory === 'reverseShell' ? <MatrixRain /> : <ParticleNetwork />}
        {currentStory === 'reverseShell' && <div className="scanlines-overlay" />}
        {currentStory === 'reverseShell' && <div className="crt-overlay" />}
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
