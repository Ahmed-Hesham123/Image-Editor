let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

let upload = document.getElementById("upload");
let download = document.getElementById("download");
let img = document.getElementById("img");

let imgBox = document.getElementById("img-box");
let reset = document.getElementById("reset");

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function resetValue() {
  img.style.filter = "none";
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";
  updateValue(saturate);
  updateValue(contrast);
  updateValue(brightness);
  updateValue(sepia);
  updateValue(grayscale);
  updateValue(blur);
  updateValue(hueRotate);
}

function displayBlock(item) {
  item.style.display = "block";
}

function updateValue(element) {
  const valueSpan =
    element.previousElementSibling.getElementsByClassName("value")[0];
  valueSpan.textContent = element.value;

  // Save the updated filter value to local storage
  localStorage.setItem(element.id, element.value);
}

upload.addEventListener("change", () => {
  resetValue();
  displayBlock(download);
  displayBlock(reset);
  displayBlock(imgBox);

  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = () => {
    img.src = file.result;
  };
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  };
});

document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the filter values from local storage and update the elements
  saturate.value = localStorage.getItem("saturate") || "100";
  contrast.value = localStorage.getItem("contrast") || "100";
  brightness.value = localStorage.getItem("brightness") || "100";
  sepia.value = localStorage.getItem("sepia") || "0";
  grayscale.value = localStorage.getItem("grayscale") || "0";
  blur.value = localStorage.getItem("blur") || "0";
  hueRotate.value = localStorage.getItem("hue-rotate") || "0";

  // Apply the filters to the image
  applyFilters();
});


function applyFilters() {
  ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
  `;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Save the updated filter values to local storage
  localStorage.setItem("saturate", saturate.value);
  localStorage.setItem("contrast", contrast.value);
  localStorage.setItem("brightness", brightness.value);
  localStorage.setItem("sepia", sepia.value);
  localStorage.setItem("grayscale", grayscale.value);
  localStorage.setItem("blur", blur.value);
  localStorage.setItem("hue-rotate", hueRotate.value);
}

function setInitialFilterValues() {
  saturate.value = localStorage.getItem("saturate") || "100";
  contrast.value = localStorage.getItem("contrast") || "100";
  brightness.value = localStorage.getItem("brightness") || "100";
  sepia.value = localStorage.getItem("sepia") || "0";
  grayscale.value = localStorage.getItem("grayscale") || "0";
  blur.value = localStorage.getItem("blur") || "0";
  hueRotate.value = localStorage.getItem("hue-rotate") || "0";

  applyFilters();
}

// Set initial filter values and event listeners for filters
setInitialFilterValues();
let filters = document.querySelectorAll(".filter");
for (let filter of filters) {
  filter.addEventListener("input", () => {
    applyFilters();
    updateValue(filter);
  });
  updateValue(filter);
}

reset.addEventListener("click", resetValue);

download.addEventListener("click", () => {
  download.href = canvas.toDataURL();
});
