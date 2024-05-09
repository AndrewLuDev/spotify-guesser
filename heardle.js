require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const playlistId = process.env.PLAYLIST_ID;

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
