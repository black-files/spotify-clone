const songs = [
    {
        title: "AWAARA ANGARA",
        artist: "FAHEEM ABDULA",
        audio: "songs/song1.mp3",
        image: "images/song1.jpg"
    },
    {
        title: "DEEWANA DEEWANA",
        artist: "ARJIT SINGH",
        audio: "songs/song2.mp3",
        image: "images/song2.jpg"
    },
    {
        title: "KALYANI",
        artist: "ARJN,KDS",
        audio: "songs/song3.mp3",
        image: "images/song3.jpg"
    },
    {
        title: "KHAT",
        artist: "NAVJOT AHUJA",
        audio: "songs/song4.mp3",
        image: "images/song4.jpg"
    },
    {
        title: "CRIMINAL",
        artist: "BRITNEY SPEARS",
        audio: "songs/song5.mp3",
        image: "images/song5.jpg"
    },
    {
        title: "TERE MERE RISHTA",
        artist: "MITHOON",
        audio: "songs/song6.mp3",
        image: "images/song6.jpg"
    },
    {
        title: "TERE ISHQ MEIN",
        artist: "ARJIT SINGH",
        audio: "songs/song7.mp3",
        image: "images/song7.jpg"
    },
    {
        title: "WARNING",
        artist: "ADDI KAYLAN",
        audio: "songs/song8.mp3",
        image: "images/song8.jpg"
    }
];


// =====================================
// ELEMENTS
// =====================================

const audio = document.getElementById("audio");

const currentArt = document.getElementById("currentArt");
const currentTitle = document.getElementById("currentTitle");
const currentArtist = document.getElementById("currentArtist");

const playPause = document.getElementById("playPause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

const volume = document.getElementById("volume");
const mute = document.getElementById("mute");

const likeButton = document.getElementById("like");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");
const playAllButton = document.getElementById("playAll");

const originalSearchInput =
    document.getElementById("searchInput");

const originalSearchResults =
    document.getElementById("searchResults");

const sidebarLinks =
    document.querySelectorAll(".sidebar nav a");

const homeLink =
    [...sidebarLinks].find(link =>
        link.textContent.toLowerCase().includes("home")
    );

const searchLink =
    [...sidebarLinks].find(link =>
        link.textContent.toLowerCase().includes("search")
    );

const libraryLink =
    [...sidebarLinks].find(link =>
        link.textContent.toLowerCase().includes("library")
    );


// =====================================
// VARIABLES
// =====================================

let currentIndex = 0;
let shuffle = false;
let repeat = false;


// =====================================
// LOAD SONG
// =====================================

function loadSong(index) {

    currentIndex = index;

    const song = songs[currentIndex];

    audio.src = song.audio;

    currentArt.src = song.image;

    currentTitle.textContent = song.title;

    currentArtist.textContent = song.artist;

    progress.value = 0;

    currentTime.textContent = "0:00";

    totalTime.textContent = "0:00";
}


// =====================================
// PLAY SONG
// =====================================

function playSong() {

    audio.play();

    playPause.textContent = "❚❚";
}


// =====================================
// PAUSE SONG
// =====================================

function pauseSong() {

    audio.pause();

    playPause.textContent = "▶";
}


// =====================================
// PLAY / PAUSE
// =====================================

playPause.addEventListener("click", () => {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// =====================================
// SONG CARDS
// =====================================

document.querySelectorAll(".song-card").forEach(card => {

    card.addEventListener("click", () => {

        const index =
            Number(card.dataset.index);

        loadSong(index);

        playSong();

    });

});


// =====================================
// POPULAR SONGS
// =====================================

document.querySelectorAll(".popular-song").forEach(song => {

    song.addEventListener("click", () => {

        const index =
            Number(song.dataset.index);

        loadSong(index);

        playSong();

    });

});


// =====================================
// NEXT SONG
// =====================================

function nextSong() {

    if (shuffle) {

        currentIndex =
            Math.floor(
                Math.random() * songs.length
            );

    } else {

        currentIndex++;

        if (currentIndex >= songs.length) {

            currentIndex = 0;

        }

    }

    loadSong(currentIndex);

    playSong();
}


nextButton.addEventListener(
    "click",
    nextSong
);


// =====================================
// PREVIOUS SONG
// =====================================

previousButton.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = songs.length - 1;

    }

    loadSong(currentIndex);

    playSong();

});


// =====================================
// SONG ENDED
// =====================================

