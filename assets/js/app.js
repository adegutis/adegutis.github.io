const CONFIG = {
    jsonPath: 'assets/images.json',
    thumbPath: 'assets/images/thumbnails/',
    fullPath: 'assets/images/full/'
};

const galleryContainer = document.getElementById('gallery');
const searchInput = document.getElementById('search-input');
const albumList = document.getElementById('album-list');
let allImages = []; // Store all images for filtering
let currentAlbum = 'all'; // Track selected album

async function init() {
    try {
        const response = await fetch(CONFIG.jsonPath);
        if (!response.ok) throw new Error('Failed to load image list');
        const images = await response.json();

        if (images.length === 0) {
            console.warn('No images found in JSON list.');
            return;
        }

        // Randomize order
        shuffleArray(images);

        // Store for filtering
        allImages = images;

        renderGallery(images);

        // Setup album sidebar
        const albums = extractAlbums(images);
        renderAlbumSidebar(albums);

        // Setup search
        setupSearch();

    } catch (error) {
        console.error('Error initializing gallery:', error);
        galleryContainer.innerHTML = '<p style="text-align:center; padding-top:20%;">Failed to load gallery.</p>';
    }
}

function renderGallery(images) {
    galleryImages = images; // Save for lightbox navigation
    galleryContainer.innerHTML = '';

    images.forEach((imageData, index) => {
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        // Stagger animation delay slightly for nice effect
        div.style.animationDelay = `${index * 50}ms`;

        const img = document.createElement('img');
        // Use thumbnail path for grid
        img.src = `${CONFIG.thumbPath}${encodeURI(imageData.filename)}`;
        img.alt = imageData.description || imageData.filename;
        img.loading = "lazy";

        // Add click event for lightbox with index
        img.addEventListener('click', () => {
            openLightbox(index);
        });

        div.appendChild(img);

        // Add description if present
        if (imageData.description) {
            const caption = document.createElement('p');
            caption.classList.add('gallery-caption');
            caption.textContent = imageData.description;
            div.appendChild(caption);
        }

        galleryContainer.appendChild(div);
    });
}

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxDescription = document.getElementById('lightbox-description');
const closeBtn = document.getElementById('close-lightbox');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentImageIndex = 0;
let galleryImages = [];

function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.remove('hidden');
    // Force reflow
    void lightbox.offsetWidth;
    lightbox.classList.add('active');
}

function updateLightboxImage() {
    // Loop around
    if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
    if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;

    const imageData = galleryImages[currentImageIndex];
    lightboxImg.src = `${CONFIG.fullPath}${encodeURI(imageData.filename)}`;

    // Update description
    if (imageData.description) {
        lightboxDescription.textContent = imageData.description;
        lightboxDescription.style.display = 'block';
    } else {
        lightboxDescription.textContent = '';
        lightboxDescription.style.display = 'none';
    }
}

function closeLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightboxImg.src = '';
    }, 300); // Wait for transition
}

function showNext() {
    currentImageIndex++;
    updateLightboxImage();
}

function showPrev() {
    currentImageIndex--;
    updateLightboxImage();
}

// Event Listeners
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent closing
    showNext();
});
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrev();
});

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
});

// Swipe Support (Touch)
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const threshold = 50; // Min distance
    if (touchEndX < touchStartX - threshold) showNext(); // Left swipe
    if (touchEndX > touchStartX + threshold) showPrev(); // Right swipe
}

// Quotes Logic
const quotes = [
    { text: "Don't Panic.", author: "Douglas Adams, The Hitchhiker’s Guide to the Galaxy" },
    { text: "You may not feel outstandingly robust, but if you are an average-sized adult you will contain within your modest frame no less than 7 X 10^18 joules of potential energy—enough to explode with the force of thirty very large hydrogen bombs, assuming you knew how to liberate it and really wished to make a point.", author: "Bill Bryson, A Short History of Nearly Everything" },
    { text: "Life just wants to be; but it doesn't want to be much.", author: "Bill Bryson, A Short History of Nearly Everything" },
    { text: "Never be cruel, never be cowardly. And if you ever are, always make amends.", author: "The Doctor" },
    { text: "Hate is always foolish, and love is always wise.", author: "The Doctor" },
    { text: "The universe is big. It's vast and complicated and ridiculous. And sometimes, very rarely, impossible things just happen and we call them miracles.", author: "The Doctor" },
    { text: "There's no point in being grown-up if you can't be childish sometimes.", author: "The Doctor" },
    { text: "We're all stories, in the end. Just make it a good one, eh?", author: "The Doctor" }
];

function displayRandomQuote() {
    const quoteElement = document.getElementById('quote-text');
    const authorElement = document.getElementById('quote-author');

    if (quoteElement && authorElement) {
        // Pick random quote
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteElement.innerText = `"${randomQuote.text}"`;
        authorElement.innerText = `— ${randomQuote.author}`;
    }
}

// Album Logic
function extractAlbums(images) {
    const albumSet = new Set();
    images.forEach(img => {
        if (img.albums && img.albums.length > 0) {
            img.albums.forEach(album => albumSet.add(album));
        }
    });
    return Array.from(albumSet).sort();
}

function renderAlbumSidebar(albums) {
    albumList.innerHTML = '';

    // Add "All" option
    const allItem = document.createElement('li');
    allItem.textContent = 'All Photos';
    allItem.classList.add('album-item', 'active');
    allItem.dataset.album = 'all';
    allItem.addEventListener('click', () => selectAlbum('all'));
    albumList.appendChild(allItem);

    // Add each album
    albums.forEach(album => {
        const li = document.createElement('li');
        li.textContent = album;
        li.classList.add('album-item');
        li.dataset.album = album;
        li.addEventListener('click', () => selectAlbum(album));
        albumList.appendChild(li);
    });
}

function selectAlbum(album) {
    currentAlbum = album;

    // Update active state
    document.querySelectorAll('.album-item').forEach(item => {
        item.classList.toggle('active', item.dataset.album === album);
    });

    // Re-filter with current search term
    applyFilters();
}

// Search/Filter Logic
function setupSearch() {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            applyFilters();
        }, 300);
    });
}

function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    let filtered = allImages;

    // Filter by album
    if (currentAlbum !== 'all') {
        filtered = filtered.filter(img =>
            img.albums && img.albums.includes(currentAlbum)
        );
    }

    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(img =>
            img.description && img.description.toLowerCase().includes(searchTerm)
        );
    }

    if (filtered.length === 0) {
        galleryContainer.innerHTML = '<p class="no-results">No photos match your filters.</p>';
        galleryImages = [];
    } else {
        renderGallery(filtered);
    }
}

// Start
init();
displayRandomQuote();

// Fisher-Yates Shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
