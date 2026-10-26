# DigitalOcean Deployment & Hosting Architecture for MissingLab

This document details how **MissingLab** is hosted and scaled on DigitalOcean infrastructure.

---

## 1. DigitalOcean App Platform (1-Click CI/CD Deployment)

The fastest and most robust way to host MissingLab is via **DigitalOcean App Platform**:

1. Log in to [cloud.digitalocean.com](https://cloud.digitalocean.com).
2. Navigate to **Apps** ➔ **Create App**.
3. Choose **GitHub** as the source repository.
4. Select `guchchi/MissingLab` and branch `main`.
5. DigitalOcean App Platform will automatically discover the `Dockerfile` and `.do/app.yaml` configuration in the root directory.
6. Choose your preferred region:
   * **BLR1** (Bangalore, India) — Recommended for South Asian students & low latency
   * **NYC3** (New York, US) or **FRA1** (Frankfurt, Germany)
7. Click **Deploy**. Within 2 minutes, your web application will be live with free global CDN and automatic SSL certificate (`https://missinglab-ocean.ondigitalocean.app`).

Every future `git push origin main` triggers an automated zero-downtime deployment.

---

## 2. DigitalOcean Droplet Deployment (Docker & GPU Hosting)

If you prefer deploying on a dedicated DigitalOcean Droplet or hosting a self-hosted Gemma inference backend:

### Launching Droplet:
* **OS:** Ubuntu 24.04 LTS
* **Size:** Basic 2 vCPU / 4GB RAM (or DO GPU Droplet with NVIDIA H100 for heavy local LLM inference)

### Setup Commands:
```bash
# SSH into your droplet
ssh root@<your-droplet-ip>

# Clone the repository
git clone https://github.com/guchchi/MissingLab.git
cd MissingLab

# Build and run the container
docker build -t missinglab:latest .
docker run -d -p 80:80 --name missinglab-station missinglab:latest
```

---

## 3. DigitalOcean Spaces (Student Practical Notebook Object Storage)

MissingLab generates submission-ready student practical records. These records and telemetry traces are stored on **DigitalOcean Spaces** (S3-compatible object storage):

* **Bucket Name:** `missinglab-notebooks`
* **Endpoint:** `blr1.digitaloceanspaces.com`
* **Access:** S3 API via AWS SDK or direct presigned URLs.

---

## 4. Google Gemma AI Architecture

MissingLab leverages Google's **Gemma** open models:
* **Gemma-2-9B-IT** provides the Socratic Science Mentor engine.
* Supports **Google AI Studio API key**, **Hugging Face Inference API**, and local **Ollama** (`http://localhost:11434`) instances running on DigitalOcean Droplets.
* Features zero-latency fallback engine ensuring 100% demo uptime during hackathon judging.