audio.addEventListener("ended", () => {

    if (repeat) {

        audio.currentTime = 0;

        playSong();

    } else {

        nextSong();

    }

});


// =====================================
// PROGRESS
// =====================================

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) {

        return;

    }

    const percent =
        (audio.currentTime /
            audio.duration) * 100;

    progress.value = percent;

    currentTime.textContent =
        formatTime(audio.currentTime);

    totalTime.textContent =
        formatTime(audio.duration);

});


audio.addEventListener(
    "loadedmetadata",
    () => {

        totalTime.textContent =
            formatTime(audio.duration);

    }
);


// =====================================
// CHANGE SONG POSITION
// =====================================

progress.addEventListener("input", () => {

    if (!audio.duration) {

        return;

    }

    audio.currentTime =
        (progress.value / 100) *
        audio.duration;

});


// =====================================
// FORMAT TIME
// =====================================

function formatTime(time) {

    if (isNaN(time)) {

        return "0:00";

    }

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60);

    return (
        minutes +
        ":" +
        (seconds < 10 ? "0" : "") +
        seconds
    );

}


// =====================================
// VOLUME
// =====================================

audio.volume = 0.8;

volume.addEventListener("input", () => {

    audio.volume = volume.value;

    if (audio.volume === 0) {

        mute.textContent = "🔇";

    } else {

        mute.textContent = "🔊";

    }

});


// =====================================
// MUTE
// =====================================

mute.addEventListener("click", () => {

    audio.muted = !audio.muted;

    if (audio.muted) {

        mute.textContent = "🔇";

    } else {

        mute.textContent = "🔊";

    }

});


// =====================================
// LIKE
// =====================================

likeButton.addEventListener("click", () => {

    if (likeButton.textContent === "♡") {

        likeButton.textContent = "♥";

    } else {

        likeButton.textContent = "♡";

    }

});


// =====================================
// SHUFFLE
// =====================================

shuffleButton.addEventListener("click", () => {

    shuffle = !shuffle;

    shuffleButton.style.color =
        shuffle ? "#1db954" : "#999";

});


// =====================================
// REPEAT
// =====================================

repeatButton.addEventListener("click", () => {

    repeat = !repeat;

    repeatButton.style.color =
        repeat ? "#1db954" : "#999";

});


// =====================================
// PLAY ALL
// =====================================

playAllButton.addEventListener("click", () => {

    loadSong(0);

    playSong();

});


// =====================================
// ORIGINAL TOP SEARCH
// =====================================

originalSearchInput.addEventListener(
    "input",
    () => {

        const value =
            originalSearchInput.value
                .toLowerCase()
                .trim();

        originalSearchResults.innerHTML = "";


        if (value === "") {

            originalSearchResults.style.display =
                "none";

            document
                .querySelectorAll(
                    ".song-card, .popular-song"
                )
                .forEach(item => {

                    item.style.display = "";

                });

            return;

        }


        document
            .querySelectorAll(
                ".song-card, .popular-song"
            )
            .forEach(item => {

                item.style.display = "none";

            });


        const results =
            songs.filter(song => {

                return (
                    song.title
                        .toLowerCase()
                        .includes(value) ||

                    song.artist
                        .toLowerCase()
                        .includes(value)
                );

            });


        originalSearchResults.style.display =
            "block";


        if (results.length === 0) {

            originalSearchResults.innerHTML =
                "<p class='no-result'>No song found</p>";

            return;

        }


        results.forEach(song => {

            const index =
                songs.indexOf(song);

            const resultCard =
                document.createElement("div");

            resultCard.className =
                "search-result";


            resultCard.innerHTML = `
                <img
                    src="${song.image}"
                    alt="${song.title}"
                >

                <div>
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                </div>
            `;


            resultCard.addEventListener(
                "click",
                () => {

                    loadSong(index);

                    playSong();

                }
            );


            originalSearchResults.appendChild(
                resultCard
            );

        });

    }
);


// =====================================
// AESTHETIC SEARCH WINDOW
// =====================================

const searchWindow =
    document.createElement("div");

searchWindow.className =
    "new-search-window";


searchWindow.innerHTML = `

    <div class="new-search-overlay">

        <div class="new-search-box">

            <button class="new-search-close">
                ×
            </button>

            <div class="new-search-top">

                <span class="new-search-label">
                    SPOTIFY SEARCH
                </span>

                <h2>
                    Find your music
                </h2>

                <p>
                    Search songs and artists
                </p>

            </div>

            <div class="new-search-input">

                <span class="new-search-icon">
                    🔍
                </span>

                <input
                    type="text"
                    class="new-search-field"
                    placeholder="Search for a song or artist..."
                    autocomplete="off"
                >

                <span class="new-search-esc">
                    ESC
                </span>

            </div>

            <div class="new-search-results"></div>

        </div>

    </div>
`;

