"use strict";

export const musicPlayerInit = () => {
  const audio = document.querySelector(".audio"),
    audioImg = document.querySelector(".audio-img"),
    audioHeader = document.querySelector(".audio-header"),
    audioPlayer = document.querySelector(".audio-player"),
    audioNavigation = document.querySelector(".audio-navigation"),
    audioButtonPlay = document.querySelector(".audio-button__play"),
    audioTimePassed = document.querySelector(".audio-time__passed"),
    audioProgress = document.querySelector(".audio-progress"),
    audioProgressTiming = document.querySelector(".audio-progress__timing"),
    audioTimeTotal = document.querySelector(".audio-time__total");

  const playList = ["hello", "flow", "speed"];

  let trackIndex = 0;

  const loadTrack = () => {
    const isPlayd = audioPlayer.paused,
      track = playList[trackIndex];

    audioImg.src = `./audio/${track}.jpg`;
    audioHeader.textContent = track.toLocaleUpperCase();
    audioPlayer.src = `./audio/${track}.mp3`;

    if (isPlayd) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  };

  const prevTrack = () => {
    if (trackIndex !== 0) {
      trackIndex--;
    } else {
      trackIndex = playList.length - 1;
    }
    loadTrack();
  };

  const nextTrack = () => {
    if (trackIndex === playList.length - 1) {
      trackIndex = 0;
    } else {
      trackIndex++;
    }
    loadTrack();
  };

  const addZero = (n) => (n < 10 ? `0${n}` : n);

  const musicPlay = (event) => {
    const target = event.target;

    if (target.matches(".audio-button__play")) {
      audio.classList.toggle("play");
      audioButtonPlay.classList.toggle("fa-play");
      audioButtonPlay.classList.toggle("fa-pause");

      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    }

    const track = playList[trackIndex];

    audioImg.src = `./audio/${track}.jpg`;
    audioHeader.textContent = track.toLocaleUpperCase();

    if (target.matches(".audio-button__prev")) {
      prevTrack();
    }
    if (target.matches(".audio-button__next")) {
      nextTrack();
    }
  };

  const timerUpdate = () => {
    const duration = audioPlayer.duration,
      currentTime = audioPlayer.currentTime,
      progress = (currentTime / duration) * 100;

    audioProgressTiming.style.width = progress + "%";

    const minutesPassed = Math.floor(currentTime / 60) || "0",
      secondsPassed = Math.floor(currentTime % 60) || "0";

    const minutesTotal = Math.floor(duration / 60) || "0",
      secondsTotal = Math.floor(duration % 60) || "0";

    audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(
      secondsPassed
    )}`;
    audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(
      secondsTotal
    )}`;
  };

  const changeProgress = (event) => {
    const x = event.offsetX,
      allWidth = audioProgress.clientWidth,
      progress = (x / allWidth) * audioPlayer.duration;

    audioPlayer.currentTime = progress;
  };

  audioNavigation.addEventListener("click", musicPlay);
  audioPlayer.addEventListener("ended", () => {
    nextTrack();
    audioPlayer.play();
  });
  audioPlayer.addEventListener("timeupdate", timerUpdate);

  audioProgress.addEventListener("click", changeProgress);

  musicPlayerInit.stop = () => {
    audioPlayer.pause();
    audio.classList.remove("play");
    audioButtonPlay.classList.add("fa-play");
    audioButtonPlay.classList.remove("fa-pause");
  };
};
