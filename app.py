# ============================================================
# Project Title : Contact Management System (Experiment 6)
# Student Name  : [Your Name Here]
# Course        : SEC035 - Web Programming with Python & JS Lab
# Department    : SOET — B.Tech CSE, Semester II
# Faculty       : Mr. Aryan Sharma
# Session       : 2025-26 (Even)
# Date          : 2025
# ============================================================

from flask import Flask, render_template, request, redirect, url_for

# ── Initialize Flask application ────────────────────────────
app = Flask(__name__)

# ── In-memory contact storage (no database required) ────────
# Each contact is a dict: { id, name, phone, email, address }
contacts = [
    {
        "id": 1,
        "name":    "Aarav Sharma",
        "phone":   "9876543210",
        "email":   "aarav.sharma@example.com",
        "address": "12, MG Road, New Delhi"
    },
    {
        "id": 2,
        "name":    "Priya Mehta",
        "phone":   "9123456780",
        "email":   "priya.mehta@example.com",
        "address": "45, Park Street, Mumbai"
    },
    {
        "id": 3,
        "name":    "Rohan Verma",
        "phone":   "9988776655",
        "email":   "rohan.verma@example.com",
        "address": "78, Civil Lines, Jaipur"
    },
]

# Auto-increment ID counter
next_id = 4


# ────────────────────────────────────────────────────────────
# HOME ROUTE  —  Read: display all contacts (+ optional search)
# Task 2 & Task 4
# ────────────────────────────────────────────────────────────
@app.route("/")
def index():
    """
    Displays all contacts on the home page.
    Supports live search via query parameter ?q=<term>
    Matches on name OR phone number (case-insensitive).
    """
    query   = request.args.get("q", "").strip()
    results = contacts

    # Task 7 (Bonus): Filter contacts by name or phone
    if query:
        q_lower = query.lower()
        results = [
            c for c in contacts
            if q_lower in c["name"].lower() or q_lower in c["phone"]
        ]

    return render_template("index.html", contacts=results, query=query)


# ────────────────────────────────────────────────────────────
# ADD CONTACT  —  Create: add a new contact
# Task 3
# ────────────────────────────────────────────────────────────
@app.route("/add", methods=["GET", "POST"])
def add_contact():
    """
    GET  → Render the add-contact form.
    POST → Validate inputs, append new contact, redirect to home.
    """
    global next_id
    error = None

    if request.method == "POST":
        name    = request.form.get("name",    "").strip()
        phone   = request.form.get("phone",   "").strip()
        email   = request.form.get("email",   "").strip()
        address = request.form.get("address", "").strip()

        # Server-side validation: name, phone, email are required
        if not name or not phone or not email:
            error = "Name, Phone, and Email are required fields."
        else:
            new_contact = {
                "id":      next_id,
                "name":    name,
                "phone":   phone,
                "email":   email,
                "address": address
            }
            contacts.append(new_contact)
            next_id += 1
            return redirect(url_for("index"))

    return render_template("add_contact.html", error=error)


# ────────────────────────────────────────────────────────────
# EDIT CONTACT  —  Update: edit an existing contact
# Task 5
# ────────────────────────────────────────────────────────────
@app.route("/edit/<int:contact_id>", methods=["GET", "POST"])
def edit_contact(contact_id):
    """
    GET  → Render the edit form pre-filled with current data.
    POST → Validate inputs, save updated data, redirect to home.
    """
    # Find contact by id
    contact = next((c for c in contacts if c["id"] == contact_id), None)
    if contact is None:
        return redirect(url_for("index"))

    error = None

    if request.method == "POST":
        name    = request.form.get("name",    "").strip()
        phone   = request.form.get("phone",   "").strip()
        email   = request.form.get("email",   "").strip()
        address = request.form.get("address", "").strip()

        # Server-side validation
        if not name or not phone or not email:
            error = "Name, Phone, and Email are required fields."
        else:
            # Update the contact in-place
            contact["name"]    = name
            contact["phone"]   = phone
            contact["email"]   = email
            contact["address"] = address
            return redirect(url_for("index"))

    return render_template("edit_contact.html", contact=contact, error=error)


# ────────────────────────────────────────────────────────────
# DELETE CONTACT  —  Delete: remove a contact
# Task 6
# ────────────────────────────────────────────────────────────
@app.route("/delete/<int:contact_id>", methods=["POST"])
def delete_contact(contact_id):
    """
    POST → Remove contact with the given id, redirect to home.
    Only POST is accepted to prevent accidental deletion via URL.
    """
    global contacts
    contacts = [c for c in contacts if c["id"] != contact_id]
    return redirect(url_for("index"))


# ────────────────────────────────────────────────────────────
# Run development server
# ────────────────────────────────────────────────────────────
if __name__ == "__main__":
    app.run(debug=True)
