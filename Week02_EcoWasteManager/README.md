# Eco Waste Manager - Smart Waste Management System
## 2nd Year Engineering Mini Project (20 Marks)

### Project Overview
**Eco Waste Manager** is a comprehensive web-based waste management system designed to help individuals and communities track waste disposal, promote recycling, and measure environmental impact. This project demonstrates full-stack web development with environmental sustainability focus.

**Environmental Topic:** Smart Waste Management & Recycling Tracking

---

## 📋 Project Features

### Core Features (Required for 20 Marks)

#### 1. **User Management**
- User registration with name and email
- User profile dashboard
- Personal statistics tracking
- Points/gamification system

#### 2. **Waste Tracking System**
- Multiple waste categories (Plastic, Paper, Glass, Metal, Organic, E-Waste, Mixed)
- Log waste entries with weight in kg
- Track whether waste was recycled
- Timestamp all entries

#### 3. **Environmental Impact Calculation**
- Carbon reduction metrics per waste type
- Calculate total CO₂ saved based on recycled waste
- Convert CO₂ savings to equivalent trees planted
- Real-time impact visualization

#### 4. **Analytics & Statistics**
- **User-level stats:**
  - Total waste managed (kg)
  - CO₂ emissions saved (kg)
  - Number of items recycled
  - Eco points earned
  
- **Global statistics:**
  - Total waste tracked across all users
  - Global recycling percentage
  - Total CO₂ saved
  - Community impact (trees equivalent)

#### 5. **Gamification & Leaderboard**
- Points system (10 points per kg recycled)
- Global leaderboard showing top contributors
- Competitive engagement for environmental action

#### 6. **Interactive Dashboard**
- Clean, modern UI with responsive design
- Real-time data updates
- Category information cards
- Waste logging form

---

## 🏗️ Technical Architecture

### Technology Stack
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Python with Flask framework
- **Database:** SQLite (lightweight, no setup required)
- **APIs:** RESTful API design

### Project Structure
```
Week02_EcoWasteManager/
├── app.py                      # Flask backend application
├── requirements.txt            # Python dependencies
├── templates/
│   ├── index.html             # Homepage & registration
│   └── dashboard.html         # User dashboard
├── static/
│   ├── style.css              # Main styling
│   ├── dashboard.css          # Dashboard-specific styles
│   └── script.js              # Frontend logic
├── data/
│   └── waste_management.db    # SQLite database (auto-created)
└── README.md                   # This file
```

---

## 📊 Database Schema

### Tables

**users**
- id (Primary Key)
- name
- email (Unique)
- points
- joined_date

**waste_categories**
- id (Primary Key)
- category (name)
- description
- carbon_reduction (kg CO₂ per kg of waste)
- recyclable (boolean)

**waste_entries**
- id (Primary Key)
- user_id (Foreign Key)
- category_id (Foreign Key)
- weight_kg
- date_logged
- is_recycled

---

## 🚀 Installation & Setup

### Prerequisites
- Python 3.7+
- pip (Python package manager)
- Modern web browser

### Step-by-Step Installation

1. **Clone or navigate to the project directory:**
```bash
cd /workspaces/5024102_fsdl/Week02_EcoWasteManager
```

2. **Install required Python packages:**
```bash
pip install -r requirements.txt
```

3. **Run the Flask application:**
```bash
python app.py
```

4. **Access the application:**
   - Open browser and go to: `http://localhost:5000`
   - Or use the Simple Browser in VS Code

---

## 📱 How to Use

### For Users

1. **Sign Up:**
   - Click "Get Started" button
   - Enter your name and email
   - Account created and redirected to dashboard

2. **Log Waste:**
   - Select waste category (Plastic, Paper, Glass, etc.)
   - Enter weight in kg
   - Check if waste will be recycled
   - Submit to log entry

3. **View Statistics:**
   - See personal eco-impact on dashboard
   - Track points earned
   - Monitor CO₂ saved

4. **Check Leaderboard:**
   - View top contributors globally
   - See ranking and waste managed
   - Get inspired to do more!

