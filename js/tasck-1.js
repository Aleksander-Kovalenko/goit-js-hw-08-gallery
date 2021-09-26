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
    setAttributeOnImage();
  }
}

function setAttributeOnImage(src = "", alt = "", id = 0) {
  // refs.image.dataset.id = id;
  refs.image.src = src;
  refs.image.alt = alt;
  // refs.overlay.classList.toggle("is-open");
}

// refs.gallery.addEventListener("keydown", key);

// function key(e) {
//   if (e.key === "ArrowLeft") {
//     console.log(refs.image.dataset.id);
//     setAttributeOnImage(
// galleryItems[refs.image.dataset.id].original,
//       galleryItems[position].description
//     );
//     position -= 1;
//   }

//   if (e.key === "ArrowRight") {
//     console.log(position);
//     setAttributeOnImage(
//       galleryItems[position].original,
//       galleryItems[position].description
//     );
//     position += 1;
//   }
// }

renderItemOfGallery();
