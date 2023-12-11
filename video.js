let player;
let isPlayerReady = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '360',
        width: '640',
        videoId: 'kEx9i_2vcZg', 
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

   
    document.getElementById('play-pause').addEventListener('click', function () {
        if (isPlayerReady) {
            if (player.getPlayerState() === YT.PlayerState.PLAYING) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
        }
    });

    
    player.addEventListener('onStateChange', function (event) {
        if (event.data === YT.PlayerState.PLAYING) {
            setInterval(updateSeekBar, 1000);
        }
    });

    
    document.getElementById('seek-bar').addEventListener('input', function () {
        const value = document.getElementById('seek-bar').value;
        const seekTo = (value / 100) * player.getDuration();
        player.seekTo(seekTo);
    });
}

function onPlayerReady() {
    isPlayerReady = true;
    document.getElementById('duration').textContent = formatTime(player.getDuration());
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        document.getElementById('play-pause').textContent = 'Replay';
    }
}

function updateSeekBar() {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();

    document.getElementById('current-time').textContent = formatTime(currentTime);
    document.getElementById('seek-bar').value = (currentTime / duration) * 100;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number) {
    return number < 10 ? `0${number}` : number;
}
