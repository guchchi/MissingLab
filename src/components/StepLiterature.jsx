import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  FileText,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Database,
  ExternalLink,
  Zap,
  Flame,
  RotateCw,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Check,
  GraduationCap,
  FlaskConical,
  Atom,
  Dna
} from 'lucide-react';
import { STUDENT_EXPERIMENTS } from '../data/studentExperiments';

export default function StepLiterature({
  currentProtocol,
  onSelectProtocol,
  onNext,
  onBack,
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const activeExp = currentProtocol || STUDENT_EXPERIMENTS[0];

  const categories = ['All', 'Chemistry', 'Biology', 'Physics'];

  const filteredExperiments = STUDENT_EXPERIMENTS.filter(exp => {
    const matchesCat = selectedCategory === 'All' || exp.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchQuery.trim() || 
      exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.targetProperty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="fade-in">
      
      {/* ── Top Bar: Search & Category Filter ── */}
      <div
        className="notebook-card"
        style={{
          padding: '1.5rem',
          background: 'var(--pure-white)',
          border: '1px solid var(--slate-border)',
          borderRadius: 'var(--radius-xl)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
              <GraduationCap size={16} color="#0080FF" />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--slate-gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Curriculum Experiment Catalog
              </span>
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--deep-charcoal)' }}>
              Select Science Practical
            </h2>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--slate-light)', padding: '0.25rem', borderRadius: 'var(--radius-full)' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background: selectedCategory === cat ? 'var(--pure-white)' : 'transparent',
                  color: selectedCategory === cat ? 'var(--deep-charcoal)' : 'var(--slate-gray)',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  boxShadow: selectedCategory === cat ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="brand-input-pill" style={{ maxWidth: '100%' }}>
          <Search size={18} color="var(--slate-gray)" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
          <input
            type="text"
            className="brand-input-field"
            placeholder="Search experiments by name, reaction formula, or concept (e.g. Titration, Arrhenius, Catalase, Faraday)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ── Main 2-Column Layout: Left Catalog Grid, Right Selected Detail ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Left Column: Experiment Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-gray)' }}>
            AVAILABLE EXPERIMENTS ({filteredExperiments.length})
          </div>

          {filteredExperiments.map(exp => {
            const isSelected = activeExp.id === exp.id;
            return (
              <div
                key={exp.id}
                onClick={() => onSelectProtocol(exp)}
                className="notebook-card"
                style={{
                  padding: '1.25rem',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-lg)',
                  border: isSelected ? '2px solid #0080FF' : '1px solid var(--slate-border)',
                  background: isSelected ? 'rgba(0, 128, 255, 0.03)' : 'var(--pure-white)',
                  boxShadow: isSelected ? '0 4px 16px rgba(0, 128, 255, 0.12)' : '0 2px 8px rgba(0,0,0,0.02)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span
                      className="lab-badge"
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        background: exp.category === 'Chemistry' ? '#e0f2fe' : exp.category === 'Biology' ? '#dcfce7' : '#fef3c7',
                        color: exp.category === 'Chemistry' ? '#0369a1' : exp.category === 'Biology' ? '#15803d' : '#b45309'
                      }}
                    >
                      {exp.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--slate-gray)' }}>
                      {exp.curriculumLevel}
                    </span>
                  </div>
                  {isSelected && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#0080FF', fontSize: '0.72rem', fontWeight: 700 }}>
                      <Check size={14} /> Active
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--deep-charcoal)' }}>
                  {exp.name}
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--slate-gray)', fontFamily: 'JetBrains Mono, monospace', background: '#f8fafc', padding: '0.35rem 0.5rem', borderRadius: '4px' }}>
                  {exp.formula}
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--slate-gray)', lineHeight: 1.4 }}>
                  {exp.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Experiment Deep Dive */}
        <div
          className="notebook-card"
          style={{
            padding: '1.75rem',
            background: 'var(--pure-white)',
            border: '1px solid var(--slate-border)',
            borderRadius: 'var(--radius-xl)',
            position: 'sticky',
            top: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          {/* Header */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <span className="dot-ready" style={{ width: '6px', height: '6px' }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0080FF', textTransform: 'uppercase' }}>
                Curriculum Syllabus Details
              </span>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--deep-charcoal)' }}>
              {activeExp.name}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--slate-gray)', margin: 0, lineHeight: 1.5 }}>
              {activeExp.description}
            </p>
          </div>

          {/* Key Targets & Formula */}
          <div style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-border)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--slate-gray)', marginBottom: '0.25rem' }}>
              REACTION EQUATION & TARGET PROPERTY
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0080FF', fontFamily: 'JetBrains Mono, monospace', marginBottom: '0.35rem' }}>
              {activeExp.formula}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--deep-charcoal)' }}>
              🎯 {activeExp.targetProperty}
            </div>
          </div>

          {/* Procedure Stages Breakdown */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--deep-charcoal)', marginBottom: '0.5rem' }}>
              PROCEDURE STAGES ({activeExp.steps.length} Stages)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {activeExp.steps.map((st, idx) => (
                <div
                  key={st.id}
                  style={{
                    padding: '0.65rem 0.85rem',
                    background: 'var(--pure-white)',
                    border: '1px solid var(--slate-border)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--slate-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>
                      {idx + 1}
                    </span>
                    <span style={{ fontWeight: 600, color: 'var(--deep-charcoal)' }}>
                      {st.name}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--slate-gray)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {st.targetTempC}°C · {st.stirRpm} RPM
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Envelope Warning */}
          <div
            style={{
              padding: '0.85rem 1rem',
              background: 'rgba(255, 170, 0, 0.08)',
              border: '1px solid rgba(255, 170, 0, 0.25)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start'
            }}
          >
            <ShieldCheck size={18} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#92400e' }}>
                Lab Safety Envelope
              </div>
              <div style={{ fontSize: '0.72rem', color: '#78350f', lineHeight: 1.4 }}>
                {activeExp.safetyEnvelope.criticalWarnings[0]}
              </div>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <button
              onClick={onBack}
              className="btn-secondary"
              style={{ fontSize: '0.82rem', padding: '0.6rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <ArrowLeft size={14} /> Back
            </button>

            <button
              onClick={onNext}
              className="btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.65rem 1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'center' }}
            >
              Simulate Kinetics
              <ArrowRight size={15} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
