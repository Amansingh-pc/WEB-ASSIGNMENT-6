Contact Management System — SEC035 Experiment 6
Course: Web Programming with Python and JavaScript Lab (SEC035)
Program: B.Tech CSE | Semester II | Session 2025-26 (Even)
Department: SOET | Faculty: Mr. Aryan Sharma

Project Structure
contact_management_system/
├── app.py                      # Flask application — all CRUD routes & logic
├── requirements.txt            # Python dependencies
├── README.md                   # This file
├── templates/
│   ├── base.html               # Master layout (navbar, footer, JS/CSS links)
│   ├── index.html              # Home page — contacts table + search bar
│   ├── add_contact.html        # Add new contact form
│   └── edit_contact.html       # Edit existing contact form (pre-filled)
└── static/
    ├── style.css               # All CSS styling (responsive, table, forms)
    └── script.js               # JavaScript (validation, counters, toasts, search)
How to Run
# 1. Navigate to the project folder
cd contact_management_system

# 2. (Optional) Create & activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS / Linux

# 3. Install Flask
pip install -r requirements.txt

# 4. Run the Flask development server
python app.py

# 5. Open in your browser
http://127.0.0.1:5000
Features Implemented
Task	Description	Status
Task 1	Project setup — folder structure, comments in app.py	✅
Task 2	Flask init, home route /, in-memory list storage	✅
Task 3	Add contact — form with Name, Phone, Email, Address	✅
Task 4	Display all contacts in styled table with nav links	✅
Task 5	Edit contact — pre-filled form, save updated info	✅
Task 6	Delete contact — confirm dialog, redirect to home	✅
Task 7	Bonus: Search by name/phone + full CSS + JS features	✅
JavaScript Features (script.js)
Delete confirmation dialog (prevents accidental deletion)
Live character counter for Name and Address fields
Client-side form validation with shake animation
Phone number input filter (digits, +, -, space only)
Toast notifications (bottom-right)
Active navigation link highlight
Escape key clears search and resets to full list
References
Flask Documentation: https://flask.palletsprojects.com/
Jinja2 Templating: https://jinja.palletsprojects.com/
MDN Web Docs (HTML/CSS/JS): https://developer.mozilla.org/
