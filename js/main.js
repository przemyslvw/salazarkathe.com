// Main JavaScript file - imports all other scripts
import { ParticleSystem } from './particles.js';
import { initLightbox } from './lightbox.js';
import { initAnimations } from './animations.js';

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system if canvas exists
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        new ParticleSystem(canvas);
    }
    
    // Initialize lightbox
    initLightbox();
    
    // Initialize animations
    initAnimations();
    
    console.log('All JavaScript modules loaded successfully');
});
