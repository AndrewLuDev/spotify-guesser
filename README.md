## About The Project
Spotify Heardle is a music guessing game inspired by the popular Wordle game, but specifically tailored for Spotify playlists. My friends and I saw many variations of Spotify Heardle floating around online but there were many features about each app that we did not like. So, I decided to make my own custom Spotify Heardle with all of our ideal features!

Some differences that you may notice if you have played other Heardle games before:
* Two new buttons that reveal hints (First letter of the Song Name, and Artist Name)
* The starting point is randomized instead of starting at the begining of the song!

## Setting Up
1. Log into your Spotify account: https://developer.spotify.com/dashboard
2. 1) Click on [Create app](https://i.imgur.com/hBbRNdY.png) 
   2) [Fill in Name + Description, Select Web API](https://i.imgur.com/NbqD7x8.png)
3. Click on your app and click Settings
4. Update the following 3 variables in `heardle.js`:
    1) **CLIENT_ID**: In your Spotify Dashboard, click on your app Settings. Copy the Client ID
    2) **CLIENT_SECRET**: In your Spotify Dashboard, click on your app Settings. Copy the Client Secret
    3) **PLAYLIST_URL**: In your [Spotify App, Copy the URL from any of your Public Playlists (cannot be private)](https://i.imgur.com/8XjCDNB.png)
5. Save the file and open `index.html` in your favourite web browser (Chrome, Firefox, Safari, etc)
6. You're all set!

## How To Play
It's super easy! 
1. Click on Refresh to get a new song
2. Click on the Play button to start listening
3. Submit your guess
4. Repeat!
 
Note: Songs that have already been guessed will be removed to prevent duplicate song guesses.