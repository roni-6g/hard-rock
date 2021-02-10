function searchSongs() {
    const songInput = document.getElementById('search-song').value;
    const searchUrl = `https://api.lyrics.ovh/suggest/${songInput}`;
    
    fetch(searchUrl)
    .then(response => response.json())
    .then(data => songsResult(data.data));
}

const songsResult = (songs) => {
    const songResultDiv = document.getElementById('songs-result');
    document.getElementById('full-lyric').innerText = ''
    songResultDiv.innerHTML = '';
    songs.forEach(song => {
        // console.log(song.title);
        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3";
        const songInfo = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio src="${song.preview}" preload="auto" controls>           
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songDiv.innerHTML = songInfo;
        songResultDiv.appendChild(songDiv);

    });
}

const getLyrics = (artist,title) => {
    const lyricsUrl = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(lyricsUrl)
    .then(res => res.json())
    .then(data => displayLyric(data.lyrics));
}

const displayLyric = lyric => {
    const lyricsDiv = document.getElementById('full-lyric');
    lyricsDiv.innerText = lyric;
}