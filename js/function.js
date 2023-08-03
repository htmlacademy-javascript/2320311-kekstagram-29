// База десятичной системы счисления
// Указывается вторым необязательным параметром
// при преобразовании строки в число
const DECIMAL_BASE = 10;

export const parseDecimalInt = (str) => parseInt(str, DECIMAL_BASE);

export const checkStringLength = (str, maxLength) => str.length <= maxLength;

export const isPalindrome = (str) => {
  // По умолчанию считаем, что строка - полиндром
  let result = true;
  // Удаляем из строки пробелы, приводим к верхнему регистру
  const preparedStr = str.replaceAll(' ', '').toUpperCase();
  // Для удобства индекс последнего символа строки помещается в переменную,
  // чтобы не считать каждый раз
  const lastCharIndex = preparedStr.length - 1;
  // На самом деле требуется сверить первую половину строки со второй половиной
  // в обратном порядке. Поэтому число итераций цикла будет равно половине длины строки
  const halfStrLength = preparedStr.length / 2;
  // В цикле сравниваем первый символ с последний, второй с предпоследним и т.д.
  for (let i = 0; i <= halfStrLength; i++) {
    result = preparedStr.at(i) === preparedStr.at(lastCharIndex - i);
    // После первого несовпадения нет смысла делать дальнейшую проверку,
    // строка уже не будет палиндромом, можно прекращать цикл
    if (!result) {
      break;
    }
  }
  return result;
};

export const extractDigitsFromStr = (str) => {
  // По умолчанию результат - пустая строка
  let result = '';
  // На случай если было передано число, оно преобразуется в строку
  str = str.toString();
  // В цикле разбирается каждый символ строка
  for (let i = 0; i < str.length; i++) {
    const currentChar = parseDecimalInt(str.at(i));
    if (!Number.isNaN(currentChar)) {
      result += str.at(i);
    }
  }
  // В заключении строка из цифр преобразуется в целое число
  return parseDecimalInt(result);
};
export const getRandomPositiveInt = (value1, value2) => {
  // Значения параметров берутся по модулю
  value1 = Math.abs(value1);
  value2 = Math.abs(value2);
  // Определяется минимальное значение из двух параметров
  // Заодно выполняется округление (если значение параметра не целое число)
  const minValue = Math.ceil(Math.min(value1, value2));
  // Определяется длина диапазона для поиска случайного целого числа
  // Это разница между максимальным и минимальным значением, плюс 1s
  const interval = Math.floor(Math.max(value1, value2)) - minValue + 1;
  // Выполняется поиск случайного значения в диапазоне и его округление
  return Math.floor(interval * Math.random() + minValue);
};
export const setImgProps = (imgElement, src, alt) => {
  imgElement.src = src;
  imgElement.alt = alt;
};
export const isEscButton = (evt) => evt.key === 'Escape';
export const showHideObject = (element, visible) => {
  if (visible) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
};
export const showHideModalElement = (element, visible, onKeyDown) => {
  const bodyElement = document.querySelector('body');
  // Собственно отображение / скрытие элемента
  showHideObject(element, visible);
  // Помимо этого еще необходимо добавлять / удалять класс modal-open тегу body страницы
  // Это нужно для того, чтобы страница позади не прокручивалась при скроле
  // Наконец, устанавливается / удаляется обработчик события нажатия на клавишу
  if (visible) {
    bodyElement.classList.add('modal-open');
    document.addEventListener('keydown', onKeyDown);
  } else {
    bodyElement.classList.remove('modal-open');
    document.removeEventListener('keydown', onKeyDown);
  }
};
export const isFocusedElement = (element) => document.activeElement === element;
export const checkArrayHasDuplicates = (values, caseSensitive = false) => {
  let checkValues = values;
  // Если поиск дубликатов выполняется без учета регистра,
  // то все элементы массива приводятся к одному регистру (нижнему)
  if (!caseSensitive) {
    checkValues = checkValues.map((value) => value.toLowerCase());
  }
  // Проще всего получить только уникальные элементы массива,
  // если преобразовать его во множество.
  // Размер множества - количество уникальных элементов
  const distinctCount = new Set(checkValues).size;
  // Если количество уникальных элементов меньше общего количества,
  // значит есть дубликаты
  return distinctCount < checkValues.length;
};
export const processEvents = (events, add) => {
  events.forEach(({element, type, listener}) => {
    if (add) {
      element.addEventListener(type, listener);
    } else {
      element.removeEventListener(type, listener);
    }
  });
};

//  Функция для устранения "дребезга" при перерисовке фотографий
//  Функция взята из интернета и доработана
//  Источник - https://www.freecodecamp.org/news/javascript-debounce-example

export function debounce(callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;
  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);
    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}


//  Функция проверяет, соответствует ли полное имя файла fileName
// одному из заданных в массиве fileTypes типу

export const checkFileType = (fileName, fileTypes) =>
  fileTypes.some((ext) => fileName.toLowerCase().endsWith(ext));
