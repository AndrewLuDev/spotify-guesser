require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const playlistId = process.env.PLAYLIST_ID;

let playlist = [];
var track = {
    name: "",
    artist: "",
    previewUrl: "",
};

//Set initial volume to 15%
document.getElementById('spotifyPlayer').volume = 0.15;

//Access token
async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
};


async function getData(accessToken) {
    const response = await fetch (`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return response.json();
}

//Playlist details
async function getPlaylist(accessToken) {
    const data = await getData(accessToken);
    playlist = data.items.map(item => item.track.name);
}

//Random Song from Playlist
async function getRandomSong(accessToken) {
    const data = await getData(accessToken);
    const randomIndex = Math.floor(Math.random() * data.items.length);
    const track = data.items[randomIndex].track;
    const artists = track.artists.map(artist => artist.name);
    return {
        name: track.name,
        artist: artists.join(', '),
        previewUrl: track.preview_url
    };
}

function showSuggestions() {
    const input = document.getElementById('guessInput').value.toLowerCase();
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';

    if (input.trim() !== '') {
        const matchedSongs = playlist.filter(song => song.toLowerCase().includes(input));

        matchedSongs.forEach(song => {
            const suggestion = document.createElement('div');
            suggestion.textContent = song;
            suggestion.classList.add('suggestion');
            suggestion.addEventListener('click', () => {
                document.getElementById('guessInput').value = song;
                suggestionsDiv.innerHTML = '';
            });
            suggestionsDiv.appendChild(suggestion);
        });
    }
}

document.getElementById('submitGuess').addEventListener('click', async () => {
    const guessedSong = document.getElementById('guessInput').value.toLowerCase();

    if (guessedSong == track.name.toLowerCase() || guessedSong == track.name.toLowerCase().replace(/[^\w\s]/g, '')) {
        alert('Congratulations! You guessed the song correctly! :)');
    } else {
        alert('Oops! That is not the correct song. Try again! :(');
        console.log(track);
    }
});

document.getElementById('refreshButton').addEventListener('click', async () => {
    const accessToken = await getAccessToken();
    await getPlaylist(accessToken);

    track = await getRandomSong(accessToken);
    console.log(track);

    //Updating Spotify player with the new song info
    document.getElementById('spotifyPlayer').src = track.previewUrl;
    document.getElementById('guessInput').value = "";
    document.getElementById('hint').innerText = "";
    document.getElementById('suggestions').innerText = "";
});

document.getElementById('showHint').addEventListener('click', async () => {
    document.getElementById('hint').innerText = `Hint: First letter is "${track.name.charAt(0)}"`;
});