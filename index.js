const carousel = document.querySelector(".carousel"); //slider_container
const gallery = document.querySelector(".gallery__wraper"); //slider
const img = document.querySelectorAll(".carousel__img"); //slide
const btnNavigation = document.querySelectorAll(".btn-navigation");

init();

function init() {
  for (let i = 0; i < img.length; i++) {
    const slide = img[i];

    slide.dataset.order = i;
    slide.style.transform = "translate(-50%, -50%)";
    slide.addEventListener("click", clickHandler);
  }

  for (const navigation of btnNavigation) {
    navigation.addEventListener("click", navigationHandler);
  }
  activeOrder = Math.floor(img.length / 2);

  update();
}

function update() {
  //возвращаем размер объекта getBoundingClientRect
  const { width, height } = gallery.getBoundingClientRect();

  const a = width / 2;
  const b = height / 2;
  const delta = Math.PI / img.length / 1.5;

  for (let i = 0; i < img.length; i++) {
    const leftImg = document.querySelector(
      `.carousel__img[data-order='${activeOrder - i}']`
    );

    if (leftImg) {
      leftImg.style.zIndex = img.length - i;
      leftImg.style.opacity = 1 - (3 * i) / img.length;
      leftImg.style.left = `${
        width / 2 + a * Math.cos((Math.PI * 3) / 2 - delta * i * 2)
      }px`;
      leftImg.style.top = `${
        -b * Math.sin((Math.PI * 3) / 2 - delta * i * 2)
      }px`;
    }

    const rightImg = document.querySelector(
      `.carousel__img[data-order='${activeOrder + i}']`
    );

    if (rightImg) {
      rightImg.style.zIndex = img.length - i;
      rightImg.style.opacity = 1 - (3 * i) / img.length;
      rightImg.style.left = `${
        width / 2 + a * Math.cos((Math.PI * 3) / 2 + delta * i * 2)
      }px`;
      rightImg.style.top = `${
        -b * Math.sin((Math.PI * 3) / 2 + delta * i * 2)
      }px`;
    }
  }
}

function clickHandler() {
  const order = parseInt(this.dataset.order, 10);
  activeOrder = order;
  update();
}

function navigationHandler() {
  const { dir } = this.dataset;
  if (dir === "left") {
    activeOrder = Math.max(0, activeOrder - 1);
  } else if (dir === "right") {
    activeOrder = Math.min(img.length - 1, activeOrder + 1);
  }
  update();
}
