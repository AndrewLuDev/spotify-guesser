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

async function checkToken() {
    try {
        const result = await getAccessToken();
        console.log("Promise pending or fulfilled");
    } catch (error) {
        console.log("Promise failed or rejected");
    }
};

checkToken();