import images from "./data.js";

const ref = {
  galleryContainer: document.querySelector(".js-gallery"),
  modalImg: document.querySelector(".lightbox__image"),
  btnClose: document.querySelector(".lightbox__button"),
  modal: document.querySelector(".lightbox__overlay"),
  backDrop: document.querySelector(".lightbox"),
};

images.map((item, index) => {
  ref.galleryContainer.innerHTML += `<li class="gallery__item">
  <a class="gallery__link" href="${item.original}">
    <img class="gallery__image" src="${item.preview}"
      data-source="${item.original}" alt="${item.description}" data-index = "${index}"/>
        </a>
          </li>`;
});

ref.galleryContainer.addEventListener("click", (e) => {
  e.preventDefault();
  if (!e.code === "IMG") return;

  ref.backDrop.classList.add("is-open");

  const modalLink = e.target.dataset.source;
  const modalIndex = e.target.dataset.index;

  ref.modalImg.setAttribute("src", modalLink);
  ref.modalImg.setAttribute("data-index", modalIndex);
});
ref.btnClose.addEventListener("click", () => {
  ref.backDrop.classList.remove("is-open");
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeOverlay();
  if (e.key === "ArrowRight") pressRight();
  if (e.key === "ArrowLeft") pressLeft();
});

function closeOverlay() {
  ref.backDrop.classList.remove("is-open");
  ref.modalImg.src = "";
  ref.modalImg.alt = "";
}

function setNewSrc(step, index) {
  ref.modalImg.dataset.index = `${index + step}`;
  ref.modalImg.setAttribute("src", images[index + step].original);
}

function pressRight() {
  let index = +ref.modalImg.dataset.index;
  if (index === images.length - 1) {
    setNewSrc(0, 0);
    return;
  }
  setNewSrc(1, index);
}

function pressLeft() {
  let index = +ref.modalImg.dataset.index;
  if (index === 0) {
    setNewSrc(0, images.length - 1);
    return;
  }
  setNewSrc(-1, index);
}
