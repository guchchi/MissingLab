import React, { useState } from 'react';
import WizardHeader from './components/WizardHeader';
import StepIntro from './components/StepIntro';
import StepLiterature from './components/StepLiterature';
import StepKinetics from './components/StepKinetics';
import StepExecution from './components/StepExecution';
import ArchitectureDocsModal from './components/ArchitectureDocsModal';
import ConnectLabModal from './components/ConnectLabModal';
import DigitalOceanModal from './components/DigitalOceanModal';
import GemmaLabMentor from './components/GemmaLabMentor';
import { STUDENT_EXPERIMENTS } from './data/studentExperiments';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentProtocol, setCurrentProtocol] = useState(STUDENT_EXPERIMENTS[0]);
  const [overrides, setOverrides] = useState({ tempOffset: 0, rpmMultiplier: 1.0, timeScale: 1.0 });
  const [isRunning, setIsRunning] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [showConnectLabModal, setShowConnectLabModal] = useState(false);
  const [showDigitalOceanModal, setShowDigitalOceanModal] = useState(false);

  // Serial & Simulation Telemetry Logs
  const [logs, setLogs] = useState([
    {
      timestamp: new Date().toLocaleTimeString(),
      tag: "MISSINGLAB:INIT",
      message: "MissingLab v3.0 initialized. Student Digital Twin & Socratic AI Mentor ready."
    },
    {
      timestamp: new Date().toLocaleTimeString(),
      tag: "GEMMA:ONLINE",
      message: "Google Gemma-2-9B model authenticated. Ready for Socratic science mentoring & Viva exam."
    },
    {
      timestamp: new Date().toLocaleTimeString(),
      tag: "DIGITALOCEAN:CLOUD",
      message: "Connected to DigitalOcean App Platform edge runtime (BLR1 / NYC3). Spaces storage verified."
    }
  ]);

  const addLog = (tag, message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [
      ...prev.slice(-30),
      { timestamp, tag, message }
    ]);
  };

  const handleSelectProtocol = (proto) => {
    setCurrentProtocol(proto);
    setOverrides({ tempOffset: 0, rpmMultiplier: 1.0, timeScale: 1.0 });
    setIsRunning(false);
    addLog("EXPERIMENT_SELECT", `Loaded ${proto.name} (${proto.steps.length} stages). Safe thermal ceiling: ${proto.safetyEnvelope.maxTempC}°C.`);
  };

  const handleResetAll = () => {
    setCurrentStep(1);
    setIsRunning(false);
    setOverrides({ tempOffset: 0, rpmMultiplier: 1.0, timeScale: 1.0 });
  };

  return (
    <div className="app-shell">
      {/* Top Stepper Navigation Header */}
      <WizardHeader
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        onOpenDocs={() => setShowDocsModal(true)}
        onOpenConnectLab={() => setShowConnectLabModal(true)}
        onOpenDigitalOcean={() => setShowDigitalOceanModal(true)}
      />

      {/* Step 1: Introduction & System Onboarding */}
      {currentStep === 1 && (
        <StepIntro 
          onStart={() => setCurrentStep(2)}
          onSelectProtocol={(proto) => {
            handleSelectProtocol(proto);
            setCurrentStep(2);
          }}
          onOpenDigitalOcean={() => setShowDigitalOceanModal(true)}
        />
      )}

      {/* Step 2: Curriculum Science Catalog */}
      {currentStep === 2 && (
        <StepLiterature
          currentProtocol={currentProtocol}
          onSelectProtocol={handleSelectProtocol}
          onNext={() => setCurrentStep(3)}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {/* Step 3: Verify & Visualize Reactive Kinetics + Gemma AI Mentor */}
      {currentStep === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <StepKinetics
            protocol={currentProtocol}
            overrides={overrides}
            setOverrides={setOverrides}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />

          {/* Socratic Gemma AI Lab Mentor embedded directly below kinetics */}
          <GemmaLabMentor
            experiment={currentProtocol}
            currentProtocol={currentProtocol}
            logs={logs}
            overrides={overrides}
          />
        </div>
      )}

      {/* Step 4: Digital Twin Lab Execution Cockpit + Viva Voce & Notebook */}
      {currentStep === 4 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <StepExecution
            protocol={currentProtocol}
            overrides={overrides}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            logs={logs}
            onAddLog={addLog}
            onBack={() => setCurrentStep(3)}
            onResetAll={handleResetAll}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            onOpenDocs={() => setShowDocsModal(true)}
            onOpenConnectLab={() => setShowConnectLabModal(true)}
          />

          {/* Gemma AI Mentor for Viva Voce and Lab Notebook generation */}
          <GemmaLabMentor
            experiment={currentProtocol}
            currentProtocol={currentProtocol}
            logs={logs}
            overrides={overrides}
          />
        </div>
      )}

      {/* Architecture Documentation Modal */}
      <ArchitectureDocsModal
        isOpen={showDocsModal}
        onClose={() => setShowDocsModal(false)}
      />

      {/* Laboratory Hardware Bridge & ESP Connection Modal */}
      <ConnectLabModal
        isOpen={showConnectLabModal}
        onClose={() => setShowConnectLabModal(false)}
        protocol={currentProtocol}
        onAddLog={addLog}
      />

      {/* DigitalOcean Cloud Bridge Modal */}
      <DigitalOceanModal
        isOpen={showDigitalOceanModal}
        onClose={() => setShowDigitalOceanModal(false)}
      />
    </div>
  );
}
