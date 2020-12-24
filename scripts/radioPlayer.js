"use strict";

export const radioPlayerInit = () => {
  const radio = document.querySelector(".radio"),
    radioNavigation = document.querySelector(".radio-navigation"),
    radioCoverImg = document.querySelector(".radio-cover__img"),
    radioItem = document.querySelectorAll(".radio-item"),
    radioHeader = document.querySelector(".radio-header__big"),
    radioStop = document.querySelector(".radio-stop"),
    radioVolume = document.querySelector(".radio-volume");

  const audio = new Audio();
  audio.type = "audio/aac";

  radioStop.disabled = true;

  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove("play");
      radioStop.classList.add("fa-play");
      radioStop.classList.remove("fa-stop");
    } else {
      radio.classList.add("play");
      radioStop.classList.add("fa-stop");
      radioStop.classList.remove("fa-play");
    }
  };
  const selectItem = (elem) => {
    radioItem.forEach((item) => item.classList.remove("select"));
    elem.classList.add("select");
  };

  const radioPlay = (event) => {
    const target = event.target,
      parent = target.closest(".radio-item"),
      title = parent.querySelector(".radio-name").textContent,
      urlImg = parent.querySelector(".radio-img").src;

    radioHeader.textContent = title;
    radioCoverImg.src = urlImg;

    selectItem(parent);
    radioStop.disabled = false;
    audio.src = target.dataset.radioStantion;
    audio.play();
    changeIconPlay();
  };

  const stopBtnInit = () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    changeIconPlay();
  };

  radioNavigation.addEventListener("change", radioPlay);
  radioStop.addEventListener("click", stopBtnInit);
  radioVolume.addEventListener("input", () => {
    audio.volume = radioVolume.value / 100;
  });
  radioVolume.value = audio.volume * 100;

  radioPlayerInit.stop = () => {
    audio.pause();
    changeIconPlay();
  };
};
