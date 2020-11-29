import images from "./data.js";

const ref = {
  container: document.querySelector(".js-gallery"),
  backDrop: document.querySelector(".js-lightbox"),
  modalCard: document.querySelector(".lightbox__image"),
  btnClose: document.querySelector(".lightbox__button"),
};

images.map((item, index) => {
  ref.container.innerHTML += `<li class="gallery__item">
  <a class="gallery__link" href="${item.original}">
    <img class="gallery__image"
    src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}" 
      data-index = "${index}"/>
        </a>
          </li>`;
});

ref.container.addEventListener("click", (e) => {
  if (!e.nodeName === "IMG") return;
  e.preventDefault();
  ref.backDrop.classList.add("is-open");
  ref.modalCard.setAttribute("src", e.target.dataset.source);
  ref.modalCard.setAttribute("data-index", e.target.dataset.index);
  ref.modalCard.setAttribute("alt", e.target.alt);
});
ref.btnClose.addEventListener("click", onClickClose);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") onClickClose();
  if (e.key === "ArrowLeft") onPressLeft();
  if (e.key === "ArrowRight") onPressRight();
});

function setAttributeImg(step, index) {
  ref.modalCard.dataset.index = `${step + index}`;
  ref.modalCard.setAttribute("src", images[step + index].original);
}

function onClickClose() {
  ref.backDrop.classList.remove("is-open");
  ref.modalCard.src = "";
  ref.modalCard.alt = "";
}

function onPressLeft() {
  const index = +ref.modalCard.dataset.index;
  if (index === 0) {
    setAttributeImg(0, images.length - 1);
    return;
  }
  setAttributeImg(-1, index);
}

function onPressRight() {
  const index = +ref.modalCard.dataset.index;
  if (index === images.length - 1) {
    setAttributeImg(0, 0);
    return;
  }
  setAttributeImg(1, index);
}
