// Function to load gallery images dynamically
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // List of images in the gallery directory
    const galleryImages = [
        'gallery/2025-09-09_15-54.png',
        'gallery/2025-09-28_15-55.png',
        'gallery/2025-09-28_16-51.png',
        'gallery/2025-09-28 at 16.49.30.jpg',
        'gallery/Cuadro foto original.jpg',
        // Akwarele collection
        'gallery/akwarele/70n2x970n2x970n2.png',
        'gallery/akwarele/Image_1himu01himu01him.png',
        'gallery/akwarele/Image_1tewa51tewa51tew.png',
        'gallery/akwarele/Image_7062q67062q67062.png',
        'gallery/akwarele/Image_sxrf2sexrf2sexr.png',
        'gallery/akwarele/afq57fafq57fafq5.png',
        'gallery/akwarele/cb82v3cb82v3cb82.png',
        'gallery/akwarele/oh19duoh19duoh19.png',
        'gallery/akwarele/qv9ap3qv9ap3qv9a.png',
        'gallery/akwarele/tjdoyotjdoyotjdo.png',
        'gallery/akwarele/ve1x4jve1x4jve1x.png',
        'gallery/akwarele/w6kl73w6kl73w6kl.png',
        'gallery/akwarele/y0ewupy0ewupy0ew.png'
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
