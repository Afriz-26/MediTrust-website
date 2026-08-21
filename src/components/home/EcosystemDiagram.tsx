import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Stethoscope, 
  Pill, 
  Bot, 
  FileText, 
  Ticket,
  ShieldCheck,
  CheckCircle2,
  Activity
} from 'lucide-react';

interface EcosystemNode {
  id: string;
  label: string;
  sublabel: string;
  tooltipText: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glowColor: string;
  x: number; // percentage position (0-100)
  y: number; // percentage position (0-100)
}

// Exactly 6 sector icons evenly spaced around the center hexagon
const NODES: EcosystemNode[] = [
  { 
    id: 'doctor', 
    label: 'Doctor Sector', 
    sublabel: 'OPD & Diagnostics', 
    tooltipText: 'Clinical consultation dashboard, patient vitals & electronic medical records.',
    icon: Stethoscope, 
    color: 'from-sky-400 to-blue-600', 
    glowColor: 'rgba(14, 165, 233, 0.6)', 
    x: 50, 
    y: 15 
  },
  { 
    id: 'ai-assistant', 
    label: 'AI Assistant', 
    sublabel: 'Symptom Triage & Guidance', 
    tooltipText: '24/7 multilingual symptom triage, skin condition scanner & grounded doctor search.',
    icon: Bot, 
    color: 'from-cyan-400 to-teal-500', 
    glowColor: 'rgba(6, 182, 212, 0.6)', 
    x: 82, 
    y: 32 
  },
  { 
    id: 'prescription', 
    label: 'Prescription', 
    sublabel: 'Verified QR Prescriptions', 
    tooltipText: 'Tamper-proof digital prescriptions with drug interaction checks & QR verification.',
    icon: FileText, 
    color: 'from-rose-400 to-pink-600', 
    glowColor: 'rgba(244, 63, 94, 0.6)', 
    x: 82, 
    y: 68 
  },
  { 
    id: 'pharmacy', 
    label: 'Pharmacy Sector', 
    sublabel: 'Rx Dispensing & Orders', 
    tooltipText: 'Instant digital prescription fulfillment, inventory alerts & e-dispensing.',
    icon: Pill, 
    color: 'from-amber-400 to-orange-500', 
    glowColor: 'rgba(245, 158, 11, 0.6)', 
    x: 50, 
    y: 85 
  },
  { 
    id: 'queue-token', 
    label: 'Queue Tokens', 
    sublabel: 'Live Queue & OPD Tracking', 
    tooltipText: 'Live OPD queue position tracking with estimated doctor consultation wait times.',
    icon: Ticket, 
    color: 'from-violet-400 to-purple-600', 
    glowColor: 'rgba(139, 92, 246, 0.6)', 
    x: 18, 
    y: 68 
  },
  { 
    id: 'patient', 
    label: 'Patient Sector', 
    sublabel: 'Unified EHR & Health ID', 
    tooltipText: 'Consent-driven digital health vault, ABHA ID linkage & live token tracking.',
    icon: User, 
    color: 'from-blue-500 to-indigo-600', 
    glowColor: 'rgba(59, 130, 246, 0.6)', 
    x: 18, 
    y: 32 
  }
];

// Circular perimeter ring connections
const CONNECTIONS = [
  { from: 'doctor', to: 'ai-assistant' },
  { from: 'ai-assistant', to: 'prescription' },
  { from: 'prescription', to: 'pharmacy' },
  { from: 'pharmacy', to: 'queue-token' },
  { from: 'queue-token', to: 'patient' },
  { from: 'patient', to: 'doctor' }
];

