from flask import Flask, request, jsonify
import pickle
import sqlite3
import os
import numpy as np
import cv2
from flask_cors import CORS
import uuid
from flask import send_from_directory
import json


app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
MODEL_PATH = os.path.join('model', 'model.pkl')
DB_PATH = os.path.join('database', 'db.sqlite3')

# Load AI model
with open(MODEL_PATH, 'rb') as f:
    model = pickle.load(f)

#Database
def save_to_db(name, age, contactNo, mean_val, symptoms, prediction, image_filename):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # ✅ Recreate with the correct schema
    c.execute('''CREATE TABLE IF NOT EXISTS predictions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    age TEXT,
                    contactNo TEXT,
                    mean_val REAL,
                    symptoms TEXT,
                    prediction TEXT,
                    image_filename TEXT
                )''')

    symptoms_json = json.dumps(symptoms)

    c.execute('''INSERT INTO predictions 
                 (name, age, contactNo, mean_val, symptoms, prediction, image_filename)
                 VALUES (?, ?, ?, ?, ?, ?, ?)''',
              (name, age, contactNo, mean_val, symptoms_json, prediction, image_filename))

    conn.commit()
    conn.close()


def preprocess_image(file_stream):
    # Read the image from file stream
    file_bytes = np.frombuffer(file_stream.read(), np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError("Invalid image")

    grey_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    equalised_image = clahe.apply(grey_image)
    _, thresholded = cv2.threshold(equalised_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    contours, _ = cv2.findContours(thresholded, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    if not contours:
        raise ValueError("No contours found")

    largest_contour = max(contours, key=cv2.contourArea)
    x, y, w, h = cv2.boundingRect(largest_contour)
    crop = equalised_image[y:y+h, x:x+w]
    resized = cv2.resize(crop, (224, 224))

    # Mean greyscale value
    mean_greyscale = np.mean(resized)
    return mean_greyscale

@app.route('/predict', methods=['POST'])
def predict():
    try:
        print("📥 Form fields:", request.form)
        print("📸 File fields:", request.files)

        # Extract form fields
        name = request.form.get('name')
        age = request.form.get('age')
        contact = request.form.get('contactNo')
        symptoms = request.form.getlist('symptoms')

        # Handle image
        image_file = request.files.get('image')
        if not image_file:
            return jsonify({'error': 'No image uploaded'}), 400

        # Save image temporarily
        UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        image_filename = f"{uuid.uuid4().hex[:8]}.png"
        image_path = os.path.join(UPLOAD_FOLDER, image_filename)
        image_file.save(image_path)

        # Preprocess & predict
        with open(image_path, 'rb') as f:
            mean_val = preprocess_image(f)
        prediction = model.predict([[mean_val]])[0]

        save_to_db(name, age, contact, mean_val, symptoms, prediction, image_filename)

        # Return full response
        return jsonify({
            'name': name,
            'age': age,
            'contactNo': contact,
            'symptoms': symptoms,
            'prediction': prediction,
            'mean_value': mean_val,
            'imageFilename': image_filename
        })

    except Exception as e:
        print("❌ Exception:", e)
        return jsonify({'error': str(e)}), 500

@app.route('/uploads/<filename>')
def serve_uploaded_image(filename):
    UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/patients', methods=['GET'])
def get_all_patients():
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row 
        c = conn.cursor()
        c.execute('SELECT * FROM predictions')
        rows = c.fetchall()
        conn.close()

        patients = []
        for row in rows:
            patient = {
                'id': row['id'],
                'name': row['name'],
                'age': row['age'],
                'contactNo': row['contactNo'],
                'symptoms': json.loads(row['symptoms']),  # Converts JSON string back to list
                'mean_val': row['mean_val'],
                'prediction': row['prediction'],
                'imageFilename': row['image_filename']
            }
            patients.append(patient)

        return jsonify(patients)

    except Exception as e:
        print("❌ Error fetching patients:", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
