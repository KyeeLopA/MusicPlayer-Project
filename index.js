const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'data-music/love.mp3',
        displayName: 'Love Wave to Earth',
        cover: 'asset/1.jpeg',
        artist: 'Wave to Earth',
    },
    {
        path: 'data-music/multo.mp3',
        displayName: 'Multo',
        cover: 'asset/2.jpg',
        artist: 'cup of joe',
    },
    {
        path: 'data-music/aboutyou.mp3',
        displayName: 'About You',
        cover: 'asset/3.jpg',
        artist: 'The 1975',
    },
    {
        path: 'data-music/breakeven.mp3',
        displayName: 'Breakeven',
        cover: 'asset/4.jpg',
        artist: 'The Script',
    },
    {
        path: 'data-music/heavenly.mp3',
        displayName: 'Heavenly',
        cover: 'asset/5.jpeg',
        artist: 'Cigarettes After Sex',
    },
    {
        path: 'data-music/Sweet.mp3',
        displayName: 'Sweet',
        cover: 'asset/6.png',
        artist: 'Cigarettes After Sex',
    },
    {
        path: 'data-music/the winner takes all.mp3',
        displayName: 'The Winner Takes All',
        cover: 'asset/7.jpeg',
        artist: 'ABBA',
    },
    {
        path: 'data-music/slipping through my fingers.mp3',
        displayName: 'Slipping Through My Fingers',
        cover: 'asset/8.jpeg',
        artist: 'ABBA',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);