"""
Smart Waste Management & Recycling System
2nd Year Engineering Mini Project - 20 Marks
Purpose: Track and manage waste, promote recycling, calculate environmental impact
"""

from flask import Flask, render_template, request, jsonify
from datetime import datetime, timedelta
import sqlite3
import json
import os

app = Flask(__name__, template_folder='templates', static_folder='static')
DB_PATH = 'data/waste_management.db'

# Initialize Database
def init_db():
    if not os.path.exists('data'):
        os.makedirs('data')
    
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    # Users table
    c.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        points INTEGER DEFAULT 0,
        joined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )''')
    
    # Waste categories table
    c.execute('''CREATE TABLE IF NOT EXISTS waste_categories (
        id INTEGER PRIMARY KEY,
        category TEXT NOT NULL,
        description TEXT,
        carbon_reduction REAL,
        recyclable BOOLEAN
    )''')
    
    # Waste entries table
    c.execute('''CREATE TABLE IF NOT EXISTS waste_entries (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        category_id INTEGER,
        weight_kg REAL,
        date_logged TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_recycled BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(category_id) REFERENCES waste_categories(id)
    )''')
    
    # Insert default waste categories
    categories = [
        ('Plastic', 'Plastic bottles, bags, containers', 2.5, True),
        ('Paper', 'Newspapers, cardboard, office paper', 3.2, True),
        ('Glass', 'Glass bottles and jars', 2.8, True),
        ('Metal', 'Aluminum cans, steel containers', 4.1, True),
        ('Organic', 'Food waste, garden waste', 1.5, True),
        ('E-Waste', 'Electronics, batteries, cables', 5.0, True),
        ('Mixed Waste', 'General garbage', 0.0, False)
    ]
    
    c.execute('SELECT COUNT(*) FROM waste_categories')
    if c.fetchone()[0] == 0:
        for cat in categories:
            c.execute('INSERT INTO waste_categories VALUES (NULL, ?, ?, ?, ?)', cat)
    
    conn.commit()
    conn.close()

# Database helper functions
def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def add_user(name, email):
    conn = get_db_connection()
    c = conn.cursor()
    try:
        c.execute('INSERT INTO users (name, email) VALUES (?, ?)', (name, email))
        conn.commit()
        user_id = c.lastrowid
    except sqlite3.IntegrityError:
        user_id = c.execute('SELECT id FROM users WHERE email = ?', (email,)).fetchone()[0]
    finally:
        conn.close()
    return user_id

def log_waste(user_id, category_id, weight_kg, is_recycled=True):
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('INSERT INTO waste_entries (user_id, category_id, weight_kg, is_recycled) VALUES (?, ?, ?, ?)',
              (user_id, category_id, weight_kg, is_recycled))
    
    # Award points for recycling
    if is_recycled:
        points = int(weight_kg * 10)
        c.execute('UPDATE users SET points = points + ? WHERE id = ?', (points, user_id))
    
    conn.commit()
    conn.close()

def get_user_stats(user_id):
    conn = get_db_connection()
    c = conn.cursor()
    
    user = c.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
    
    waste_entries = c.execute('''
        SELECT we.weight_kg, wc.carbon_reduction, we.is_recycled
        FROM waste_entries we
        JOIN waste_categories wc ON we.category_id = wc.id
        WHERE we.user_id = ?
    ''', (user_id,)).fetchall()
    
    total_waste = sum(entry[0] for entry in waste_entries)
    carbon_saved = sum(entry[1] * entry[0] for entry in waste_entries if entry[2])
    recycled_count = sum(1 for entry in waste_entries if entry[2])
    
    conn.close()
    
    return {
        'name': user['name'],
        'email': user['email'],
        'points': user['points'],
        'total_waste_kg': total_waste,
        'carbon_saved_kg': round(carbon_saved, 2),
        'recycled_count': recycled_count,
        'joined_date': user['joined_date']
    }

def get_global_stats():
    conn = get_db_connection()
    c = conn.cursor()
    
    total_waste = c.execute('SELECT SUM(weight_kg) FROM waste_entries').fetchone()[0] or 0
    total_recycled = c.execute('SELECT SUM(weight_kg) FROM waste_entries WHERE is_recycled = 1').fetchone()[0] or 0
    total_users = c.execute('SELECT COUNT(*) FROM users').fetchone()[0]
    
    # Calculate total carbon reduction
    carbon_reduction = c.execute('''
        SELECT SUM(wc.carbon_reduction * we.weight_kg)
        FROM waste_entries we
        JOIN waste_categories wc ON we.category_id = wc.id
        WHERE we.is_recycled = 1
    ''').fetchone()[0] or 0
    
    conn.close()
    
    return {
        'total_waste_kg': total_waste,
        'total_recycled_kg': total_recycled,
        'recycling_percentage': round((total_recycled / total_waste * 100) if total_waste > 0 else 0, 2),
        'total_users': total_users,
        'carbon_saved_kg': round(carbon_reduction, 2),
        'equivalent_trees': round(carbon_reduction / 21, 1)  # 1 tree absorbs ~21 kg CO2/year
    }

def get_leaderboard(limit=10):
    conn = get_db_connection()
    c = conn.cursor()
    
    leaderboard = c.execute('''
        SELECT id, name, points, 
               (SELECT SUM(weight_kg) FROM waste_entries WHERE user_id = users.id) as total_waste
        FROM users
        ORDER BY points DESC
        LIMIT ?
    ''', (limit,)).fetchall()
    
    conn.close()
    return leaderboard

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/global-stats')
def api_global_stats():
    stats = get_global_stats()
    return jsonify(stats)

@app.route('/api/user/create', methods=['POST'])
def api_create_user():
    data = request.json
    user_id = add_user(data['name'], data['email'])
    return jsonify({'user_id': user_id, 'message': 'User created successfully'})

@app.route('/api/user/<int:user_id>/stats')
def api_user_stats(user_id):
    stats = get_user_stats(user_id)
    return jsonify(stats)

@app.route('/api/waste/log', methods=['POST'])
def api_log_waste():
    data = request.json
    log_waste(data['user_id'], data['category_id'], data['weight_kg'], data.get('is_recycled', True))
    stats = get_user_stats(data['user_id'])
    return jsonify({'message': 'Waste logged successfully', 'stats': stats})

@app.route('/api/leaderboard')
def api_leaderboard():
    leaderboard = get_leaderboard()
    return jsonify([{
        'rank': i + 1,
        'name': row[1],
        'points': row[2],
        'total_waste_kg': row[3] or 0
    } for i, row in enumerate(leaderboard)])

@app.route('/api/categories')
def api_categories():
    conn = get_db_connection()
    c = conn.cursor()
    categories = c.execute('SELECT * FROM waste_categories').fetchall()
    conn.close()
    return jsonify([dict(cat) for cat in categories])

@app.route('/dashboard/<int:user_id>')
def dashboard(user_id):
    return render_template('dashboard.html', user_id=user_id)

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)
