// Loading Screen
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 3000);
});

// Open Envelope dengan Auto Play Music
function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const mainContent = document.getElementById('mainContent');
    const music = document.getElementById('weddingMusic');
    const musicBtn = document.getElementById('musicBtn');
    
    // Animasi tutup envelope
    envelope.style.animation = 'fadeOut 0.8s ease-out forwards';
    
    setTimeout(() => {
        envelope.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        // Auto play music
        const playMusic = () => {
            music.volume = 0.7;
            const playPromise = music.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Music auto-played successfully');
                    musicBtn.innerHTML = '🔇 Pause Musik';
                }).catch(error => {
                    console.log('Auto-play blocked:', error);
                    musicBtn.innerHTML = '🎵 Putar Musik';
                    document.addEventListener('click', function firstClick() {
                        music.play().then(() => {
                            musicBtn.innerHTML = '🔇 Pause Musik';
                        });
                        document.removeEventListener('click', firstClick);
                    }, { once: true });
                });
            }
        };
        
        setTimeout(playMusic, 500);
        
    }, 800);
}

// COUNTDOWN TIMER untuk 13 Oktober 2030
function updateCountdown() {
    const weddingDate = new Date('2030-10-13T08:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Jika sudah lewat tanggal
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<div class="countdown-ended">🎉 Sudah Menikah! 🎉</div>';
        return;
    }

    // Hitung waktu
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update display
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Initialize countdown
setInterval(updateCountdown, 1000);
updateCountdown();

// Music Control
function toggleMusic() {
    const music = document.getElementById('weddingMusic');
    const musicBtn = document.getElementById('musicBtn');
    
    if (music.paused) {
        music.play().then(() => {
            musicBtn.innerHTML = '🔇 Pause Musik';
        }).catch(error => {
            console.log('Play failed:', error);
        });
    } else {
        music.pause();
        musicBtn.innerHTML = '🎵 Putar Musik';
    }
}

// Maps Function
function openMaps(type) {
    const locations = {
        'akad': 'https://maps.google.com/?q=Masjid+Al-Falah+Jl+Merdeka+123+Jakarta',
        'resepsi': 'https://maps.google.com/?q=Ballroom+Hotel+Grand+Jl+Kemerdekaan+456+Jakarta'
    };
    window.open(locations[type], '_blank');
}

// RSVP Form
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value;
    alert(`Terima kasih ${name}! Konfirmasi kehadiran Anda telah tercatat. 💖`);
    this.reset();
});

// Share Function
function shareInvitation() {
    const shareData = {
        title: 'Undangan Pernikahan Kami',
        text: 'Kami mengundang Anda untuk hadir dalam pernikahan kami. Buka link untuk detail lengkap! 💍',
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log('Berhasil dibagikan'))
            .catch(error => console.log('Error sharing:', error));
    } else {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('Link undangan telah disalin! 📋\n' + window.location.href))
            .catch(() => alert('Link undangan: ' + window.location.href));
    }
}

// Gallery Function
function openGallery() {
    alert('Gallery foto prewedding akan segera hadir! 📸');
}

// Add custom animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { 
            opacity: 1; 
            transform: scale(1);
        }
        to { 
            opacity: 0; 
            transform: scale(1.1);
        }
    }
    
    .countdown-ended {
        font-size: 1.5rem;
        color: #ff6b9d;
        font-weight: bold;
        font-family: 'Dancing Script', cursive;
    }
`;
document.head.appendChild(style);