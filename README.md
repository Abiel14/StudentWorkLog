<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Work Log - Collaborative Task Management</title>
    
    <style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #ffffff;
    color: #001a4d;
    line-height: 1.6;
}

html {
    scroll-behavior: smooth;
}

a {
    text-decoration: none;
    color: inherit;
}

/* ===== NAVBAR ===== */
.navbar {
    background: linear-gradient(135deg, #001a4d 0%, #003d99 100%);
    color: white;
    padding: 1rem 2rem;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.nav-container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}

.nav-logo {
    font-size: 24px;
    font-weight: bold;
    white-space: nowrap;
    color: white;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
}

.nav-menu a {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    cursor: pointer;
    padding: 8px 12px;
    transition: all 0.3s;
    border-radius: 5px;
    display: inline-block;
}

.nav-menu a:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
}

.btn-launch {
    background: white !important;
    color: #003d99 !important;
    padding: 10px 20px !important;
    border-radius: 5px !important;
    font-weight: 600 !important;
    border: none !important;
    cursor: pointer !important;
}

.btn-launch:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
}

.btn-login {
    background: transparent !important;
    color: white !important;
    padding: 8px 16px !important;
    border: 2px solid white !important;
    border-radius: 5px !important;
    font-weight: 600 !important;
    cursor: pointer !important;
}

.btn-login:hover {
    background: white !important;
    color: #003d99 !important;
    transform: translateY(-2px);
}

.btn-signup {
    background: white !important;
    color: #003d99 !important;
    padding: 10px 20px !important;
    border-radius: 5px !important;
    font-weight: 600 !important;
    cursor: pointer !important;
    border: none !important;
}

.btn-signup:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
}

/* ===== HERO ===== */
.hero {
    background: linear-gradient(135deg, #f8f9fa 0%, #e8eaed 100%);
    padding: 80px 20px;
    text-align: center;
}

.hero h1 {
    font-size: 48px;
    line-height: 1.2;
    color: #001a4d;
    margin-bottom: 20px;
}

.hero-subtitle {
    font-size: 18px;
    color: #666;
    margin-bottom: 30px;
}

.hero-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

.btn {
    padding: 12px 30px;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: inline-block;
    border: none;
    text-align: center;
}

.btn-primary {
    background: linear-gradient(135deg, #001a4d 0%, #003d99 100%);
    color: white;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 61, 153, 0.3);
}

.btn-secondary {
    background: white;
    color: #003d99;
    border: 2px solid #003d99;
}

.btn-secondary:hover {
    background: #f8f9fa;
}

.btn-large {
    padding: 15px 40px;
    font-size: 16px;
}

/* ===== CONTAINER ===== */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* ===== FEATURES ===== */
.features {
    padding: 80px 20px;
    background: white;
}

.features h2 {
    font-size: 42px;
    text-align: center;
    color: #001a4d;
    margin-bottom: 10px;
}

.section-subtitle {
    text-align: center;
    color: #666;
    font-size: 18px;
    margin-bottom: 50px;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.feature-card {
    background: #f8f9fa;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    transition: all 0.3s;
}

.feature-card:hover {
    background: white;
    box-shadow: 0 10px 30px rgba(0, 26, 77, 0.1);
    transform: translateY(-5px);
}

.feature-icon {
    font-size: 48px;
    margin-bottom: 15px;
}

.feature-card h3 {
    font-size: 20px;
    color: #001a4d;
    margin-bottom: 12px;
}

.feature-card p {
    color: #666;
    line-height: 1.6;
}

/* ===== HOW IT WORKS ===== */
.how-it-works {
    padding: 80px 20px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e8eaed 100%);
}

.how-it-works h2 {
    font-size: 42px;
    text-align: center;
    color: #001a4d;
    margin-bottom: 50px;
}

.steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.step {
    background: white;
    padding: 40px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.step-number {
    display: inline-flex;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #001a4d 0%, #003d99 100%);
    color: white;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 15px;
}

.step-icon {
    font-size: 42px;
    margin: 15px 0;
}

.step h3 {
    color: #001a4d;
    margin-bottom: 10px;
    font-size: 20px;
}

.step p {
    color: #666;
}

/* ===== TESTIMONIALS ===== */
.testimonials {
    padding: 80px 20px;
    background: white;
}

.testimonials h2 {
    font-size: 42px;
    text-align: center;
    color: #001a4d;
    margin-bottom: 50px;
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.testimonial-card {
    background: #f8f9fa;
    padding: 30px;
    border-radius: 10px;
    border-left: 4px solid #003d99;
}

.stars {
    font-size: 16px;
    margin-bottom: 15px;
}

.testimonial-card p {
    color: #555;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 20px;
    font-style: italic;
}

.author-name {
    font-weight: 600;
    color: #001a4d;
    font-size: 14px;
}

/* ===== PRICING ===== */
.pricing {
    padding: 80px 20px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e8eaed 100%);
}

.pricing h2 {
    font-size: 42px;
    text-align: center;
    color: #001a4d;
    margin-bottom: 50px;
}

.pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.pricing-card {
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    position: relative;
    transition: all 0.3s;
}

.pricing-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 26, 77, 0.1);
}

