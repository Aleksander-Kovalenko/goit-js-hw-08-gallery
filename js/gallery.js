import images from './data.js';

const ref = {
  galleryContainer: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  imgForModal: document.querySelector('.lightbox__image'),
  btnCloseModal: document.querySelector('button[data-action="close-lightbox"]'),
  overlayRef: document.querySelector('.lightbox__overlay'),
};
const imgCard = createImgCard(images);

ref.galleryContainer.insertAdjacentHTML('beforeend', imgCard.join(''));
ref.galleryContainer.addEventListener('click', onOpenImgModal);
ref.overlayRef.addEventListener('click', onPressOverlay);
ref.btnCloseModal.addEventListener('click', onCloseImgModal);

// Разметка элемента галереи
function createImgCard(images) {
  return images.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}"
      data-source="${original}" alt="${description}"/>
        </a>
          </li>`;
  });
}
// Модальное окно
function onOpenImgModal(e) {
  window.addEventListener('keydown', onPressKey);
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') return;
  ref.lightbox.classList.add('is-open');
  getLinkImg(e);
}
// Поулчения адресса изображения
function getLinkImg(e) {
  const srcImg = e.target.dataset.source;
  const altImg = e.target.dataset.alt;

  ref.imgForModal.src = srcImg;
  ref.imgForModal.alt = altImg;
}
// Методы закрытия модалки
function onCloseImgModal() {
  window.removeEventListener('keydown', onPressKey);
  ref.lightbox.classList.remove('is-open');

  ref.imgForModal.src = '';
  ref.imgForModal.alt = '';
}
function onPressKey(e) {
  if (e.code === 'Escape') onCloseImgModal();
}
function onPressOverlay(e) {
  if (e.target === ref.overlayRef) onCloseImgModal();
}
