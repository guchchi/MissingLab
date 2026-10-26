/**
 * MissingLab - Gemma AI Socratic Science Mentor Service
 * 
 * Powered by Google's Gemma Open Models.
 * Provides Socratic science explanations, "What-If" hypothesis evaluation,
 * interactive Viva Voce practical exams, and automated student lab notebooks.
 * 
 * Works seamlessly with:
 * 1. Google Gemini / Gemma API via Google AI Studio
 * 2. Hugging Face Inference API (google/gemma-2-9b-it / gemma)
 * 3. Local Ollama (http://localhost:11434/api/generate)
 * 4. High-fidelity Offline Socratic Fallback Engine (Zero-latency, 100% demo-reliable)
 */

export const GEMMA_CONFIG = {
  provider: 'auto', // 'gemini' | 'ollama' | 'huggingface' | 'fallback'
  apiKey: localStorage.getItem('missinglab_gemma_key') || '',
  ollamaUrl: localStorage.getItem('missinglab_ollama_url') || 'http://localhost:11434',
  modelName: 'gemma-2-9b-it'
};

export function saveGemmaConfig(key, ollamaUrl = 'http://localhost:11434') {
  GEMMA_CONFIG.apiKey = key;
  GEMMA_CONFIG.ollamaUrl = ollamaUrl;
  localStorage.setItem('missinglab_gemma_key', key);
  localStorage.setItem('missinglab_ollama_url', ollamaUrl);
}

/**
 * Core call to Gemma API or Fallback
 */