export const EcosystemDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="w-full space-y-5">
      {/* Diagram Canvas Container with proper padding to prevent any edge clipping */}
      <div className="relative w-full aspect-[16/11] min-h-[360px] sm:min-h-[400px] rounded-2xl bg-[#090F1C]/90 border border-slate-800/90 overflow-visible flex items-center justify-center p-4">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none"></div>
        
        {/* Ambient Center Glow */}
        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-500/15 to-indigo-500/20 blur-3xl pointer-events-none"></div>

        {/* SVG Connecting Network Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <defs>
            <linearGradient id="ecosystem-line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#818CF8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Dotted Radial Lines from Center Hexagon to all 6 nodes */}
          {NODES.map((node, i) => {
            const isHighlighted = activeNode === node.id;
            return (
              <line
                key={`center-${i}`}
                x1="50%"
                y1="50%"
                x2={`${node.x}%`}
                y2={`${node.y}%`}
                stroke={isHighlighted ? '#38BDF8' : 'rgba(56, 189, 248, 0.3)'}
                strokeWidth={isHighlighted ? 2.5 : 1.2}
                strokeDasharray="4 4"
                className="transition-all duration-300"
              />
            );
          })}

          {/* Perimeter Ring Dotted Connecting Lines */}
          {CONNECTIONS.map((conn, idx) => {
            const fromNode = NODES.find(n => n.id === conn.from);
            const toNode = NODES.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const isHighlighted = activeNode === conn.from || activeNode === conn.to;

            return (
              <line
                key={idx}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={isHighlighted ? '#38BDF8' : 'url(#ecosystem-line-gradient)'}
                strokeWidth={isHighlighted ? 2.2 : 1.2}
                strokeDasharray="4 4"
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Center Hexagon-shaped Panel for "MEDITRUST CORE / Medynex Solutions LLP" with Border Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center justify-center">
          {/* Hexagonal Outer Glow */}
          <div className="relative flex items-center justify-center">
            <div 
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
              }}
              className="w-36 h-36 sm:w-40 sm:h-40 bg-gradient-to-b from-cyan-500 via-blue-600 to-indigo-700 p-[2px] shadow-[0_0_30px_rgba(6,182,212,0.45)] transition-all duration-500 flex items-center justify-center animate-pulse"
            >
              <div 
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                }}
                className="w-full h-full bg-[#0A1224] flex flex-col items-center justify-center p-3 text-center"
              >
                <div className="w-5 h-5 mb-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shadow-inner shadow-cyan-400/40">
                  <ShieldCheck className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-400 font-bold leading-tight">
                  MEDITRUST CORE
                </span>
                <span className="text-[10px] sm:text-[11px] font-extrabold text-white leading-tight mt-0.5 tracking-tight">
                  Medynex Solutions LLP
                </span>
                <span className="text-[8px] text-cyan-300/80 font-mono mt-1 px-1.5 py-0.2 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                  Unified Hub
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Evenly Spaced Ecosystem Orbiting Nodes */}
        {NODES.map((node) => {
          const Icon = node.icon;
          const isActive = activeNode === node.id;

          return (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute cursor-pointer flex flex-col items-center group z-30 select-none"
            >
              <motion.div
                whileHover={{ scale: 1.18 }}
                style={{
                  boxShadow: isActive ? `0 0 25px ${node.glowColor}` : `0 0 10px rgba(0,0,0,0.7)`
                }}
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${node.color} p-0.5 shadow-lg flex items-center justify-center transition-all duration-300`}
              >
                <div className="w-full h-full rounded-[10px] bg-[#0A101D] flex items-center justify-center group-hover:bg-transparent transition-colors">
                  <Icon className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
                </div>
              </motion.div>

              {/* Node Label Badge (Unclipped, Crisp Contrast) */}
              <div className="mt-1.5 text-center bg-[#070D1A]/95 border border-slate-700/90 rounded-lg px-2.5 py-0.5 backdrop-blur-md shadow-lg whitespace-nowrap group-hover:border-cyan-500/60 transition-colors">
                <span className="text-[10px] sm:text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {node.label}
                </span>
              </div>

              {/* Hover Interactive Tooltip */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full mb-2 w-48 sm:w-52 p-2.5 rounded-xl bg-[#091122]/98 border border-cyan-500/50 text-slate-100 shadow-2xl z-40 pointer-events-none text-center backdrop-blur-md"
                  >
                    <span className="text-[9px] font-mono text-cyan-400 uppercase font-bold block mb-0.5">{node.sublabel}</span>
                    <p className="text-[10px] leading-relaxed text-slate-300">{node.tooltipText}</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-[#091122]"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* 4-Column Stats Row: "50K+ Happy Patients", "2K+ Verified Doctors", "1K+ Partner Pharmacies", "99.9% System Uptime" */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        <div className="p-3 rounded-xl bg-[#0F172A]/90 border border-cyan-500/25 text-center flex flex-col items-center justify-center shadow-md">
          <div className="flex items-center space-x-1 text-cyan-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-sm sm:text-base font-black text-white">50K+</span>
          </div>
          <span className="text-[10px] text-slate-300 font-medium mt-0.5">Happy Patients</span>
        </div>

        <div className="p-3 rounded-xl bg-[#0F172A]/90 border border-blue-500/25 text-center flex flex-col items-center justify-center shadow-md">
          <div className="flex items-center space-x-1 text-blue-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-sm sm:text-base font-black text-white">2K+</span>
          </div>
          <span className="text-[10px] text-slate-300 font-medium mt-0.5">Verified Doctors</span>
        </div>

        <div className="p-3 rounded-xl bg-[#0F172A]/90 border border-rose-500/25 text-center flex flex-col items-center justify-center shadow-md">
          <div className="flex items-center space-x-1 text-rose-400">
            <Pill className="w-3.5 h-3.5" />
            <span className="text-sm sm:text-base font-black text-white">1K+</span>
          </div>
          <span className="text-[10px] text-slate-300 font-medium mt-0.5">Partner Pharmacies</span>
        </div>

        <div className="p-3 rounded-xl bg-[#0F172A]/90 border border-amber-500/25 text-center flex flex-col items-center justify-center shadow-md">
          <div className="flex items-center space-x-1 text-amber-400">
            <Activity className="w-3.5 h-3.5" />
            <span className="text-sm sm:text-base font-black text-white">99.9%</span>
          </div>
          <span className="text-[10px] text-slate-300 font-medium mt-0.5">System Uptime</span>
        </div>
      </div>
    </div>
  );
};