document.body.appendChild(searchWindow);


const newSearchOverlay =
    searchWindow.querySelector(
        ".new-search-overlay"
    );

const newSearchClose =
    searchWindow.querySelector(
        ".new-search-close"
    );

const newSearchInput =
    searchWindow.querySelector(
        ".new-search-field"
    );

const newSearchResults =
    searchWindow.querySelector(
        ".new-search-results"
    );


// =====================================
// SEARCH WINDOW CSS
// =====================================

const searchCSS =
    document.createElement("style");

searchCSS.textContent = `

.new-search-window {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 99999;
}

.new-search-overlay {
    position: absolute;
    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 20px;

    background:
        radial-gradient(
            circle at 50% 30%,
            rgba(29,185,84,0.12),
            transparent 35%
        ),
        rgba(0,0,0,0.82);

    backdrop-filter: blur(18px);
}

.new-search-box {
    position: relative;

    width: 100%;
    max-width: 680px;
    max-height: 82vh;

    padding: 32px;

    box-sizing: border-box;
    overflow: hidden;

    background:
        linear-gradient(
            145deg,
            rgba(32,32,32,0.98),
            rgba(13,13,13,0.98)
        );

    border: 1px solid rgba(255,255,255,0.08);

    border-radius: 24px;

    box-shadow:
        0 35px 100px rgba(0,0,0,0.8),
        0 0 80px rgba(29,185,84,0.07);
}

.new-search-close {
    position: absolute;

    right: 20px;
    top: 20px;

    width: 40px;
    height: 40px;

    border: 1px solid rgba(255,255,255,0.08);

    border-radius: 50%;

    background: rgba(255,255,255,0.05);

    color: #aaa;

    font-size: 25px;

    cursor: pointer;

    transition: 0.25s;
}

.new-search-close:hover {
    background: #1db954;
    color: #000;
    transform: rotate(90deg);
}

.new-search-label {
    color: #1db954;

    font-size: 10px;

    font-weight: bold;

    letter-spacing: 3px;
}

.new-search-top h2 {
    margin: 8px 0 5px;

    color: white;

    font-size: 28px;
}

.new-search-top p {
    margin: 0 0 25px;

    color: #777;

    font-size: 13px;
}

.new-search-input {
    display: flex;

    align-items: center;

    gap: 12px;

    height: 58px;

    padding: 0 16px;

    background: rgba(255,255,255,0.055);

    border: 1px solid rgba(255,255,255,0.08);

    border-radius: 14px;

    transition: 0.25s;
}

.new-search-input:focus-within {
    border-color: #1db954;

    background: rgba(29,185,84,0.06);

    box-shadow:
        0 0 25px rgba(29,185,84,0.08);
}

.new-search-icon {
    font-size: 17px;
    opacity: 0.7;
}

.new-search-field {
    flex: 1;

    height: 100%;

    border: none;
    outline: none;

    background: transparent;

    color: white;

    font-size: 15px;
}

.new-search-field::placeholder {
    color: #666;
}

.new-search-esc {
    padding: 5px 7px;

    border: 1px solid #444;

    border-radius: 5px;

    color: #666;

    font-size: 9px;

    letter-spacing: 1px;
}

.new-search-results {
    margin-top: 18px;

    max-height: 45vh;

    overflow-y: auto;
}

.new-song-result {
    display: flex;

    align-items: center;

    gap: 15px;

    padding: 10px;

    margin-bottom: 6px;

    border-radius: 12px;

    cursor: pointer;

    transition: 0.2s;
}

.new-song-result:hover {
    background: rgba(255,255,255,0.06);

    transform: translateX(4px);
}

.new-song-result img {
    width: 58px;
    height: 58px;

    object-fit: cover;

    border-radius: 9px;
}

.new-song-info {
    flex: 1;
}

.new-song-title {
    margin: 0;

    color: white;

    font-size: 14px;

    font-weight: 600;
}

.new-song-artist {
    margin: 5px 0 0;

    color: #888;

    font-size: 12px;
}

.new-song-play {
    width: 34px;
    height: 34px;

    display: flex;

    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: #1db954;

    color: #000;

    opacity: 0;

    transition: 0.2s;
}

.new-song-result:hover .new-song-play {
    opacity: 1;
}

.new-search-empty {
    padding: 35px 10px;

    text-align: center;

    color: #666;

    font-size: 13px;
}

@media (max-width: 700px) {

    .new-search-box {
        padding: 24px;
        border-radius: 20px;
    }

    .new-search-top h2 {
        font-size: 22px;
    }

    .new-search-esc {
        display: none;
    }
}

`;

