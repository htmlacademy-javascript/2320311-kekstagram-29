import { generateArrayRandomNumber } from './util.js';
import { getRandomInteger } from './util.js';

const PHOTO_DESCRIPTION = [
  'Крутое фото',
  'еще одно фото',
  'фото красивое',
  'кто это тут?',
  'вот это супер',
  'фото меня',
  'общее фото',
  'лучшее фото',
];

const COMMENTS_AUTHORS = [
  'Коля',
  'Миша',
  'Катя',
  'Гриша',
  'Вася',
  'Петя',
  'Ваня',
  'Настя',
];

const COMMENTS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const SIMILAR_GALLERY_OBJECTS = 25;
const MIN_NUMBER_OF_LIKES = 15;
const MAX_NUMBER_OF_LIKES = 200;

// объект комментария
const createComment = () => ({
  id: getRandomInteger(1, 1000),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: COMMENTS_MESSAGES[getRandomInteger(0, COMMENTS_MESSAGES.length - 1)],
  name: COMMENTS_AUTHORS[getRandomInteger(0, COMMENTS_AUTHORS.length - 1)]
});

const arrayForId = generateArrayRandomNumber(1, 25);

// Обьект галереи
const createObject = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: PHOTO_DESCRIPTION[getRandomInteger(0, PHOTO_DESCRIPTION.length - 1)],
  likes: getRandomInteger(MIN_NUMBER_OF_LIKES, MAX_NUMBER_OF_LIKES),
  comments: Array.from({ length: getRandomInteger(0, 30) }, createComment),

});

const photos = () => Array.from({ length: SIMILAR_GALLERY_OBJECTS }, (_, index) => createObject(arrayForId[index]));

export { photos };
