const piano = document.querySelector(".piano");
const pianoКeys = document.querySelectorAll(".piano-key");
const buttonNotes = document.querySelector(".btn-notes");
const buttonLetters = document.querySelector(".btn-letters");
const buttonFullScreen = document.querySelector(".fullscreen");
let trigger = false;

const obj = {
  KeyD: "c",
  KeyF: "d",
  KeyG: "e",
  KeyH: "f",
  KeyJ: "g",
  KeyK: "a",
  KeyL: "b",
  KeyR: "cc",
  KeyT: "dd",
  KeyU: "ff",
  KeyI: "gg",
  KeyO: "aa",
};

function playAudio(event) {
  const audio = new Audio();
  audio.src = `assets/audio/${event}.mp3`;
  audio.currentTime = 0;
  audio.play();
}

function startMouseActions(event) {
  if (event.target.classList.contains("piano-key")) {
    let note = event.target.dataset.note;
    if (note.length > 1) {
      note = note[0] + note[0];
    }
    playAudio(note);
    pianoКeys.forEach((el) => {
      if (el.classList.contains("piano-key-active")) {
        el.classList.remove("piano-key-active");
      }
    });
    event.target.classList.add("piano-key-active");
  }
}

function removeTransition(el) {
  if (el.propertyName !== "transform") {
    return;
  }
  this.classList.remove("piano-key-active");
}

function toggleClass(cls) {
  this.classList.toggle(cls);
}

function toggleFullScreen(el) {
  if (!document.fullscreenElement) {
    el.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

document.addEventListener("mousedown", (event) => {
  if (event.button == 0 && event.target.classList.contains("piano-key")) {
    trigger = true;
  }
});

document.addEventListener("mouseup", (event) => {
  if (event.button == 0) {
    trigger = false;
  }
});

piano.addEventListener("click", startMouseActions);

piano.addEventListener("mouseover", (event) => {
  if (trigger) {
    startMouseActions(event);
  }
});

window.addEventListener("keydown", (event) => {
  if (obj.hasOwnProperty(event.code)) {
    playAudio(obj[event.code]);
  }
  let node;
  pianoКeys.forEach((el) => {
    if (el.classList.contains("piano-key-active")) {
      el.classList.remove("piano-key-active");
    }
    if (el.dataset.letter === event.code[3]) {
      node = el;
    }
  });
  node.classList.add("piano-key-active");
});

pianoКeys.forEach((el) =>
  el.addEventListener("transitionend", removeTransition)
);

buttonNotes.addEventListener("click", (event) => {
  if (!event.target.classList.contains("btn-active")) {
    event.target.classList.add("btn-active");
    buttonLetters.classList.remove("btn-active");
    pianoКeys.forEach((el) => {
      el.classList.remove("piano-key-letter");
    });
  }
});

buttonLetters.addEventListener("click", (event) => {
  if (!event.target.classList.contains("btn-active")) {
    event.target.classList.add("btn-active");
    buttonNotes.classList.remove("btn-active");
    pianoКeys.forEach((el) => {
      el.classList.add("piano-key-letter");
    });
  }
});

buttonFullScreen.addEventListener("click", function () {
  toggleFullScreen(document.body);
});

document.body.addEventListener("fullscreenchange", () => {
  toggleClass.call(buttonFullScreen, "openfullscreen");
});