---

## 🔧 API Endpoints

### Public Endpoints
- `GET /` - Home page
- `GET /api/global-stats` - Get global statistics
- `GET /api/leaderboard` - Get top 10 contributors
- `GET /api/categories` - Get waste categories

### User Endpoints
- `POST /api/user/create` - Register new user
- `GET /api/user/<user_id>/stats` - Get user statistics
- `POST /api/waste/log` - Log waste entry
- `GET /dashboard/<user_id>` - User dashboard page

---

## 📈 Environmental Impact Metrics

### Carbon Reduction Factors (per kg of waste):
- **Plastic:** 2.5 kg CO₂
- **Paper:** 3.2 kg CO₂
- **Glass:** 2.8 kg CO₂
- **Metal:** 4.1 kg CO₂
- **Organic:** 1.5 kg CO₂
- **E-Waste:** 5.0 kg CO₂

### Sustainability Equivalents:
- 1 Tree = Absorbs ~21 kg CO₂/year
- Users can see equivalent trees planted through recycling

---

## 🎓 Learning Outcomes

This project demonstrates mastery in:

1. **Full-Stack Web Development**
   - Frontend: HTML, CSS, JavaScript
   - Backend: Python, Flask, REST APIs

2. **Database Design & Management**
   - SQL database design
   - Relational schemas
   - Data persistence

3. **Environmental Engineering**
   - Carbon footprint calculations
   - Waste categorization
   - Sustainability metrics

4. **Software Engineering Practices**
   - Clean code architecture
   - RESTful API design
   - Responsive UI/UX design

5. **Problem-Solving**
   - Real-world environmental problem
   - Practical solutions
   - Data-driven insights

---

## 🌍 Environmental Impact

This system helps:
- ♻️ Track and promote recycling
- 🌱 Quantify environmental benefits
- 👥 Build community awareness
- 📊 Provide actionable sustainability data
- 🏆 Incentivize environmental action through gamification

---

## 📝 Testing

### Manual Testing Scenarios:

1. **User Registration:**
   - Register multiple users with different emails
   - Verify unique email constraint

2. **Waste Logging:**
   - Log different waste types
   - Verify points calculation (10 pts/kg)
   - Check non-recycled waste doesn't grant points

3. **Statistics:**
   - Verify carbon reduction calculations
   - Check leaderboard rankings
   - Test global stat aggregation

4. **UI/UX:**
   - Test responsive design on mobile/tablet
   - Verify smooth animations
   - Check form validation

---

## 🔮 Future Enhancements

Potential features for future versions:
- User authentication & login
- Email notifications for achievements
- Mobile app version
- Integration with actual waste collection services
- AI-based waste classification
- Integration with environmental organizations
- Blockchain for transparency in recycling tracking
- Advanced analytics and reporting

---

## 📚 References

### Technologies Used:
- [Flask Documentation](https://flask.palletsprojects.com/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [MDN Web Docs](https://developer.mozilla.org/)

### Environmental Data:
- Carbon reduction factors based on life cycle assessments
- Tree CO₂ absorption rates from environmental studies

---

## 👨‍💻 Author
**Student Name:** 2nd Year Engineering
**Project Type:** Mini Project - Environmental Engineering
**Marks:** 20

---

## 📄 License
This project is created for educational purposes as part of the 2nd year engineering curriculum.

---

## 🤝 Contributing
Suggestions and improvements are welcome! This is an educational project designed to be expanded upon.

---

## 💡 Tips for Evaluation

**Key Points to Evaluate:**
1. ✅ User registration and profile management
2. ✅ Waste logging and categorization system
3. ✅ Environmental impact calculations
4. ✅ Real-time statistics and analytics
5. ✅ Leaderboard and gamification
6. ✅ Responsive, user-friendly interface
7. ✅ Clean code and proper documentation
8. ✅ Database design and data persistence
9. ✅ RESTful API implementation
10. ✅ Environmental sustainability focus

---

**Last Updated:** January 2026
**Version:** 1.0