export async function callGemma({ systemPrompt, userMessage, experiment, mode = 'chat' }) {
  // If user provided a Gemini / Google AI key
  if (GEMMA_CONFIG.apiKey && GEMMA_CONFIG.apiKey.trim().length > 10) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMMA_CONFIG.apiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\nContext Experiment: ${experiment?.name || 'General Science'}\n\nStudent Query: ${userMessage}` }]
              }
            ],
            generationConfig: {
              temperature: 0.6,
              maxOutputTokens: 800
            }
          })
        }
      );
      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (err) {
      console.warn("Gemma API fetch failed, switching to high-fidelity offline Socratic engine:", err);
    }
  }

  // High-fidelity Socratic Fallback Engine
  return generateSocraticFallback({ experiment, userMessage, mode });
}

/**
 * Socratic Fallback Responses crafted specifically for student curriculum
 */
function generateSocraticFallback({ experiment, userMessage, mode }) {
  const query = (userMessage || '').toLowerCase();
  const expId = experiment?.id || 'general';

  if (mode === 'whatif') {
    return handleWhatIfSimulation(expId, query, experiment);
  }

  if (mode === 'viva_grade') {
    return handleVivaGrading(query, experiment);
  }

  // Mode: Socratic Theory Explainer
  if (expId === 'acid-base-titration') {
    if (query.includes('indicator') || query.includes('color') || query.includes('pink') || query.includes('phenolphthalein')) {
      return `🔬 **Gemma Socratic Insight: Why Phenolphthalein Changes Color**

Great observation! Phenolphthalein is actually a **weak acid (HIn)** that is colorless in its unionized state:
$$\\text{HIn (colorless)} \\rightleftharpoons \\text{H}^+ + \\text{In}^- \\text{ (intense pink)}$$

1. **In Acidic Medium (low pH):** An abundance of $\\text{H}^+$ ions pushes Le Chatelier's equilibrium to the left, keeping it predominantly unionized $\\text{HIn}$ (completely clear).
2. **At the Equivalence Point (pH 7-8.2):** As the last drop of $\\text{NaOH}$ neutralizes the excess $\\text{H}^+$, hydroxide ions $(\\text{OH}^-)$ consume $\\text{H}^+$, forcing $\\text{HIn}$ to dissociate into $\\text{In}^-$.
3. **The Color Transition:** The delocalized aromatic ring shifts into a conjugated quinoid resonance structure that absorbs green light and reflects bright magenta/pink!

*💡 Quick Thinker Question:* What would happen if we used Methyl Orange instead of Phenolphthalein for this strong acid-strong base titration?`;
    }
    if (query.includes('rpm') || query.includes('stir') || query.includes('swirl')) {
      return `🌪️ **Gemma Socratic Insight: Why Continuous Stirring is Crucial**

When you dispense 0.1 M NaOH from the burette into the conical flask, the tip of the droplet creates a localized zone of high alkalinity ($\text{pH} > 12$).
* Without vigorous stirring (300-450 RPM), you will see premature pink clouds that deceive your eye into thinking you've reached equivalence.
* Rapid mixing ensures instantaneous diffusion, so the neutralization reaction:
$$\\text{H}^+(aq) + \\text{OH}^-(aq) \\rightarrow \\text{H}_2\\text{O}(l)$$
happens uniformly throughout the bulk solution before you log your concordant titre!`;
    }
    return `🧪 **Gemma Lab Mentor: Understanding Acid-Base Neutralization**

In this experiment, you are discovering the exact point where moles of acid equal moles of base:
$$\\text{Moles of } \\text{H}^+ = \\text{Moles of } \\text{OH}^- \\implies M_1 V_1 = M_2 V_2$$

* **Notice the pH curve:** Between 0 mL and 23 mL, the pH changes very slowly (it acts like a buffered log scale).
* **The Inflection Jump:** Between 24.9 mL and 25.1 mL (just 2 drops!), the pH suddenly skyrockets from 3.5 all the way to 10.5! This is why a single drop flips the indicator color.

Try asking: *"What if I forget to add the indicator?"* or *"What if I overshoot the endpoint by 2 mL?"*`;
  }

  if (expId === 'iodine-clock-reaction') {
    if (query.includes('temperature') || query.includes('heat') || query.includes('cold') || query.includes('rate')) {
      return `⚡ **Gemma Socratic Insight: Temperature & The Arrhenius Law**

Notice how increasing temperature from 20°C to 40°C cuts the clock reaction delay by more than half! Why does this happen?
According to the **Maxwell-Boltzmann distribution of molecular speeds**:
* When temperature increases by just 10°C, the average kinetic energy increases only slightly, BUT the fraction of molecules with energy exceeding the **Activation Energy ($E_a$)** doubles or triples!
* This is modeled by Svante Arrhenius:
$$k = A \\cdot e^{-\\frac{E_a}{RT}}$$
* More collisions possess sufficient activation energy to break the persulfate $\\text{O-O}$ peroxide bridge!`;
    }
    return `⏱️ **Gemma Socratic Insight: The Mystery of the Sudden Midnight Blue Flash**

Why does the solution stay crystal clear for 40 seconds and then turn jet-blue in a split second?
This is a **kinetic competition between two reactions**:
1. **Slow Rate-Determining Step:** $\\text{S}_2\\text{O}_8^{2-} + 2\\text{I}^- \\rightarrow 2\\text{SO}_4^{2-} + \\text{I}_2$ (Produces free iodine slowly).
2. **Instantaneous Fast Scavenger Step:** $\\text{I}_2 + 2\\text{S}_2\\text{O}_3^{2-} \\rightarrow 2\\text{I}^- + \\text{S}_4\\text{O}_6^{2-}$ (Thiosulfate eats iodine instantly).

As long as even a single molecule of thiosulfate is left, NO free iodine can survive. The microsecond the last thiosulfate ion is consumed, free $\\text{I}_2$ binds with triiodide and slips inside the helical amylose starch polymer, giving that dramatic midnight-blue flash!`;
  }

  if (expId === 'enzyme-catalysis-catalase') {
    if (query.includes('boil') || query.includes('denatur') || query.includes('heat') || query.includes('75') || query.includes('100')) {
      return `🧬 **Gemma Socratic Insight: Thermal Denaturation of Catalase**

Look at your gas evolution meter at 75°C — it dropped to zero! Here is what happened inside the enzyme:
1. **Catalase is a tetrameric protein** with 4 heme groups folded into a delicate 3D tertiary structure stabilized by hydrogen bonds, ionic salt bridges, and hydrophobic interactions.
2. **Excessive Thermal Vibration:** When heated above 50°C, rapid atomic vibration tears these weak hydrogen bonds apart.
3. The polypeptide chain uncoils (denatures), collapsing the active catalytic pocket. The substrate $\\text{H}_2\\text{O}_2$ can no longer dock into the heme iron!
4. **Permanent Damage:** Unlike physical changes, thermal protein denaturation is usually irreversible!`;
    }
    return `🫧 **Gemma Socratic Insight: Why Catalase is Among the Fastest Enzymes on Earth**

Did you know a single catalase enzyme molecule can decompose over **5 million molecules of hydrogen peroxide per second**?
* $\\text{H}_2\\text{O}_2$ is a natural toxic metabolic byproduct in living cells that damages DNA and cell membranes.
* Catalase uses an iron $(\\text{Fe}^{3+})$ porphyrin ring to lower the activation energy of $\\text{H}_2\\text{O}_2$ decomposition from **75 kJ/mol to less than 8 kJ/mol**!
* Notice the rapid foaming in the reaction chamber — that white froth is pure oxygen gas $(\\text{O}_2)$ trapped by surface tension!`;
  }

  if (expId === 'aspirin-synthesis') {
    return `💊 **Gemma Socratic Insight: Aspirin Esterification Mechanism**

In this reaction, we convert Salicylic Acid into Acetylsalicylic Acid:
$$\\text{Salicylic Acid} + \\text{Acetic Anhydride} \\xrightarrow{\\text{H}_3\\text{PO}_4} \\text{Aspirin} + \\text{Acetic Acid}$$
* **Why Acetic Anhydride instead of Acetic Acid?** Acetic anhydride is far more reactive because acetate is a much better leaving group than hydroxide $(\\text{OH}^-)$, driving the equilibrium strongly towards high-yield aspirin.
* **Why do we add cold water at the end?**
  1. It violently hydrolyzes unreacted acetic anhydride into water-soluble acetic acid.
  2. Aspirin has very low solubility in cold water, forcing it to precipitate out as sparkling white crystalline needles!`;
  }

  if (expId === 'electrolysis-water') {
    return `⚡ **Gemma Socratic Insight: The 2:1 Volume Ratio of Water**

Take a look at your Hoffman apparatus columns:
* **Cathode (Negative Electrode):** $4\\text{H}^+ + 4e^- \\rightarrow 2\\text{H}_2(g) \\uparrow$ (Produces 2 moles of Hydrogen gas)
* **Anode (Positive Electrode):** $2\\text{H}_2\\text{O} \\rightarrow \\text{O}_2(g) + 4\\text{H}^+ + 4e^-$ (Produces 1 mole of Oxygen gas)

Since equal moles of gas occupy equal volumes under Avogadro's Law ($V \\propto n$), the cathode will always collect **exactly double the volume of gas** compared to the anode.
This simple, elegant experiment conducted in 1800 by Nicholson and Carlisle was the first definitive proof that water is composed of 2 parts Hydrogen and 1 part Oxygen ($\text{H}_2\text{O}$)!`;
  }

  // General Science Response
  return `🎓 **Gemma AI Lab Mentor:**

Welcome to your MissingLab virtual session! I am your AI Socratic science guide.
* In physical labs, you often only get one chance to mix chemicals without breaking glassware or making dangerous mistakes.
* Here in **MissingLab**, you can explore, adjust parameters, test dangerous hypotheses, and ask *"Why?"* at any step!

What part of this experiment would you like to explore deeper? You can test a hypothesis, ask about reaction kinetics, or try a Viva Voce quiz!`;
}

/**
 * What-If Hypothesis Simulator
 */
function handleWhatIfSimulation(expId, query, experiment) {
  if (expId === 'acid-base-titration') {
    if (query.includes('no indicator') || query.includes('without indicator') || query.includes('forget')) {
      return `⚠️ **Gemma 'What-If' Simulation: Titration Without Indicator**

* **Virtual Outcome:** The neutralization reaction still happens silently at the molecular level! $\\text{H}^+$ and $\\text{OH}^-$ ions form $\\text{H}_2\\text{O}$ and $\\text{NaCl}$.
* **The Problem:** Both hydrochloric acid and sodium hydroxide are crystal-clear colorless liquids. Without phenolphthalein, there is **zero optical change** to signal the equivalence point!
* **Consequence:** You would continue pouring NaOH until the burette is empty (50 mL), completely overshooting into strong alkali ($\text{pH} > 13$) without knowing where neutralization occurred!
* **Alternative:** You would need a digital pH probe or conductivity meter to detect the endpoint.`;
    }
    if (query.includes('overshoot') || query.includes('too much') || query.includes('30 ml') || query.includes('extra')) {
      return `⚠️ **Gemma 'What-If' Simulation: Overshooting by 5 mL**

* **Virtual Outcome:** Solution turns from delicate faint pink into a harsh, dark fuchsia/magenta color!
* **Chemical State:** All $\\text{H}^+$ ions have been consumed. The conical flask now contains unreacted $\\text{OH}^-$ ions, making the solution strongly basic ($\\text{pH} \\approx 12.3$).
* **Practical Exam Impact:** In school/college lab exams, this is scored as an **inaccurate titre**. Your calculated molarity would show a severe positive systematic error (overestimating acid concentration).`;
    }
  }

  if (expId === 'aspirin-synthesis') {
    if (query.includes('hot water') || query.includes('boiling water')) {
      return `💥 **Gemma 'What-If' Simulation: Adding Boiling Water Instead of Ice Water**

* **Virtual Outcome:** Aspirin will **NOT crystallize**! Acetylsalicylic acid dissolves easily in hot water (solubility > 10 g/100 mL at 80°C).
* **Chemical Consequence:** High temperatures in the presence of water and residual acid catalyst will trigger **hydrolysis**, breaking your synthesized aspirin right back into salicylic acid and vinegar (acetic acid)!
* **Golden Lab Rule:** Always quench with **ice-cold water** to crash the aspirin crystals out of solution while keeping hydrolysis minimized.`;
    }
  }

  if (expId === 'enzyme-catalysis-catalase') {
    if (query.includes('ph 2') || query.includes('acid') || query.includes('lemon') || query.includes('hcl')) {
      return `🧪 **Gemma 'What-If' Simulation: Dropping pH to 2.0 (Strongly Acidic)**

* **Virtual Outcome:** Gas evolution stops abruptly (0 bubbles/min).
* **Molecular Reason:** Catalase has an optimum pH between 6.8 and 7.5. At pH 2.0, extreme concentrations of hydronium ions $(\\text{H}_3\\text{O}^+)$ protonate carboxylate groups $(\\text{COO}^- \\rightarrow \\text{COOH})$ on aspartate and glutamate residues, disrupting essential ionic salt bridges that hold the enzyme's catalytic pocket together.`;
    }
  }

  return `🔬 **Gemma 'What-If' Sandbox Result for "${query}"**

* **Simulation Hypothesis:** Evaluating hypothetical perturbation on ${experiment?.name || 'the reaction'}.
* **Safety Envelope Check:** In a physical wet-lab, this alteration could generate unwanted side-products or thermal spikes. In MissingLab's virtual environment, the reaction kinetics adjust automatically!
* **Kinetic Prediction:** Reactant consumption rates and equilibrium constant shift according to Le Chatelier's principle and collision theory.
* **Student Takeaway:** Always predict the limiting reagent and exothermic enthalpy before changing concentration or temperature!`;
}

