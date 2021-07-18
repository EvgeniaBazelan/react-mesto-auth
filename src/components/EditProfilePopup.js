import React, {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
function EditProfilePopup(props) {
    const [name,setName]=useState('')
    const [description,setDescription]=useState('')
    const currentUser = React.useContext(CurrentUserContext);
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);
    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name:name,
            about: description,
        });
    }
    return(
        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name="edit-profile" title="Редактировать профиль" btnText="Сохранить">
            <fieldset className="form__personal-info">
                <input value={name|| ''} onChange={handleChangeName} className="form__item " id='name' placeholder="Name" name="name" type="text" required minLength="2"
                       maxLength="40"/>
                <span className="form__item-error name-error "/>
                <input value={description|| ''} onChange={handleChangeDescription} className="form__item " id='profession' placeholder="Profession" name="profession" type="text"
                       required minLength="2" maxLength="200"/>
                <span className="form__item-error profession-error"/>
            </fieldset>
        </PopupWithForm>
    )
}
export default EditProfilePopup