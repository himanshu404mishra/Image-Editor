const fileInput = document.querySelector(".file-input"),
  filterOptions = document.querySelectorAll(".filter button"),
  filterName = document.querySelector(".filter-info .name"),
  filterSlider = document.querySelector(".slider input"),
  filterValue = document.querySelector(".filter-info .value"),
  rotateOptions = document.querySelectorAll(".rotate button"),
  previewImg = document.querySelector(".preview-img img"),
  resetFilterBtn = document.querySelector(".reset-filter"),
  saveBtn = document.querySelector(".save-img"),
  chooseImgBtn = document.querySelector(".choose-img");

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;

let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;

const applyFilters = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical})`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

const loadImage = () => {
  let file = fileInput.files[0]; // getting the user selected file
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disable");
  });
};

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;

    if (option.id === "brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerHTML = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerHTML = `${saturation}%`;
    } else if (option.id === "grayscale") {
      filterSlider.max = "100";

      filterSlider.value = grayscale;
      filterValue.innerHTML = `${grayscale}%`;
    } else {
      filterSlider.max = "100";

      filterSlider.value = inversion;
      filterValue.innerHTML = `${inversion}%`;
    }
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active");

  if (selectedFilter.id === "brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "grayscale") {
    grayscale = filterSlider.value;
  } else {
    inversion = filterSlider.value;
  }
  applyFilters();
};

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.id === "left") {
      rotate -= 90;
    } else if (option.id === "right") {
      rotate += 90;
    } else if (option.id === "horizontal") {
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else {
      flipVertical = flipVertical === 1 ? -1 : 1;
    }
    applyFilters();
  });
});

const resetFilter = () => {
  (brightness = 100),
    (saturation = 100),
    (inversion = 0),
    (grayscale = 0),
    (rotate = 0),
    (flipHorizontal = 1),
    (flipVertical = 1);
  filterOptions[0].click();
  applyFilters();
};

const saveImg =() =>{
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;

  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  ctx.translate(canvas.width/2, canvas.height/2)
  if(rotate !== 0){
    ctx.rotate(rotate*Math.PI/180);
  }
  ctx.scale(flipHorizontal,flipVertical);
  ctx.drawImage(previewImg,-canvas.width/2,-canvas.height/2, canvas.width, canvas.height);

  const link = document.createElement("a")
  link.download = "image.jpg";
  link.href = canvas.toDataURL()
  link.click()
}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveBtn.addEventListener("click", saveImg)
chooseImgBtn.addEventListener("click", () => fileInput.click());