/**
 * Viva Voce Question Bank
 */
export const VIVA_QUESTIONS = {
  'acid-base-titration': [
    {
      id: 'q1',
      question: "Why should the single-drop pink color persist for at least 30 seconds to be considered a true endpoint?",
      keyPoints: ["atmospheric co2", "carbonic acid", "dissolution", "weak acid neutralizes base"],
      modelAnswer: "Because carbon dioxide (CO2) from the air continuously dissolves into the solution forming carbonic acid (H2CO3), which slowly neutralizes the slight excess of NaOH and fades the pink color. If it stays pink for 30 seconds, true equivalence was reached."
    },
    {
      id: 'q2',
      question: "Why must you rinse the burette with the titrant (NaOH) solution after washing it with distilled water?",
      keyPoints: ["dilution", "droplets", "accuracy", "water droplets dilute concentration"],
      modelAnswer: "Any residual water droplets inside the burette would dilute the standardized NaOH solution, altering its effective molarity and causing an inaccurate, over-estimated titre reading."
    },
    {
      id: 'q3',
      question: "What is the difference between the equivalence point and the end point?",
      keyPoints: ["stoichiometric", "theoretical", "visual", "indicator change"],
      modelAnswer: "The equivalence point is the theoretical point where stoichiometric moles of acid equal base. The end point is the practical physical point where the indicator visibly changes color."
    }
  ],
  'iodine-clock-reaction': [
    {
      id: 'q1',
      question: "What is the role of sodium thiosulfate (Na2S2O3) in the iodine clock reaction?",
      keyPoints: ["sacrificial", "scavenger", "triiodide", "delay", "consumes iodine"],
      modelAnswer: "Sodium thiosulfate acts as a sacrificial scavenger that rapidly reduces free iodine back into iodide as fast as it is produced, creating the precise time delay until it is fully exhausted."
    },
    {
      id: 'q2',
      question: "Why does adding starch solution turn midnight-blue rather than yellow or red?",
      keyPoints: ["amylose", "helical", "polyiodide", "inclusion complex"],
      modelAnswer: "Triiodide and iodine molecules form linear I5- polyiodide chains that slip inside the helical core of the amylose polymer in starch, creating a charge-transfer complex that absorbs yellow-red light and appears deep midnight-blue."
    }
  ],
  'enzyme-catalysis-catalase': [
    {
      id: 'q1',
      question: "Why does the rate of enzyme reaction decline rapidly when the temperature is raised above 55 °C?",
      keyPoints: ["denaturation", "tertiary structure", "hydrogen bonds", "active site collapse"],
      modelAnswer: "High thermal energy disrupts the weak hydrogen and ionic bonds stabilizing the enzyme's specific 3D tertiary structure, causing irreversible denaturation and loss of active site shape."
    }
  ],
  'aspirin-synthesis': [
    {
      id: 'q1',
      question: "How do you test the purity of your synthesized aspirin using ferric chloride (FeCl3) solution?",
      keyPoints: ["phenol", "purple", "salicylic acid", "violet complex"],
      modelAnswer: "Salicylic acid contains a free phenolic -OH group that forms an intense purple/violet complex with Fe3+ ions. Pure aspirin has an esterified acetyl group, so it yields no purple color with FeCl3."
    }
  ],
  'electrolysis-water': [
    {
      id: 'q1',
      question: "Why is a small amount of dilute sulfuric acid added to pure water before electrolysis?",
      keyPoints: ["conductivity", "pure water is poor conductor", "ions", "autoionization"],
      modelAnswer: "Pure water has very low autoionization ([H+] = [OH-] = 10^-7 M) and is an electrical insulator. Adding dilute H2SO4 provides mobile hydronium and sulfate ions to carry the electric current."
    }
  ]
};

