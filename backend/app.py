from flask_cors import CORS
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np
import cv2
import os

app = Flask(__name__)
CORS(app)
MODEL_PATH = "../models/plant_disease_cnn_improved.h5"
model = load_model(MODEL_PATH)
DATASET_PATH = "../dataset"

# Replace with your dataset class names
# class_labels = ["Potato___Early_blight","Potato___healthy","Potato___Late_blight",  "Tomato_Early_blight","Tomato_healthy","Tomato_Late_blight" ]
datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)
train_data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)
class_labels = list(train_data.class_indices.keys())


def preprocess_image(img):
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    return np.expand_dims(img, axis=0)

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    npimg = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    processed = preprocess_image(img)
    prediction = model.predict(processed)
    class_index = np.argmax(prediction)
    confidence = float(np.max(prediction) * 100)

    return jsonify({
        "disease": class_labels[class_index],
        "confidence": confidence
    })

if __name__ == "__main__":
    app.run(debug=True)
