// Main site JS extracted from index.html
// Depends on Supabase client and optional config.js (which sets window.SWL_SUPABASE_URL / SWL_SUPABASE_ANON_KEY)

// Load Supabase config from `config.js` when present. GitHub Pages will not deploy
// ignored local files, so keep the public anon config here as the deployment fallback.
const DEFAULT_SUPABASE_URL = 'https://teclqhxbohgljgcqcljq.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlY2xxaHhib2hnbGpnY3FjbGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NzgxMjAsImV4cCI6MjA5MDA1NDEyMH0.B06AiesYThA9Z-4MD8q5DxVmI5fbs2PWpimWDNzkyAk';

const SUPABASE_URL = window.SWL_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const SUPABASE_ANON_KEY = window.SWL_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;
const hasExternalSupabaseConfig = Boolean(window.SWL_SUPABASE_URL && window.SWL_SUPABASE_ANON_KEY);
const isPlaceholderSupabaseConfig = /your-project|your-supabase-url/i.test(SUPABASE_URL)
    || /REPLACE_WITH_ANON_KEY/i.test(SUPABASE_ANON_KEY);

if (!hasExternalSupabaseConfig) {
    console.info('Optional config.js not found. Using bundled public Supabase anon config for deployment.');
}
if (isPlaceholderSupabaseConfig) {
    console.error('Supabase config is still using placeholder values. Login cannot work until SWL_SUPABASE_URL and SWL_SUPABASE_ANON_KEY are set.');
}

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_ANON_KEY;
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});

function getAppRedirectUrl() {
    return new URL('app.html', window.location.href).href;
}

function describeAuthError(error) {
    if (!error) return 'Unknown authentication error';
    const parts = [
        error.name,
        error.status ? `status ${error.status}` : '',
        error.code ? `code ${error.code}` : '',
        error.message
    ].filter(Boolean);
    return parts.join(' - ') || String(error);
}

function logAuthFailure(context, error) {
    console.error(`${context} failed: ${describeAuthError(error)}`, {
        error,
        supabaseUrl,
        hasExternalSupabaseConfig,
        isPlaceholderSupabaseConfig,
        origin: window.location.origin,
        href: window.location.href
    });
}

// ===== EMAIL CONFIRMATION HANDLER =====
(async function handleConfirmationOnLoad() {
    const hash = window.location.hash;
    const search = window.location.search;
    const hasToken = hash.includes('access_token') || hash.includes('type=signup')
                  || search.includes('token_hash') || search.includes('type=signup')
                  || search.includes('confirmation_token');
    
    if (hasToken) {
        console.log('<i class="fi fi-rr-key"></i> Confirmation token detected on index.html, exchanging session...');
        await new Promise(r => setTimeout(r, 800));
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session) {
            console.log('✅ Session confirmed. Redirecting to app...');
            window.location.replace('app.html');
        } else {
            console.warn('⚠️ Token detected but session not established.');
        }
    }
})();

