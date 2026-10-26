import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Flame,
  RotateCw,
  Search,
  Sliders,
  ExternalLink,
  Zap,
  Play,
  FlaskConical,
  Radio,
  FileText,
  Brain,
  Wifi,
  ShieldCheck,
  Check,
  GraduationCap,
  Cloud,
  Award
} from 'lucide-react';
import { STUDENT_EXPERIMENTS } from '../data/studentExperiments';
import MissingLabLogo from './MissingLabLogo';

export default function StepIntro({ onStart, onSelectProtocol, onOpenDigitalOcean }) {
  // Search input state
  const [searchInput, setSearchInput] = useState('');
  
  // Interactive hotplate sandbox
  const [testTemp, setTestTemp] = useState(25);
  const [testRpm, setTestRpm] = useState(350);

  // Dynamic rotation speed calculation
  const spinDuration = testRpm > 0 ? Math.max(0.12, 1200 / testRpm) : 0;

  // Heat glow calculation (25°C to 100°C)
  const heatRatio = Math.min(1, Math.max(0, (testTemp - 25) / 75));
  const glowColor = `rgba(0, 242, 254, ${0.15 + heatRatio * 0.45})`;

  // Handle direct search or chip click
  const handleTriggerSearch = (queryText) => {
    const q = (queryText || searchInput || 'Titration').trim();
    const matched = STUDENT_EXPERIMENTS.find(p => 
      p.name.toLowerCase().includes(q.toLowerCase()) || 
      p.category.toLowerCase().includes(q.toLowerCase()) ||
      p.formula.toLowerCase().includes(q.toLowerCase())
    );
    if (matched && onSelectProtocol) {
      onSelectProtocol(matched);
    } else if (onStart) {
      onStart();
    }
  };

  const quickChips = [
    { label: 'Acid-Base Titration (pH)', query: 'Titration', active: true },
    { label: 'Iodine Clock Kinetics', query: 'Clock' },
    { label: 'Catalase Enzyme Activity', query: 'Catalase' },
    { label: 'Aspirin Synthesis', query: 'Aspirin' },
    { label: 'Water Electrolysis (Faraday)', query: 'Electrolysis' },
  ];

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }} className="fade-in">
      
      {/* ── 1. Hero Section ── */}
      <div
        className="notebook-card"
        style={{
          padding: '2.75rem 2.5rem',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--pure-white)',
          border: '1px solid var(--slate-border)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 4px 20px rgba(11, 28, 48, 0.05)',
        }}
      >
        {/* Subtle Brand Geometric Wave Backdrop */}
        <div style={{
          position: 'absolute', top: -80, right: -80, width: '420px', height: '420px',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.18) 0%, rgba(209, 243, 77, 0.12) 50%, transparent 80%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '780px' }}>
          
          {/* Top Pill Category Tag */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="lab-badge lab-badge-lime" style={{ fontSize: '0.72rem', padding: '0.25rem 0.75rem' }}>
              <span className="dot-ready" style={{ width: '6px', height: '6px' }} />
              Virtual Science Laboratory for Students
            </span>
            <span className="lab-badge lab-badge-blue" style={{ fontSize: '0.72rem' }}>
              Powered by Gemma AI & DigitalOcean
            </span>
          </div>

          {/* Primary H1 Headline */}
          <h1 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: 'var(--deep-charcoal)',
            letterSpacing: '-0.03em',
            margin: '0 0 1rem 0',
          }}>
            The Science Lab Every Student Was <span style={{ background: 'linear-gradient(135deg, #0080FF 0%, #00f2fe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Missing.</span>
          </h1>

          {/* Subheading / Body Copy */}
          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.6,
            color: 'var(--slate-gray)',
            marginBottom: '1.75rem',
            maxWidth: '680px',
          }}>
            Over 80% of schools and colleges lack accessible laboratories and expensive chemicals. <strong>MissingLab</strong> gives every student a high-fidelity interactive digital twin lab paired with <strong>Gemma AI</strong> — an encouraging Socratic mentor that explains reactions, tests safe "what-if" hypotheses, and grades oral viva exams!
          </p>

          {/* Brand Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTriggerSearch(searchInput);
            }}
            style={{ maxWidth: '620px', marginBottom: '1rem' }}
          >
            <div className="brand-input-pill">
              <FlaskConical size={18} color="var(--slate-gray)" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
              <input
                type="text"
                className="brand-input-field"
                placeholder="Search curriculum experiment (e.g. Titration, Clock Reaction, Catalase, Aspirin)..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit" className="brand-submit-circle" title="Launch Student Practical">
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </form>

          {/* Caption & Quick Tags / Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--slate-gray)', fontWeight: 600 }}>
              Curriculum Practicals:
            </span>
            {quickChips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                className={`brand-chip ${chip.active ? 'active' : ''}`}
                onClick={() => {
                  setSearchInput(chip.query);
                  handleTriggerSearch(chip.query);
                }}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => onStart ? onStart() : handleTriggerSearch('Titration')}
              style={{ fontSize: '0.92rem', padding: '0.75rem 1.75rem' }}
            >
              Start Virtual Experiment
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                const el = document.getElementById('missinglab-pillars');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ fontSize: '0.92rem', padding: '0.75rem 1.75rem' }}
            >
              Explore Features
            </button>
          </div>

        </div>
      </div>

      {/* ── 2. Four Core Pillars of MissingLab ── */}
      <div id="missinglab-pillars" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0, color: 'var(--deep-charcoal)' }}>
              Democratizing Hands-on Science Education
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--slate-gray)', margin: '0.25rem 0 0 0' }}>
              Four pillars making practical science accessible to any student with a browser
            </p>
          </div>
        </div>

        {/* 2x2 Feature Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          
          {/* Card 1: Interactive Digital Twin */}
          <div className="notebook-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="brand-icon-circle" style={{ marginBottom: '1rem', background: 'rgba(0, 128, 255, 0.1)', color: '#0080FF' }}>
                <FlaskConical size={20} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--deep-charcoal)', marginBottom: '0.5rem' }}>
                Interactive Digital Twin Lab
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--slate-gray)', lineHeight: 1.55, margin: 0 }}>
                Control virtual hotplates, magnetic stirrers, dropwise burettes, and spectrophotometers. Real-time chemical kinetics simulate exact color changes and phase transitions.
              </p>
            </div>
            <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--slate-border)' }}>
              <span style={{ color: '#0080FF', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                Zero Shattered Glassware <Check size={13} color="green" />
              </span>
            </div>
          </div>

          {/* Card 2: Gemma Socratic AI Mentor */}
          <div className="notebook-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="brand-icon-circle" style={{ marginBottom: '1rem', background: 'rgba(209, 243, 77, 0.25)', color: '#4d7c0f' }}>
                <Brain size={20} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--deep-charcoal)', marginBottom: '0.5rem' }}>
                Gemma Socratic AI Mentor
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--slate-gray)', lineHeight: 1.55, margin: 0 }}>
                Powered by Google's Gemma models. Explains <em>why</em> reactions happen with everyday analogies, tests safe "What-If" hypotheses, and conducts interactive oral Viva Voce practical exams!
              </p>
            </div>
            <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--slate-border)' }}>
              <span style={{ color: '#4d7c0f', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                24/7 Personal Science Tutor <Sparkles size={13} />
              </span>
            </div>
          </div>

          {/* Card 3: DigitalOcean Cloud Powered */}
          <div className="notebook-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="brand-icon-circle" style={{ marginBottom: '1rem', background: 'rgba(0, 128, 255, 0.1)', color: '#0080FF' }}>
                <Cloud size={20} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--deep-charcoal)', marginBottom: '0.5rem' }}>
                DigitalOcean Cloud Architecture
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--slate-gray)', lineHeight: 1.55, margin: 0 }}>
                Hosted on <strong>DigitalOcean App Platform</strong> with automated git push deployments, containerized Docker runtime, and DigitalOcean Spaces for persistent student lab reports.
              </p>
            </div>
            <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--slate-border)' }}>
              <span style={{ color: '#0080FF', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                Low-Latency Edge CDN <Zap size={13} />
              </span>
            </div>
          </div>

          {/* Card 4: Auto Lab Practical Notebook */}
          <div className="notebook-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="brand-icon-circle" style={{ marginBottom: '1rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <FileText size={20} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--deep-charcoal)', marginBottom: '0.5rem' }}>
                Exam-Ready Practical Records
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--slate-gray)', lineHeight: 1.55, margin: 0 }}>
                1-click auto-generated practical notebook records with Aim, Theory, Chemical Equations, Telemetry Observation Tables, and Precautions ready to print or export as PDF.
              </p>
            </div>
            <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--slate-border)' }}>
              <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                NCERT & CBSE Aligned <Award size={13} />
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── 3. Interactive Virtual Hotplate-Stirrer Sandbox ── */}
      <div
        className="notebook-card"
        style={{
          padding: '2rem',
          background: 'var(--pure-white)',
          border: '1px solid var(--slate-border)',
          borderRadius: 'var(--radius-xl)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
              <span className="dot-ready" style={{ width: '6px', height: '6px' }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--slate-gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Interactive Equipment Preview
              </span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--deep-charcoal)' }}>
              Digital Twin Hotplate & Magnetic Stirrer Station
            </h3>
          </div>
          <span className="lab-badge lab-badge-lime" style={{ fontSize: '0.72rem' }}>
            PID Closed-Loop Simulation
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          
          {/* Equipment Visual */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2.5rem',
              background: '#0d131f',
              borderRadius: 'var(--radius-lg)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '220px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            {/* Glowing Hotplate Surface */}
            <div
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${glowColor} 0%, rgba(13, 19, 31, 0.4) 70%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: testTemp > 40 ? `0 0 35px ${glowColor}` : 'none'
              }}
            >
              {/* Spinning Stir Bar */}
              <div
                style={{
                  width: '42px',
                  height: '12px',
                  borderRadius: '6px',
                  background: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  animation: testRpm > 0 ? `spin ${spinDuration}s linear infinite` : 'none',
                }}
              />
            </div>

            {/* Readout Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '16px',
                right: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#94a3b8',
                fontFamily: 'JetBrains Mono, monospace'
              }}
            >
              <span>TEMP: <strong style={{ color: testTemp > 50 ? '#f87171' : '#38bdf8' }}>{testTemp} °C</strong></span>
              <span>AGITATION: <strong style={{ color: '#a3e635' }}>{testRpm} RPM</strong></span>
            </div>
          </div>

          {/* Interactive Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                <span>Thermal Temperature Setpoint:</span>
                <span style={{ color: '#0080FF' }}>{testTemp} °C</span>
              </div>
              <input
                type="range"
                min="20"
                max="95"
                value={testTemp}
                onChange={(e) => setTestTemp(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0080FF' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--slate-gray)' }}>
                <span>20 °C (Ambient)</span>
                <span>55 °C (Warm Bath)</span>
                <span>95 °C (Esterification)</span>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                <span>Magnetic Vortex Agitation:</span>
                <span style={{ color: '#10b981' }}>{testRpm} RPM</span>
              </div>
              <input
                type="range"
                min="0"
                max="900"
                step="50"
                value={testRpm}
                onChange={(e) => setTestRpm(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#10b981' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--slate-gray)' }}>
                <span>0 RPM (Static)</span>
                <span>350 RPM (Titration)</span>
                <span>900 RPM (Violent Vortex)</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={() => onStart ? onStart() : handleTriggerSearch('Titration')}
                style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.82rem' }}
              >
                Proceed to Experiments
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
