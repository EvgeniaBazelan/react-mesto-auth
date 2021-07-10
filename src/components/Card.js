import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
// const Card = React.memo((props) =>
function Card(props){
    const currentUser=React.useContext(CurrentUserContext)
    const isOwn = props.owner._id === currentUser._id;
    const isLiked = props.likes.some(i => i._id  === currentUser._id);
    // const cardLikeButtonClassName = ` ${isLiked ? 'photo-grid__like photo-grid__like_active': 'photo-grid__like'}`



    console.log(Card)
    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleLikeClick() {

        props.onCardLike(props.card)
    }
    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return(

            <div className="photo-grid__item">

                <button type="button" className="photo-grid__item_delete" onClick={handleDeleteClick} style={isOwn ?{visibility:'visible'}:{visibility:'hidden'}}/>
                <img className="photo-grid__view" alt={`${props.name}`} src={`${props.link} `} onClick={handleClick}/>
                <p className="photo-grid__text">{props.name}</p>
                <button type="button" className={`${isLiked ? 'photo-grid__like photo-grid__like_active': 'photo-grid__like'}`} onClick={handleLikeClick}/>


                <p className="photo-grid__counter">{props.likes.length}</p>
            </div>

    )
}
export default Card