// ===== THEME FUNCTIONS =====
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('studentLogTheme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const btn = document.getElementById('themeToggleBtn');
    if(btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

const savedTheme = localStorage.getItem('studentLogTheme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
window.addEventListener('load', () => {
    updateThemeIcon(savedTheme);
});

// ===== SITE NOTIFICATIONS & FOCUS HELPERS =====
let lastFocusedElement = null;
function showToast(message, type = 'default', timeout = 4500) {
    const toast = document.getElementById('siteToast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = 'site-toast show ' + (type === 'success' ? 'success' : type === 'error' ? 'error' : '');
    toast.removeAttribute('hidden');
    setTimeout(() => {
        toast.className = 'site-toast';
        toast.setAttribute('hidden', '');
    }, timeout);
}

// ===== MODAL FUNCTIONS =====

function showLoginModal(e) {
    if (e) e.preventDefault();
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    lastFocusedElement = document.activeElement;
    if (loginModal) loginModal.classList.add('show');
    if (signupModal) signupModal.classList.remove('show');
    setTimeout(() => {
        const firstInput = loginModal && loginModal.querySelector('input');
        if (firstInput) firstInput.focus();
    }, 50);
}

function showSignupModal(e) {
    if (e) e.preventDefault();
    const signupModal = document.getElementById('signupModal');
    const loginModal = document.getElementById('loginModal');
    lastFocusedElement = document.activeElement;
    if (signupModal) signupModal.classList.add('show');
    if (loginModal) loginModal.classList.remove('show');
    if (typeof resetSignupWizard === 'function') resetSignupWizard();
    setTimeout(() => {
        const firstInput = signupModal && signupModal.querySelector('input');
        if (firstInput) firstInput.focus();
    }, 50);
}

function closeAuthModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
    try { if (lastFocusedElement) lastFocusedElement.focus(); } catch (e) { }
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

async function handleLandingPageLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('landingLoginEmail').value.trim();
    const password = document.getElementById('landingLoginPassword').value.trim();
    const errorDiv = document.getElementById('loginModalError');
    if (errorDiv) {
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';
    }
    
    if (!email || !password) {
        if (errorDiv) {
            errorDiv.textContent = 'Please fill in all fields';
            errorDiv.style.display = 'block';
        }
        return;
    }

    if (isPlaceholderSupabaseConfig) {
        if (errorDiv) {
            errorDiv.textContent = 'Authentication is not configured correctly. Check the console for Supabase config details.';
            errorDiv.style.display = 'block';
        }
        logAuthFailure('Login blocked before request', new Error('Supabase URL or anon key is a placeholder'));
        return;
    }

    let data;
    try {
        const response = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });
        data = response.data;

        if (response.error) {
            logAuthFailure('Login request', response.error);
            if (errorDiv) {
                if (response.error.message.includes('Email not confirmed')) {
                    errorDiv.innerHTML = `
                        <strong>Email not confirmed.</strong><br>
                        Please check your inbox to verify your account.<br>
                        <button type="button" class="resend-btn" id="resendBtn" onclick="resendConfirmationEmail('${email}')">
                            Didn't get it? Resend confirmation email
                        </button>
                    `;
                } else {
                    errorDiv.textContent = response.error.message;
                }
                errorDiv.style.display = 'block';
            }
            return;
        }
    } catch (err) {
        logAuthFailure('Login network request', err);
        if (errorDiv) {
            const configHint = !hasExternalSupabaseConfig
                ? ' The deployed site is using the bundled Supabase config because config.js was not found.'
                : '';
            errorDiv.textContent = `Login request failed: ${err.message || 'Network error'}.${configHint}`;
            errorDiv.style.display = 'block';
        }
        return;
    }

    if (!data?.user) {
        logAuthFailure('Login response', new Error('Supabase returned no user and no explicit error'));
        if (errorDiv) {
            errorDiv.textContent = 'Login failed: no user session was returned. Check the console for details.';
            errorDiv.style.display = 'block';
        }
        return;
    }

    
    const userRole = data.user?.role;
    const isConfirmed = data.user?.email_confirmed_at;

    if (!isConfirmed && userRole !== 'service_role') {
        if (errorDiv) {
            errorDiv.innerHTML = `
                <strong>Email not confirmed.</strong><br>
                Please check your inbox to verify your account.<br>
                <button type="button" class="resend-btn" id="resendBtn" onclick="resendConfirmationEmail('${email}')">
                    Didn't get it? Resend confirmation email
                </button>
            `;
            errorDiv.style.display = 'block';
        }
        return;
    }

    const userName = data.user.user_metadata?.name || 'User';
    showToast('Logged in successfully — Welcome back, ' + userName + '!', 'success');
    
    setTimeout(() => {
        window.location.href = 'app.html';
    }, 300);
}

// ===== WIZARD LOGIC =====
let currentSignupStep = 1;

function updateSignupView() {
    for (let i = 1; i <= 4; i++) {
        const stepDiv = document.getElementById('wizardStep' + i);
        if (stepDiv) stepDiv.classList.remove('active');
    }
    const currentDiv = document.getElementById('wizardStep' + currentSignupStep);
    if (currentDiv) currentDiv.classList.add('active');
    
    const progressEl = document.getElementById('wizardProgress');
    if (progressEl) progressEl.textContent = `Step ${currentSignupStep} of 4`;
    
    const errorDiv = document.getElementById('signupModalError');
    if (errorDiv) errorDiv.style.display = 'none';
}

function nextSignupStep(step) {
    const errorDiv = document.getElementById('signupModalError');
    errorDiv.style.display = 'none';

    if (step === 1) {
        const name = document.getElementById('wizardSignupName').value.trim();
        if (!name) {
            errorDiv.textContent = 'Please enter your full name.';
            errorDiv.style.display = 'block';
            return;
        }
    } else if (step === 2) {
        const role = document.getElementById('wizardSignupRole').value;
        if (!role) {
            errorDiv.textContent = 'Please select a role.';
            errorDiv.style.display = 'block';
            return;
        }
    } else if (step === 3) {
        const district = document.getElementById('wizardSignupDistrict').value.trim();
        if (!district) {
            errorDiv.textContent = 'Please enter your district.';
            errorDiv.style.display = 'block';
            return;
        }
    }

    currentSignupStep = step + 1;
    updateSignupView();
}

function prevSignupStep(step) {
    currentSignupStep = step - 1;
    updateSignupView();
}

function selectRole(role) {
    document.getElementById('wizardSignupRole').value = role;
    document.getElementById('roleCardStudent').classList.remove('selected');
    document.getElementById('roleCardAdmin').classList.remove('selected');
    
    if (role === 'Learning User') {
        document.getElementById('roleCardStudent').classList.add('selected');
    } else {
        document.getElementById('roleCardAdmin').classList.add('selected');
    }
}

function resetSignupWizard() {
    currentSignupStep = 1;
    document.getElementById('wizardSignupName').value = '';
    document.getElementById('wizardSignupRole').value = '';
    document.getElementById('wizardSignupDistrict').value = '';
    document.getElementById('wizardSignupEmail').value = '';
    document.getElementById('wizardSignupPassword').value = '';
    document.getElementById('wizardSignupConfirmPassword').value = '';
    
    document.getElementById('roleCardStudent').classList.remove('selected');
    document.getElementById('roleCardAdmin').classList.remove('selected');
    
    updateSignupView();
}

async function handleLandingPageSignup(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    const errorDiv = document.getElementById('signupModalError');
    
    const name = document.getElementById('wizardSignupName').value.trim();
    const role = document.getElementById('wizardSignupRole').value;
    const district = document.getElementById('wizardSignupDistrict').value.trim();
    const email = document.getElementById('wizardSignupEmail').value.trim();
    const password = document.getElementById('wizardSignupPassword').value.trim();
    const confirmPassword = document.getElementById('wizardSignupConfirmPassword').value.trim();
    
    if (errorDiv) errorDiv.style.display = 'none';
    
    if (!email || !password || !confirmPassword) {
        if (errorDiv) {
            errorDiv.textContent = 'Please fill in all email and password fields';
            errorDiv.style.display = 'block';
        }
        return;
    }
    
    if (password !== confirmPassword) {
        if (errorDiv) {
            errorDiv.textContent = 'Passwords do not match';
            errorDiv.style.display = 'block';
        }
        return;
    }
    
    if (password.length < 6) {
        if (errorDiv) {
            errorDiv.textContent = 'Password must be at least 6 characters';
            errorDiv.style.display = 'block';
        }
        return;
    }

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Signing Up...';

        const redirectTo = getAppRedirectUrl();
        console.log('📧 Signup redirect URL:', redirectTo);

        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: { name, role, district },
                emailRedirectTo: redirectTo
            }
        });
        
        if (error) {
            logAuthFailure('Signup request', error);
            if (errorDiv) {
                if (error.message.includes('rate limit') || error.status === 429) {
                    errorDiv.textContent = 'Too many signup attempts. Please wait a minute before trying again.';
                } else {
                    errorDiv.textContent = error.message;
                }
                errorDiv.style.display = 'block';
            }
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            return;
        }
        
        if (!data.session) {
            console.log("Signup successful, confirmation required.");
            if (errorDiv) {
                errorDiv.style.background = '#e7f3ff';
                errorDiv.style.color = '#005a9e';
                errorDiv.style.borderLeft = '4px solid #0078d4';
                errorDiv.innerHTML = `
                    <strong>✅ Account created successfully!</strong><br>
                    A verification link has been sent to <strong>${email}</strong>.<br>
                    Please confirm your email before logging in.
                `;
                errorDiv.style.display = 'block';
            }
            submitBtn.textContent = 'Check Your Email';
            return;
        }

        showToast('Account created successfully — check your email to confirm.', 'success');
        
        setTimeout(() => {
            window.location.href = 'app.html';
        }, 300);
    } catch (err) {
        logAuthFailure('Signup network request', err);
        if (errorDiv) {
            errorDiv.textContent = `Signup request failed: ${err.message || 'Network error'}. Check the console for details.`;
            errorDiv.style.display = 'block';
        }
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
}

