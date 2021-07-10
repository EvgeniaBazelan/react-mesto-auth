import React, {useState} from 'react';

import { Link } from 'react-router-dom';
import Header from "./Header";


function Register () {
    const [state, setState]= useState({
        email: '',
        password: ''
    })

    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }

    function handleChange(e) {
        const {name, value} = e.target;
        setState({
            [name]: value
        });
    }
   function handleSubmit(e){
        e.preventDefault();
        // здесь обработчик регистрации
    }
    return(
        <div className="register" >
            <Header>
            <Link  to="/sing-up" className="header__text">Войти</Link>
            </Header>



    <form className="form form_black" name="register"  onSubmit={handleSubmit} >
        <h2 className="form__text form__text_black" style={{color:'white'}}>Регистрация</h2>

        <fieldset className="form__personal-info form__personal-info_black">
            <input value={state.email}  onChange={handleChange} className="form__item form__item_black " id='email' placeholder="email" name="email" type="email" required minLength="2"
                   maxLength="40"/>
            <span className="form__item-error email-error "/>
            <input value={state.password}  onChange={handleChange} className="form__item form__item_black " id='password' placeholder="password" name="password" type="password"
                   required minLength="2" maxLength="200"/>
            <span className="form__item-error password-error"/>
        </fieldset>
        <button className="form__button"  type="submit">Зарегистрироваться</button>
    </form>
            <div className="register__signup">
                <p >Ещё не зарегистрированы?</p>
                <Link to="/register" className="signup__link">Зарегистрироваться</Link>
            </div>

            </div>


    )
}
export default Register