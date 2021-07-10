import React from 'react';

function ImagePopup(props) {

    return(
        <div className={props.isOpen&&props.card.link!==undefined ? `popup popup_${props.name} popup_open` : `popup popup_${props.name}`}>
            <div className={`${props.name}`}>
                <button type="button" className="popup__close" name="close_view" onClick={props.onClose}/>
                <img className="view__photo" alt={`${props.card.name}`} src={`${props.card.link}`} />
                <p className="view__text">{props.card.name} </p>
            </div>
        </div>
    )
}
export default ImagePopup