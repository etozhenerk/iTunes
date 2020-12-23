"use strict";

export const videoPlayerInit = () => {
  const videoPlayer = document.querySelector(".video-player"),
    videoButtonPlay = document.querySelector(".video-button__play"),
    videoTimePassed = document.querySelector(".video-time__passed"),
    videoProgress = document.querySelector(".video-progress"),
    videoTimeTotal = document.querySelector(".video-time__total"),
    videoContainer = document.querySelector(".video-container"),
    videoVolume = document.querySelector(".video-volume");

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove("fa-pause");
      videoButtonPlay.classList.add("fa-play");
    } else {
      videoButtonPlay.classList.add("fa-pause");
      videoButtonPlay.classList.remove("fa-play");
    }
  };

  const togglePlay = () => {
    if (videoPlayer.paused) {
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

  const addZero = (n) => (n < 10 ? `0${n}` : n);

  const timeUpdate = () => {
    const currentTime = videoPlayer.currentTime,
      duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100;

    let minutePassed = Math.floor(currentTime / 60),
      secondsPassed = Math.floor(currentTime % 60),
      minuteTotal = Math.floor(duration / 60),
      secondsTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(
      secondsPassed
    )}`;
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(
      secondsTotal
    )}`;
  };

  const progressChange = () => {
    const duration = videoPlayer.duration,
      value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;
  };

  const turnOnPlayer = (event) => {
    const target = event.target;
    if (
      target.matches(".video-player") ||
      target.matches(".video-button__play")
    ) {
      togglePlay();
    } else if (target.matches(".video-button__stop")) {
      stopPlay();
    }
  };

  videoContainer.addEventListener("click", turnOnPlayer);
  videoPlayer.addEventListener("timeupdate", timeUpdate);
  videoProgress.addEventListener("input", progressChange);
  videoVolume.addEventListener("input", () => {
    videoPlayer.volume = videoVolume.value / 100;
  });
  videoVolume.value = videoPlayer.volume * 100;
};
