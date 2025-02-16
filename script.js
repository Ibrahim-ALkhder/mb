// Initialize AOS
// Initialize AOS
AOS.init({ duration: 1200 });

// Music Control
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

// Create and configure the audio element dynamically
const audio = new Audio("audio/lala land.mp3");  // Updated to relative path
audio.preload = "auto";
audio.loop = true;

// Autoplay music when the page loads
window.addEventListener('load', () => {
    audio.play().then(() => {
        isPlaying = true;
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    }).catch(() => {
        // Autoplay blocked by browser
        isPlaying = false;
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    });
});

// Toggle music on button click
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        audio.play();
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
    isPlaying = !isPlaying;
});


// Wish Form
document.getElementById('wishForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("🎉 Wish Sent Successfully! 🎉");
});

// Flower Animation
function createPetalLayer(radius, petalCount, size, color) {
    const layer = document.createElement('div');
    layer.classList.add('petal-layer');
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.cssText = `transform: rotate(${i * (360 / petalCount)}deg) translateY(-${radius}px);
                               width: ${size}px;
                               height: ${size * 2}px;
                               background: ${color};`;
        layer.appendChild(petal);
    }
    return layer;
}

function createFlower(x, y) {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flower.style.left = `${x}px`;
    flower.style.top = `${y}px`;

    // Flower Core
    const core = document.createElement('div');
    core.classList.add('flower-core');
    flower.appendChild(core);

    // Petal Layers
    flower.appendChild(createPetalLayer(40, 8, 40, 
        'linear-gradient(145deg, rgba(255,182,193,0.9), rgba(255,105,180,0.9))'));
    flower.appendChild(createPetalLayer(30, 12, 30, 
        'linear-gradient(145deg, rgba(255,105,180,0.9), rgba(255,20,147,0.9))'));
    flower.appendChild(createPetalLayer(50, 6, 50, 
        'linear-gradient(145deg, rgba(255,192,203,0.9), rgba(255,182,193,0.9))'));

    // Leaves
    for (let i = 0; i < 4; i++) {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        leaf.style.transform = `rotate(${i % 2 === 0 ? '-30' : '30'}deg) 
                                translateY(${i * 15 + 60}px) 
                                scale(${0.8 + i * 0.1})`;
        flower.appendChild(leaf);
    }

    // Particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100 - 50}px`;
        particle.style.top = `${Math.random() * 100 - 50}px`;
        particle.style.animationDelay = `${i * 0.1}s`;
        flower.appendChild(particle);
    }

    return flower;
}

// Gift Button Handler
document.getElementById('giftButton').addEventListener('click', (e) => {
    const rect = e.target.getBoundingClientRect();
    const flower = createFlower(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
    );
    document.getElementById('flowerContainer').appendChild(flower);
    setTimeout(() => flower.remove(), 6000);
});
