
const playList = [
  { 
    title: 'Akvarium - Poezd v ogne',
    src: './assets/audio/Akvarium - Poezd v ogne.mp3',
    duration: '1:05'
  },
  { 
    title: 'Animal DzhaZ - CHuvstva',
    src: './assets/audio/Animal DzhaZ - CHuvstva.mp3',
    duration: '0:34'
  },
  {
    title: 'Bumboks - Pepel',
    src: './assets/audio/Bumboks - Pepel.mp3',
    duration: '0:23'
  }
]

let isPlay = false;
let playNum = 0;

const playButton = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const playListItem = document.querySelector('.play-list');

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