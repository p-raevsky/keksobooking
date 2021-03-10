import {avatarFile, imageFile} from './form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const IMAGE_HEIGHT = 230;
const AVATAR_SRC = 'img/muffin-grey.svg';
const AVATAR_STYLE_OBJ_FIT = 'cover';

const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoPreview = document.querySelector('.ad-form__photo');

const uploadPicture = (inputFile, preview) => {
  const file = inputFile.files[0];

  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((ending) => fileName.endsWith(ending));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const resetPhotoPreview = () => {
  photoPreview.innerHTML = '';
  avatarPreview.src = AVATAR_SRC;

  imageFile.addEventListener('change', onImageFileChange);
};

const onAvatarFileChange = () => {
  avatarPreview.style.objectFit = AVATAR_STYLE_OBJ_FIT;

  uploadPicture(avatarFile, avatarPreview);
};

const onImageFileChange = () => {
  const image = document.createElement('img');
  image.height = IMAGE_HEIGHT;

  photoPreview.appendChild(image);
  uploadPicture(imageFile, image);

  imageFile.removeEventListener('change', onImageFileChange);
};

avatarFile.addEventListener('change', onAvatarFileChange);
imageFile.addEventListener('change', onImageFileChange);

export {resetPhotoPreview};
