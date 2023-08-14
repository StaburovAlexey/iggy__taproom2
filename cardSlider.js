//const carousel = document.querySelector(".carousel"); //slider_container
//const gallery = document.querySelector(".gallery__wraper"); //slider
//const img = document.querySelectorAll(".carousel__img"); //slide
//const btnNavigation = document.querySelectorAll(".btn-navigation");

const evtCarousel = document.querySelector(".events__carousel");
const evtWraper = document.querySelector(".events__wraper");
const card = document.querySelectorAll(".events__card");
const btnNavigationCard = document.querySelectorAll(".btn-navigation-card");

let activeOrder = 0;
initCard();

function initCard() {
  for (let i = 0; i < card.length; i++) {
    const slide = card[i];

    slide.dataset.order = i;
    slide.style.transform = "translate(-50%, -50%)";
    slide.addEventListener("click", clickHandlerCard);
  }

  for (const navigation of btnNavigationCard) {
    navigation.addEventListener("click", navigationHandlerCard);
  }
  activeOrder = Math.floor(card.length / 2);

  updateCard();
}

function updateCard() {
  //возвращаем размер объекта getBoundingClientRect
  const { width, height } = evtWraper.getBoundingClientRect();

  const a = width / 2;
  const b = height / 2;
  const delta = Math.PI / card.length / 1;

  for (let i = 0; i < card.length; i++) {
    const leftImg = document.querySelector(
      `.events__card[data-order='${activeOrder - i}']`
    );

    if (leftImg) {
      leftImg.style.zIndex = card.length - i;
      leftImg.style.opacity = 1 - (4 * i) / card.length;
      leftImg.style.left = `${
        width / 2 + a * Math.cos((Math.PI * 3) / 2 - delta * i * 2)
      }px`;
      leftImg.style.top = `${
        -b * Math.sin((Math.PI * 3) / 2 - delta * i * 2)
      }px`;
    }

    const rightImg = document.querySelector(
      `.events__card[data-order='${activeOrder + i}']`
    );

    if (rightImg) {
      rightImg.style.zIndex = card.length - i;
      rightImg.style.opacity = 1 - (4 * i) / card.length;
      rightImg.style.left = `${
        width / 2 + a * Math.cos((Math.PI * 3) / 2 + delta * i * 2)
      }px`;
      rightImg.style.top = `${
        -b * Math.sin((Math.PI * 3) / 2 + delta * i * 2)
      }px`;
    }
  }
}

function clickHandlerCard() {
  const order = parseInt(this.dataset.order, 10);
  activeOrder = order;
  updateCard();
}

function navigationHandlerCard() {
  const { dir } = this.dataset;
  if (dir === "left") {
    activeOrder = Math.max(0, activeOrder - 1);
  } else if (dir === "right") {
    activeOrder = Math.min(card.length - 1, activeOrder + 1);
  }
  updateCard();
}
