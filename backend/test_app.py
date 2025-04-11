import os
import io
import pytest
from app import app, DB_PATH, MODEL_PATH

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_get_patients(client):
    response = client.get('/patients')
    assert response.status_code == 200
    assert isinstance(response.json, list)

def test_validPrediction(client):
    test_image_path = 'test/testImage.jpeg'
    data = {
        'name': 'Test User 1',
        'age': '30',
        'contactNo': '1234567890',
        'symptoms': ['cough', 'fever'],
        'image': (open(test_image_path, 'rb'), 'testImage.jpeg')
    }

    response = client.post('/predict', content_type='multipart/form-data', data=data)
    body = response.json
    assert 'prediction' in body
    assert body['name'] == 'Test User 1'
    assert response.status_code == 200

def test_missing_image(client):
    data = {
        'name': 'Test User 1',
        'age': '30',
        'contactNo': '1234567890',
        'symptoms': ['cough', 'fever'],
    }

    response = client.post('/predict', content_type='multipart/form-data', data=data)
    assert response.json['error'] == 'No image uploaded'
    assert response.status_code == 400

def test_serveImage(client):
    test_image_path = 'test/testImage.jpeg'
    image_filename = f"test_{os.path.basename(test_image_path)}"
    upload_path = os.path.join('uploads', image_filename)
    os.makedirs('uploads', exist_ok=True)
    with open(test_image_path, 'rb') as f:
        with open(upload_path, 'wb') as out:
            out.write(f.read())

    response = client.get(f'/uploads/{image_filename}')
    assert response.status_code == 200
    os.remove(upload_path) 

def test_serveImage_notFound(client):
    test_image_path = 'test/testImage1.jpeg'
    response = client.get(f'/uploads/{test_image_path}')
    assert response.status_code == 404 