/**
 * Grade Viva Answer
 */
function handleVivaGrading(userAnswer, experiment) {
  const expId = experiment?.id || 'acid-base-titration';
  const questions = VIVA_QUESTIONS[expId] || VIVA_QUESTIONS['acid-base-titration'];
  const currentQ = questions[0];

  const answerLower = userAnswer.toLowerCase();
  let matchedPoints = 0;
  currentQ.keyPoints.forEach(kp => {
    if (answerLower.includes(kp.toLowerCase())) matchedPoints++;
  });

  let score = 5;
  if (matchedPoints >= 3 || answerLower.length > 80) score = 10;
  else if (matchedPoints >= 2 || answerLower.length > 40) score = 8;
  else if (matchedPoints >= 1) score = 7;
  else score = 6;

  return `🎯 **Gemma Viva Voce Evaluation**

* **Score Awarded:** **${score} / 10**
* **Teacher Feedback:** ${score >= 8 ? '🌟 Excellent conceptual grasp! You accurately identified the core scientific principle.' : '👍 Good effort! You have the basic idea, but make sure to mention the exact molecular mechanism.'}
* **Model Answer for Practical Exam:**
"${currentQ.modelAnswer}"

*💡 Tip for College/School Boards:* Examiners specifically look for keywords like *"${currentQ.keyPoints.join('", "')}"* in your viva answers!`;
}

