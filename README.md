<div align="center">

# 🧪 MissingLab
### The Virtual Science Lab & Socratic AI Mentor for Every Student

[![DigitalOcean App Platform](https://img.shields.io/badge/Deployed%20on-DigitalOcean-0080FF?logo=digitalocean&logoColor=white)](https://cloud.digitalocean.com)
[![Gemma AI Powered](https://img.shields.io/badge/AI%20Mentor-Google%20Gemma-4285F4?logo=google&logoColor=white)](https://ai.google.dev/gemma)
[![Curriculum](https://img.shields.io/badge/Curriculum-NCERT%20%7C%20CBSE%20%7C%20AP%20STEM-10B981)](#-curriculum-experiments)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

*Democratizing practical science education for over 80% of schools and colleges that lack accessible wet-lab infrastructure.*

</div>

---

## 🌍 The Problem MissingLab Solves

Over **80% of secondary schools and colleges in developing regions and under-resourced communities do not have access to equipped physical science laboratories**. High chemical costs, hazardous reagents (strong mineral acids, volatile organic solvents), broken glassware, and lack of trained lab technicians force students to memorize practicals from textbooks without ever experiencing scientific discovery.

**MissingLab** bridges this divide by putting a **high-fidelity virtual science laboratory and a 24/7 personal Socratic AI science mentor directly into every student's browser.**

---

## 🚀 Key Innovations & Architecture

### 1. 🎓 Curriculum Science Practicals (High School & College STEM)
Interactive, physics-accurate simulations for core curriculum experiments:
* **Acid-Base Titration & pH Neutralization:** $HCl + NaOH \rightarrow NaCl + H_2O$ with phenolphthalein indicator and pH inflection curves.
* **Chemical Kinetics & Arrhenius Law:** Persulfate-Iodide clock reaction with temperature-dependent activation energy ($E_a$).
* **Enzyme Catalysis & Denaturation:** Catalase enzyme decomposing $2H_2O_2 \rightarrow 2H_2O + O_2 \uparrow$ with thermal denaturation above 55°C.
* **Organic Analgesic Synthesis:** Aspirin (acetylsalicylic acid) synthesis from salicylic acid with cold-water crystallization and $FeCl_3$ purity verification.
* **Water Electrolysis & Faraday's Laws:** $2H_2O \rightarrow 2H_2 + O_2$ proving the 2:1 stoichiometric volume ratio of hydrogen to oxygen.

### 2. 🧠 Google Gemma Socratic AI Lab Mentor
Integrated with Google's **Gemma** open models:
* **Socratic Science Tutor:** Explains *why* reactions occur using intuitive, real-world analogies rather than dry textbook memorization.
* **"What-If?" Hypothesis & Safety Sandbox:** Students can safely simulate dangerous or counter-factual scenarios (e.g. *"What if I heat to 150°C without cooling?", "What if I forget the indicator?"*) with molecular explanations and zero physical risk.
* **Oral Practical Viva Voce Examiner:** Simulates external board practical viva examinations, grades oral/written responses from 0 to 10, and highlights essential exam keywords.
* **Exam-Ready Practical Records:** Auto-generates submission-ready practical notebooks (Aim, Theory, Observation Tables, Precautions, and Conclusion) exportable to Markdown or printable PDF.

### 3. 🌊 Hosted on DigitalOcean
* **DigitalOcean App Platform:** Continuous zero-downtime deployment from `main` with automated container builds (`Dockerfile` + `.do/app.yaml`).
* **DigitalOcean Spaces:** Persistent S3-compatible cloud storage for student lab reports and simulation states.
* **DigitalOcean Droplets:** Optional deployment target for running local Gemma LLM instances or microservices.

---

## 🛠️ Quick Start (Local Development)

```bash
# Clone the repository
git clone https://github.com/guchchi/MissingLab.git
cd MissingLab

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Visit `http://localhost:5173` to explore MissingLab!

---

## 🚢 Deploying to DigitalOcean

See [DIGITALOCEAN_GUIDE.md](./DIGITALOCEAN_GUIDE.md) for full instructions.

1. Go to **[cloud.digitalocean.com](https://cloud.digitalocean.com)** ➔ Click **Create ➔ Apps**.
2. Select **GitHub** ➔ Choose repository `guchchi/MissingLab`.
3. DigitalOcean App Platform will automatically discover the `Dockerfile` and `.do/app.yaml` and deploy with free SSL and global CDN.

---

## 📜 License
Distributed under the MIT License. Built with ❤️ for students worldwide.
