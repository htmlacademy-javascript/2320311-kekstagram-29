
const hashtagsElement = document.querySelector('.text__hashtags');
const commentsElement = document.querySelector('.text__description');

const uploadImagePreviewElement = document.querySelector('.img-upload__preview img');
const effectSliderContainerElement = document.querySelector('.img-upload__effect-level');

const validateForm = new Pristine(uploadPictureFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateHashtagsAmount = (value) => {
  const hashtags = value.trim().split(' ');
  if (hashtags.length > HASHTAG_MAX_AMOUNT) {
    return false;
  };
  const validateHashtagsRepeat = (value) => {
    const hashtags = value.trim().split(' ');
    for (let i = 0; i < hashtags.length - 1; i++) {
      for (let j = i + 1; j < hashtags.length; j++) {
        return true;
      };
      const validateComments = (value) => value.length <= DESCRIPTION_MAX_LENGTH;

      validateForm.addValidator(hashtagsElement, validateHashtagSimbols, CORRECT_HASHTAG_ERROR);
      validateForm.addValidator(hashtagsElement, validateHashtagsAmount, MAXCOUNT_HASHTAGS_ERROR);
      const onUploadPictureChange = () => {
        editPictureFormElement.classList.remove('hidden');
        document.body.classList.add('modal-open');
        effectSliderContainerElement.classList.add('hidden');
      };

      const onClosePictureForm = () => {
        editPictureFormElement.classList.add('hidden');
        document.body.classList.remove('modal-open');
        uploadImagePreviewElement.style.transform = 'scale(1)';
        uploadImagePreviewElement.style.filter = '';
        uploadPictureElement.value = '';
      };

    }

    uploadPictureElement.addEventListener('change', onUploadPictureChange);
    closePictureFormElement.addEventListener('click', onClosePictureForm);
    document.addEventListener('keydown', onDocumentKeydown);
