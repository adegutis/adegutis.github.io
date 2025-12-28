const CONFIG = {
    jsonPath: 'assets/images.json',
    thumbPath: 'assets/images/thumbnails/',
    fullPath: 'assets/images/full/'
};

const galleryContainer = document.getElementById('gallery');

async function init() {
    try {
        const response = await fetch(CONFIG.jsonPath);
        if (!response.ok) throw new Error('Failed to load image list');
        const images = await response.json();

        if (images.length === 0) {
            console.warn('No images found in JSON list.');
            return;
        }

        renderGallery(images);

    } catch (error) {
        console.error('Error initializing gallery:', error);
        galleryContainer.innerHTML = '<p style="text-align:center; padding-top:20%;">Failed to load gallery.</p>';
    }
}

function renderGallery(images) {
    galleryContainer.innerHTML = '';
    images.forEach((imgName, index) => {
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        // Stagger animation delay slightly for nice effect
        div.style.animationDelay = `${index * 50}ms`;

        const img = document.createElement('img');
        // Use thumbnail path for grid
        img.src = `${CONFIG.thumbPath}${encodeURI(imgName)}`;
        img.alt = imgName;
        img.loading = "lazy";

        // Add click event for lightbox using full path
        img.addEventListener('click', () => {
            openLightbox(`${CONFIG.fullPath}${encodeURI(imgName)}`);
        });

        div.appendChild(img);
        galleryContainer.appendChild(div);
    });
}

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-lightbox');

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.remove('hidden');
    // Force reflow
    void lightbox.offsetWidth;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightboxImg.src = '';
    }, 300); // Wait for transition
}

closeBtn.addEventListener('click', closeLightbox);

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Start
init();
