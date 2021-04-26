const inputs = document.querySelectorAll("input");
const buttons = document.querySelectorAll("button");
const img = document.querySelector("img");
const outputs = document.querySelectorAll("output");
const fileInput = document.querySelector('input[type="file"]');
const canvas = document.querySelector("canvas");
const buttonFullScreen = document.querySelector(".fullscreen");
let trigger = false;
let indImg = -1;
const properties = {
  blur: "0px",
  invert: "0%",
  sepia: "0%",
  saturate: "100%",
  hue: "0deg",
};
let curProp = {
  blur: "0px",
  invert: "0%",
  sepia: "0%",
  saturate: "100%",
  hue: "0deg",
};

function handleUpdate() {
  if (!this.classList.contains("btn-load--input")) {
    let suffix = this.dataset.sizing || "";
    this.nextElementSibling.value = this.value;
    curProp[this.name] = this.value + suffix;
    if (trigger) {
      this.nextElementSibling.style.setProperty("background", "#a2abb3");
      this.nextElementSibling.style.setProperty("color", "#ffffff");
    } else {
      this.nextElementSibling.style.setProperty("background", "#454c53");
      this.nextElementSibling.style.setProperty("color", "#a2abb3");
    }
  }
  drawImage();
}

function checkButton() {
  if (this.classList.contains("btn-reset")) {
    reset();
  } else if (this.classList.contains("btn-next")) {
    indImg++;
    getImage();
  } else if (this.classList.contains("btn-save")) {
    saveImage();
  }
}
function loadImage() {
  const file = fileInput.files[0];
  let reader = new FileReader();
  reader.onload = () => {
    img.src = reader.result;
    drawImage();
  };
  reader.readAsDataURL(file);
  fileInput.value = null;
}

function saveImage() {
  const link = document.createElement("a");
  link.download = "download.png";
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
}

function drawImage() {
  const image = new Image();
  image.setAttribute("crossOrigin", "anonymous");
  image.src = img.src;
  image.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    let str = "";
    for (let prop in curProp) {
      str += `${prop}(${curProp[prop]}) `;
    }
    str = str.slice(0, -1).replace("hue", "hue-rotate");
    console.log("str", str);
    ctx.filter = str;
    ctx.drawImage(image, 0, 0);
  };
}
drawImage();

function reset() {
  let i = 0;
  for (let prop in properties) {
    canvas.style.setProperty(`--${prop}`, properties[prop]);
    inputs[i].value = parseInt(properties[prop]);
    outputs[i].value = parseInt(properties[prop]);
    i++;
  }
  curProp = { ...properties };
  drawImage();
}

function showImage(src) {
  const image = new Image();
  image.src = src;
  image.onload = () => {
    img.src = `${src}`;
    drawImage();
  };
}

function getTime() {
  const date = new Date();
  const hour = date.getHours();
  return hour < 6
    ? "night "
    : hour < 12
    ? "morning"
    : hour < 18
    ? "day"
    : "evening";
}

function getImage() {
  let index = (indImg % 20) + 1;
  if (index < 10) {
    index = "0" + index;
  }
  const imageSrc =
    "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" +
    getTime() +
    "/" +
    index +
    ".jpg";
  showImage(imageSrc);
  this.disabled = true;
  setTimeout(function () {
    this.disabled = false;
  }, 1000);
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

inputs.forEach((element) =>
  element.addEventListener("mousemove", handleUpdate)
);
inputs.forEach((element) => element.addEventListener("change", handleUpdate));
buttons.forEach((element) => element.addEventListener("click", checkButton));

document.addEventListener("mousedown", (event) => {
  if (event.button === 0 && event.target.tagName === "INPUT") {
    trigger = true;
  }
});

document.addEventListener("mouseup", (event) => {
  if (event.button == 0) {
    trigger = false;
  }
});

fileInput.addEventListener("change", loadImage);

buttonFullScreen.addEventListener("click", function () {
  toggleFullScreen(document.body);
});

document.body.addEventListener("fullscreenchange", () => {
  toggleClass.call(buttonFullScreen, "openfullscreen");
});
