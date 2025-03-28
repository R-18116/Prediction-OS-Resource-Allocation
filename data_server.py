# data_server.py code will be here
from flask import Flask, jsonify
import psutil
import GPUtil
import joblib
import numpy as np
import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

models = {}
for key in ["cpu", "ram", "disk", "gpu"]:
    models[key] = joblib.load(f"models/{key}_model.pkl")

@app.route("/data")
def get_data():
    current = {
        "cpu": psutil.cpu_percent(),
        "ram": psutil.virtual_memory().percent,
        "disk": psutil.disk_usage('/').percent,
        "gpu": GPUtil.getGPUs()[0].load * 100 if GPUtil.getGPUs() else 0
    }

    t = np.array([[60]])
    predicted = {key: round(models[key].predict(t)[0], 2) for key in models}

    return jsonify({"current": current, "predicted": predicted})

if __name__ == "__main__":
    app.run(port=5000)
