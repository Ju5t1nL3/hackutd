from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import json
import secrets

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.secret_key = secrets.token_hex(16)
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    university = db.Column(db.String(200))
    major = db.Column(db.String(200))
    graduation_year = db.Column(db.Integer)
    internships = db.Column(db.String(1000))  # Will store JSON string


@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400

    user = User(
        email=data['email'],
        password=generate_password_hash(data['password']),
        first_name=data['firstName'],
        last_name=data['lastName']
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201


@app.route('/api/profile/update', methods=['POST'])
def update_profile():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    user.university = data['university']
    user.major = data['major']
    user.graduation_year = data['graduationYear']
    # Convert internships list to JSON string
    user.internships = json.dumps(data['internships'])

    try:
        db.session.commit()
        return jsonify({'message': 'Profile updated successfully'})
    except Exception as e:
        db.session.rollback()
        print('here')
        return jsonify({'error': str(e)}), 500

# Add a route to get profile data


@app.route('/api/profile', methods=['GET'])
def get_profile():
    email = request.args.get('email')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({
        'email': user.email,
        'firstName': user.first_name,
        'lastName': user.last_name,
        'university': user.university,
        'major': user.major,
        'graduationYear': user.graduation_year,
        'internships': json.loads(user.internships) if user.internships else []
    })


@app.route('/api/signout', methods=['POST'])
def signout():
    session.clear()
    return jsonify({'message': 'Signed out successfully'}), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
