import React from 'react';

function PopupWithForm(props) {

 return(
     <div className={props.isOpen ? `popup popup_${props.name} popup_open` : `popup popup_${props.name}`}>
         <form className="form" name={`${props.name}`} onSubmit={props.onSubmit} >
             <button type="button" className="popup__close" onClick={props.onClose}/>
             <h2 className="form__text">{props.title}</h2>
             {props.children}
             <button className="form__button" type="submit">{props.btnText}</button>

         </form>
     </div>
 )
}
export default PopupWithForm