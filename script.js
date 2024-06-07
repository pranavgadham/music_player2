let Songs = [
    {
        title: 'Kirraku',
        imagePath: './assets/Attharintiki-Daredhi.jpg',
        audioPath: './assets/Kirraku.mp3',
        artist: 'David Simon',
        genre: 'Rock'
    },
    {
        title: 'Ringa Ringa',
        imagePath: './assets/Arya-2.jpg',
        audioPath: './assets/Ringa Ringa.mp3',
        artist: 'Devi Sri Prasad',
        genre: 'Rock'
    },
    {
        title: 'Eyy Bidda Idhi Naa Adda',
        imagePath: './assets/Pushpa.jpg',
        audioPath: './assets/pushpa.mp3',
        artist: 'Nakash Aziz',
        genre: 'pop'
    },
    {
        title: 'Tillu Anna DJ Pedithe',
        imagePath: './assets/Tillu-Anna-DJ-Pedithe.jpg',
        audioPath: './assets/Tillu Anna DJ Pedithe song.mp3',
        artist: 'Ram Miriyala',
        genre: 'pop'
    },
    {
        title: 'OMG Daddy',
        imagePath: './assets/OMG-Daddy.jpg',
        audioPath: './assets/OMG Daddy.mp3',
        artist: 'Ja Rule',
        genre: 'hiphop'
    },
    {
        title: 'Dole Dole',
        imagePath: './assets/Pokiri.jpg',
        audioPath: './assets/Dole Dole.mp3',
        artist: 'Ranjith',
        genre: 'hiphop'
    }
];

const toggleButton = document.querySelector("#toggleSwitch");
const songList = document.querySelector('#songList');
const songImage = document.querySelector('#songImage');
const songTitle = document.querySelector('#songTitle');
const songArtist = document.querySelector('#songArtist');
const audioTag = document.querySelector('#audioTag');
const genre = document.querySelector('#genre');
const previousButton = document.querySelector('#previousButton');
const nextButton = document.querySelector('#nextButton');
const allPlaylist = document.querySelector('#allPlaylist');
const currentPlaylist = document.querySelector('#currentPlaylist');

let songCount = 0;

toggleButton.addEventListener('click', () => {
    if (toggleButton.checked) {
        let elements = document.querySelectorAll('.background');
        elements.forEach(element => {
            element.style.backgroundColor = 'rgb(55, 55, 55)';
        });
        document.body.style.backgroundColor = 'black';
        document.querySelector('#heading').style.color = 'white';

    } else {
        let elements = document.querySelectorAll('.background');
        elements.forEach(element => {
            element.style.backgroundColor = 'rgb(0, 191, 255)';
        });
        document.body.style.backgroundColor = 'white';
        document.querySelector('#heading').style.color = 'black';
    }
});

function songListMaker(song) {
    let element = document.createElement('div');
    element.innerText = song.title;
    element.classList.add('songElement');
    songList.appendChild(element);
    element.addEventListener('click', () => {
        songImage.src = song.imagePath;
        songTitle.innerText = song.title;
        songArtist.innerText = song.artist;
        audioTag.src = song.audioPath;
        songCount = Songs.indexOf(song);
    });
}

for (let song of Songs) {
    songListMaker(song);
}

genre.addEventListener('change', () => {
    let selectedGenre = genre.value;
    songList.innerHTML = "";
    switch (selectedGenre) {
        case 'All':
            for (let song of Songs) {
                songListMaker(song);
            }
            break;

        case 'Rock':
            const rockSongs = Songs.filter(song => song.genre === 'Rock');
            for (let song of rockSongs) {
                songListMaker(song);
            }
            if (rockSongs.length > 0) updateSongInfo(Songs.indexOf(rockSongs[0])); 
            break;

        case 'Pop':
            const popSongs = Songs.filter(song => song.genre === 'pop');
            for (let song of popSongs) {
                songListMaker(song);
            }
            if (popSongs.length > 0) updateSongInfo(Songs.indexOf(popSongs[0])); 
            break;

        case 'Hip Hop':
            const hiphopSongs = Songs.filter(song => song.genre === 'hiphop');
            for (let song of hiphopSongs) {
                songListMaker(song);
            }
            if (hiphopSongs.length > 0) updateSongInfo(Songs.indexOf(hiphopSongs[0])); 
            break;
    }
});

const updateSongInfo = (index) => { 
    const song = Songs[index];
    songImage.src = song.imagePath;
    songTitle.innerText = song.title;
    songArtist.innerText = song.artist;
    audioTag.src = song.audioPath;
};

previousButton.addEventListener('click', () => {
    songCount = (songCount - 1 + Songs.length) % Songs.length;
    updateSongInfo(songCount);
});

nextButton.addEventListener('click', () => {
    songCount = (songCount + 1) % Songs.length;
    updateSongInfo(songCount);
});

let playlists = [];

document.querySelector('#createButton').addEventListener('click', () => { 
    const formInput = document.querySelector('#input');
    if (!formInput.value) {
        alert("Enter the playlist name!");
    } else {
        playlists.push({ title: formInput.value, songs: [] });
        updateallPlaylist();
        formInput.value = ''; // Clear input field after creating a playlist - Modified
    }
});

function updateallPlaylist() {
    allPlaylist.innerHTML = '';
    playlists.forEach((playlist, index) => { 
        let element = document.createElement('div');
        element.innerText = playlist.title;
        element.classList.add('songElement');
        element.addEventListener('click', () => { 
            const previouslySelected = document.querySelector('.clicked'); 
            if (previouslySelected) { 
                previouslySelected.classList.remove('clicked'); 
            } 
            element.classList.add('clicked'); 
            updateCurrentPlaylist(index); 
        });
        allPlaylist.appendChild(element); 
    });
}

document.querySelector('#playlist').addEventListener('click', () => { 
    const selected = document.querySelector('.clicked'); 
    if (!selected) {
        alert('Playlist not selected!');
    } else {
        const playlist = playlists.find(playlist => playlist.title === selected.innerText); 
        playlist.songs.push(Songs[songCount]); 
        updateCurrentPlaylist(playlists.indexOf(playlist)); 
    }
});

function updateCurrentPlaylist(index) { 
    const playlist = playlists[index]; 
    currentPlaylist.innerHTML = ''; 
    for (let song of playlist.songs) { 
        let element = document.createElement('div');
        element.innerText = song.title;
        element.classList.add('songElement');
        currentPlaylist.appendChild(element);
        element.addEventListener('click', () => {
            songImage.src = song.imagePath;
            songTitle.innerText = song.title;
            songArtist.innerText = song.artist;
            audioTag.src = song.audioPath;
            songCount = Songs.indexOf(song);
        });
    }
}