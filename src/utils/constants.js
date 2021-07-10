export const cardListSelector = '.photo-grid';
export const popupView = document.querySelector('.popup_view');

export const view = popupView.querySelector('.view__photo');
export const text = popupView.querySelector('.view__text');
export const viewcloseBtn = popupView.querySelector('button[name=close_view]');
export const form = document.querySelector('form[name="form"]');
export const saveBtn = form.querySelector('.form__button');
export const editcloseBtn = form.querySelector('.popup__close');
export const changeName = form.querySelector('input[name=name]');
export const changeProfession = form.querySelector('input[name=profession]');

export const addFormElement = document.querySelector('form[name=add-cards]');
export const changeFormTitle = addFormElement.querySelector('input[name="title"]');
export const changeFormLink = addFormElement.querySelector('input[name=link]');
export const addcloseBtn = addFormElement.querySelector('button[name=close]');

export const profile = document.querySelector('.profile');
export const editBtn = profile.querySelector('.profile__edit-button');
export const addBtn = profile.querySelector('.profile__add-button');
export const profName = profile.querySelector('.profile__name');
export const profession = profile.querySelector('.profile__profession');

export const popupProfileForValid = document.querySelector('.popup_edit-profile');
export const popupAddForValid = document.querySelector('.popup_add-place');
export const popupAvatarForValid = document.querySelector('.popup_update')
export const popupAdd = document.querySelector('.popup_add-place');
export const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
export const settingsObj = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__item-error_visible'

}
export const apiOptions = {

    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
    headers: {
        'Authorization': '273efaae-b1d3-42d9-8ff4-bdc5ec6ddb09',
        'Content-Type': 'application/json'
    }

}
export const changeAvatar = document.querySelector(".profile__cover")
