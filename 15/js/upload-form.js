import {isEscButton, isFocusedElement, showHideModalElement,
  checkArrayHasDuplicates, processEvents, checkFileType} from './functions.js';

import {setImageScale, incImageScale} from './image-scale.js';

@@ -10,6 +10,9 @@ import {showSuccessMessage, showErrorMessage} from './messages.js';

import {sendData} from './data.js';

// Массив допустимых расширений графических файлов для загрузки
const IMAGE_FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

// Хэштеги разделяются пробелами в списке
const HASHTAG_SEPARATOR = ' ';
// Максимальное количество хэштегов для одной фотографии
@@ -33,6 +36,7 @@ const SubmitButtonText = {
// за один шаг увеличения / уменьшения изображения
const SCALE_PERCENT_PER_STEP = 25;

const fileFieldElement = document.querySelector('#upload-file');
const overlayElement = document.querySelector('.img-upload__overlay');
const formElement = document.querySelector('.img-upload__form');
const hashtagFieldElement = document.querySelector('.text__hashtags');
@@ -119,10 +123,34 @@ const sendDataSuccess = () => {
  showSuccessMessage();
};

/*
 * Проверяет, относится ли файл с именем fileName к одному из заданных типов
 * графических файлов
 */
const isImageFile = (fileName) => checkFileType(fileName, IMAGE_FILE_TYPES);

/*
 * Обработчик события выбора файла
 */
function onFileInputChange() {
  // Получаем выбранный файл
  const file = fileFieldElement.files[0];
  // На всякий случай проверка, был ли действительно выбран графический файл
  // В противном случае выход из обработчика без показа формы
  // Какой смысл пытаться загружать в форму предпросмотра не графический файл
  if (!file || !isImageFile(file.name)) {
    return;
  }
  // Получаем картинку предпросмотра и помещаем в нее выбранный файл
  const photoElement = document.querySelector('.img-upload__preview img');
  photoElement.src = URL.createObjectURL(file);
  // Также получаем все миниатюры с эффектами и в цикле подставляем в них
  // выбранное изображение
  const effectsElements = document.querySelectorAll('.effects__preview');
  effectsElements.forEach((effect) => {
    effect.style.backgroundImage = `url('${photoElement.src}')`;
  });
  // Показ формы предпросмотра
  showModalOverlay();
}

/*
 * Обработчик события нажатия на кнопку "крестик" в форме
 */
function onCloseButtonClick() {
  hideModalOverlay();
}
/*
 * Обработчик события нажатия на клавишу Esc
 */
function onEscKeyDown(evt) {
  // Проверяется нажатие клавиши Esc
  // При этом окно закрывается только в том случае,
  // фокус не находится в одном из двух текстовых полей
  if (isEscButton(evt) && !checkTextFieldFocused()) {
    evt.preventDefault();
    hideModalOverlay();
  }
}
/*
 * Обработчик события submit формы редактирования изображения
 */
function onFormSubmit(evt) {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton(true, SubmitButtonText.SENDING);
    sendData(new FormData(evt.target))
      .then(sendDataSuccess)
      .catch(showErrorMessage)
      .finally(blockSubmitButton(false, SubmitButtonText.IDLE));
  }
}
/*
 * Обработчик нажания на кнопку увеличения масштаба
 */
function onEnlargeButtonClick() {
  incImageScale(SCALE_PERCENT_PER_STEP);
}
/*
 * Обработчик нажания на кнопку уменьшения масштаба
 */
function onReduceButtonClick() {
  incImageScale(-SCALE_PERCENT_PER_STEP);
}
/*
 * Обработчик события изменения в форме
 */
function onFormChange(evt) {
  // Отлавливаем изменение эффекта
  // и вызываем соответствующую функцию для настройки изображения
  if (evt.target.classList.contains('effects__radio')) {
    changeEffect(evt.target.value);
  }
}
/*
 * Функция преобразует строку с хэштегами в массив для удобства работы
 */
const getHashtagArrayFromStr = (hashtagStr) =>
  // Удаление концевых пробелов, выкидывание пустых значений
  hashtagStr.trim().split(HASHTAG_SEPARATOR).filter((str) => str.trim().length);
/*
 * Проверка количества введенных хэштегов
 */
const checkHashtagCount = (value) =>
  getHashtagArrayFromStr(value).length <= HASHTAG_MAX_COUNT;
/*
 * Функция проверяет наличие дубликатов среди хэштегов
 */
const checkHashtagDuplicates = (value) =>
  !checkArrayHasDuplicates(getHashtagArrayFromStr(value));
/*
 * Функция проверки одного хэштега на соответствие маске и допустимым символам
 */
const chechHashtagSymbols = (hashtag) => HASHTAG_REGEXP.test(hashtag);
/*
 * Функция проверки массива хэштегов на соответствие маске и допустимым символам
 */
const chechHashtagArray = (value) =>
  getHashtagArrayFromStr(value).every(chechHashtagSymbols);
/*
 * Для удобства настройка валидации формы вынесена в отдельную функцию
 */
const initFormValidation = () => {
  // Создание объекта pristine для проверки
  pristine = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
  });
  // Добавление проверки максимального количества хэштегов
  pristine.addValidator(
    hashtagFieldElement,
    checkHashtagCount,
    HASTAG_TOO_MUCH_ERROR_MESSAGE
  );
  // Добавление проверки дубликатов в хэштегах
  pristine.addValidator(
    hashtagFieldElement,
    checkHashtagDuplicates,
    HASTAG_HAS_DUPLICATES_ERROR_MESSAGE
  );
  // Добавление проверки хэштега на соответствие маске и используемых символов
  pristine.addValidator(
    hashtagFieldElement,
    chechHashtagArray,
    HASTAG_INCORRECT_ERROR_MESSAGE
  );
};

const initUploadForm = () => {
  fileFieldElement.addEventListener('change', onFileInputChange);
  // Настройка валидации для формы
  initFormValidation();
  // Инициализация масштабирования
  setImageScale();
  // Инициализация эффектов
  initImageEffects();
};
export {initUploadForm};
