const filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  hueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};

const imageCanvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");

const filtersContainer = document.querySelector(".filters");
const placeholder = document.querySelector(".placeholder");

const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector("#download-btn");

let currentImage = null;

function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");

  div.classList.add("filter");
  const p = document.createElement("p");
  p.innerText = `${name}: ${value}${unit}`;

  const input = document.createElement("input");

  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  input.addEventListener("input", (e) => {

    filters[name].value = e.target.value;
    p.innerText = `${name}: ${e.target.value}${unit}`;
    applyFilters();
  });

  div.appendChild(p);
  div.appendChild(input);

  return div;
}

Object.keys(filters).forEach((key) => {

  const filter = filters[key];

  const filterElement = createFilterElement(
    key,
    filter.unit,
    filter.value,
    filter.min,
    filter.max
  );

  filtersContainer.appendChild(filterElement);
});

imgInput.addEventListener("change", (event) => {

  const file = event.target.files[0];
  if (!file) return;
  const img = new Image();

  img.src = URL.createObjectURL(file);
  img.onload = () => {

    currentImage = img;
    imageCanvas.style.display = "block";
    placeholder.style.display = "none";
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;

    applyFilters();
  };
});

function applyFilters() {
  if (!currentImage) return;

  const filterString = `
    brightness(${filters.brightness.value}%)
    contrast(${filters.contrast.value}%)
    saturate(${filters.saturation.value}%)
    hue-rotate(${filters.hueRotation.value}deg)
    blur(${filters.blur.value}px)
    grayscale(${filters.grayscale.value}%)
    sepia(${filters.sepia.value}%)
    opacity(${filters.opacity.value}%)
    invert(${filters.invert.value}%)
  `;

  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

  canvasCtx.filter = filterString;

  canvasCtx.drawImage(currentImage,0,0,imageCanvas.width,imageCanvas.height);
}

resetBtn.addEventListener("click", () => {

  Object.keys(filters).forEach((key) => {

    if (
      key === "brightness" ||
      key === "contrast" ||
      key === "exposure" ||
      key === "saturation"
    ) {
      filters[key].value = 100;
    } else if (key === "opacity") {
      filters[key].value = 100;
    } else {
      filters[key].value = 0;
    }

    document.getElementById(key).value = filters[key].value;
  });

  document.querySelectorAll(".filter p").forEach((p, index) => {

    const key = Object.keys(filters)[index];

    p.innerText = `${key}: ${filters[key].value}${filters[key].unit}`;
  });

  applyFilters();
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
});