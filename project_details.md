# 🚀 Dickson E — Engineering Projects Master Dossier

This document provides a comprehensive technical breakdown of Dickson's **12 flagship repositories** from [github.com/DicksonLegend](https://github.com/DicksonLegend?tab=repositories), organized in the exact order requested for seamless integration into the portfolio's **Projects** section.

---

## 📊 Project Portfolio Matrix

| # | Project Name | Domain / Category | Primary Tech Stack | Key Highlight / Metric | GitHub Repository |
|---|--------------|-------------------|--------------------|------------------------|-------------------|
| **01** | **MedGateRag** | Biomedical AI & Knowledge Graphs | FastAPI, MedCPT, FAISS (IVFpq), Kùzu Graph DB, React 19 | CPU-only sub-second hybrid graph-vector retrieval | [GitHub](https://github.com/DicksonLegend/MedGateRag) |
| **02** | **ModelMatch-AI** | LLM Recommendation & Benchmarking | React 19, FastAPI, GPT-4o, ScaleDown API, Recharts | Compares 30+ LLMs across 11 providers & 8 benchmarks | [GitHub](https://github.com/DicksonLegend/ModelMatch-AI) |
| **03** | **EduRAG** | Fully Offline Adaptive Learning RAG | FastAPI, Mistral 7B (GGUF), FAISS, BGE-Base, React 19 | 100% private offline execution with zero API calls | [GitHub](https://github.com/DicksonLegend/EduRAG) |
| **04** | **ModelDoctor-AI-** | Production MLOps & Model Diagnostics | FastAPI, MLflow, DVC, React, Docker Compose | Automated health scores (0-100) & drift detection | [GitHub](https://github.com/DicksonLegend/ModelDoctor-AI-) |
| **05** | **AIRA** | Multi-Agent Business Risk Assessment | Node.js, Express, Google Gemini 2.5 Flash, WebSocket, React | Real-time multi-agent consensus across 4 risk domains | [GitHub](https://github.com/DicksonLegend/AIRA) |
| **06** | **Shine Consultancy** | Commercial Corporate Web Platform | React 19, Vite, Lucide React, IntersectionObserver | Responsive production platform with WhatsApp lead funnel | [GitHub](https://github.com/DicksonLegend/shine-consultancy-website) |
| **07** | **AI Resume Screening** | NLP Talent Acquisition & Classification | Scikit-learn, XGBoost, Voting Ensemble, Streamlit | 4-model ensemble achieving 80.77% accuracy across 9 roles | [GitHub](https://github.com/DicksonLegend/AI-Resume-Screening-System) |
| **08** | **Career Path Visualizer** | Interactive Skill Graph & Roadmapping | Python, Flask, Vis.js Network Engine, CSS3 Grid | Dynamic skill dependency graphs for 30+ career roles | [GitHub](https://github.com/DicksonLegend/Career-Path-Visualizer) |
| **09** | **Intelligent Crop Monitoring** | AgriTech IoT & Automated ML Pipelines | Python, PostgreSQL (Supabase), IoT Simulation, Pandas | Automated ETL pipeline with real-time soil anomaly alerts | [GitHub](https://github.com/DicksonLegend/Intelligent-Crop-Monitoring-System) |
| **10** | **Budget Buddy** | Personal Finance & Spending Analytics | Streamlit, PostgreSQL (Railway), Plotly, Pandas | Live financial dashboard with automated expense forecasting | [GitHub](https://github.com/DicksonLegend/Budget-Buddy) |
| **11** | **LegendAI** | Conversational Voice AI Assistant | Flask 3.0, Groq API (Llama 3 8B), Web Speech API | Sub-second ultra-low latency voice chat with session memory | [GitHub](https://github.com/DicksonLegend/LegendAI) |
| **12** | **QuestionHub** | Academic Doubt-Solving Knowledge Base | MongoDB, Express.js, React, Node.js, Multer | Anonymous peer QA portal with upvoting & multimedia support | [GitHub](https://github.com/DicksonLegend/QuestionHub) |

---

## 🔬 Deep-Dive Project Specifications

---

### 01. MedGateRag (MedGraphRAG)

- **Repository**: [https://github.com/DicksonLegend/MedGateRag](https://github.com/DicksonLegend/MedGateRag)
- **Category**: `Biomedical AI` · `Hybrid RAG` · `Knowledge Graphs`
- **Tagline**: *Clinical-grade hybrid retrieval engine fusing high-dimensional vector search with topological graph traversals.*

#### Overview & Problem Solved
Medical question answering and clinical retrieval require extreme factual precision. Pure vector search suffers from semantic drift and hallucination when dealing with complex biomedical entity relationships. MedGateRag implements an advanced **MedGraphRAG** engine that combines dense semantic search over medical corpora with 1-to-2 hop relationship traversals across biomedical knowledge graphs.

#### Architecture & Key Components
- **MedCPT Query Encoder**: Singleton CPU-only query embedder utilizing specialized PubMedBERT/MedCPT weights to generate high-fidelity dense embeddings with 0 VRAM usage.
- **FAISS IVFpq Vector Index**: Vector search loaded from an Inverted File with Product Quantization (`IVFpq`) index paired with sidecar Parquet metadata for sub-10ms semantic document retrieval.
- **Kùzu Embedded Graph Store**: High-performance embedded graph database executing seeded graph traversals (1–2 hops) to trace disease-symptom-drug relational pathways.
- **Reciprocal Rank Fusion (RRF)**: Advanced rank fusion engine with graph-boost multipliers and medical category balancing to surface evidence items with zero hallucination.
- **Frontend Presentation Layer**: Modern React 19 + TypeScript + Vite user interface for clinical query exploration.

#### Tech Stack
- **AI / Retrieval**: MedCPT, FAISS (`IVFpq`), Kùzu Graph DB, Reciprocal Rank Fusion (RRF)
- **Backend**: Python 3.10+, FastAPI, Uvicorn, Pydantic, NumPy, Parquet
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Conference / Paper Track**: LaTeX/TeX evaluation pipeline

#### Portfolio Card Metadata
- **Accent Color**: `#00e5ff` (Cyan / Clinical Teal)
- **Primary Metric**: `Sub-10ms Hybrid Retrieval`
- **Key Tags**: `['Hybrid RAG', 'MedCPT', 'FAISS IVFpq', 'Kùzu Graph DB', 'FastAPI']`

---

### 02. ModelMatch-AI

- **Repository**: [https://github.com/DicksonLegend/ModelMatch-AI](https://github.com/DicksonLegend/ModelMatch-AI)
- **Category**: `LLMs & Benchmarking` · `AI Infrastructure` · `Developer Tools`
- **Tagline**: *Intelligent LLM recommendation and cost estimation engine benchmarking 30+ frontier models.*

#### Overview & Problem Solved
Developers face an overwhelming ecosystem of LLMs with wildly varying pricing, context windows, and task-specific proficiencies. ModelMatch-AI acts as a decision intelligence platform: users describe their application needs in plain English, and an AI recommendation agent selects, benchmarks, and calculates cost projections for the ideal model.

#### Architecture & Key Components
- **Multi-Provider Dataset**: Structured catalog of 30 frontier and open-weight models across 11 major providers (OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek, xAI, Alibaba, Microsoft, Cohere, Moonshot AI).
- **8-Axis Benchmark Engine**: Interactive sortable matrix comparing models across MMLU, HumanEval, GSM8K, MATH, GPQA, and more.
- **ScaleDown GPT-4o Agent**: AI engine that analyzes project descriptions, budget constraints, and latency needs to generate natural-language recommendations with rationale.
- **Real-Time Cost Simulator**: Dynamic pricing calculator computing estimated monthly bills based on input/output token usage sliders.
- **Dockerized Environment**: Full containerization with Docker Compose for seamless local and cloud deployment.

#### Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS v4, Recharts, Framer Motion, Lucide React
- **Backend**: Python, FastAPI, Uvicorn, Pydantic
- **AI Engine**: OpenAI GPT-4o, ScaleDown API
- **Deployment**: Docker, Docker Compose

#### Portfolio Card Metadata
- **Accent Color**: `#f0a93a` (Amber Gold)
- **Primary Metric**: `30+ Models Analyzed`
- **Key Tags**: `['FastAPI', 'React 19', 'GPT-4o', 'Benchmarking', 'Docker']`

---

### 03. EduRAG

- **Repository**: [https://github.com/DicksonLegend/EduRAG](https://github.com/DicksonLegend/EduRAG)
- **Category**: `Offline AI` · `Adaptive Learning` · `Local LLMs`
- **Tagline**: *100% private, local-first educational intelligence platform powered by quantized Mistral 7B and FAISS.*

#### Overview & Problem Solved
Educational institutions and students often lack continuous high-speed internet access or cannot risk uploading proprietary course materials to third-party cloud APIs. EduRAG solves this by delivering an end-to-end, completely offline adaptive learning environment capable of digesting syllabi, textbooks, and notes locally.

#### Architecture & Key Components
- **Quantized Local LLM Execution**: Uses `llama-cpp-python` with optional CUDA/cuBLAS acceleration to run `Mistral-7B-Instruct-v0.2 (Q4_K_M.gguf)` completely offline with zero data leakage.
- **Dense Embedding Pipeline**: Embeds document chunks using `BAAI/bge-base-en-v1.5` dense encoders.
- **FAISS Local Vector Store**: Persists localized flat index files (`.index`) for $O(1)$ cosine similarity search across syllabus documents.
- **Automated Quiz & Flashcard Generation**: Generates contextual multiple-choice questions, difficulty-rated summaries, and adaptive revision schedules based on student performance.
- **Dark Glassmorphism Interface**: Immersive React 19 UI tailored to minimize cognitive fatigue during long study sessions.

#### Tech Stack
- **AI / LLM Engine**: Mistral-7B-Instruct (GGUF), `llama-cpp-python`, BAAI BGE embeddings, FAISS
- **Backend**: Python 3.10+, FastAPI, SQLAlchemy ORM, SQLite/PostgreSQL, PyPDF
- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite, Lucide React

#### Portfolio Card Metadata
- **Accent Color**: `#3fae8e` (Jade Emerald)
- **Primary Metric**: `100% Offline & Private`
- **Key Tags**: `['Mistral 7B', 'FAISS', 'Local RAG', 'FastAPI', 'React 19']`

---

### 04. ModelDoctor-AI- (ModelDoctor AI+)

- **Repository**: [https://github.com/DicksonLegend/ModelDoctor-AI-](https://github.com/DicksonLegend/ModelDoctor-AI-)
- **Category**: `Production MLOps` · `Model Observability` · `Automated Retraining`
- **Tagline**: *Enterprise MLOps platform for automated model diagnosis, data drift detection, and retraining pipelines.*

#### Overview & Problem Solved
Machine learning models silently degrade in production due to feature drift, covariate shift, and class imbalances. ModelDoctor AI+ functions as an automated "physician" for ML models, evaluating uploaded models and datasets, diagnosing failure modes, calculating a comprehensive 0–100 Health Score, and initiating targeted retraining runs.

#### Architecture & Key Components
- **Automated Diagnostic Suite**: Inspects classification and regression models for overfitting, underfitting, severe imbalance, and missing feature correlations.
- **Model Health Scoring Engine**: Generates a unified 0–100 Health Score broken down into calibration, fairness, performance, and data quality metrics.
- **MLflow Experiment Tracking**: Automatically logs hyperparameter configurations, evaluation artifacts, ROC/PR curves, and run lineages into an integrated MLflow server.
- **DVC Dataset Versioning**: Integration hooks for tracking training dataset versions alongside model weights.
- **Targeted Retraining Pipelines**: One-click retraining workflows executing targeted hyperparameter optimization to repair detected regressions.

#### Tech Stack
- **MLOps & Tracking**: MLflow, DVC (Data Version Control), Scikit-learn, XGBoost, LightGBM
- **Backend**: Python 3.10+, FastAPI, Uvicorn, Pandas, NumPy, Pydantic
- **Frontend**: React, Vite, Tailwind CSS, Recharts
- **Infrastructure**: Docker, Docker Compose

#### Portfolio Card Metadata
- **Accent Color**: `#ee4c2c` (Torch Red)
- **Primary Metric**: `Automated 0-100 Health Score`
- **Key Tags**: `['MLOps', 'MLflow', 'Model Drift', 'FastAPI', 'Docker']`

---

### 05. AIRA (AI Risk Assessment Platform)

- **Repository**: [https://github.com/DicksonLegend/AIRA](https://github.com/DicksonLegend/AIRA)
- **Category**: `Multi-Agent Systems` · `Enterprise Risk` · `LLM Decision Workflows`
- **Tagline**: *Collaborative multi-agent risk assessment platform powered by Google Gemini 2.5 Flash.*

#### Overview & Problem Solved
Enterprise risk analysis requires synthesizing disparate data across legal liabilities, financial metrics, market fluctuations, and social sentiment. AIRA orchestrates a committee of specialized autonomous AI agents that analyze cross-domain data, debate implications over real-time WebSockets, and reach verifiable consensus.

#### Architecture & Key Components
- **Specialized Agent Committee**: Four independent agents configured with specific domain personas and heuristics:
  1. *Financial Risk Agent* (liquidity, debt-to-equity, cash burn)
  2. *Legal Risk Agent* (compliance, regulatory liabilities, IP exposure)
  3. *Market Risk Agent* (competitor trends, macro factors, TAM saturation)
  4. *Social / Reputational Agent* (public sentiment, brand trust, labor dynamics)
- **Real-Time WebSocket Negotiation**: Agents broadcast findings, challenge assumptions, and iteratively compute a weighted composite risk index in real time.
- **Google Gemini 2.5 Flash Engine**: High-speed, high-reasoning LLM backend for structured analytical synthesis.
- **Interactive Live Dashboard**: Modern React interface displaying live streaming agent thoughts, consensus gauges, and exportable mitigation roadmaps.

#### Tech Stack
- **AI Core**: Google Gemini 2.5 Flash API, Prompt Orchestration
- **Backend**: Node.js, Express.js, WebSocket (`ws`), CSV/JSON Data Pipelines
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Radix UI Components

#### Portfolio Card Metadata
- **Accent Color**: `#61dafb` (Cyber Blue)
- **Primary Metric**: `4-Domain Autonomous Agents`
- **Key Tags**: `['Multi-Agent', 'Gemini 2.5', 'WebSockets', 'Risk Analysis', 'React']`

---

### 06. Shine Consultancy Website

- **Repository**: [https://github.com/DicksonLegend/shine-consultancy-website](https://github.com/DicksonLegend/shine-consultancy-website)
- **Category**: `Fullstack Web` · `Commercial Platform` · `UI/UX Engineering`
- **Tagline**: *High-performance commercial web portal for facility management and manpower supply services.*

#### Overview & Problem Solved
Built for Shine Consultancy, an active manpower supply and industrial facility management service provider. The client needed a fast, mobile-first, and highly professional corporate web platform tailored for both B2B enterprise procurement and job applicants, featuring direct zero-friction lead generation.

#### Architecture & Key Components
- **Component-Driven Modular Architecture**: Clean separation across Hero, About, Services, WhyChooseUs, Careers, and Contact sections.
- **Zero-Latency Lead Conversion**: Integrated WhatsApp Business API click-to-chat funnel allowing corporate clients and job seekers to initiate immediate direct conversations without backend bottlenecks.
- **Scroll-Triggered Micro-Interactions**: Native `IntersectionObserver` fade-in animations delivering a sleek aesthetic with zero external animation bloat.
- **Lighthouse Performance Optimization**: 100% responsive across mobile, tablet, and widescreen layouts, bundled with Vite for near-instantaneous page loads.

#### Tech Stack
- **Frontend**: React 19, Vite, Lucide React icons, CSS3 Flexbox/Grid
- **Tooling**: ESLint 9, Vite Plugin React, PostCSS

#### Portfolio Card Metadata
- **Accent Color**: `#fcc624` (Corporate Gold)
- **Primary Metric**: `Production B2B Portal`
- **Key Tags**: `['React 19', 'Vite', 'Commercial Web', 'WhatsApp Funnel', 'Responsive']`

---

### 07. AI Resume Screening System

- **Repository**: [https://github.com/DicksonLegend/AI-Resume-Screening-System](https://github.com/DicksonLegend/AI-Resume-Screening-System)
- **Category**: `NLP & Machine Learning` · `HR Tech` · `Ensemble Classification`
- **Tagline**: *Intelligent 4-model ensemble talent matching system with automated skill extraction and suitability scoring.*

#### Overview & Problem Solved
Manual resume screening is labor-intensive and prone to human bias. This application automates the candidate screening lifecycle by parsing PDF resumes, extracting technical competencies and experience, and categorizing candidates across 9 specialized technical domains with high classification confidence.

#### Architecture & Key Components
- **4-Model Ensemble Architecture**: Combines predictions from:
  - Logistic Regression Enhanced
  - Random Forest Classifier
  - XGBoost Enhanced
  - Soft Voting Ensemble Classifier (achieving **80.77% test accuracy**)
- **Dynamic Suitability Scoring**: Proprietary multi-factor scoring formula incorporating AI prediction confidence, extracted skill keyword overlap, years of experience, and model consensus.
- **Advanced Text Preprocessing**: End-to-end NLP pipeline using TF-IDF vectorization, NLTK stopword removal, lemmatization, and regex entity normalization.
- **Candidate Intelligence Insights**: Detects highest degree qualification, parses company tiers, and flags skill gaps relative to target job descriptions.
- **Interactive Streamlit Dashboard**: Clean recruiter interface with file dropzones, radar charts, and candidate comparison tables.

#### Tech Stack
- **Machine Learning**: Scikit-learn, XGBoost, Voting Classifier, NumPy, Pandas
- **NLP & Parsing**: TF-IDF, NLTK, PyPDF2 / pdfminer.six
- **Web App**: Streamlit, Plotly visualization

#### Portfolio Card Metadata
- **Accent Color**: `#ff6f00` (Safety Orange)
- **Primary Metric**: `80.77% Classification Accuracy`
- **Key Tags**: `['XGBoost', 'Scikit-learn', 'NLP', 'Ensemble ML', 'Streamlit']`

---

### 08. Career Path Visualizer

- **Repository**: [https://github.com/DicksonLegend/Career-Path-Visualizer](https://github.com/DicksonLegend/Career-Path-Visualizer)
- **Category**: `Interactive Data Viz` · `EdTech` · `Graph Algorithms`
- **Tagline**: *Interactive professional journey planner with visual skill dependency graphs and learning roadmaps.*

#### Overview & Problem Solved
Navigating career transitions in technology is overwhelming due to ambiguous prerequisites and disorganized learning paths. Career Path Visualizer renders interactive topological dependency graphs showing exactly how foundation skills connect to advanced specializations, complete with timelines and curated courses.

#### Architecture & Key Components
- **Interactive Network Graph Engine**: Built using `vis.js` network visualization to render physics-driven skill graphs where nodes represent skills, colored by mastery level, and edges represent prerequisites.
- **Career Role Knowledge Base**: Curated database of 30+ tech career paths (Software Engineering, Data Science, DevOps, AI/ML, Cybersecurity).
- **Fuzzy Autocomplete & Normalization**: Smart search engine suggesting career roles with typo tolerance and synonyms.
- **Client-Side PDF Roadmap Generator**: Integrated `html2pdf` exporter generating downloadable career blueprint documents for offline tracking.
- **Local State Persistence**: Automatic browser storage of user progression, completed nodes, and target milestones.

#### Tech Stack
- **Visualization**: Vis.js Network Engine, HTML5 Canvas, CSS Grid/Flexbox
- **Backend**: Python 3.10+, Flask REST API
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, `html2pdf.js`, Bootstrap/Custom CSS

#### Portfolio Card Metadata
- **Accent Color**: `#3178c6` (Graph Blue)
- **Primary Metric**: `30+ Career Paths Mapped`
- **Key Tags**: `['Flask', 'Vis.js', 'Graph Visualization', 'JavaScript', 'EdTech']`

---

### 09. Intelligent Crop Monitoring System

- **Repository**: [https://github.com/DicksonLegend/Intelligent-Crop-Monitoring-System](https://github.com/DicksonLegend/Intelligent-Crop-Monitoring-System)
- **Category**: `AgriTech` · `IoT Simulation` · `Automated Data Pipelines`
- **Tagline**: *Automated ETL pipeline and ML crop recommendation engine powered by cloud PostgreSQL and IoT streams.*

#### Overview & Problem Solved
Precision agriculture relies on timely environmental data to prevent crop failure and optimize fertilizer usage. This project simulates an IoT telemetry network collecting soil moisture, ambient temperature, humidity, and N-P-K nutrient ratios, feeding an automated ETL data pipeline and ML model that prescribes optimal crops.

#### Architecture & Key Components
- **IoT Sensor Simulation Engine**: Generates real-time synthetic time-series sensor streams simulating varying weather and soil conditions.
- **Automated Data Pipeline (ETL)**: Cleanses raw sensor readings, handles missing values, detects sensor drift anomalies, and applies statistical normalization.
- **Cloud PostgreSQL Integration**: Connects to a cloud PostgreSQL instance (hosted on Supabase) with optimized relational tables and indexed timestamps for temporal querying.
- **ML Crop Yield Recommender**: Machine learning classification model predicting highest-yielding crops based on environmental sensor profiles.
- **REST API Endpoints**: Programmatic interface for querying recent soil metrics, historical trends, and crop advisories.

#### Tech Stack
- **Data Engineering**: Python, Pandas, NumPy, SQLAlchemy, Psycopg2
- **Database**: PostgreSQL (Cloud Supabase)
- **Machine Learning**: Scikit-learn (Random Forest / Decision Trees)
- **Simulation**: Python `threading` & synthetic sensor event emitters

#### Portfolio Card Metadata
- **Accent Color**: `#47a248` (Agritech Green)
- **Primary Metric**: `Automated Cloud ETL Pipeline`
- **Key Tags**: `['PostgreSQL', 'Python ETL', 'IoT Simulation', 'Scikit-learn', 'Supabase']`

---

### 10. Budget Buddy

- **Repository**: [https://github.com/DicksonLegend/Budget-Buddy](https://github.com/DicksonLegend/Budget-Buddy)
- **Category**: `FinTech` · `Data Analytics` · `Personal Finance`
- **Tagline**: *Full-featured personal finance tracker and spending analytics dashboard deployed on Railway.*
- **Live Demo**: [https://budget-buddy-production-f944.up.railway.app/](https://budget-buddy-production-f944.up.railway.app/)

#### Overview & Problem Solved
Budget Buddy is an intuitive personal finance management application that empowers users to track income and expenditure, visualize cash flow trends, categorize spending, and forecast month-end balances through interactive financial charts.

#### Architecture & Key Components
- **Relational Ledger Engine**: Robust PostgreSQL database schema enforcing referential integrity, transaction date indexing, and category normalization.
- **Interactive Visual Analytics**: Dynamic charts generated via Plotly (income vs. expense distributions, 30-day daily balance trajectories, and category breakdown donuts).
- **Custom Category Builder**: Flexible tagging system allowing users to define bespoke budget categories with budget limits.
- **Data Portability**: Full CSV import/export capabilities for tax calculation and offline spreadsheet accounting.
- **Cloud Deployment**: Production-ready deployment on Railway with environment-driven database connection pooling.

#### Tech Stack
- **Runtime & UI**: Streamlit 1.28+, Python 3.11+
- **Database**: PostgreSQL, SQLAlchemy, Psycopg2
- **Visuals & Data**: Plotly Express, Pandas
- **Hosting**: Railway Cloud Platform

#### Portfolio Card Metadata
- **Accent Color**: `#ff9900` (Financial Gold / Orange)
- **Primary Metric**: `Live on Railway`
- **Key Tags**: `['Streamlit', 'PostgreSQL', 'Plotly', 'Railway', 'FinTech']`

---

### 11. LegendAI

- **Repository**: [https://github.com/DicksonLegend/LegendAI](https://github.com/DicksonLegend/LegendAI)
- **Category**: `Voice AI` · `Conversational LLMs` · `Sub-Second Inference`
- **Tagline**: *Modern conversational voice assistant with ultra-fast Groq Llama-3 inference and session memory.*

#### Overview & Problem Solved
Traditional AI chat applications suffer from high latency and lack multimodal voice interaction. LegendAI combines Groq's high-speed LPU inference engine running Meta Llama 3 with voice synthesis to create a fluid, real-time conversational assistant that feels instantaneous.

#### Architecture & Key Components
- **Groq LPU Acceleration**: Queries Meta Llama 3 8B via Groq Cloud API, delivering response generation speeds exceeding 300 tokens/second for true real-time interactivity.
- **Multimodal Voice Integration**: Features speech-to-text (STT) input and text-to-speech (TTS) audio narration using the browser Web Speech API.
- **Session & Memory Management**: Multi-chat session manager enabling users to create, rename, switch, and persist independent chat threads locally.
- **Adaptive Glassmorphic UI**: Custom responsive interface featuring dark/light theme switching, code syntax highlighting, and animated typing indicators.
- **Production REST API**: Flask backend configured with CORS headers, comprehensive error handling, and scalable endpoint routing.

#### Tech Stack
- **AI Core**: Groq Cloud API, Meta Llama-3-8B-Instant
- **Backend**: Python 3.11+, Flask 3.0, Flask-CORS, Requests
- **Frontend**: HTML5, Modern CSS3 Glassmorphism, JavaScript, Web Speech API

#### Portfolio Card Metadata
- **Accent Color**: `#009688` (Teal / Voice Cyan)
- **Primary Metric**: `300+ Tokens/sec Inference`
- **Key Tags**: `['Groq LPU', 'Llama 3', 'Flask', 'Voice AI', 'Web Speech']`

---

### 12. QuestionHub

- **Repository**: [https://github.com/DicksonLegend/QuestionHub](https://github.com/DicksonLegend/QuestionHub)
- **Category**: `Fullstack MERN` · `EdTech Community` · `Collaborative QA`
- **Tagline**: *Anonymous student doubt-solving and academic peer knowledge exchange portal.*

#### Overview & Problem Solved
Students often hesitate to ask foundational or challenging academic questions in public classrooms due to social friction. QuestionHub provides a safe, anonymous peer-to-peer doubt resolution platform where students can post questions, upload diagram photos, and collaborate on verified solutions.

#### Architecture & Key Components
- **Anonymous Posting Workflow**: Strips user identifiers from public posts and replies while preserving moderation integrity.
- **Subject-Specific Categorization**: Granular tagging across core engineering disciplines (Operating Systems, Data Mining, Deep Learning, Big Data Tools, Theory of Computation, Full Stack Development).
- **Multipart Media Upload Pipeline**: Integrated Multer storage pipeline for attaching reference diagrams, whiteboard photos, and code screenshots to questions and answers.
- **Community Upvoting & Ranking Algorithm**: Ranks answers dynamically based on peer upvotes, ensuring accurate solutions float to the top.
- **RESTful MERN Backend**: Node.js and Express.js REST API backed by MongoDB schemas with Mongoose ODM models.

#### Tech Stack
- **Frontend**: React.js, Vite, React Router DOM, Modern CSS3
- **Backend**: Node.js, Express.js, Multer, CORS
- **Database**: MongoDB, Mongoose ODM

#### Portfolio Card Metadata
- **Accent Color**: `#dc382d` (Crimson / Community Red)
- **Primary Metric**: `Anonymous Peer QA Portal`
- **Key Tags**: `['MERN Stack', 'MongoDB', 'Express.js', 'React', 'Node.js']`

---

## 🎯 Recommended Portfolio Integration Plan

When integrating these 12 projects into `src/data/portfolioData.ts` and `src/components/sections/Projects.tsx`:

1. **Category Filtering Tabs**:
   - `All` (All 12 projects)
   - `LLMs & RAG` (*MedGateRag*, *ModelMatch-AI*, *EduRAG*, *LegendAI*)
   - `ML & Systems` (*ModelDoctor-AI-*, *AIRA*, *AI Resume Screening*, *Intelligent Crop Monitoring*)
   - `Fullstack & Web` (*Shine Consultancy*, *Career Path Visualizer*, *Budget Buddy*, *QuestionHub*)

2. **Featured Projects (Top 4 Spotlight)**:
   - **MedGateRag**: Cutting-edge hybrid biomedical graph-RAG with Kùzu and MedCPT.
   - **ModelMatch-AI**: Comprehensive model evaluation platform across 30+ LLMs.
   - **EduRAG**: 100% offline private local AI learning ecosystem.
   - **ModelDoctor-AI-**: Enterprise-grade MLOps model diagnosis and retraining suite.

3. **Links & Action Buttons**:
   - Each project card should feature:
     - `GitHub Code` icon linking directly to Dickson's repository.
     - `Live Demo` badge (active on *Budget Buddy* and *Shine Consultancy*).
     - Tech stack pills using the existing portfolio badge style.
