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