.pricing-featured {
    border: 2px solid #003d99;
    transform: scale(1.05);
}

.badge {
    position: absolute;
    top: -12px;
    left: 20px;
    background: linear-gradient(135deg, #001a4d 0%, #003d99 100%);
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
}

.pricing-card h3 {
    color: #001a4d;
    font-size: 20px;
    margin-bottom: 10px;
}

.price {
    font-size: 36px;
    font-weight: bold;
    color: #003d99;
    margin-bottom: 20px;
}

.price span {
    font-size: 16px;
    color: #999;
}

.pricing-features {
    list-style: none;
    margin: 30px 0;
}

.pricing-features li {
    padding: 12px 0;
    color: #555;
    border-bottom: 1px solid #e0e0e0;
}

.pricing-features li:last-child {
    border-bottom: none;
}

.btn-pricing {
    width: 100%;
    background: #f0f2f5;
    color: #001a4d;
    padding: 12px 20px;
    margin-top: 20px;
}

.btn-pricing:hover {
    background: #e0e0e0;
}

.btn-primary-pricing {
    background: linear-gradient(135deg, #001a4d 0%, #003d99 100%);
    color: white;
}

.btn-primary-pricing:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 61, 153, 0.3);
}

/* ===== CTA ===== */
.cta {
    background: linear-gradient(135deg, #001a4d 0%, #003d99 100%);
    color: white;
    padding: 80px 20px;
    text-align: center;
}

.cta h2 {
    font-size: 42px;
    margin-bottom: 15px;
    color: white;
}

.cta p {
    font-size: 18px;
    margin-bottom: 30px;
    opacity: 0.9;
}

/* ===== FOOTER ===== */
.footer {
    background: #0a1433;
    color: white;
    padding: 30px 20px;
    text-align: center;
}

/* ===== MODALS ===== */
.auth-modal {
    position: fixed;
    z-index: 2000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 26, 77, 0.7);
    display: none !important;
    justify-content: center;
    align-items: center;
}

.auth-modal.show {
    display: flex !important;
}

.auth-modal-content {
    background: white;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
    position: relative;
    animation: slideUp 0.3s ease-in-out;
}

