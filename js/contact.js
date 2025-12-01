export function initContactForm() {
    const form = document.querySelector('.contact-form');

    if (!form) return;

    // Get current language
    const lang = document.documentElement.lang || 'en';

    // Translations
    const translations = {
        en: {
            sending: 'Sending...',
            success: 'Message sent successfully!',
            error: 'Something went wrong!',
            networkError: 'Network error. Please try again.'
        },
        pl: {
            sending: 'Wysyłanie...',
            success: 'Wiadomość została wysłana!',
            error: 'Coś poszło nie tak!',
            networkError: 'Błąd sieci. Spróbuj ponownie.'
        },
        es: {
            sending: 'Enviando...',
            success: '¡Mensaje enviado con éxito!',
            error: '¡Algo salió mal!',
            networkError: 'Error de red. Por favor, inténtelo de nuevo.'
        }
    };

    const t = translations[lang] || translations['en'];

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Honeypot check
        const honeypot = form.querySelector('input[name="honeypot"]');
        if (honeypot && honeypot.value) {
            // If honeypot is filled, it's a bot. Return early.
            // We can pretend it was successful to confuse the bot.
            console.log('Bot detected via honeypot');
            return;
        }

        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = t.sending;
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const result = await response.json();

            if (response.status === 200) {
                // Success
                showToast(t.success, 'success');
                form.reset();
            } else {
                // Error from API
                console.error(result);
                showToast(result.message || t.error, 'error');
            }
        } catch (error) {
            // Network error
            console.error(error);
            showToast(t.networkError, 'error');
        } finally {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;

    const icon = type === 'success' ? '✅' : '❌';

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;

    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 400); // Wait for transition to finish
    }, 3000);
}
