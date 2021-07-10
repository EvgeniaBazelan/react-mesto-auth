import React from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup(props) {
    const linkRef = React.useRef('');
    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar:linkRef.current.value,
        });
        console.log(linkRef)
    }
    return(

        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen = {props.isOpen} name="update" title="Обновить аватар" btnText="Сохранить">
            <fieldset className="form__personal-info">

                <input  ref={linkRef}  className="form__item " id='linkAvatar' placeholder="Ссылка на аватар" name="link" type="url"
                       required/>
                <span className="form__item-error linkAvatar-error"/>
            </fieldset>
        </PopupWithForm>
    )
}
export default EditAvatarPopup