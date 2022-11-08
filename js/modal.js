import { renderDomElement, removeDomElement } from './utils.js';

const successModal = document.getElementById('success').content.children[0];
const errorModal = document.getElementById('error').content.children[0];

let selectedModal;

function modalClickHandler(evt) {
  evt.preventDefault();
  closeModal(evt.currentTarget);
}

function escKeydownHandler(evt) {
  const ESC_KEY_CODE = 27;

  if (evt.keyCode === ESC_KEY_CODE) {
    evt.preventDefault();
    closeModal();
  }
}

function closeModal() {
  document.removeEventListener('keydown', escKeydownHandler);
  selectedModal.removeEventListener('click', modalClickHandler);

  removeDomElement(selectedModal);
}

export function openModal(type) {
  switch (type) {
    case 'success':
      selectedModal = successModal;
      break;
    case 'error':
      selectedModal = errorModal;
      break;
    default:
      throw new Error(
        'Invalid modal window type. Valid types: "success" or "error".'
      );
  }

  renderDomElement(selectedModal, document.body);

  selectedModal.addEventListener('click', modalClickHandler);
  document.addEventListener('keydown', escKeydownHandler);
}
