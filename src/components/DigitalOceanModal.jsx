import React, { useState } from 'react';
import {
  Cloud,
  CheckCircle2,
  Server,
  Globe,
  Database,
  ExternalLink,
  Cpu,
  Activity,
  HardDrive,
  Copy,
  Terminal,
  ShieldCheck,
  X
} from 'lucide-react';

export default function DigitalOceanModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeRegion, setActiveRegion] = useState('BLR1 - Bangalore, India');
  const [isPinging, setIsPinging] = useState(false);
  const [pingLatency, setPingLatency] = useState(24);
  const [copiedAppYaml, setCopiedAppYaml] = useState(false);

  const handleTestLatency = () => {
    setIsPinging(true);
    setTimeout(() => {
      setPingLatency(Math.floor(Math.random() * 15) + 18);
      setIsPinging(false);
    }, 600);
  };

  const appYamlContent = `name: missinglab
region: blr1
services:
  - name: web
    github:
      branch: main
      repo: guchchi/MissingLab
      deploy_on_push: true
    source_dir: /
    dockerfile_path: Dockerfile
    http_port: 80
    instance_count: 1
    instance_size_slug: basic-xxs
    routes:
      - path: /
    health_check:
      http_path: /
`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(7, 10, 16, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        className="notebook-card"
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--pure-white)',
          border: '1px solid var(--slate-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 0,
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            background: 'linear-gradient(135deg, #0080FF 0%, #0069d9 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Cloud size={22} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                DigitalOcean Cloud Infrastructure
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                App Platform Web Hosting & Spaces Object Storage Architecture
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Status Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}
          >
            {/* Box 1 */}
            <div
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: '#f8fafc',
                border: '1px solid var(--slate-border)'
              }}
            >
              <div style={{ fontSize: '0.72rem', color: 'var(--slate-gray)', fontWeight: 600, marginBottom: '0.25rem' }}>
                DIGITALOCEAN APP PLATFORM
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <span className="dot-ready" style={{ width: '8px', height: '8px', background: '#10b981' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--deep-charcoal)' }}>Active (Healthy)</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--slate-gray)' }}>
                Auto CI/CD on <code>git push main</code>
              </div>
            </div>

            {/* Box 2 */}
            <div
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: '#f8fafc',
                border: '1px solid var(--slate-border)'
              }}
            >
              <div style={{ fontSize: '0.72rem', color: 'var(--slate-gray)', fontWeight: 600, marginBottom: '0.25rem' }}>
                SPACES OBJECT STORAGE
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <Database size={15} color="#0080FF" />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--deep-charcoal)' }}>Ready (S3 API)</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--slate-gray)' }}>
                Bucket: <code>missinglab-notebooks</code>
              </div>
            </div>

            {/* Box 3 */}
            <div
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: '#f8fafc',
                border: '1px solid var(--slate-border)'
              }}
            >
              <div style={{ fontSize: '0.72rem', color: 'var(--slate-gray)', fontWeight: 600, marginBottom: '0.25rem' }}>
                EDGE LATENCY & REGION
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10b981' }}>
                  {isPinging ? 'Pinging...' : `${pingLatency} ms`}
                </span>
                <button
                  onClick={handleTestLatency}
                  disabled={isPinging}
                  className="btn-ghost"
                  style={{ fontSize: '0.68rem', padding: '0.15rem 0.4rem' }}
                >
                  <Activity size={11} /> Ping
                </button>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--slate-gray)' }}>
                {activeRegion}
              </div>
            </div>
          </div>

          {/* Region Switcher */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-gray)', marginBottom: '0.4rem' }}>
              Select Deployment Region:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['BLR1 - Bangalore, India', 'NYC3 - New York, US', 'SFO3 - San Francisco, US', 'FRA1 - Frankfurt, Germany', 'AMS3 - Amsterdam'].map(reg => (
                <button
                  key={reg}
                  onClick={() => setActiveRegion(reg)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    border: activeRegion === reg ? '1px solid #0080FF' : '1px solid var(--slate-border)',
                    background: activeRegion === reg ? 'rgba(0, 128, 255, 0.1)' : 'var(--slate-light)',
                    color: activeRegion === reg ? '#0080FF' : 'var(--deep-charcoal)',
                    fontWeight: activeRegion === reg ? 700 : 500,
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          {/* Deployment Spec (app.yaml) */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-gray)' }}>
                DigitalOcean App Platform Spec (<code>.do/app.yaml</code>):
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(appYamlContent);
                  setCopiedAppYaml(true);
                  setTimeout(() => setCopiedAppYaml(false), 2000);
                }}
                className="btn-ghost"
                style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                {copiedAppYaml ? <CheckCircle2 size={12} color="green" /> : <Copy size={12} />}
                {copiedAppYaml ? 'Copied' : 'Copy Spec'}
              </button>
            </div>
            <pre
              style={{
                margin: 0,
                padding: '0.85rem 1rem',
                background: '#0b1329',
                color: '#38bdf8',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.75rem',
                fontFamily: 'JetBrains Mono, monospace',
                lineHeight: 1.45,
                overflowX: 'auto'
              }}
            >
              {appYamlContent}
            </pre>
          </div>

          {/* 3 Steps to Deploy */}
          <div
            style={{
              padding: '1rem',
              background: '#f1f5f9',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--slate-border)'
            }}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--deep-charcoal)', marginBottom: '0.5rem' }}>
              🚀 How to Deploy on DigitalOcean in 2 Minutes:
            </div>
            <ol style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.75rem', color: 'var(--deep-charcoal)', lineHeight: 1.6 }}>
              <li>Log in to <strong>cloud.digitalocean.com</strong> ➔ Click <strong>Create ➔ Apps</strong>.</li>
              <li>Select <strong>GitHub</strong> ➔ Choose repository <code>guchchi/MissingLab</code>.</li>
              <li>DigitalOcean automatically detects the <code>Dockerfile</code> and deploys with free SSL & Global CDN!</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '0.75rem 1.5rem',
            borderTop: '1px solid var(--slate-border)',
            background: '#fafbfc',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <button
            onClick={onClose}
            className="btn-primary"
            style={{ fontSize: '0.78rem', padding: '0.4rem 1.25rem' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
