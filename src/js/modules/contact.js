// Contact Form Module with better feedback
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/widmer.daniel40@gmail.com';

export function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const formMessage = document.querySelector('.form-message');
        
        // Check honeypot
        const honey = form.querySelector('input[name="_honey"]');
        if (honey && honey.value) return;
        
        // Validate form
        if (!validateForm(form)) return;
        
        // Show retro loading bar
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        const loadingBar = document.createElement('div');
        loadingBar.className = 'retro-loading-bar';
        submitBtn.appendChild(loadingBar);
        const btnText = document.createElement('span');
        btnText.textContent = 'ÜBERTRAGE NACHRICHT...';
        submitBtn.appendChild(btnText);
        
        try {
            const formData = new FormData(form);
            const response = await fetch(FORMSUBMIT_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success state
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                submitBtn.innerHTML = '<span>✓ NACHRICHT ERFOLGREICH ÜBERTRAGEN</span>';
                
                showMessage(formMessage, 'success', '✓ Nachricht erfolgreich gesendet! Vielen Dank!');
                form.reset();
                clearValidation(form);
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.classList.remove('success');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Nachricht senden';
                }, 3000);
                return; // Don't run finally block
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            showMessage(formMessage, 'error', '✗ Fehler beim Senden. Bitte versuche es später erneut.');
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Nachricht senden';
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.parentElement.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const formGroup = field.parentElement;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required check
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Dieses Feld ist erforderlich';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Bitte gib eine gültige E-Mail-Adresse ein';
        }
    }
    
    // Update UI
    if (isValid) {
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
    } else {
        formGroup.classList.remove('success');
        formGroup.classList.add('error');
        
        let errorEl = formGroup.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            formGroup.appendChild(errorEl);
        }
        errorEl.textContent = errorMessage;
    }
    
    return isValid;
}

function clearValidation(form) {
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
    });
}

function showMessage(element, type, message) {
    if (!element) return;
    
    element.className = `form-message ${type} show`;
    element.textContent = message;
    
    setTimeout(() => {
        element.classList.remove('show');
    }, 5000);
}

