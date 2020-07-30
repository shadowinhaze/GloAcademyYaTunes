export const radioPlayerInit = () => {
   
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const radioVolume = document.querySelector('.radio-volume');
    const radioButtonVolumeMute = document.querySelector('.radio-button-volume__mute');
    const radioButtonVolumeLoud = document.querySelector('.radio-button-volume__loud');



    const audio = new Audio();
    audio.type = 'audio/aac';
    radioStop.disabled = true;


    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-pause');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-pause');
            radioStop.classList.remove('fa-paly');
        };
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        radioItem.forEach(item => item.style.opacity = 0.3);
        elem.classList.add('select');
        elem.style.opacity = 1;
    };


    const toggleRadioMute = () => {
        if (radioVolume.value > 0) {
            radioButtonVolumeMute.classList.add('fa-volume-down');
            radioButtonVolumeMute.classList.remove('fa-volume-off');
        } else {
            radioButtonVolumeMute.classList.remove('fa-volume-down');
            radioButtonVolumeMute.classList.add('fa-volume-off');
        };
    };

    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parrent = target.closest('.radio-item');
        selectItem(parrent);

        const title = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        const urlImg = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;

        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    })

    audio.volume = 0.1;
    radioVolume.value = audio.volume * 100;  /*почему-то не работает для функций которые делают звук по максам и мьютят*/
    let prevVolume = 1;

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
        toggleRadioMute();
    });

    /* костыль дететид */
    radioButtonVolumeMute.addEventListener('click', () => {
        if (audio.volume) {
            prevVolume = audio.volume;
            audio.volume = 0;
            radioVolume.value = audio.volume * 100;
        } else {
            audio.volume = prevVolume;
            radioVolume.value = audio.volume * 100;
        }
        toggleRadioMute();
    });

    radioButtonVolumeLoud.addEventListener('click', () => {
        audio.volume = 1;
        radioVolume.value = 100;
        toggleRadioMute();
    });


    radioPlayerInit.stop = () => {
        audio.pause();
        changeIconPlay();
    };
};