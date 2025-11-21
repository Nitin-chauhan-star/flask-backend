from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

patients = []
next_id = 1

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data:
        return jsonify({"error": "No data received"}), 400

    username = data.get('username')
    password = data.get('password')

    for p in patients:
        if p['username'] == username and p['password'] == password:
            return jsonify({'message': 'Login successful', 'id': p['id']})

    return jsonify({'error': 'Invalid credentials'}), 401


@app.route('/patients', methods=['POST'])
def add_patient():
    global next_id
    data = request.json

    if not data:
        return jsonify({"error": "No data received"}), 400

    patient = {
        'id': next_id,
        'name': data.get('name'),
        'username': data.get('username'),
        'password': data.get('password'),
        'age': data.get('age')
    }

    # Required fields missing error
    if not patient['name'] or not patient['username'] or not patient['password']:
        return jsonify({"error": "Missing required fields"}), 400

    patients.append(patient)
    next_id += 1

    return jsonify({'message': 'Patient registered', 'id': patient['id']})


@app.route('/patients', methods=['GET'])
def get_patients():
    result = [
        {
            'id': p['id'],
            'name': p['name'],
            'username': p['username'],
            'age': p['age']
        } for p in patients
    ]
    return jsonify(result)


if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