async function resendConfirmationEmail(email) {
    const resendBtn = document.getElementById('resendBtn');
    const originalText = resendBtn ? resendBtn.textContent : 'Resend';
    
    try {
        if (resendBtn) {
            resendBtn.disabled = true;
            resendBtn.textContent = 'Sending...';
        }
        
        const redirectTo = getAppRedirectUrl();
        console.log('📧 Resend redirect URL:', redirectTo);

        const { error } = await supabaseClient.auth.resend({
            type: 'signup',
            email: email,
            options: {
                emailRedirectTo: redirectTo
            }
        });
        
        if (error) {
            logAuthFailure('Resend confirmation request', error);
            throw error;
        }
        
        if (resendBtn) {
            resendBtn.textContent = '✅ Confirmation email resent!';
            setTimeout(() => {
                resendBtn.textContent = originalText;
                resendBtn.disabled = false;
            }, 5000);
        } else {
            showToast('Confirmation email resent!', 'success');
        }
        
    } catch (err) {
        logAuthFailure('Resend confirmation network request', err);
        showToast('Error resending email: ' + (err.message || 'Unknown'), 'error');
        if (resendBtn) {
            resendBtn.textContent = originalText;
            resendBtn.disabled = false;
        }
    }
}


// ===== FEEDBACK FORM FUNCTION =====
async function handleFeedbackSubmission(event) {
    event.preventDefault();
    
    const name = document.getElementById('feedbackName').value.trim();
    const email = document.getElementById('feedbackEmail').value.trim();
    const message = document.getElementById('feedbackMessage').value.trim();
    const submitBtn = event.target.querySelector('button[type="submit"]');

    if (!name || !email || !message) {
        showToast('Please fill in all fields.', 'error');
        return;
    }

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        const { error } = await supabaseClient
            .from('feedback')
            .insert([{ name, email, message }]);

        if (error) throw error;

        showToast(`Thank you for your feedback, ${name}!`, 'success');
        
        document.getElementById('feedbackName').value = '';
        document.getElementById('feedbackEmail').value = '';
        document.getElementById('feedbackMessage').value = '';
    } catch (err) {
        console.error("Feedback error:", err);
        showToast('Error sending feedback. Your message was not saved.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Feedback';
    }
}

async function goToApp(e) {
    if (e) e.preventDefault();
    
    try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        if (error) {
            logAuthFailure('Session check', error);
        }

        if (session) {
            window.location.href = 'app.html';
        } else {
            showLoginModal();
        }
    } catch (err) {
        logAuthFailure('Session check network request', err);
        showLoginModal();
    }
}

function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const btn = input.nextElementSibling;
    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
    } else {
        input.type = 'password';
        btn.textContent = '👁️';
    }
}

function showForgotPassword(e) {
    if (e) e.preventDefault();
    const email = document.getElementById('landingLoginEmail').value.trim();
    if (!email) {
        showToast('Please enter your email address first, then click "Forgot Password?".', 'error');
        return;
    }
    
    supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: getAppRedirectUrl(),
    }).then(({ data, error }) => {
        if (error) {
            showToast('Error sending reset email: ' + (error.message || 'Unknown'), 'error');
        } else {
            showToast('Password reset instructions sent to ' + email + '!', 'success');
        }
    });
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
