// Функция открытия полноразмерного изображения
function openFullImage() {
  fullImage.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeyDown);

  // Навесил класс чтобы контейнер с фотографиями позади не прокручивался при скролле
  document.querySelector('body').classList.add('modal-open');

  // спрячьте блоки счётчика комментариев
  document.querySelector('.social__comment-count').classList.add('hidden');

  // спрячьте блоки загрузки новых комментариев
  document.querySelector('.comments-loader').classList.add('hidden');
}

// Функция закрытия полноразмерного изображения
function closeFullImage() {
  fullImage.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeyDown);
}
