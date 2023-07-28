// Функция для проверки длины строки.
const detectStringLength = (string, maxLength) => {
  if (string.length <= maxLength) {
    console.log(true);
    return true;
  }
  console.log(false);
  return false;
};

detectStringLength('wwww', 5);

//Функция для проверки, является ли строка палиндромом.

const detectStringPalindrom = (string) => {
  const newString = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  console.log(newString.toLowerCase());

  for (let i = newString.length - 1; i >= 0; i = i - 1) {
    reverseString += newString.at(i).toLowerCase();
    console.log(reverseString);
  }

  if (reverseString === newString) {
    console.log('Это палиндром');
    return 'Это палиндром';
  }
  console.log('Это не палиндром');
  return 'Это не палиндром';
};

detectStringPalindrom('ШалаШ');

// Функция, которая принимает время начала и конца рабочего дня,
//  а также время старта и продолжительность встречи в минутах и возвращает true,
// если встреча не выходит за рамки рабочего дня, и false, если выходит.

const checkMeetingTime = (dayStart, dayEnd, meetingStart, meetingDuration) => {
  const dayStartMinutes = dayStart.split(':')[0] * 60 + dayStart.split(':')[1] * 1;
  const dayEndMinutes = dayEnd.split(':')[0] * 60 + dayEnd.split(':')[1] * 1;
  const meetingStartMinutes = meetingStart.split(':')[0] * 60 + meetingStart.split(':')[1] * 1;


  if (meetingStartMinutes < dayStartMinutes || meetingStartMinutes > dayEndMinutes) {
    return false;
  }
  if ((meetingDuration + meetingStartMinutes) <= dayEndMinutes) {
    return true;
  } else {
    return false;
  }
};

checkMeetingTime('08:00', '17:30', '14:00', 90);
checkMeetingTime('8:0', '10:0', '8:0', 120);
checkMeetingTime('08:00', '14:30', '14:00', 90);
checkMeetingTime('14:00', '17:30', '08:0', 90);
checkMeetingTime('8:00', '17:30', '08:00', 900);

// База десятичной системы счисления
// Указывается вторым необязательным параметром
// при преобразовании строки в число
const DECIMAL_BASE = 10;
/*
 * Функция преобразует строку в целое число в десятичной системе считсления.
 * Использовать стандартную функцию parseInt неудобно из-за второго параметра,
 * который задает систему счисления. Так как преобразование используется в
 * нескольких модулях и всегда в десятичную систему, то показалось логичным
 * сделать такую функцию для повторного использования только с одним параметром
 */
export const parseDecimalInt = (str) => parseInt(str, DECIMAL_BASE);
/*
 * Функция проверяет длину строки str.
 * Если длина меньше или равна значению maxLength, возвращается true.
 * В противном случае возвращается false.
 */
export const checkStringLength = (str, maxLength) => str.length <= maxLength;
/*
 * Функция проверяет, является ли строка str палиндроном.
 * При проверке не учитывается регистр символов, удаляются пробелы.
 */
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
/*
 * Функция извлекает цифры из строки str и возвращает их в виде целого числа
 */
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
/*
 * Функция возвращает случайное положительное целое число
 * в диапазоне между числами value1 и value2
 */
export const getRandomPositiveInt = (value1, value2) => {
  // Значения параметров берутся по модулю
  value1 = Math.abs(value1);
  value2 = Math.abs(value2);
  // Определяется минимальное значение из двух параметров
  // Заодно выполняется округление (если значение параметра не целое число)
  const minValue = Math.ceil(Math.min(value1, value2));
  // Определяется длина диапазона для поиска случайного целого числа
  // Это разница между максимальным и минимальным значением, плюс 1
  const interval = Math.floor(Math.max(value1, value2)) - minValue + 1;
  // Выполняется поиск случайного значения в диапазоне и его округление
  return Math.floor(interval * Math.random() + minValue);
};

/*
 * Функция для устранения "дребезга" при перерисовке фотографий
 * Функция взята из интернета и доработана
 * Источник - https://www.freecodecamp.org/news/javascript-debounce-example
 */
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