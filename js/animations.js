// Animations and interactions
export function initAnimations() {
    // Animate manifesto text
    function animateManifestoText() {
        const manifestoText = document.querySelector('.manifesto-text');
        if (!manifestoText) return;
        
        const text = manifestoText.textContent;
        const words = text.split(' ');
        
        // Clear the text
        manifestoText.textContent = '';
        
        // Add each word with animation
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = word + ' ';
            span.style.animationDelay = `${index * 0.05}s`;
            manifestoText.appendChild(span);
        });
    }
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements with fade-up class
    document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize animations
    animateManifestoText();
    
    // Observe manifesto section for text animation
    const manifestoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateManifestoText();
                manifestoObserver.unobserve(entry.target);
            }
        });
    });
    
    const manifestoSection = document.querySelector('#manifesto');
    if (manifestoSection) {
        manifestoObserver.observe(manifestoSection);
    }
}
