const CONFIG = {
    slideDuration: 5000, // Time per slide in ms
    jsonPath: 'assets/images.json',
    picturesPath: 'pictures/'
};

const state = {
    currentSlide: 0,
    isPlaying: true,
    images: [],
    timer: null
};

// DOM Elements
const slideshowContainer = document.getElementById('slideshow');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const toggleBtn = document.getElementById('toggleBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

async function init() {
    try {
        const response = await fetch(CONFIG.jsonPath);
        if (!response.ok) throw new Error('Failed to load image list');
        state.images = await response.json();
        
        if (state.images.length === 0) {
            console.warn('No images found in JSON list.');
            return;
        }

        renderSlides();
        showSlide(0);
        startTimer();

    } catch (error) {
        console.error('Error initializing slideshow:', error);
        slideshowContainer.innerHTML = '<p style="color:white; text-align:center; padding-top:20%;">Failed to load gallery.</p>';
    }
}

function renderSlides() {
    slideshowContainer.innerHTML = '';
    state.images.forEach((imgName, index) => {
        const div = document.createElement('div');
        div.classList.add('slide');
        // Preload only the first image immediately, lazy load others if needed, 
        // but for a slideshow it's better to just set bg image.
        // We use encodeURI to handle spaces in filenames.
        div.style.backgroundImage = `url('${CONFIG.picturesPath}${encodeURI(imgName)}')`;
        slideshowContainer.appendChild(div);
    });
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    // Wrap around
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    // Remove active class from all
    slides.forEach(slide => slide.classList.remove('active'));

    // Add active class to current
    slides[index].classList.add('active');

    state.currentSlide = index;
}

function nextSlide() {
    showSlide(state.currentSlide + 1);
}

function prevSlide() {
    showSlide(state.currentSlide - 1);
    resetTimer(); // Reset timer on manual interaction
}

function startTimer() {
    if (state.timer) clearInterval(state.timer);
    if (state.isPlaying) {
        state.timer = setInterval(nextSlide, CONFIG.slideDuration);
    }
}

function resetTimer() {
    if (state.isPlaying) {
        startTimer();
    }
}

function togglePlay() {
    state.isPlaying = !state.isPlaying;
    
    if (state.isPlaying) {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        startTimer();
        toggleBtn.setAttribute('aria-label', 'Pause Slideshow');
    } else {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        clearInterval(state.timer);
        toggleBtn.setAttribute('aria-label', 'Play Slideshow');
    }
}

// Event Listeners
prevBtn.addEventListener('click', prevSlide);

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetTimer();
});
toggleBtn.addEventListener('click', togglePlay);

// specific Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
        resetTimer();
    }
    if (e.key === 'ArrowLeft') {
        prevSlide();
        resetTimer();
    }
    if (e.key === ' ') {
        togglePlay();
    }
});

// Start
init();
