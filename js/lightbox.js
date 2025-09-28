// Lightbox functionality
export function openLightbox(title, description, imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-description');
    
    if (lightbox && lightboxImg && lightboxTitle && lightboxDesc) {
        lightboxImg.src = imageSrc;
        lightboxImg.alt = title;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = description;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

export function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Initialize lightbox functionality
export function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    // Close when clicking outside content
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Add click event listeners to gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const description = item.getAttribute('data-description');
            const imageSrc = item.getAttribute('data-image');
            openLightbox(title, description, imageSrc);
        });
    });

    // Close button
    const closeBtn = document.querySelector('.close-lightbox');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });
    }
}
