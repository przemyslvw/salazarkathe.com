document.addEventListener('DOMContentLoaded', function() {
    // Create navigation arrows
    const leftArrow = document.createElement('div');
    leftArrow.className = 'nav-arrow left-arrow';
    leftArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
    leftArrow.style.cssText = `
        position: fixed;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 3rem;
        color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
        z-index: 1000;
        transition: color 0.3s;
    `;

    const rightArrow = leftArrow.cloneNode(true);
    rightArrow.className = 'nav-arrow right-arrow';
    rightArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
    rightArrow.style.left = '';
    rightArrow.style.right = '20px';

    // Add hover effects
    const arrows = [leftArrow, rightArrow];
    arrows.forEach(arrow => {
        arrow.addEventListener('mouseover', () => {
            arrow.style.color = 'rgba(255, 255, 255, 1)';
        });
        arrow.addEventListener('mouseout', () => {
            arrow.style.color = 'rgba(255, 255, 255, 0.7)';
        });
    });

    // Get current slide number
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop();
    let currentSlide = 0;
    
    if (currentFile === 'index.html') {
        currentSlide = 0;
    } else {
        currentSlide = parseInt(currentFile.split('.')[0]) || 1;
    }

    // Navigation function
    function navigate(direction) {
        let nextSlide = direction === 'next' ? currentSlide + 1 : currentSlide - 1;
        
        // Handle index.html as the first slide
        if (nextSlide === 0) {
            window.location.href = 'index.html';
            return;
        }
        
        // Handle slide navigation
        if (nextSlide >= 1 && nextSlide <= 10) {
            // Add leading zero for single-digit numbers
            const slideNumber = nextSlide < 10 ? '0' + nextSlide : nextSlide;
            window.location.href = `${slideNumber}.html`;
        }
    }

    // Add event listeners
    leftArrow.addEventListener('click', () => navigate('prev'));
    rightArrow.addEventListener('click', () => navigate('next'));

    // Add arrows to the page
    document.body.appendChild(leftArrow);
    document.body.appendChild(rightArrow);

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            navigate('prev');
        } else if (e.key === 'ArrowRight') {
            navigate('next');
        }
    });
});
