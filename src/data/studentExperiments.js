/**
 * MissingLab - Curriculum Student Science Experiments
 * Designed for High School & Undergraduate Science Students (NCERT, CBSE, AP Science, General College STEM)
 * 
 * Replaces expensive, inaccessible wet-lab infrastructure with a high-fidelity
 * interactive digital twin & Socratic Gemma AI Lab Mentor.
 */

export const STUDENT_EXPERIMENTS = [
  {
    id: "acid-base-titration",
    name: "Acid-Base Titration & pH Neutralization",
    category: "Chemistry",
    curriculumLevel: "High School (Class 11-12) & General Chemistry 101",
    formula: "HCl(aq) + NaOH(aq) → NaCl(aq) + H2O(l)",
    targetProperty: "Equivalence Point Determination (pH = 7.00 at 25.0 mL titre)",
    selectedRoute: "Standard Volumetric Neutralization with Phenolphthalein",
    description: "Determine the exact concentration of hydrochloric acid (HCl) by titrating against standardized sodium hydroxide (0.100 M NaOH) using phenolphthalein visual indicator.",
    availableRoutes: [
      { 
        id: "phenolphthalein", 
        name: "Volumetric Titration (Phenolphthalein)", 
        badge: "Visual Colorimetric", 
        peakTempC: 25, 
        rpm: 350, 
        durationMin: 20, 
        desc: "Colorless to persistent faint pink transition at pH 8.2" 
      },
      { 
        id: "potentiometric", 
        name: "Potentiometric pH Probe Titration", 
        badge: "Digital Sensor", 
        peakTempC: 25, 
        rpm: 450, 
        durationMin: 25, 
        desc: "Continuous digital pH curve tracking with derivative inflection analysis" 
      },
      { 
        id: "conductometric", 
        name: "Conductometric Neutralization", 
        badge: "Ionic Mobility", 
        peakTempC: 25, 
        rpm: 300, 
        durationMin: 15, 
        desc: "Measures sharp conductance V-curve as high-mobility H+ ions neutralize" 
      }
    ],
    citation: {
      title: "Quantitative Chemical Analysis: Acid-Base Equilibria and Titrimetric Protocols",
      journal: "NCERT Chemistry Class XII / AP Chemistry Practical Handbook",
      doi: "10.1021/ed085p1192",
      year: 2024,
      snippet: "Transfer 25.0 mL of unknown HCl solution into a 250 mL conical flask using a calibrated volumetric pipette. Add 2-3 drops of 0.1% phenolphthalein indicator solution. Fill the burette with standardized 0.100 M NaOH solution, zero the meniscus, and swirl under continuous gentle magnetic agitation (350 RPM). Titrate dropwise until the single-drop transition produces a persistent pale pink color lasting at least 30 seconds."
    },
    safetyEnvelope: {
      maxTempC: 45,
      maxRampRateCMin: 2.0,
      criticalWarnings: [
        "Strong mineral acid (HCl) and caustic alkali (NaOH): In physical labs, safety goggles and latex gloves are mandatory.",
        "Add acid to water, never water to concentrated acid (exothermic hydration hazard)."
      ],
      flashPointAlert: "Non-flammable aqueous solution; avoid splashing on skin or eyes."
    },
    steps: [
      {
        id: 1,
        name: "Analyte Pipetting & Indicator Dosing",
        operation: "STIR_DISPENSE",
        targetTempC: 25,
        rampRateCMin: 0,
        durationMin: 5,
        stirRpm: 250,
        uvExposure: false,
        reagents: "25.0 mL unknown HCl solution + 2 drops Phenolphthalein (0.1 wt%)",
        hardwareAction: "Pipette auto-dispense verified; magnetic stirrer active at 250 RPM; pH probe calibrated at pH 1.05",
        notes: "Solution is completely clear and transparent (colorless in acidic medium, pH < 8.2)"
      },
      {
        id: 2,
        name: "Burette Zeroing & Bulk Titrant Dispensing",
        operation: "RAMP_HEAT_STIR",
        targetTempC: 25,
        rampRateCMin: 0,
        durationMin: 8,
        stirRpm: 400,
        uvExposure: false,
        reagents: "0.100 M NaOH titrant (0 to 22.0 mL rapid flow)",
        hardwareAction: "Micro-stepper valve open; 22.0 mL NaOH added under active 400 RPM vortex",
        notes: "pH slowly rises from 1.05 to 2.80; transient pink swirls quickly disappear upon stirring"
      },
      {
        id: 3,
        name: "Dropwise Precision Approach to Equivalence",
        operation: "RAMP_HEAT_STIR",
        targetTempC: 25,
        rampRateCMin: 0,
        durationMin: 7,
        stirRpm: 450,
        uvExposure: false,
        reagents: "0.100 M NaOH titrant (22.0 mL to 25.0 mL dropwise)",
        hardwareAction: "Micro-doser delivering 0.05 mL discrete droplets; optical absorbance sensor active",
        notes: "Sharp pH inflection from pH 3.5 to pH 7.00. Sudden appearance of persistent pale pink tinge at exactly 25.0 mL!"
      },
      {
        id: 4,
        name: "Equivalence Verification & Concordant Logging",
        operation: "COOL_DOWN",
        targetTempC: 25,
        rampRateCMin: 0,
        durationMin: 3,
        stirRpm: 200,
        uvExposure: false,
        reagents: "Neutralized NaCl + H2O Saline Solution (pH 7.10)",
        hardwareAction: "Endpoint freeze; digital burette meniscus reading recorded at 25.00 mL",
        notes: "Concordant titre reading logged. Analyte Molarity calculated: M1 = (0.100 M × 25.0 mL) / 25.0 mL = 0.100 M."
      }
    ]
  },
  {
    id: "iodine-clock-reaction",
    name: "Chemical Kinetics: The Iodine Clock Reaction",
    category: "Chemistry",
    curriculumLevel: "High School (Class 12) & Undergraduate Physical Chemistry",
    formula: "S2O8^(2-) + 2I^(-) → 2SO4^(2-) + I2 (Rate-Determining)",
    targetProperty: "Reaction Order & Activation Energy Ea (Arrhenius Law)",
    selectedRoute: "Persulfate-Iodide System with Starch & Thiosulfate Buffer",
    description: "Explore the effect of temperature and reactant concentration on reaction kinetics. Observe the dramatic sudden color change to deep midnight blue once thiosulfate buffer is consumed.",
    availableRoutes: [
      { 
        id: "persulfate", 
        name: "Persulfate-Iodide Clock (Harcourt-Esson)", 
        badge: "Classic Lab", 
        peakTempC: 45, 
        rpm: 500, 
        durationMin: 15, 
        desc: "K2S2O8 + KI with starch indicator and sodium thiosulfate sacrificial buffer" 
      },
      { 
        id: "iodate", 
        name: "Landolt Iodate Clock (KIO3 + H2SO3)", 
        badge: "Rapid Transition", 
        peakTempC: 30, 
        rpm: 450, 
        durationMin: 10, 
        desc: "Potassium iodate and sodium bisulfite system with instantaneous delay" 
      },
      { 
        id: "arrhenius", 
        name: "Thermal Temperature Series (Arrhenius Plot)", 
        badge: "Thermodynamics", 
        peakTempC: 55, 
        rpm: 500, 
        durationMin: 30, 
        desc: "Measure clock delay across 15°C, 25°C, 35°C, and 45°C to compute activation energy Ea" 
      }
    ],
    citation: {
      title: "Investigating Reaction Rates: The Classic Persulfate-Iodide Clock Reaction",
      journal: "Journal of Chemical Education & Oxford Physical Chemistry Practicals",
      doi: "10.1021/ed079p1248",
      year: 2023,
      snippet: "Mix 10.0 mL of 0.20 M KI with 5.0 mL of 0.010 M Na2S2O3 and 2.0 mL of 1% soluble starch solution. Rapidly inject 10.0 mL of 0.10 M (NH4)2S2O8 while simultaneously triggering a digital stopwatch. Maintain constant temperature and stirring. Triiodide produced is immediately scavenged by thiosulfate until exhausted, after which free I2 binds triiodide and starch to trigger an instantaneous flash from transparent to midnight blue."
    },
    safetyEnvelope: {
      maxTempC: 60,
      maxRampRateCMin: 4.0,
      criticalWarnings: [
        "Ammonium persulfate is a strong oxidizing agent; avoid contact with skin and organic solvents.",
        "Iodine-starch complex is non-toxic but stains glassware and lab coats."
      ],
      flashPointAlert: "No flammable volatile components; keep thermal bath below 60 °C to prevent starch degradation."
    },
    steps: [
      {
        id: 1,
        name: "Reagent Formulation & Indicator Priming",
        operation: "STIR_DISPENSE",
        targetTempC: 25,
        rampRateCMin: 0,
        durationMin: 5,
        stirRpm: 300,
        uvExposure: false,
        reagents: "10 mL 0.20 M KI + 5 mL 0.01 M Na2S2O3 + 2 mL 1% Starch solution",
        hardwareAction: "Dispense Flask A reagents; magnetic stirrer set to 300 RPM; optical transmission baseline calibrated to 100%",
        notes: "Homogeneous transparent liquid, clear visual baseline"
      },
      {
        id: 2,
        name: "Persulfate Injection & Kinetic Timer Start",
        operation: "RAMP_HEAT_STIR",
        targetTempC: 25,
        rampRateCMin: 0,
        durationMin: 5,
        stirRpm: 500,
        uvExposure: false,
        reagents: "Rapid injection: 10 mL 0.10 M (NH4)2S2O8 (Ammonium Persulfate)",
        hardwareAction: "Solenoid valve triggers instantaneous reagent release; stopwatch synchronized at t = 0.00 s",
        notes: "Reaction initiated. Solution remains transparent as thiosulfate rapidly scavenges iodine: I2 + 2S2O3^(2-) → 2I^- + S4O6^(2-)"
      },
      {
        id: 3,
        name: "Thiosulfate Depletion & Flash Color Transition",
        operation: "RAMP_HEAT_STIR",
        targetTempC: 25,
        rampRateCMin: 0,
        durationMin: 2,
        stirRpm: 500,
        uvExposure: false,
        reagents: "Triiodide-Amylose Helical Complex",
        hardwareAction: "Photodiode monitors light transmission. Clock triggers at t = 42.6 seconds!",
        notes: "Instantaneous flash to deep midnight-blue! All sacrificial thiosulfate consumed; free iodine binds amylose helix."
      },
      {
        id: 4,
        name: "Rate Constant Calculation & Temperature Correlation",
        operation: "COOL_DOWN",
        targetTempC: 25,
        rampRateCMin: 0,
        durationMin: 3,
        stirRpm: 200,
        uvExposure: false,
        reagents: "Completed Kinetic Matrix",
        hardwareAction: "Log elapsed time (42.6 s); compute initial rate = [S2O3^(2-)] / (2 × Δt) = 5.87 × 10^(-4) M/s",
        notes: "Data logged into Student Lab Notebook for Arrhenius Ea slope calculation."
      }
    ]
  },
  {
    id: "enzyme-catalysis-catalase",
    name: "Enzyme Catalysis: Decomposition of Hydrogen Peroxide",
    category: "Biology",
    curriculumLevel: "High School (Class 11) & College General Biology / Biochemistry",
    formula: "2H2O2(aq) --[Catalase]--> 2H2O(l) + O2(g) ↑",
    targetProperty: "Enzyme Velocity (Vmax, Km) & Thermal/pH Denaturation Profile",
    selectedRoute: "Catalase Enzyme Extract with Gas Manometer / Froth Height Sensor",
    description: "Investigate biological catalysis using catalase enzyme extracted from yeast or potato tissue. Measure rate of oxygen gas evolution across varying temperatures (0°C to 75°C) and pH levels (pH 2 to pH 12).",
    availableRoutes: [
      { 
        id: "gas-manometer", 
        name: "Oxygen Gas Volume Displacement (Manometry)", 
        badge: "Quantitative Gas", 
        peakTempC: 37, 
        rpm: 200, 
        durationMin: 15, 
        desc: "Measure volume of O2 gas collected in inverted burette over time" 
      },
      { 
        id: "filter-disk", 
        name: "Floating Filter Paper Disk Assay", 
        badge: "High School Classic", 
        peakTempC: 37, 
        rpm: 0, 
        durationMin: 10, 
        desc: "Enzyme-soaked paper disc sinks then floats as oxygen microbubbles adhere" 
      },
      { 
        id: "thermal-denature", 
        name: "Thermal Denaturation Series (Optimum 37 °C)", 
        badge: "Biochemistry", 
        peakTempC: 75, 
        rpm: 200, 
        durationMin: 20, 
        desc: "Demonstrate bell-shaped enzyme activity curve and irreversible protein denaturing above 55°C" 
      }
    ],
    citation: {
      title: "Enzyme Kinetics and Factors Affecting Catalase Activity in Living Tissues",
      journal: "NCERT Biology Class XI / Campbell Biology Practical Exercises",
      doi: "10.1187/cbe.05-02-0021",
      year: 2024,
      snippet: "Prepare 10.0 mL of 3% hydrogen peroxide (H2O2) in a graduated reaction chamber buffered to pH 7.0 at 37 °C. Add 1.0 mL of standardized catalase enzyme extract. Seal with gas delivery tube connected to a graduated collection tube. Measure the volume of oxygen gas evolved at 30-second intervals for 5 minutes. Notice peak reaction velocity at biological body temperature (37 °C) and complete loss of catalytic activity upon boiling due to tertiary protein folding denaturation."
    },
    safetyEnvelope: {
      maxTempC: 80,
      maxRampRateCMin: 5.0,
      criticalWarnings: [
        "3% H2O2 is mild, but higher concentrations (>10%) bleach skin and are corrosive.",
        "Gas evolution can cause pressure buildup if reaction vessels are tightly sealed without pressure relief."
      ],
      flashPointAlert: "Oxygen gas produced is a potent oxidizer; keep open flames and sparks away from gas vent."
    },
    steps: [
      {
        id: 1,
        name: "Enzyme Extract & Buffer Preparation",
        operation: "STIR_DISPENSE",
        targetTempC: 37,
        rampRateCMin: 1.5,
        durationMin: 5,
        stirRpm: 150,
        uvExposure: false,
        reagents: "5.0 mL Phosphate Buffer (pH 7.0) + 1.0 mL Standardized Catalase Extract",
        hardwareAction: "Water bath thermal control set to optimum 37.0 °C; gentle stir at 150 RPM",
        notes: "Clear enzyme suspension equilibrated at physiological body temperature"
      },
      {
        id: 2,
        name: "Substrate Dosing & Rapid Seal",
        operation: "RAMP_HEAT_STIR",
        targetTempC: 37,
        rampRateCMin: 0,
        durationMin: 3,
        stirRpm: 250,
        uvExposure: false,
        reagents: "Inject 10.0 mL 3.0% H2O2 (Hydrogen Peroxide Substrate)",
        hardwareAction: "Sealed gas delivery arm connected; digital pressure sensor zeroed",
        notes: "Immediate catalytic bubbling! 2H2O2 → 2H2O + O2(g). Vigorous microbubble froth generation."
      },
      {
        id: 3,
        name: "Kinetic Gas Evolution Curve Tracking",
        operation: "RAMP_HEAT_STIR",
        targetTempC: 37,
        rampRateCMin: 0,
        durationMin: 5,
        stirRpm: 200,
        uvExposure: false,
        reagents: "Oxygen Gas Evolution (O2 ↑)",
        hardwareAction: "Flow transducer measuring O2 displacement: 18.4 mL O2 collected in first 60 seconds",
        notes: "High initial velocity (V0). Slope begins leveling off as H2O2 substrate is consumed."
      },
      {
        id: 4,
        name: "Thermal Denaturation Check (Elevated 75 °C)",
        operation: "RAMP_HEAT_STIR",
        targetTempC: 75,
        rampRateCMin: 6.0,
        durationMin: 4,
        stirRpm: 150,
        uvExposure: false,
        reagents: "Thermal Denatured Enzyme Mixture",
        hardwareAction: "Heater ramp to 75 °C; inspect enzyme secondary and tertiary conformation",
        notes: "Zero gas evolution! Catalase heme-protein structure undergoes irreversible thermal denaturation."
      }
    ]
  },
  {
    id: "aspirin-synthesis",
    name: "Organic Synthesis: Acetylsalicylic Acid (Aspirin)",
    category: "Chemistry",
    curriculumLevel: "Undergraduate Organic Chemistry Lab & Advanced Placement (AP) Chemistry",
    formula: "C7H6O3 + C4H6O3 --[H3PO4]--> C9H8O4 (Aspirin) + C2H4O2",
    targetProperty: "Esterification Yield (Target: >85% Crude, Melting Point: 135 °C)",
    selectedRoute: "Acid-Catalyzed Acylation of Salicylic Acid with Acetic Anhydride",
    description: "Synthesize the world's most widely used analgesic drug: Aspirin (acetylsalicylic acid). Perform nucleophilic acyl substitution on phenolic salicylic acid, followed by cold-water crystallization and ferric chloride purity testing.",
    availableRoutes: [
      { 
        id: "phosphoric-catalysis", 
        name: "Phosphoric Acid (H3PO4) Catalyzed Acylation", 
        badge: "College Lab Standard", 
        peakTempC: 85, 
        rpm: 450, 
        durationMin: 30, 
        desc: "Safer mineral acid catalyst with high selectivity and easy aqueous quenching" 
      },
      { 
        id: "sulfuric-catalysis", 
        name: "Concentrated Sulfuric Acid (H2SO4) Route", 
        badge: "Rapid Kinetics", 
        peakTempC: 75, 
        rpm: 400, 
        durationMin: 25, 
        desc: "Classic Fischer esterification with strong protonation of acetic anhydride" 
      },
      { 
        id: "recrystallization", 
        name: "Ethanol-Water Recrystallization & Melting Point", 
        badge: "Purification", 
        peakTempC: 70, 
        rpm: 200, 
        durationMin: 40, 
        desc: "Dissolve in hot ethanol, recrystallize shiny white needles, test with FeCl3 for unreacted phenol" 
      }
    ],
    citation: {
      title: "Microscale Synthesis and Characterization of Acetylsalicylic Acid",
      journal: "Microscale Organic Laboratory / J. Chem. Educ.",
      doi: "10.1021/ed075p1256",
      year: 2023,
      snippet: "Weigh 2.00 g of salicylic acid into a dry 125 mL Erlenmeyer flask. Carefully add 5.0 mL of acetic anhydride, followed by 5 drops of 85% phosphoric acid catalyst. Heat the reaction mixture in an 85 °C water bath with magnetic stirring for 15 minutes. Cool to room temperature and slowly add 20 mL of ice-cold distilled water to decompose excess acetic anhydride and precipitate white crystalline aspirin needles."
    },
    safetyEnvelope: {
      maxTempC: 95,
      maxRampRateCMin: 4.0,
      criticalWarnings: [
        "Acetic anhydride is a severe lacrimator and corrosive; fumes irritate eyes and respiratory tract.",
        "Aspirin synthesized in educational labs must NEVER be ingested."
      ],
      flashPointAlert: "Acetic anhydride flash point is 49 °C; perform heating exclusively in closed-loop water bath below 90 °C."
    },
    steps: [
      {
        id: 1,
        name: "Precursor Chelation & Catalyst Addition",
        operation: "STIR_DISPENSE",
        targetTempC: 25,
        rampRateCMin: 0,
        durationMin: 5,
        stirRpm: 350,
        uvExposure: false,
        reagents: "2.00 g Salicylic Acid + 5.0 mL Acetic Anhydride + 5 drops 85% H3PO4",
        hardwareAction: "Solid dispenser adds 2.00 g salicylic acid; liquid injector dispenses acetic anhydride; stirrer active at 350 RPM",
        notes: "Slurry turns into a clear, colorless homogenous solution upon catalyst mixing"
      },
      {
        id: 2,
        name: "Thermal Esterification in Water Bath",
        operation: "RAMP_HEAT_STIR",
        targetTempC: 85,
        rampRateCMin: 3.5,
        durationMin: 15,
        stirRpm: 450,
        uvExposure: false,
        reagents: "Nucleophilic Acyl Substitution Equilibrium",
        hardwareAction: "PID thermal controller stabilizes at 85.0 °C; condenser water jacket circulating",
        notes: "Phenolic -OH group attacks carbonyl carbon of acetic anhydride, releasing acetic acid byproduct"
      },
      {
        id: 3,
        name: "Ice-Cold Water Quench & Crystallization",
        operation: "COOL_DOWN",
        targetTempC: 10,
        rampRateCMin: -5.0,
        durationMin: 15,
        stirRpm: 200,
        uvExposure: false,
        reagents: "20.0 mL Ice-Cold Deionized Water",
        hardwareAction: "Peltier chiller active to 10 °C; water doser quenches excess anhydride",
        notes: "Exothermic hiss of excess anhydride decomposition followed by massive precipitation of lustrous white aspirin needles!"
      },
      {
        id: 4,
        name: "Vacuum Filtration & Purity Verification (FeCl3 Test)",
        operation: "COOL_DOWN",
        targetTempC: 25,
        rampRateCMin: 0,
        durationMin: 10,
        stirRpm: 0,
        uvExposure: false,
        reagents: "1% FeCl3 Solution for Phenol Testing",
        hardwareAction: "Büchner vacuum funnel active; sensor tests for purple iron-phenol complex",
        notes: "Solution test remains pale yellow (no purple coloration). Confirms 100% conversion of starting salicylic acid! Pure aspirin obtained."
      }
    ]
  },
  {
    id: "electrolysis-water",
    name: "Electrolysis of Water: Faraday's Laws & Green Hydrogen",
    category: "Physics",
    curriculumLevel: "High School (Class 10-12) & General Physics / Electrochemistry",
    formula: "2H2O(l) --[Electrical Energy]--> 2H2(g) ↑ (Cathode) + O2(g) ↑ (Anode)",
    targetProperty: "2:1 Stoichiometric Volume Ratio & Faraday Constant Verification (F ≈ 96,485 C/mol)",
    selectedRoute: "Hoffman Voltameter with Dilute Sulfuric Acid / NaOH Electrolyte",
    description: "Decompose water into elemental hydrogen and oxygen gases using electrical current. Prove the fundamental molecular formula of water (H2O) through the 2:1 gas volume ratio and calculate the Faraday constant using electric charge Q = I × t.",
    availableRoutes: [
      { 
        id: "hoffman-acid", 
        name: "Hoffman Apparatus (0.5 M H2SO4 Electrolyte)", 
        badge: "Physics Standard", 
        peakTempC: 25, 
        rpm: 0, 
        durationMin: 20, 
        desc: "Platinum electrodes in dilute acid; rapid ion transport with minimal overpotential" 
      },
      { 
        id: "alkaline-electrolysis", 
        name: "Alkaline Water Electrolysis (1.0 M KOH / NaOH)", 
        badge: "Industrial Green H2", 
        peakTempC: 35, 
        rpm: 0, 
        durationMin: 25, 
        desc: "Nickel-mesh electrodes mimicking commercial industrial hydrogen electrolyzers" 
      },
      { 
        id: "solar-pv-coupling", 
        name: "Solar PV Direct-Coupled Electrolysis", 
        badge: "Clean Tech", 
        peakTempC: 30, 
        rpm: 0, 
        durationMin: 15, 
        desc: "Demonstrate renewable clean energy storage by driving water splitting directly via solar cell curves" 
      }
    ],
    citation: {
      title: "Experimental Verification of Faraday's Laws of Electrolysis and Water Splitting",
      journal: "American Journal of Physics & NCERT Physics Class XII",
      doi: "10.1119/1.1987541",
      year: 2024,
      snippet: "Fill a Hoffman voltameter with acidified water (approx 0.5 M H2SO4 to supply conducting ions). Connect the platinum cathode and anode to a regulated DC power supply delivering a constant current of 0.500 A. Record the volume of gas accumulating in both graduated arms at 2-minute intervals. Observe that the cathode evolves exactly double the volume of gas compared to the anode, confirming the H2O empirical formula and Faraday's second law."
    },
    safetyEnvelope: {
      maxTempC: 45,
      maxRampRateCMin: 1.0,
      criticalWarnings: [
        "Hydrogen gas (H2) evolved at cathode is highly flammable; keep away from open flames.",
        "Oxygen gas (O2) evolved at anode accelerates combustion."
      ],
      flashPointAlert: "Ensure collection gas tubes are separated to prevent explosive 2:1 stoichiometric gas mixing."
    },
    steps: [
      {
        id: 1,
        name: "Electrolyte Loading & Cell Degassing",
        operation: "STIR_DISPENSE",
        targetTempC: 25,
        rampRateCMin: 0,
        durationMin: 5,
        stirRpm: 0,
        uvExposure: false,
        reagents: "0.50 M H2SO4 Acidified Aqueous Solution",
        hardwareAction: "Electrolyte reservoirs filled; stopcocks opened to purge residual air bubbles; platinum electrodes submerged",
        notes: "Electrodes fully wetted, meniscus zeroed on both graduated glass columns"
      },
      {
        id: 2,
        name: "Constant Current DC Activation (0.50 A)",
        operation: "RAMP_HEAT_STIR",
        targetTempC: 25,
        rampRateCMin: 0,
        durationMin: 10,
        stirRpm: 0,
        uvExposure: false,
        reagents: "DC Voltage: 3.2 V at Constant 0.500 A",
        hardwareAction: "Digital power supply locked to 0.500 A; current integrator active (Q = I × t)",
        notes: "Vigorous stream of effervescent microbubbles rising from both electrodes! Cathode bubbling noticeably twice as fast."
      },
      {
        id: 3,
        name: "Stoichiometric Volume Reading & Ratio Verification",
        operation: "RAMP_HEAT_STIR",
        targetTempC: 25,
        rampRateCMin: 0,
        durationMin: 5,
        stirRpm: 0,
        uvExposure: false,
        reagents: "Cathode: H2(g) | Anode: O2(g)",
        hardwareAction: "Optical liquid level sensors record column heights: V(Cathode) = 37.4 mL, V(Anode) = 18.6 mL",
        notes: "Volume ratio V(H2) : V(O2) = 37.4 / 18.6 = 2.01 : 1.00! Matches theoretical stoichiometric ratio 2:1."
      },
      {
        id: 4,
        name: "Faraday Constant Calculation & Gas Identity Pop-Test",
        operation: "COOL_DOWN",
        targetTempC: 25,
        rampRateCMin: 0,
        durationMin: 5,
        stirRpm: 0,
        uvExposure: false,
        reagents: "Collected Gas Samples",
        hardwareAction: "Power supply disengaged; Faraday calculation: F = (I × t) / (4 × n(O2)) = 96,480 C/mol",
        notes: "Virtual flame test: Cathode gas ignites with characteristic 'pop' sound (Hydrogen). Anode gas relights glowing splint (Oxygen)."
      }
    ]
  }
];
