import React from 'react';

function InfoToolTip (props){
    return(
        <div className={props.isOpen&&props.image.link!==undefined ? "popup popup_open" : "popup"}>
            <div className="view">
                <button type="button" className="popup__close" name="close_view" onClick={props.onClose}/>
                <img className="view__photo" alt={`${props.image.name}`} src={`${props.image.link}`} />
            </div>
        </div>
    )
}
export default InfoToolTip