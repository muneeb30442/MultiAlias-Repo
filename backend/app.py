from flask import Flask, request, jsonify
import pickle
import sqlite3
import os

app = Flask(__name__)
MODEL_PATH = os.path.join('model', 'model.pkl')
DB_PATH = os.path.join('database', 'db.sqlite3')

# Load AI model
with open(MODEL_PATH, 'rb') as f:
    model = pickle.load(f)

# Sample SQLite connection
def save_to_db(input1, input2, prediction):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS predictions
                 (input1 REAL, input2 REAL, prediction INTEGER)''')
    c.execute('INSERT INTO predictions VALUES (?, ?, ?)', (input1, input2, prediction))
    conn.commit()
    conn.close()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    input1 = data['input1']
    input2 = data['input2']
    prediction = model.predict([[input1, input2]])[0]
    save_to_db(input1, input2, prediction)
    return jsonify({'prediction': int(prediction)})

if __name__ == '__main__':
    app.run(debug=True)
