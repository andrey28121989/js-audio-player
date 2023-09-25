
const playList = [
  { 
    title: 'Akvarium - Poezd v ogne',
    src: './assets/audio/Akvarium - Poezd v ogne.mp3',
    duration: '1:05',
    cover: './assets/img/img1.jpg'
  },
  { 
    title: 'Animal DzhaZ - CHuvstva',
    src: './assets/audio/Animal DzhaZ - CHuvstva.mp3',
    duration: '0:34',
    cover: './assets/img/img2.jpg'
  },
  {
    title: 'Bumboks - Pepel',
    src: './assets/audio/Bumboks - Pepel.mp3',
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


playList.forEach(element => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = element.title;
  playListItem.append(li);
});

const playItem = document.querySelectorAll('.play-item')

const audio = new Audio();
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