document.head.appendChild(searchCSS);


// =====================================
// SEARCH OPEN
// =====================================

if (searchLink) {

    searchLink.addEventListener("click", event => {

        event.preventDefault();

        sidebarLinks.forEach(link => {
            link.classList.remove("active");
        });

        searchLink.classList.add("active");

        searchWindow.style.display = "block";

        setTimeout(() => {
            newSearchInput.focus();
        }, 100);

    });

}


// =====================================
// SEARCH CLOSE
// =====================================

function closeNewSearch() {

    searchWindow.style.display = "none";

    newSearchInput.value = "";

    newSearchResults.innerHTML = "";

    if (searchLink) {
        searchLink.classList.remove("active");
    }

    if (homeLink) {
        homeLink.classList.add("active");
    }

}


newSearchClose.addEventListener(
    "click",
    closeNewSearch
);


newSearchOverlay.addEventListener(
    "click",
    event => {

        if (event.target === newSearchOverlay) {

            closeNewSearch();

        }

    }
);


document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        searchWindow.style.display === "block"
    ) {

        closeNewSearch();

    }

});


// =====================================
// SEARCH WINDOW SEARCH
// =====================================

newSearchInput.addEventListener(
    "input",
    () => {

        const value =
            newSearchInput.value
                .toLowerCase()
                .trim();

        newSearchResults.innerHTML = "";


        if (value === "") {
            return;
        }


        const results =
            songs.filter(song => {

                return (
                    song.title
                        .toLowerCase()
                        .includes(value) ||

                    song.artist
                        .toLowerCase()
                        .includes(value)
                );

            });


        if (results.length === 0) {

            newSearchResults.innerHTML = `
                <div class="new-search-empty">
                    No song found
                </div>
            `;

            return;

        }


        results.forEach(song => {

            const index =
                songs.indexOf(song);

            const result =
                document.createElement("div");

            result.className =
                "new-song-result";


            result.innerHTML = `

                <img
                    src="${song.image}"
                    alt="${song.title}"
                >

                <div class="new-song-info">

                    <p class="new-song-title">
                        ${song.title}
                    </p>

                    <p class="new-song-artist">
                        ${song.artist}
                    </p>

                </div>

                <div class="new-song-play">
                    ▶
                </div>

            `;


            result.addEventListener(
                "click",
                () => {

                    loadSong(index);

                    playSong();

                    closeNewSearch();

                }
            );


            newSearchResults.appendChild(result);

        });

    }
);


// =====================================
// YOUR LIBRARY
// =====================================

const libraryWindow =
    document.createElement("div");

libraryWindow.className =
    "library-window";


libraryWindow.innerHTML = `

    <div class="library-box">

        <button class="close-library">
            ✕
        </button>

        <h1>
            Your Library
        </h1>

        <p class="library-subtitle">
            Your music collection
        </p>

        <div class="library-menu">

            <div class="library-item">

                <div class="library-icon">
                    ♫
                </div>

                <div>

                    <h3>
                        Recent Playlist
                    </h3>

                    <p>
                        Your recently played songs
                    </p>

                </div>

            </div>


            <div class="library-item">

                <div class="library-icon">
                    ♥
                </div>

                <div>

                    <h3>
                        Liked Songs
                    </h3>

                    <p>
                        Your favourite songs
                    </p>

                </div>

            </div>

        </div>


        <h2>
            Your Songs
        </h2>

        <div class="library-songs"></div>

    </div>

`;

document.body.appendChild(libraryWindow);


const librarySongs =
    libraryWindow.querySelector(
        ".library-songs"
    );

const closeLibrary =
    libraryWindow.querySelector(
        ".close-library"
    );


// =====================================
// LIBRARY CSS
// =====================================

const libraryCSS =
    document.createElement("style");

