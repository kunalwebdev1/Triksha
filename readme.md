# 🏥 Triksha – AI-powered Healthcare Platform

Triksha is an integrated healthcare ecosystem that connects **hospitals, clinics, labs, and patients**.  
It provides smart tools for **hospital management, OPD queueing, lab report tracking, and AI-driven health insights**.  

## 🚀 Features
- **Frontend (React + Vite)**: Clean user interface for patients, doctors, and admins.
- **Backend (Django + DRF)**: Secure REST APIs to connect frontend, database, and AI.
- **AI Models (Python)**:
  - Symptomatic prescription generation in **layman’s language**.
  - **Handwritten prescription OCR** and digital conversion.
  - **Health history summarizer** for quick doctor insights.

---

## 🛠 Tech Stack
- **Frontend**: React, Vite, TailwindCSS, Material UI
- **Backend**: Django, Django REST Framework
- **AI Models**: Python, PyTorch, HuggingFace Transformers, OpenCV, Tesseract OCR
- **Database**: PostgreSQL / MySQL
- **Version Control**: Git + GitHub

---

## 📂 Project Structure
Triksha/
│── .venv/ # Virtual environment
│── frontend/ # React frontend
│── triksha_backend/ # Django backend
│── ai_models/ # AI/ML models
│ │── data/ # datasets
│ │── notebooks/ # Jupyter experiments
│ │── models/ # saved models (.pt, .pkl, .h5)
│ │── scripts/ # training + inference
│ │── utils/ # preprocessing helpers
│── requirements.txt # Python dependencies
│── README.md # Project documentation


---

## ⚡ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/Triksha.git
cd Triksha

### 2️⃣ Setup Python Virtual Environment
bash
Copy code
python -m venv .venv
.venv\Scripts\activate   # Windows
source .venv/bin/activate  # Linux/Mac

### 3️⃣ Install Backend + AI Dependencies
bash
Copy code
pip install -r requirements.txt

### 4️⃣ Run Backend Server
bash
Copy code
cd triksha_backend
python manage.py migrate
python manage.py runserver

### 5️⃣ Run Frontend
bash
Copy code
cd frontend
npm install
npm run dev
👨‍💻 Contributors
AI/ML: [Your Name + Team]

Backend: [Team members]

Frontend: [Team members]

📅 Roadmap
 AI symptom-to-prescription MVP

 OCR for handwritten prescriptions

 Health summarizer integration

 End-to-end deployment

