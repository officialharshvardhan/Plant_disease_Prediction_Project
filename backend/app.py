from flask_cors import CORS
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np
import cv2
import jwt, datetime
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from functools import wraps

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# Secret key for JWT
SECRET_KEY = "mysecret"

# 🔹 Connect to MongoDB (local or Atlas)
client = MongoClient("mongodb://localhost:27017/")  # Change if using MongoDB Atlas
db = client["plant_disease_db"]
users_collection = db["users"]

# Load Model
MODEL_PATH = "../models/plant_disease_cnn_improved.h5"
model = load_model(MODEL_PATH)
DATASET_PATH = "../dataset"

# Get class labels
datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)
train_data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)
class_labels = list(train_data.class_indices.keys())


# 🔹 Auth decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]
        if not token:
            return jsonify({"msg": "Token missing"}), 401
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = data["email"]
        except:
            return jsonify({"msg": "Token invalid or expired"}), 401
        return f(current_user, *args, **kwargs)
    return decorated


# 🔹 Image preprocessing
def preprocess_image(img):
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    return np.expand_dims(img, axis=0)


# 🔹 Prediction route (protected)
@app.route("/predict", methods=["POST"])
@token_required
def predict(current_user):
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
        "user": current_user,  # so you know who made the request
        "disease": class_labels[class_index],
        "confidence": confidence
    })


# 🔹 Signup (store in MongoDB)
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email, password = data.get("email"), data.get("password")

    if users_collection.find_one({"email": email}):
        return jsonify({"success": False, "msg": "User already exists"}), 400

    hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")
    users_collection.insert_one({"email": email, "password": hashed_pw})

    return jsonify({"success": True, "msg": "Signup successful"})


# 🔹 Login (verify credentials)
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email, password = data.get("email"), data.get("password")

    user = users_collection.find_one({"email": email})
    if user and bcrypt.check_password_hash(user["password"], password):
        token = jwt.encode(
            {"email": email, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
            SECRET_KEY,
            algorithm="HS256"
        )
        return jsonify({"success": True, "token": token})

    return jsonify({"success": False, "msg": "Invalid credentials"}), 401


if __name__ == "__main__":
    app.run(debug=True)
