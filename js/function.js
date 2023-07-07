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
