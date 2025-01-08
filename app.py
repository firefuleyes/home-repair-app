from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__, static_folder='static', template_folder='templates')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///repair.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key'

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    is_professional = db.Column(db.Boolean, default=False)
    phone = db.Column(db.String(20))
    email = db.Column(db.String(120))

class RepairRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    client_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    professional_id = db.Column(db.Integer, db.ForeignKey('user.id'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.form
        user = User.query.filter_by(username=data['username']).first()
        if user and user.password == data['password']:
            return jsonify({'success': True})
        return jsonify({'success': False, 'message': '用戶名或密碼錯誤'})
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.form
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'success': False, 'message': '用戶名已存在'})
        
        new_user = User(
            username=data['username'],
            password=data['password'],
            is_professional=data.get('is_professional', 'false') == 'true',
            phone=data.get('phone'),
            email=data.get('email')
        )
        db.session.add(new_user)
        try:
            db.session.commit()
            return jsonify({'success': True})
        except:
            db.session.rollback()
            return jsonify({'success': False, 'message': '註冊失敗'})
    return render_template('register.html')

@app.route('/create-request', methods=['GET', 'POST'])
def create_request():
    if request.method == 'POST':
        data = request.form
        new_request = RepairRequest(
            title=data['title'],
            description=data['description'],
            location=data['location'],
            category=data['category']
        )
        db.session.add(new_request)
        try:
            db.session.commit()
            return jsonify({'success': True})
        except:
            db.session.rollback()
            return jsonify({'success': False, 'message': '創建需求失敗'})
    return render_template('create_request.html')

@app.route('/requests')
def list_requests():
    requests = RepairRequest.query.order_by(RepairRequest.created_at.desc()).all()
    return render_template('requests.html', requests=requests)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
