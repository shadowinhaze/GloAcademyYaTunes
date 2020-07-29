export const videoPlayerInit = () => {

    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoFullScreen = document.querySelector('.video-fullscreen');
    const videoVolume = document.querySelector('.video-volume');
    const videoButtonVolumeMute = document.querySelector('.video-button-volume__mute');
    const videoButtonVolumeLoud = document.querySelector('.video-button-volume__loud');


    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        };
    };

    const togglePlay = () => {
        if (videoPlayer.paused){
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }

        toggleIcon();
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        toggleIcon();
    };

    const toggleMute = () => {
        if (videoVolume.value > 0) {
            videoButtonVolumeMute.classList.add('fa-volume-down');
            videoButtonVolumeMute.classList.remove('fa-volume-off');
        } else {
            videoButtonVolumeMute.classList.remove('fa-volume-down');
            videoButtonVolumeMute.classList.add('fa-volume-off');
        };
    };

    const addZero = n => n < 10 ? '0' + n : n;


    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);
    videoPlayer.addEventListener('play', toggleIcon);
    videoButtonPlay.addEventListener('pause', toggleIcon);
    videoButtonStop.addEventListener('click', stopPlay);


    videoFullScreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;
        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent =`${addZero(minuteTotal)}:${addZero(secondsTotal)}`;

    });

    videoProgress.addEventListener('input', () => {
        const value = videoProgress.value;
        const duration = videoPlayer.duration;
        videoPlayer.currentTime = (value * duration) / 100;
    });


    videoPlayer.volume = 0.1;
    videoVolume.value = videoPlayer.volume * 100;  /*почему-то не работает для функций которые делают звук по максам и мьютят*/


    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100;
        toggleMute();
    });


    videoButtonVolumeMute.addEventListener('click', () => {
        videoPlayer.volume = 0;
        videoVolume.value = 0;
        toggleMute();
    });

    videoButtonVolumeLoud.addEventListener('click', () => {
        videoPlayer.volume = 1;
        videoVolume.value = 100;
        toggleMute();
    });
    
};