@keyframes slideUp {
    from {
        transform: translateY(50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.auth-modal-close {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 28px;
    color: #999;
    cursor: pointer;
    background: none;
    border: none;
    transition: color 0.3s;
}

.auth-modal-close:hover {
    color: #001a4d;
}

.auth-modal h2 {
    color: #001a4d;
    margin-bottom: 25px;
    font-size: 24px;
    text-align: center;
}

.auth-modal-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.auth-modal-form-group {
    display: flex;
    flex-direction: column;
}

.auth-modal-form-group label {
    color: #001a4d;
    font-weight: 600;
    margin-bottom: 8px;
    font-size: 14px;
}

.auth-modal-form-group input {
    padding: 12px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    background-color: #f8f9fa;
    color: #001a4d;
    font-family: inherit;
    font-size: 14px;
}

.auth-modal-form-group input:focus {
    outline: none;
    border-color: #003d99;
    background-color: white;
}

.auth-modal-submit {
    background: linear-gradient(135deg, #001a4d 0%, #003d99 100%);
    color: white;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.3s;
    margin-top: 10px;
}

.auth-modal-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 61, 153, 0.3);
}

.auth-modal-toggle {
    text-align: center;
    margin-top: 15px;
    color: #666;
    font-size: 14px;
}

.auth-modal-toggle a {
    color: #003d99;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
}

.auth-modal-toggle a:hover {
    color: #002266;
}

.auth-modal-error {
    background: #ffebee;
    color: #c62828;
    padding: 12px;
    border-radius: 6px;
    font-size: 14px;
    margin-bottom: 15px;
    border-left: 4px solid #c62828;
}

/* RESPONSIVE */
@media (max-width: 768px) {
    .nav-menu {
        gap: 10px;
    }

    .btn-launch,
    .btn-login,
    .btn-signup {
        padding: 8px 12px !important;
        font-size: 12px !important;
    }

    .hero h1 {
        font-size: 32px;
    }

    .features h2,
    .how-it-works h2,
    .testimonials h2,
    .pricing h2,
    .cta h2 {
        font-size: 32px;
    }

    .pricing-featured {
        transform: scale(1);
    }

    .features-grid,
    .steps-grid,
    .testimonials-grid,
    .pricing-grid {
        grid-template-columns: 1fr;
    }
}
    </style>

</head>
<body>

<div id="landingPage" class="landing-page">
    
    <!-- NAVBAR -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">📋 Student Work Log</div>
            <ul class="nav-menu">
                <li><a href="#features">Features</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#" onclick="goToApp(event)" class="btn-launch">Launch App</a></li>
                <li><a href="#" onclick="showLoginModal(event)" class="btn-login">Login</a></li>
                <li><a href="#" onclick="showSignupModal(event)" class="btn-signup">Sign Up</a></li>
            </ul>
        </div>
    </nav>

    <!-- HERO SECTION -->
    <section class="hero">
        <h1>Collaborate on Projects.<br>Track Progress.<br>Achieve Goals.</h1>
        <p class="hero-subtitle">A modern work log system for student teams. Organize tasks, track time, and boost productivity.</p>
        <div class="hero-buttons">
            <a href="#" onclick="goToApp(event)" class="btn btn-primary">Get Started Free</a>
            <a href="#features" class="btn btn-secondary">Learn More</a>
        </div>
    </section>

    <!-- FEATURES SECTION -->
    <section id="features" class="features">
        <div class="container">
            <h2>Powerful Features</h2>
            <p class="section-subtitle">Everything you need to manage group projects effectively</p>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🎯</div>
                    <h3>Kanban Board</h3>
                    <p>Organize tasks into To Do, In Progress, and Done columns. Drag and drop cards to update status instantly.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📊</div>
                    <h3>Dashboard Analytics</h3>
                    <p>Track your productivity with real-time statistics. Monitor completion rates, hours worked, and project progress.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">👥</div>
                    <h3>Team Collaboration</h3>
                    <p>Share tasks with teammates, assign work, and see boards shared with you. Collaborate seamlessly.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">⏱️</div>
                    <h3>Time Tracking</h3>
                    <p>Log hours on each task. Track daily productivity and see how long different tasks typically take.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔔</div>
                    <h3>Priority System</h3>
                    <p>Mark tasks as High, Medium, or Low priority. Stay focused on what matters most.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🌙</div>
                    <h3>Dark Mode</h3>
                    <p>Switch to dark mode for comfortable work at night. Your preference is automatically saved.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- HOW IT WORKS -->
    <section id="how-it-works" class="how-it-works">
        <div class="container">
            <h2>How It Works</h2>
            <p class="section-subtitle">Get started in 4 simple steps</p>
            <div class="steps-grid">
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-icon">📝</div>
                    <h3>Sign Up</h3>
                    <p>Create your account in seconds. No credit card required.</p>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-icon">📋</div>
                    <h3>Create Tasks</h3>
                    <p>Add your project tasks with details like hours, priority, and due date.</p>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-icon">👥</div>
                    <h3>Share & Assign</h3>
                    <p>Invite teammates and assign tasks to them. Collaborate in real-time.</p>
                </div>
                <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-icon">📊</div>
                    <h3>Track Progress</h3>
                    <p>Watch your dashboard update as tasks progress. Celebrate completed work!</p>
                </div>
            </div>
        </div>
    </section>

    <!-- TESTIMONIALS -->
    <section id="testimonials" class="testimonials">
        <div class="container">
            <h2>What Students Say</h2>
            <p class="section-subtitle">Hear from students using Student Work Log</p>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="stars">⭐⭐⭐⭐⭐</div>
                    <p>"This app completely changed how our team manages projects. We're so much more organized now!"</p>
                    <div class="author-name">John Doe - Computer Science Student</div>
                </div>
                <div class="testimonial-card">
                    <div class="stars">⭐⭐⭐⭐⭐</div>
                    <p>"The dashboard analytics help me understand where I'm spending my time. Highly recommend!"</p>
                    <div class="author-name">Sarah Johnson - Engineering Student</div>
                </div>
                <div class="testimonial-card">
                    <div class="stars">⭐⭐⭐⭐⭐</div>
                    <p>"Our group project deadlines are easier to manage. Finally, a tool made for students!"</p>
                    <div class="author-name">Mike Chen - Business Manager</div>
                </div>
            </div>
        </div>
    </section>

    <!-- PRICING -->
    <section id="pricing" class="pricing">
        <div class="container">
            <h2>Simple, Transparent Pricing</h2>
            <p class="section-subtitle">Choose the plan that works for you</p>
            <div class="pricing-grid">
                <div class="pricing-card">
                    <h3>Starter</h3>
                    <div class="price">Free</div>
                    <ul class="pricing-features">
                        <li>✓ Up to 5 projects</li>
                        <li>✓ Kanban board</li>
                        <li>✓ Basic dashboard</li>
                        <li>✓ 1 team member</li>
                        <li>✗ Advanced analytics</li>
                    </ul>
                    <a href="#" onclick="goToApp(event)" class="btn btn-pricing">Get Started</a>
                </div>
                <div class="pricing-card pricing-featured">
                    <div class="badge">Most Popular</div>
                    <h3>Professional</h3>
                    <div class="price">$5<span>/month</span></div>
                    <ul class="pricing-features">
                        <li>✓ Unlimited projects</li>
                        <li>✓ Kanban board</li>
                        <li>✓ Advanced dashboard</li>
                        <li>✓ Up to 10 team members</li>
                        <li>✓ Advanced analytics</li>
                    </ul>
                    <a href="#" onclick="goToApp(event)" class="btn btn-pricing btn-primary-pricing">Start Free Trial</a>
                </div>
                <div class="pricing-card">
                    <h3>Team</h3>
                    <div class="price">$15<span>/month</span></div>
                    <ul class="pricing-features">
                        <li>✓ Unlimited everything</li>
                        <li>✓ All features</li>
                        <li>✓ Unlimited team members</li>
                        <li>✓ Advanced analytics</li>
                        <li>✓ Priority support</li>
                    </ul>
                    <a href="#" onclick="goToApp(event)" class="btn btn-pricing">Contact Sales</a>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="cta">
        <h2>Ready to Transform Your Workflow?</h2>
        <p>Join thousands of students managing their projects better.</p>
        <a href="#" onclick="goToApp(event)" class="btn btn-primary btn-large">Start Using Student Work Log</a>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
        <p>&copy; 2026 Student Work Log. All rights reserved.</p>
    </footer>

</div>

<!-- LOGIN MODAL -->
<div id="loginModal" class="auth-modal">
    <div class="auth-modal-content">
        <button class="auth-modal-close" onclick="closeAuthModal('loginModal')">&times;</button>
        <h2>Welcome Back</h2>
        <div id="loginModalError" class="auth-modal-error" style="display: none;"></div>
        <form class="auth-modal-form" onsubmit="handleLandingPageLogin(event)">
            <div class="auth-modal-form-group">
                <label>Email</label>
                <input type="email" id="landingLoginEmail" placeholder="your@email.com" required>
            </div>
            <div class="auth-modal-form-group">
                <label>Password</label>
                <input type="password" id="landingLoginPassword" placeholder="Enter password" required>
            </div>
            <button type="submit" class="auth-modal-submit">Login</button>
        </form>
        <div class="auth-modal-toggle">
            Don't have an account? <a onclick="toggleToSignup(event)">Sign Up</a>
        </div>
    </div>
</div>

<!-- SIGNUP MODAL -->
<div id="signupModal" class="auth-modal">
    <div class="auth-modal-content">
        <button class="auth-modal-close" onclick="closeAuthModal('signupModal')">&times;</button>
        <h2>Create Account</h2>
        <div id="signupModalError" class="auth-modal-error" style="display: none;"></div>
        <form class="auth-modal-form" onsubmit="handleLandingPageSignup(event)">
            <div class="auth-modal-form-group">
                <label>Full Name</label>
                <input type="text" id="landingSignupName" placeholder="John Doe" required>
            </div>
            <div class="auth-modal-form-group">
                <label>Email</label>
                <input type="email" id="landingSignupEmail" placeholder="your@email.com" required>
            </div>
            <div class="auth-modal-form-group">
                <label>Password</label>
                <input type="password" id="landingSignupPassword" placeholder="Create a password" required>
            </div>
            <div class="auth-modal-form-group">
                <label>Confirm Password</label>
                <input type="password" id="landingSignupConfirmPassword" placeholder="Confirm password" required>
            </div>
            <button type="submit" class="auth-modal-submit">Sign Up</button>
        </form>
        <div class="auth-modal-toggle">
            Already have an account? <a onclick="toggleToLogin(event)">Login</a>
        </div>
    </div>
</div>

<script>
// ===== MODAL FUNCTIONS =====

function showLoginModal(e) {
    if (e) e.preventDefault();
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    if (loginModal) loginModal.classList.add('show');
    if (signupModal) signupModal.classList.remove('show');
}

function showSignupModal(e) {
    if (e) e.preventDefault();
    const signupModal = document.getElementById('signupModal');
    const loginModal = document.getElementById('loginModal');
    if (signupModal) signupModal.classList.add('show');
    if (loginModal) loginModal.classList.remove('show');
}

function closeAuthModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

function toggleToSignup(e) {
    if (e) e.preventDefault();
    closeAuthModal('loginModal');
    showSignupModal();
}

function toggleToLogin(e) {
    if (e) e.preventDefault();
    closeAuthModal('signupModal');
    showLoginModal();
}

function handleLandingPageLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('landingLoginEmail').value.trim();
    const password = document.getElementById('landingLoginPassword').value.trim();
    const errorDiv = document.getElementById('loginModalError');
    
    if (!email || !password) {
        if (errorDiv) {
            errorDiv.textContent = '❌ Please fill in all fields';
            errorDiv.style.display = 'block';
        }
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        if (errorDiv) {
            errorDiv.textContent = '❌ Invalid email or password';
            errorDiv.style.display = 'block';
        }
        return;
    }
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('✅ Logged in successfully!\n\nWelcome, ' + user.name + '!');
    closeAuthModal('loginModal');
    document.getElementById('landingLoginEmail').value = '';
    document.getElementById('landingLoginPassword').value = '';
}

function handleLandingPageSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('landingSignupName').value.trim();
    const email = document.getElementById('landingSignupEmail').value.trim();
    const password = document.getElementById('landingSignupPassword').value.trim();
    const confirmPassword = document.getElementById('landingSignupConfirmPassword').value.trim();
    const errorDiv = document.getElementById('signupModalError');
    
    if (errorDiv) errorDiv.style.display = 'none';
    
    if (!name || !email || !password || !confirmPassword) {
        if (errorDiv) {
            errorDiv.textContent = '❌ Please fill in all fields';
            errorDiv.style.display = 'block';
        }
        return;
    }
    
    if (password !== confirmPassword) {
        if (errorDiv) {
            errorDiv.textContent = '❌ Passwords do not match';
            errorDiv.style.display = 'block';
        }
        return;
    }
    
    if (password.length < 6) {
        if (errorDiv) {
            errorDiv.textContent = '❌ Password must be at least 6 characters';
            errorDiv.style.display = 'block';
        }
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.find(u => u.email === email)) {
        if (errorDiv) {
            errorDiv.textContent = '❌ Email already registered';
            errorDiv.style.display = 'block';
        }
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    alert('✅ Account created successfully!\n\nWelcome, ' + name + '!');
    closeAuthModal('signupModal');
    
    document.getElementById('landingSignupName').value = '';
    document.getElementById('landingSignupEmail').value = '';
    document.getElementById('landingSignupPassword').value = '';
    document.getElementById('landingSignupConfirmPassword').value = '';
}

function goToApp(e) {
    if (e) e.preventDefault();
    alert('🚀 Going to App!\n\nIn your full project, this would load the complete application with the Kanban board!');
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    
    if (event.target === loginModal && loginModal) {
        closeAuthModal('loginModal');
    }
    if (event.target === signupModal && signupModal) {
        closeAuthModal('signupModal');
    }
});

console.log('✅ Website loaded successfully!');
</script>

</body>
</html>
