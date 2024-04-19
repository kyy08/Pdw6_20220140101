document.addEventListener("DOMContentLoaded", function() {
    const audio = document.querySelector('.soundtrack'); 
    const playButton = document.getElementById('play');
    const progressBar = document.getElementById('progress');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');

    let isPlaying = false;

    // Fungsi untuk memutar atau menjeda audio
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        isPlaying = !isPlaying;
        updatePlayButton();
    }

    // Fungsi untuk memperbarui ikon tombol play/pause
    function updatePlayButton() {
        const icon = isPlaying ? 'fa-pause' : 'fa-play';
        playButton.classList.remove('fa-play', 'fa-pause');
        playButton.classList.add(icon);
    }

    // Event listener untuk tombol play/pause
    playButton.addEventListener('click', togglePlay);

    // Event listener untuk mengupdate progress bar dan durasi audio
    audio.addEventListener('timeupdate', updateProgress);

    // Fungsi untuk mengupdate progress bar dan waktu saat ini
    function updateProgress() {
        const { currentTime, duration } = audio;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeDisplay.textContent = formatTime(currentTime);
        durationDisplay.textContent = formatTime(duration);
    }

    // Fungsi untuk mengubah waktu audio menjadi format menit:detik
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Event listener untuk mengubah posisi audio saat progress bar diklik
    progressBar.addEventListener('click', (e) => {
        const { offsetX } = e;
        const progressWidth = progressBar.clientWidth;
        const seekTime = (offsetX / progressWidth) * audio.duration;
        audio.currentTime = seekTime;
    });

    // Event listener untuk mengatur ulang audio ke awal saat lagu selesai
    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        isPlaying = false;
        updatePlayButton();
    });
});