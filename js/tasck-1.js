import { galleryItems } from "./app.js";
const refs = {
  gallery: document.querySelector(".js-gallery"),
  overlay: document.querySelector(".js-lightbox"),
  image: document.querySelector(".lightbox__image"),
};

let position = 0;

const creatElementOfGallery = (preview, original, description) => {
  return `<li class="gallery__item">
  <a class="gallery__link"
  href="${original}">
  <img class="gallery__image"
  src="${preview}"
  data-source="${original}"
  data-id="${position++}"
  alt="${description}"/>
      </a>
</li>`;
};

const renderItemOfGallery = () => {
  const image = galleryItems.map(({ preview, original, description }) =>
    creatElementOfGallery(preview, original, description)
  );
  refs.gallery.insertAdjacentHTML("afterbegin", image.join(""));
};

refs.gallery.addEventListener("click", onClickItemGallery);

function onClickItemGallery(e) {
  e.preventDefault();

  const target = e.target;
  if (target.nodeName === "IMG") {
    refs.overlay.classList.add("is-open");

    setAttributeOnImage(target.dataset.source, target.alt, target.dataset.id);
  }
}

refs.overlay.addEventListener("click", onClickBtnClose);

function onClickBtnClose(e) {
  const target = e.target;
  if (
    target.nodeName === "BUTTON" ||
    target.classList.contains("lightbox__overlay")
  ) {
    refs.overlay.classList.remove("is-open");
    setAttributeOnImage();
  }
}

document.body.addEventListener("keydown", onKeydown);

function onKeydown(e) {
  if (e.code === "Escape") {
    refs.overlay.classList.remove("is-open");
    refs.gallery.removeAttribute("keypress", key);
    setAttributeOnImage();
  }
}

function setAttributeOnImage(src = "", alt = "", id = "") {
  // position = refs.image.dataset.id;

  refs.image.dataset.id = id;
  refs.image.src = src;
  refs.image.alt = alt;

  // refs.overlay.classList.toggle("is-open");
}

refs.gallery.addEventListener("keydown", key);

function key(e) {
  if (e.key === "ArrowLeft") {
    // position = position - 1;
    // console.log("id", refs.image.dataset.id);
    // console.log("position", position);
    // setAttributeOnImage(
    //   galleryItems[position].original,
    //   galleryItems[position].description
    // );
  }

  if (e.key === "ArrowRight") {
    ArrowRight();
    //   position += 1;
    //   setAttributeOnImage(
    //     galleryItems[position].original,
    //     galleryItems[position].description
    //   );
  }
}

renderItemOfGallery();

function ArrowRight() {
  position = Number(refs.image.dataset.id) + 1;
  const org = galleryItems[position].original;
  const des = galleryItems[position].description;

  setAttributeOnImage(org, des, position);
}
