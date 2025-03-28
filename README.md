
# Predictive OS Resource Allocation-2

This project monitors your system's CPU, RAM, Disk, and GPU usage in real-time and predicts future usage using Machine Learning.

## Features
- Real-time resource monitoring
- Predictive analytics using Linear Regression
- Live updating charts for Current & Predicted values
- Dark/Light mode toggle
- One-click launcher

## Folder Structure
```
Predictive-OS-Resource-Allocation-2/
├── backend/
│   ├── data_server.py
│   ├── train_model.py
│   └── models/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── launcher.bat
├── README.md
└── screenshots/
```

## How to Run
1. Open VS Code.
2. Install Python libraries:
   ```
   pip install flask psutil scikit-learn joblib GPUtil
   ```
3. Train the models:
   ```
   cd backend
   python train_model.py
   ```
4. Start the backend server:
   ```
   python data_server.py
   ```
5. Open `frontend/index.html` in your browser or double-click `launcher.bat`.

## Screenshots
*(Add your screenshots in the screenshots/ folder)*

