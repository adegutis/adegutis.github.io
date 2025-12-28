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

        // Randomize order
        shuffleArray(images);

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
// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

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
