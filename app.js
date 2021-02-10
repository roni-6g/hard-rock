// Call To API with Asynic Way
// const searchSongs = async () => {
//     const songInput = document.getElementById('search-song').value;
//     const searchUrl = `https://api.lyrics.ovh/suggest/${songInput}`;
//     const response = await fetch(searchUrl)
//     const data = await response.json();
//     songsResult(data.data);
// }

const searchSongs = async () => {
    const songInput = document.getElementById('search-song').value;
    const searchUrl = `https://api.lyrics.ovh/suggest/${songInput}`;
    fetch(searchUrl)
        .then(res => res.json())
        .then(data => songsResult(data.data))
        .catch(error => errorResult("Something Went wrong, Try AGain Later"));
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

const getLyrics = async (artist, title) => {
    const lyricsUrl = `https://api.lyrics.ovh/v1/${artist}/${title}`;

    try {
        const res = await fetch(lyricsUrl);
        const data = await res.json();
        displayLyric(data.lyrics);

    } catch (error) {
        errorResult("Sorry, I can't load full song Lyric Now ! Try Again later !!");
    }

}

const displayLyric = lyric => {
    const lyricsDiv = document.getElementById('full-lyric');
    lyricsDiv.innerText = lyric;
}
// Display Error Result
const errorResult = error => {
    const displayError = document.getElementById('error-result');
    const errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-warning col-6 alert-custom";
    errorDiv.innerText = error;
    displayError.appendChild(errorDiv);
    console.log(error);
}