photoElement.querySelector('.picture__comments').textContent = comments.length;

// Вешаем обработчики клика для открытия из миниатюры большой картинки
photoElement.addEventListener('click', (evt) => {
  openFullImage();
  // Вешаем обработчики на клавишу ESC
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeFullImage();
      document.querySelector('.social__caption').textContent = description;

      // СПИСОК КОММЕНТАРИЕВ
      const commentBox = document.querySelector('.social__comments');
      const commentToShow = 5;
      commentBox.innerHTML = '';
      for (let i = 0; i <= comments.length; i++) {

        // comments.forEach((commentData) => {
        //   const {avatar, message, name} = commentData;

        const commentElement = document.querySelector('.social__comment').cloneNode(true);
        // заполняем данные для комментария
        commentElement.querySelector('img').src = comments[i].avatar;
        commentElement.querySelector('img').alt = comments[i].name;
        commentElement.querySelector('p').textContent = comments[i].message;
        // });
      }

    });

  thumbnailFragment.appendChild(photoElement);
