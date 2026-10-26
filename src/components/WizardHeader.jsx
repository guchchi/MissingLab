import React from 'react';
import { BookOpen, Check, Cloud, Brain, Radio, Layers, Sparkles } from 'lucide-react';
import MissingLabLogo from './MissingLabLogo';

export default function WizardHeader({
  currentStep,
  setCurrentStep,
  onOpenDocs,
  onOpenConnectLab,
  onOpenDigitalOcean
}) {
  const steps = [
    { num: 1, label: 'Overview' },
    { num: 2, label: 'Curriculum Catalog' },
    { num: 3, label: 'Simulate Kinetics' },
    { num: 4, label: 'Lab Digital Twin' },
  ];

  return (
    <header style={{ marginBottom: '1.5rem' }}>
      {/* ── Branding Navbar ── */}
      <div
        className="notebook-card"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '0.875rem 1.5rem',
          marginBottom: '0.75rem',
          background: 'var(--pure-white)',
          border: '1px solid var(--slate-border)',
          borderRadius: 'var(--radius-xl)',
        }}
      >
        {/* Brand logo & identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <MissingLabLogo size={36} showTagline={true} />
          <span className="lab-badge lab-badge-lime" style={{ fontSize: '0.62rem', letterSpacing: '0.04em' }}>
            STUDENT EDITION
          </span>
        </div>

        {/* Status Indicators & Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          
          {/* DigitalOcean Cloud Status Button */}
          <button
            onClick={onOpenDigitalOcean}
            className="lab-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
              border: '1px solid #bfdbfe',
              background: '#eff6ff',
              color: '#0069d9',
              padding: '0.35rem 0.75rem',
              fontWeight: 700,
              borderRadius: 'var(--radius-full)'
            }}
            title="Inspect DigitalOcean Cloud Infrastructure & Deployment Specs"
          >
            <Cloud size={13} color="#0080FF" />
            DigitalOcean App Platform
          </button>

          {/* Gemma AI Mentor Badge */}
          <span
            className="lab-badge lab-badge-blue"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <span className="pulse-indicator" />
            <Brain size={12} />
            Gemma AI Mentor Active
          </span>

          {/* Connect Physical Hardware / ESP Modal */}
          <button
            onClick={onOpenConnectLab}
            className="lab-badge lab-badge-lime"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
              border: 'none',
              padding: '0.35rem 0.75rem',
              fontWeight: 700
            }}
            title="Optional: Connect physical ESP8266/ESP32 stirrer/heater station"
          >
            <span className="pulse-indicator" />
            🔌 Physical Station Bridge
          </button>

          {/* Architecture Documentation button */}
          <button
            className="btn-ghost"
            onClick={onOpenDocs}
            style={{
              fontSize: '0.78rem',
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <BookOpen size={13} color="var(--deep-charcoal)" />
            Architecture
          </button>
        </div>
      </div>

      {/* ── Step Wizard Bar ── */}
      <nav
        className="notebook-card"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.4rem 0.75rem',
          overflowX: 'auto',
          background: 'var(--pure-white)',
          border: '1px solid var(--slate-border)',
          borderRadius: 'var(--radius-full)',
        }}
      >
        {steps.map((st, idx) => {
          const isActive = currentStep === st.num;
          const isDone = currentStep > st.num;

          return (
            <React.Fragment key={st.num}>
              <button
                type="button"
                onClick={() => setCurrentStep(st.num)}
                className={`stepper-chip ${isActive ? 'active' : isDone ? 'done' : ''}`}
                style={{
                  padding: '0.45rem 1rem',
                  fontSize: '0.82rem',
                }}
              >
                <span className="stepper-num" style={{ width: '22px', height: '22px' }}>
                  {isDone ? <Check size={12} strokeWidth={3} /> : st.num}
                </span>
                <span>{st.label}</span>
              </button>

              {idx < steps.length - 1 && (
                <span
                  style={{
                    flex: 1,
                    height: '1px',
                    minWidth: '20px',
                    background: isDone
                      ? 'var(--success-green)'
                      : 'var(--slate-border)',
                    transition: 'background 0.3s ease',
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </header>
  );
}
