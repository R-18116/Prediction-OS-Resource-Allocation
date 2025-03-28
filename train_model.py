# train_model.py code will be here
import psutil
import GPUtil
import time
import joblib
from sklearn.linear_model import LinearRegression
import numpy as np
import os

def collect_sample_data():
    data = {"cpu": [], "ram": [], "disk": [], "gpu": []}
    for _ in range(60):
        data["cpu"].append(psutil.cpu_percent())
        data["ram"].append(psutil.virtual_memory().percent)
        data["disk"].append(psutil.disk_usage('/').percent)
        gpus = GPUtil.getGPUs()
        data["gpu"].append(gpus[0].load * 100 if gpus else 0)
        time.sleep(1)
    return data

def train_and_save_models(data):
    os.makedirs("models", exist_ok=True)
    for key in data.keys():
        X = np.array(range(len(data[key]))).reshape(-1, 1)
        y = np.array(data[key])
        model = LinearRegression().fit(X, y)
        joblib.dump(model, f"models/{key}_model.pkl")

if __name__ == "__main__":
    print("Collecting sample data...")
    data = collect_sample_data()
    print("Training models...")
    train_and_save_models(data)
    print("Models saved in backend/models/")
