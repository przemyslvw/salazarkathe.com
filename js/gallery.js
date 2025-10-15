// Function to create gallery items
function createGalleryItem(imagePath, title = '') {
    const fileName = imagePath.split('/').pop().split('.')[0];
    const itemTitle = title || fileName.replace(/_/g, ' ').replace(/-/g, ' ');
    
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item fade-up';
    galleryItem.dataset.title = itemTitle;
    galleryItem.dataset.description = 'Contemporary Caribbean Ritualistic Art';
    galleryItem.dataset.image = imagePath;
    
    galleryItem.innerHTML = `
        <img src="${imagePath}" alt="${itemTitle}" loading="lazy">
        <div class="gallery-overlay">
            <div class="overlay-text">${itemTitle}</div>
        </div>
    `;
    
    return galleryItem;
}

// Function to load a gallery
function loadGallery(container, images) {
    if (!container) return;
    
    // Clear loading text
    container.innerHTML = '';
    
    // Add each image to the gallery
    images.forEach((imagePath) => {
        const galleryItem = createGalleryItem(imagePath);
        container.appendChild(galleryItem);
    });
    
    // Re-initialize lightbox if needed
    if (typeof initLightbox === 'function') {
        initLightbox();
    }
}

// Main function to initialize all galleries
document.addEventListener('DOMContentLoaded', function() {
    // List of images for the first gallery
    const gallery1Images = [
        'gallery/akwarele/kolekcja2025/Cherry blossoms in Polish orchard.png',
        'gallery/akwarele/kolekcja2025/Ethereal Baltic sea with translucent sailing ships.png',
        'gallery/akwarele/kolekcja2025/Misty mornings in a La Rioja vineyard.png',
        // Akwarele collection
        // 'gallery/akwarele/70n2x970n2x970n2.png',
        // 'gallery/akwarele/Image_1tewa51tewa51tew.png',
        // 'gallery/akwarele/Image_7062q67062q67062.png',
        // 'gallery/akwarele/Image_sxrf2sexrf2sexr.png',
        // 'gallery/akwarele/afq57fafq57fafq5.png',
        // 'gallery/akwarele/cb82v3cb82v3cb82.png',
        // 'gallery/akwarele/oh19duoh19duoh19.png',
        // 'gallery/akwarele/qv9ap3qv9ap3qv9a.png',
        // 'gallery/akwarele/tjdoyotjdoyotjdo.png',
        // 'gallery/akwarele/ve1x4jve1x4jve1x.png',
        'gallery/akwarele/kolekcja2025/Sunflower field.png',
        'gallery/akwarele/kolekcja2025/Abstract composition of Polish eagle.png',
        'gallery/akwarele/kolekcja2025/Woman surrounded by birds and flowers.png',
        'gallery/akwarele/kolekcja2025/Sunlight reflecting from white houses of Ronda.png',
        'gallery/akwarele/kolekcja2025/Village priest reading prayers.png',
        'gallery/akwarele/kolekcja2025/White stork building nest.png',
        'gallery/akwarele/kolekcja2025/Woman with birds.png',
    ];

    // List of images for the second gallery
    const gallery2Images = [
        'gallery/akwarele/kolekcja2025/Sunset over an Andalusian patio.png',
        'gallery/2025-09-09_15-54.png',
        'gallery/akwarele/kolekcja2025/Fiesta de los Patios in Córdoba.png',
        'gallery/2025-09-28_15-55.png',
        'gallery/akwarele/kolekcja2025/Málaga at dawn.png',
        'gallery/Maria La Alta.jpg',
        'gallery/akwarele/kolekcja2025/Ancient Polish oak tree.png',
        'gallery/akwarele/kolekcja2025/Park Güell in Barcelona.png',
        // 'gallery/2025-09-28 at 16.49.30.jpg',
        'gallery/akwarele/kolekcja2025/Polish countryside meadow.png',
        // 'gallery/Wzory Duszy.jpg',
        // 'gallery/Garcia Márquez.png',
        'gallery/akwarele/kolekcja2025/Polish harvest festival.png',
        'gallery/akwarele/kolekcja2025/Procession of translucent ancestors.png',
        'gallery/akwarele/kolekcja2025/Woman with parrots.png',

    ];

    // List of images for the Digital Arts gallery
    const digitalArtsImages = [
        'gallery/digitalArts/Sklep Ogrodniczy.png',
        'gallery/digitalArts/Produkty Eko.png',
        'gallery/digitalArts/ikony_restauracja.png',
        'gallery/digitalArts/Przedszkole.png',
        'gallery/digitalArts/The Olive Branch Bistro.png',

    ];

    // Load first gallery
    const gallery1 = document.querySelector('#gallery .gallery-grid');
    loadGallery(gallery1, gallery1Images);
    
    // Load second gallery
    const gallery2 = document.querySelector('#gallery2 .gallery-grid-2');
    loadGallery(gallery2, gallery2Images);

    // Load Digital Arts gallery
    const digitalArtsGallery = document.querySelector('#digital-arts .gallery-grid');
    if (digitalArtsGallery) {
        loadGallery(digitalArtsGallery, digitalArtsImages);
    }
});