libraryCSS.textContent = `

.library-window {

    display: none;

    position: fixed;

    inset: 0;

    z-index: 99998;

    align-items: center;

    justify-content: center;

    background:
        rgba(0,0,0,0.85);

    backdrop-filter: blur(15px);

    padding: 20px;
}


.library-box {

    position: relative;

    width: 100%;

    max-width: 700px;

    max-height: 80vh;

    overflow-y: auto;

    padding: 30px;

    background:
        linear-gradient(
            145deg,
            #1d1d1d,
            #0d0d0d
        );

    border: 1px solid #292929;

    border-radius: 20px;

    box-shadow:
        0 30px 80px
        rgba(0,0,0,0.8);

}


.library-box h1 {

    color: white;

    font-size: 30px;

    margin-bottom: 5px;

}


.library-subtitle {

    color: #888;

    margin-bottom: 25px;

}


.close-library {

    position: absolute;

    right: 20px;

    top: 20px;

    width: 38px;

    height: 38px;

    border: none;

    border-radius: 50%;

    background: #292929;

    color: white;

    cursor: pointer;

    font-size: 16px;

    transition: 0.2s;

}


.close-library:hover {

    background: #1db954;

    color: black;

}


.library-menu {

    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 12px;

    margin-bottom: 30px;

}


.library-item {

    display: flex;

    align-items: center;

    gap: 12px;

    padding: 15px;

    background: #222;

    border-radius: 12px;

}


.library-icon {

    width: 45px;

    height: 45px;

    display: flex;

    align-items: center;

    justify-content: center;

    flex-shrink: 0;

    border-radius: 8px;

    background: #1db954;

    color: black;

    font-size: 20px;

}


.library-item h3 {

    color: white;

    font-size: 14px;

    margin-bottom: 5px;

}


.library-item p {

    color: #888;

    font-size: 12px;

}


.library-box h2 {

    color: white;

    font-size: 20px;

    margin-bottom: 15px;

}


.library-songs {

    display: flex;

    flex-direction: column;

    gap: 5px;

}


.library-song {

    display: flex;

    align-items: center;

    gap: 15px;

    padding: 10px;

    border-radius: 10px;

    cursor: pointer;

    transition: 0.2s;

}


.library-song:hover {

    background: #282828;

}


.library-song img {

    width: 55px;

    height: 55px;

    object-fit: cover;

    border-radius: 7px;

}


.library-song-info {

    flex: 1;

}


.library-song h3 {

    color: white;

    font-size: 14px;

    margin-bottom: 5px;

}


.library-song p {

    color: #888;

    font-size: 12px;

}


.library-song button {

    width: 36px;

    height: 36px;

    border: none;

    border-radius: 50%;

    background: #1db954;

    color: black;

    cursor: pointer;

}


@media (max-width: 600px) {

    .library-box {

        padding: 20px;

    }

    .library-menu {

        grid-template-columns: 1fr;

    }

}

`;

document.head.appendChild(libraryCSS);


// =====================================
// SHOW LIBRARY SONGS
// =====================================

songs.forEach((song, index) => {

    const songItem =
        document.createElement("div");

    songItem.className =
        "library-song";


    songItem.innerHTML = `

        <img
            src="${song.image}"
            alt="${song.title}"
        >

        <div class="library-song-info">

            <h3>
                ${song.title}
            </h3>

            <p>
                ${song.artist}
            </p>

        </div>

        <button>
            ▶
        </button>

    `;


    songItem.addEventListener(
        "click",
        () => {

            loadSong(index);

            playSong();

            closeLibraryWindow();

        }
    );


    librarySongs.appendChild(songItem);

});


// =====================================
// OPEN LIBRARY
// =====================================

if (libraryLink) {

    libraryLink.addEventListener(
        "click",
        event => {

            event.preventDefault();

            sidebarLinks.forEach(link => {
                link.classList.remove("active");
            });

            libraryLink.classList.add("active");

            libraryWindow.style.display = "flex";

        }
    );

}


// =====================================
// CLOSE LIBRARY
// =====================================

function closeLibraryWindow() {

    libraryWindow.style.display = "none";

    if (libraryLink) {
        libraryLink.classList.remove("active");
    }

    if (homeLink) {
        homeLink.classList.add("active");
    }

}


closeLibrary.addEventListener(
    "click",
    closeLibraryWindow
);


// =====================================
// CLICK OUTSIDE LIBRARY
// =====================================

libraryWindow.addEventListener(
    "click",
    event => {

        if (event.target === libraryWindow) {

            closeLibraryWindow();

        }

    }
);


// =====================================
// FIRST SONG
// =====================================

loadSong(0);