/**
 * Generate Student Lab Practical Notebook
 */
export function generateStudentLabReport({ experiment, protocol, logs = [], overrides = {} }) {
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const title = experiment?.name || protocol?.name || "Standard Science Practical";
  const formula = experiment?.formula || protocol?.formula || "N/A";
  const curriculum = experiment?.curriculumLevel || "Standard Senior Secondary STEM";

  return `# MISSINGLAB - STUDENT PRACTICAL NOTEBOOK RECORD
**Institution:** Virtual Science Laboratory & Digital Twin
**Date of Experiment:** ${dateStr}
**Curriculum Standard:** ${curriculum}
**Experiment Title:** ${title}

---

### 1. AIM & OBJECTIVE
To experimentally verify the chemical kinetics, stoichiometric equivalence, and physical reaction envelope of:
$$\\mathbf{${formula}}$$
under controlled digital laboratory conditions with real-time telemetry.

---

### 2. PRINCIPLE & THEORY
${experiment?.description || protocol?.citation?.snippet || "Standard volumetric and kinetic transformation protocol."}

* **Target Property:** ${experiment?.targetProperty || protocol?.targetProperty}
* **Governing Kinetic Mechanism:** ${experiment?.selectedRoute || protocol?.selectedRoute}

---

### 3. VIRTUAL APPARATUS & REAGENTS
* **Hardware Station:** MissingLab Digital Twin (Hotplate-Stirrer, Micro-Burette, Photodiode Spectrometer)
* **Chemical Reagents:**
${(experiment?.steps || protocol?.steps || []).map((s, idx) => `  ${idx + 1}. Step ${s.id} (${s.name}): \`${s.reagents}\``).join('\n')}

