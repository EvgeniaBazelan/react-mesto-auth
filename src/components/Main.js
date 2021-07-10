import React from 'react';
import Card from "./Card";

import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser=React.useContext(CurrentUserContext)



    return(
        <main className="content">
            <section className="profile">
                <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} >
                    <div className="profile__cover" onClick={props.onEditAvatar} />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__profession">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__edit-button" onClick={props.onEditProfile} />
                <button type="button" className="profile__add-button" onClick={props.onAddPlace} />

            </section>
            <div className="photo-grid">
                {props.cards.map((card)=>{
                   return(<Card card={card} onCardClick={props.onCardClick} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} key={card._id} {...card} />)

             })}
                {/*{props.children}*/}
            </div>

        </main>
    )
}
export default Main