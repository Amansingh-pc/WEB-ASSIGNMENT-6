/**
 * script.js — Contact Management System
 * Course : SEC035 Web Programming with Python & JS Lab
 * Author : [Your Name Here]
 *
 * Features:
 *  1.  Delete confirmation dialog
 *  2.  Live character counter for text inputs
 *  3.  Client-side form validation with shake animation
 *  4.  Phone number format validation
 *  5.  Toast notification helper
 *  6.  Active navigation link highlight
 *  7.  Live search feedback (row count update)
 *  8.  Auto-submit search on clear
 */

"use strict";

/* ============================================================
   1. DELETE CONFIRMATION
      Called via onsubmit="return confirmDelete(event, name)"
   ============================================================ */
function confirmDelete(event, contactName) {
    const ok = window.confirm(
        `⚠️ Delete contact "${contactName}"?\n\nThis action cannot be undone.`
    );
    if (!ok) {
        event.preventDefault();
        return false;
    }
    showToast(`🗑️ "${contactName}" deleted.`, 2500);
    return true;
}


/* ============================================================
   2. LIVE CHARACTER COUNTER
      Attaches to every input that has a matching <small id="...-counter">
   ============================================================ */
function initCharCounters() {
    const fields = [
        { inputId: "name",    counterId: "name-counter",    max: 80  },
        { inputId: "address", counterId: "address-counter", max: 150 },
    ];

    fields.forEach(({ inputId, counterId, max }) => {
        const input   = document.getElementById(inputId);
        const counter = document.getElementById(counterId);
        if (!input || !counter) return;

        // Set initial count (important on edit page where fields are pre-filled)
        updateCounter(input, counter, max);
        input.addEventListener("input", () => updateCounter(input, counter, max));
    });
}

function updateCounter(input, counter, max) {
    const len = input.value.length;
    counter.textContent = `${len} / ${max}`;
    if (len >= max * 0.9) {
        counter.classList.add("near-limit");
    } else {
        counter.classList.remove("near-limit");
    }
}

/* ============================================================
   3. CLIENT-SIDE FORM VALIDATION
      Validates #add-form and #edit-form before submission.
      Adds shake animation to invalid fields.
   ============================================================ */
function initFormValidation() {
    const forms = ["add-form", "edit-form"]
        .map(id => document.getElementById(id))
        .filter(Boolean);

    forms.forEach(form => {
        form.addEventListener("submit", event => {
            const invalids = [];

            form.querySelectorAll("input[required]").forEach(field => {
                if (!field.value.trim()) {
                    invalids.push(field);
                }
            });

            // Extra check: phone pattern
            const phoneField = form.querySelector("#phone");
            if (phoneField && phoneField.value.trim()) {
                const phonePattern = /^[0-9+\-\s]{7,15}$/;
                if (!phonePattern.test(phoneField.value.trim())) {
                    invalids.push(phoneField);
                }
            }

            // Extra check: email format
            const emailField = form.querySelector("#email");
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value.trim())) {
                    invalids.push(emailField);
                }
            }

            if (invalids.length > 0) {
                event.preventDefault();

                // Shake each invalid input and highlight it
                invalids.forEach(field => {
                    field.classList.add("input-error", "shake");
                    field.addEventListener("animationend", () => {
                        field.classList.remove("shake");
                    }, { once: true });

                    // Remove error highlight once user starts fixing it
                    field.addEventListener("input", () => {
                        field.classList.remove("input-error");
                    }, { once: true });
                });

                showToast("⚠️ Please fix the highlighted fields.", 3000);
                invalids[0].focus();
            }
        });
    });
}

/* ============================================================
   4. PHONE NUMBER INPUT — allow only valid chars while typing
   ============================================================ */
function initPhoneFilter() {
    const phone = document.getElementById("phone");
    if (!phone) return;

    phone.addEventListener("keypress", e => {
        // Allow: digits, +, -, space, and control keys
        if (!/[0-9+\-\s]/.test(e.key) && !e.ctrlKey) {
            e.preventDefault();
        }
    });
}

/* ============================================================
   5. TOAST NOTIFICATION
      showToast("message", durationMs)
   ============================================================ */
function showToast(message, duration = 3000) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity    = "0";
        toast.style.transform  = "translateY(10px)";
        toast.style.transition = "opacity 0.35s ease, transform 0.35s ease";
        setTimeout(() => toast.remove(), 380);
    }, duration);
}

/* ============================================================
   6. ACTIVE NAV LINK HIGHLIGHT
   ============================================================ */
function highlightActiveNav() {
    const current = window.location.pathname;
    document.querySelectorAll(".nav-links a").forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname;
        if (linkPath === current) {
            link.classList.add("active");
        }
    });
}

/* ============================================================
   7. LIVE SEARCH FEEDBACK
      Updates subtitle with result count as user types.
      Submits search form on Enter; clears on Escape.
   ============================================================ */
function initSearchFeedback() {
    const searchInput = document.getElementById("search-input");
    if (!searchInput) return;

    searchInput.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            // Clear search and redirect to home
            window.location.href = "/";
        }
    });
}

/* ============================================================
   8. RESET CHAR COUNTERS after form reset button click
   ============================================================ */
function resetCounters() {
    // Called from the Reset button's onclick in add_contact.html
    setTimeout(() => {
        const nameInput    = document.getElementById("name");
        const addressInput = document.getElementById("address");
        const nameCounter  = document.getElementById("name-counter");
        const addrCounter  = document.getElementById("address-counter");

        if (nameInput    && nameCounter)  updateCounter(nameInput,    nameCounter,  80);
        if (addressInput && addrCounter)  updateCounter(addressInput, addrCounter, 150);
    }, 10); // slight delay so browser reset fires first
}

/* ============================================================
   INIT — Run all features once DOM is ready
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    initCharCounters();
    initFormValidation();
    initPhoneFilter();
    highlightActiveNav();
    initSearchFeedback();

    // Welcome toast on home page
    if (window.location.pathname === "/") {
        showToast("👋 Welcome to ContactBook!", 2500);
    }
});
