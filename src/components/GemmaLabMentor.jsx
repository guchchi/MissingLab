import React, { useState } from 'react';
import {
  Sparkles,
  Brain,
  MessageSquare,
  HelpCircle,
  FileCheck,
  Award,
  Send,
  RotateCcw,
  Key,
  Flame,
  CheckCircle2,
  Copy,
  Download,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import {
  callGemma,
  VIVA_QUESTIONS,
  generateStudentLabReport,
  GEMMA_CONFIG,
  saveGemmaConfig
} from '../services/gemmaService';

export default function GemmaLabMentor({ experiment, currentProtocol, logs = [], overrides = {} }) {
  const activeExp = experiment || currentProtocol;
  const [activeTab, setActiveTab] = useState('socratic'); // 'socratic' | 'whatif' | 'viva' | 'notebook'
  
  // Chat state
  const [messages, setMessages] = useState([
    {
      sender: 'gemma',
      text: `Hello! I am **Gemma**, your AI Socratic Science Mentor. 🎓\n\nI am here to guide your experiment on **${activeExp?.name || 'Science Practical'}**.\nAsk me *"Why does this reaction happen?"*, test a *"What-if?"* hypothesis, or practice for your practical **Viva Voce** exam!`
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // What-If state
  const [whatIfInput, setWhatIfInput] = useState('');
  const [whatIfResult, setWhatIfResult] = useState(null);
  const [isWhatIfLoading, setIsWhatIfLoading] = useState(false);

  // Viva state
  const expId = activeExp?.id || 'acid-base-titration';
  const questions = VIVA_QUESTIONS[expId] || VIVA_QUESTIONS['acid-base-titration'];
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [vivaAnswer, setVivaAnswer] = useState('');
  const [vivaEvaluation, setVivaEvaluation] = useState(null);
  const [isVivaLoading, setIsVivaLoading] = useState(false);

  // Notebook state
  const [copiedNotebook, setCopiedNotebook] = useState(false);

  // Settings Modal
  const [showConfig, setShowConfig] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(GEMMA_CONFIG.apiKey || '');
  const [ollamaInput, setOllamaInput] = useState(GEMMA_CONFIG.ollamaUrl || 'http://localhost:11434');

  // Handle Send Chat
  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputMsg;
    if (!text.trim() || isLoading) return;

    const userMessageObj = { sender: 'user', text };
    setMessages(prev => [...prev, userMessageObj]);
    setInputMsg('');
    setIsLoading(true);

    try {
      const response = await callGemma({
        systemPrompt: "You are Gemma, an encouraging, brilliant Socratic Science Mentor for high school and college students.",
        userMessage: text,
        experiment: activeExp,
        mode: 'chat'
      });
      setMessages(prev => [...prev, { sender: 'gemma', text: response }]);
    } catch {
      setMessages(prev => [...prev, { sender: 'gemma', text: "I'm having trouble thinking right now. Please try again!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle What-If Test
  const handleTestWhatIf = async (queryText) => {
    const q = queryText || whatIfInput;
    if (!q.trim() || isWhatIfLoading) return;

    setIsWhatIfLoading(true);
    setWhatIfResult(null);

    try {
      const result = await callGemma({
        systemPrompt: "You are Gemma. The student is testing a What-If scenario in a virtual science lab.",
        userMessage: q,
        experiment: activeExp,
        mode: 'whatif'
      });
      setWhatIfResult(result);
    } finally {
      setIsWhatIfLoading(false);
    }
  };

  // Handle Viva Submit
  const handleSubmitViva = async () => {
    if (!vivaAnswer.trim() || isVivaLoading) return;

    setIsVivaLoading(true);
    try {
      const result = await callGemma({
        systemPrompt: "You are an external practical examiner grading a student's oral viva voce response.",
        userMessage: vivaAnswer,
        experiment: activeExp,
        mode: 'viva_grade'
      });
      setVivaEvaluation(result);
    } finally {
      setIsVivaLoading(false);
    }
  };

  // Quick chips for student questions
  const quickPrompts = [
    "Why does the color change?",
    "What is the role of the catalyst?",
    "Why is temperature ramped slowly?",
    "What is the chemical reaction mechanism?"
  ];

  const whatIfChips = [
    "What if I forget the indicator?",
    "What if I heat it to 100°C?",
    "What if I double the concentration?",
    "What if I don't stir continuously?"
  ];

  const labReportText = generateStudentLabReport({
    experiment: activeExp,
    protocol: currentProtocol,
    logs,
    overrides
  });

  const handleCopyReport = () => {
    navigator.clipboard.writeText(labReportText);
    setCopiedNotebook(true);
    setTimeout(() => setCopiedNotebook(false), 2500);
  };

  const handleSaveConfig = () => {
    saveGemmaConfig(apiKeyInput, ollamaInput);
    setShowConfig(false);
  };

  return (
    <div
      className="notebook-card"
      style={{
        background: 'var(--pure-white)',
        border: '1px solid var(--slate-border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(11, 28, 48, 0.06)'
      }}
    >
      {/* ── Top Header ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--slate-border)',
          background: 'linear-gradient(135deg, rgba(209, 243, 77, 0.12) 0%, rgba(0, 242, 254, 0.08) 100%)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0, 242, 254, 0.3)'
            }}
          >
            <Brain size={20} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--deep-charcoal)' }}>
                Gemma Socratic AI Lab Mentor
              </h3>
              <span className="lab-badge lab-badge-lime" style={{ fontSize: '0.62rem', padding: '0.15rem 0.5rem' }}>
                Gemma-2-9B Powered
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--slate-gray)' }}>
              Interactive science tutor, 'What-If' safety sandbox & oral viva examiner
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="btn-ghost"
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.7rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            title="Configure Google AI Studio API Key or Ollama"
          >
            <Key size={13} />
            {GEMMA_CONFIG.apiKey ? 'API Connected' : 'Gemma Settings'}
          </button>
        </div>
      </div>

      {/* ── Settings Accordion ── */}
      {showConfig && (
        <div
          style={{
            padding: '1rem 1.5rem',
            background: 'var(--slate-light)',
            borderBottom: '1px solid var(--slate-border)',
            fontSize: '0.82rem'
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--deep-charcoal)' }}>
            ⚙️ Gemma AI Engine Configuration
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--slate-gray)', marginBottom: '0.25rem' }}>
                Google AI Studio / Gemini API Key (Optional):
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--slate-border)',
                  fontSize: '0.8rem'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--slate-gray)', marginBottom: '0.25rem' }}>
                Local Ollama URL (Optional for self-hosted Gemma):
              </label>
              <input
                type="text"
                value={ollamaInput}
                onChange={(e) => setOllamaInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--slate-border)',
                  fontSize: '0.8rem'
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--slate-gray)' }}>
              💡 If left blank, MissingLab automatically uses our built-in high-fidelity Socratic Science Engine!
            </span>
            <button
              onClick={handleSaveConfig}
              className="btn-primary"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.85rem' }}
            >
              Save Configuration
            </button>
          </div>
        </div>
      )}

      {/* ── Mode Selection Navigation Tabs ── */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--slate-border)',
          background: 'var(--pure-white)',
          padding: '0 1rem'
        }}
      >
        {[
          { id: 'socratic', label: 'Socratic Tutor', icon: <MessageSquare size={14} />, badge: 'Q&A' },
          { id: 'whatif', label: "'What-If?' Sandbox", icon: <Flame size={14} />, badge: 'Simulate' },
          { id: 'viva', label: 'Viva Voce Exam', icon: <Award size={14} />, badge: 'Quiz' },
          { id: 'notebook', label: 'Lab Practical Notebook', icon: <FileCheck size={14} />, badge: 'Export' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 1.1rem',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === tab.id ? '2px solid #00f2fe' : '2px solid transparent',
              color: activeTab === tab.id ? 'var(--deep-charcoal)' : 'var(--slate-gray)',
              fontWeight: activeTab === tab.id ? 700 : 500,
              fontSize: '0.82rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab 1: Socratic Lab Tutor Chat ── */}
      {activeTab === 'socratic' && (
        <div style={{ padding: '1.25rem' }}>
          {/* Quick Prompts */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--slate-gray)', alignSelf: 'center', fontWeight: 600 }}>
              💡 Ask Gemma:
            </span>
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp)}
                style={{
                  background: 'var(--slate-light)',
                  border: '1px solid var(--slate-border)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.72rem',
                  color: 'var(--deep-charcoal)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div
            style={{
              height: '280px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              padding: '0.75rem',
              background: '#fbfcfd',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--slate-border)',
              marginBottom: '0.75rem'
            }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: m.sender === 'user' ? 'var(--deep-charcoal)' : 'var(--pure-white)',
                  color: m.sender === 'user' ? '#fff' : 'var(--deep-charcoal)',
                  padding: '0.75rem 1rem',
                  borderRadius: m.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  border: m.sender === 'user' ? 'none' : '1px solid var(--slate-border)',
                  fontSize: '0.82rem',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                {m.text}
              </div>
            ))}
            {isLoading && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  background: 'var(--pure-white)',
                  padding: '0.6rem 1rem',
                  borderRadius: '14px',
                  border: '1px solid var(--slate-border)',
                  fontSize: '0.78rem',
                  color: 'var(--slate-gray)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span className="pulse-indicator" />
                Gemma is formulating an explanation...
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder={`Ask Gemma about ${activeExp?.name || 'this reaction'}...`}
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              style={{
                flex: 1,
                padding: '0.6rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--slate-border)',
                fontSize: '0.82rem',
                outline: 'none'
              }}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMsg.trim()}
              className="btn-primary"
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '0.5rem 1.25rem',
                fontSize: '0.82rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Send size={14} />
              Send
            </button>
          </div>
        </div>
      )}

      {/* ── Tab 2: What-If Sandbox ── */}
      {activeTab === 'whatif' && (
        <div style={{ padding: '1.25rem' }}>
          <div
            style={{
              padding: '0.85rem 1.25rem',
              background: 'rgba(255, 170, 0, 0.08)',
              border: '1px solid rgba(255, 170, 0, 0.25)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1rem',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start'
            }}
          >
            <AlertTriangle size={18} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#92400e' }}>
                Safe Virtual Experimentation Sandbox
              </div>
              <div style={{ fontSize: '0.75rem', color: '#78350f', lineHeight: 1.4 }}>
                In a real wet-lab, doing unauthorized changes can cause fires, acid splashes, or toxic gas evolution. In <strong>MissingLab</strong>, you can test crazy or dangerous ideas safely! Gemma will simulate what happens at the molecular level.
              </div>
            </div>
          </div>

          {/* Quick What-If Chips */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {whatIfChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setWhatIfInput(chip);
                  handleTestWhatIf(chip);
                }}
                style={{
                  background: 'var(--slate-light)',
                  border: '1px solid var(--slate-border)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.3rem 0.75rem',
                  fontSize: '0.72rem',
                  color: 'var(--deep-charcoal)',
                  cursor: 'pointer'
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* What-If Input */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="e.g. What if I heat to 150°C without cooling? What if I add acid to water?"
              value={whatIfInput}
              onChange={(e) => setWhatIfInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTestWhatIf()}
              style={{
                flex: 1,
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--slate-border)',
                fontSize: '0.82rem'
              }}
            />
            <button
              onClick={() => handleTestWhatIf()}
              disabled={isWhatIfLoading || !whatIfInput.trim()}
              className="btn-primary"
              style={{
                padding: '0.5rem 1.25rem',
                fontSize: '0.82rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Flame size={15} />
              Simulate Outcome
            </button>
          </div>

          {/* Result Card */}
          {whatIfResult && (
            <div
              style={{
                padding: '1.25rem',
                background: '#f8fafc',
                border: '1px solid var(--slate-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                animation: 'fadeIn 0.3s ease'
              }}
            >
              {whatIfResult}
            </div>
          )}

          {isWhatIfLoading && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--slate-gray)', fontSize: '0.8rem' }}>
              <span className="pulse-indicator" style={{ marginRight: '0.5rem' }} />
              Simulating hypothetical chemical kinetics and thermal hazards...
            </div>
          )}
        </div>
      )}

      {/* ── Tab 3: Viva Voce Exam ── */}
      {activeTab === 'viva' && (
        <div style={{ padding: '1.25rem' }}>
          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, rgba(209, 243, 77, 0.15) 0%, rgba(255, 255, 255, 0.8) 100%)',
              border: '1px solid var(--slate-border)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="lab-badge lab-badge-lime" style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                Oral Practical Exam Question {currentQIndex + 1} of {questions.length}
              </span>
              <button
                onClick={() => {
                  setCurrentQIndex((currentQIndex + 1) % questions.length);
                  setVivaAnswer('');
                  setVivaEvaluation(null);
                }}
                className="btn-ghost"
                style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <RotateCcw size={12} />
                Next Question
              </button>
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--deep-charcoal)', lineHeight: 1.4 }}>
              "{questions[currentQIndex]?.question}"
            </div>
          </div>

          {/* Student Answer Textarea */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-gray)', marginBottom: '0.4rem' }}>
              Your Answer (Speak or type like you would in front of the lab examiner):
            </label>
            <textarea
              rows={3}
              placeholder="e.g. The pink color fades because atmospheric CO2 dissolves into carbonic acid which slowly neutralizes the slight excess of NaOH..."
              value={vivaAnswer}
              onChange={(e) => setVivaAnswer(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--slate-border)',
                fontSize: '0.82rem',
                fontFamily: 'inherit',
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button
              onClick={handleSubmitViva}
              disabled={isVivaLoading || !vivaAnswer.trim()}
              className="btn-primary"
              style={{
                padding: '0.5rem 1.5rem',
                fontSize: '0.82rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Award size={15} />
              Submit to Examiner
            </button>
          </div>

          {/* Evaluation Result */}
          {vivaEvaluation && (
            <div
              style={{
                padding: '1.25rem',
                background: '#f8fafc',
                border: '1px solid var(--slate-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                animation: 'fadeIn 0.3s ease'
              }}
            >
              {vivaEvaluation}
            </div>
          )}

          {isVivaLoading && (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--slate-gray)', fontSize: '0.8rem' }}>
              <span className="pulse-indicator" style={{ marginRight: '0.5rem' }} />
              Examiner Gemma is analyzing your answer against model criteria...
            </div>
          )}
        </div>
      )}

      {/* ── Tab 4: Lab Practical Notebook Export ── */}
      {activeTab === 'notebook' && (
        <div style={{ padding: '1.25rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}
          >
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--deep-charcoal)' }}>
                Official Student Practical Lab Notebook
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-gray)' }}>
                Auto-generated with aim, theory, telemetry observation table & precautions.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleCopyReport}
                className="btn-secondary"
                style={{
                  fontSize: '0.75rem',
                  padding: '0.4rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                {copiedNotebook ? <CheckCircle2 size={13} color="green" /> : <Copy size={13} />}
                {copiedNotebook ? 'Copied to Clipboard!' : 'Copy Markdown'}
              </button>
              <button
                onClick={() => window.print()}
                className="btn-primary"
                style={{
                  fontSize: '0.75rem',
                  padding: '0.4rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Download size={13} />
                Print / Save PDF
              </button>
            </div>
          </div>

          <pre
            style={{
              padding: '1.25rem',
              background: '#0d131f',
              color: '#e2e8f0',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.78rem',
              lineHeight: 1.5,
              maxHeight: '380px',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
              fontFamily: 'JetBrains Mono, monospace',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {labReportText}
          </pre>
        </div>
      )}
    </div>
  );
}
