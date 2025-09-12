import numpy as np
import cv2
import os
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Paths
MODEL_PATH = "models/plant_disease_cnn_improved.h5"
DATASET_PATH = "dataset"   # to fetch class labels

# Load model
model = load_model(MODEL_PATH)

# Get class labels from dataset directory
datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)
train_data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)
class_labels = list(train_data.class_indices.keys())

def predict_disease(img_path):
    img = cv2.imread(img_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)

    prediction = model.predict(img)
    class_index = np.argmax(prediction)
    confidence = np.max(prediction) * 100

    return class_labels[class_index], confidence

if __name__ == "__main__":
    test_image = "test_leaf1.jpg"
    if not os.path.exists(test_image):
        print("⚠️ Test image not found! Please place a leaf image as test_leaf.jpg")
    else:
        disease, confidence = predict_disease(test_image)
        print(f"🌿 Prediction: {disease} ({confidence:.2f}% confidence)")
