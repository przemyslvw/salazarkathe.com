// Function to load gallery images dynamically
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // List of images in the gallery directory
    const galleryImages = [
        'gallery/2025-09-09_15-54.png',
        'gallery/2025-09-28_15-55.png'
    ];

    // Clear existing static content
    galleryGrid.innerHTML = '';

    // Add each image to the gallery
    galleryImages.forEach((imagePath, index) => {
        const fileName = imagePath.split('/').pop().split('.')[0];
        const title = fileName.replace(/_/g, ' ').replace(/-/g, ' ');
        
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item fade-up';
        galleryItem.dataset.title = title;
        galleryItem.dataset.description = 'Contemporary Caribbean Ritualistic Art';
        galleryItem.dataset.image = imagePath;
        
        galleryItem.innerHTML = `
            <img src="${imagePath}" alt="${title}" loading="lazy">
            <div class="gallery-overlay">
                <div class="overlay-text">${title}</div>
            </div>
        `;
        
        galleryGrid.appendChild(galleryItem);
    });

    // Initialize lightbox after loading images
    if (typeof initLightbox === 'function') {
        initLightbox();
    }
});
