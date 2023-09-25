console.log(`1. Вёрстка +10\n2. Кнопка Play/Pause +10\n3. При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10\n4. При смене аудиотрека меняется изображение - обложка аудиотрека +10\n5. Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. +10\n6. Отображается продолжительность аудиотрека и его текущее время проигрывания +10\n7. Дополнительный не предусмотренный в задании функционал, улучшающий качество приложения(added mute) +10\nTotal: 60 / 60`)

document.addEventListener("DOMContentLoaded", () => {

  const playList = [
    { 
      title: 'Akvarium - Poezd v ogne',
      src: './assets/audio/Akvarium.mp3',
      duration: '1:05',
      cover: './assets/img/img1.jpg'
    },
    { 
      title: 'Animal DzhaZ - CHuvstva',
      src: './assets/audio/Animal.mp3',
      duration: '0:34',
      cover: './assets/img/img2.jpg'
    },
    {
      title: 'Bumboks - Pepel',
      src: './assets/audio/Bumboks.mp3',
      duration: '0:23',
      cover: './assets/img/img3.jpg'
    }
  ]

  let isPlay = false;
  let playNum = 0;

  const playButton = document.querySelector('.play');
  const playPrev = document.querySelector('.play-prev');
  const playNext = document.querySelector('.play-next');
  const playListItem = document.querySelector('.play-list');
  const playerImg = document.querySelector('.player__img');
  const backgroungImg = document.querySelector('.background');
  const progressContainer = document.querySelector('.progress__container');
  const progress = document.querySelector('.progress__bar');
  const currentTimeAudio = document.querySelector('.current');
  const durationTimeAudio = document.querySelector('.duration');


  playList.forEach(element => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = element.title;
    playListItem.append(li);
  });

  const playItem = document.querySelectorAll('.play-item')

  const audio = document.querySelector('.audio');;
  let audioTime = 0;

  const playAudio = () => {
    if (!isPlay) {
      audio.src = playList[playNum].src;
      audio.currentTime = audioTime;
      playerImg.src = playList[playNum].cover;
      backgroungImg.src = playList[playNum].cover;
      audio.play();
      isPlay = true;
      playButton.classList.toggle('pause');
      playItem[playNum].classList.add('item-active');
    } else {
      audio.pause();
      audioTime = audio.currentTime;
      isPlay = false;
      playButton.classList.toggle('pause');
    }
  };

  playButton.addEventListener('click', playAudio);

  const audioNext = () => {
    audioTime = 0;
    isPlay = false;
    playButton.classList.remove('pause');
    playItem[playNum].classList.remove('item-active');
    if (playNum < 2){
    playNum++;
    playAudio();
  } else if (playNum === 2) {
    playNum = 0;
    playAudio();
  }
  };

  const audioPrev = () => {
    audioTime = 0;
    isPlay = false;
    playButton.classList.remove('pause');
    playItem[playNum].classList.remove('item-active');
    if (playNum > 0) {
      playNum--;
      playAudio();
    } else  if (playNum === 0){
      playNum = 2;
      playAudio();
    }
  };

  audio.addEventListener('ended', audioNext);
  playPrev.addEventListener('click', audioPrev);
  playNext.addEventListener('click', audioNext);

  // progress bar

  function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    if (currentTime && duration) {
      currentTimeAudio.textContent = `${(Math.floor(audio.currentTime / 60)).toString().padStart(2, "0")}:
      ${(Math.floor(audio.currentTime % 60)).toString().padStart(2, "0")}`;
    durationTimeAudio.textContent = `${String(Math.floor(audio.duration / 60)).toString().padStart(2, "0")}:
      ${(Math.floor(audio.duration % 60)).toString().padStart(2, "0")}`;
    }
  }

  audio.addEventListener('timeupdate', updateProgress)

  // set progress

  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
  }
  progressContainer.addEventListener('click', setProgress)
});