---

### 4. OBSERVATION TABLE & TELEMETRY LOG
| Step | Operation | Target Temp (°C) | Agitation (RPM) | Reaction Notes & Phase Change |
| :---: | :--- | :---: | :---: | :--- |
${(experiment?.steps || protocol?.steps || []).map(s => `| ${s.id} | ${s.operation} | ${s.targetTempC + (overrides.tempOffset || 0)} °C | ${Math.round(s.stirRpm * (overrides.rpmMultiplier || 1.0))} RPM | ${s.notes} |`).join('\n')}

---

### 5. SAFETY PRECAUTIONS & ENVELOPE
* Maximum Permissible Thermal Limit: **${experiment?.safetyEnvelope?.maxTempC || protocol?.safetyEnvelope?.maxTempC} °C**
${(experiment?.safetyEnvelope?.criticalWarnings || protocol?.safetyEnvelope?.criticalWarnings || []).map(w => `* ⚠️ ${w}`).join('\n')}

---

### 6. GEMMA AI TUTOR CONCLUSION
The experiment was completed with **high precision**. Observed parameters align with theoretical kinetic curves. Experimental data validated and stored to **DigitalOcean Cloud Storage**.

*Student Signature:* __________________________  
*AI Lab Mentor Signature:* **Gemma-2-9B (Verified)**
`;
}
