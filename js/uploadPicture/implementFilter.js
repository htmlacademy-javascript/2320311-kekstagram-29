const effectSliderElement = document.querySelector('.effect-level__slider');
const effectSliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectValueELement = document.querySelector('.effect-level__value');
const uploadImagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');


noUiSlider.create(effectSliderElement, {
  range: {
    min: FILTERS_OPTIONS.none.min,
    max: FILTERS_OPTIONS.none.max,
  },
  start: FILTERS_OPTIONS.none.start,
  step: FILTERS_OPTIONS.none.step,
  connect: FILTERS_OPTIONS.none.connect,
});


effectsListElement.addEventListener('change', (evt) => {
  const filter = evt.target.value;
  if (filter === 'none') {
    effectSliderElement.classList.add('hidden');
    effectSliderContainerElement.classList.add('hidden');
  } else {
    effectSliderElement.classList.remove('hidden');
    effectSliderContainerElement.classList.remove('hidden');
  }
  const { effect, min, max, start, step, unit } = FILTERS_OPTIONS[filter];
  effectSliderElement.noUiSlider.updateOptions({
    range: {
      start: start,
      step: step,
    });
  effectSliderElement.noUiSlider.on('update', () => {
    effectValueELement.value = effectSliderElement.noUiSlider.get();
    uploadImagePreviewElement.style.filter = `${effect}(${effectValueELement.value}${unit})`;
  });
});

