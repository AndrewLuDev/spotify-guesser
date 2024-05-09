require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const playlistId = process.env.PLAYLIST_ID;

let playlist = [];
var track = {
    name: "",
    previewUrl: "",
};

//Authorization
const authHeaders = {
    'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    'Content-Type': 'application/x-www-form-urlencoded',
};

//Access token
async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: authHeaders,
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
};

//Playlist details
async function getPlaylist(accessToken) {
    const response = await fetch (`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    playlist = data.items.map(item => item.track.name);
}

//Random Song from Playlist
async function getRandomSong(accessToken) {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.items.length);
    const track = data.items[randomIndex].track;
    return {
        name: track.name,
        previewUrl: track.preview_url
    };
}

document.getElementById('submitGuess').addEventListener('click', async () => {
    const guessedSong = document.getElementById('guessInput').value.toLowerCase();
    const accessToken = await getAccessToken();
    track = await getRandomSong(accessToken);

    if (guessedSong == track.name.toLowerCase()) {
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
});