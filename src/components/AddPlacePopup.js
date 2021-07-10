import React from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup(props) {
    const textRef = React.useRef('');
    const linkRef = React.useRef('');
    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({

            name: textRef.current.value,
            link: linkRef.current.value,
        });
    }
    return(
        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name="add-place" title="Новое место" btnText="Создать">
            <fieldset className="form__personal-info">
                <input ref={textRef} className="form__item " id='title' placeholder="Название" name="title" type="text" required
                       minLength="2" maxLength="30"/>
                <span className="form__item-error title-error"/>
                <input ref={linkRef}  className="form__item " id='link' placeholder="Ссылка на картинку" name="link" type="url" required/>
                <span className="form__item-error link-error"/>
            </fieldset>
        </PopupWithForm>
    )
}
export default AddPlacePopup