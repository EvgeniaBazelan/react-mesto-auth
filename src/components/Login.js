import React, {useState} from 'react';

import { Link } from 'react-router-dom';
import Header from "./Header";


function Login () {
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
        <div>
            <Header>
                <Link to="/sing-up" className="">Войти</Link>
            </Header>


            <form className="form" name="register" onSubmit={handleSubmit} >
                <h2 className="form__text">Вход</h2>

                <fieldset className="form__personal-info">
                    <input value={state.email} onChange={handleChange} className="form__item " id='email' placeholder="email" name="email" type="email" required minLength="2"
                           maxLength="40"/>
                    <span className="form__item-error email-error "/>
                    <input value={state.password} onChange={handleChange} className="form__item " id='password' placeholder="password" name="password" type="password"
                           required minLength="2" maxLength="200"/>
                    <span className="form__item-error password-error"/>
                </fieldset>
                <button className="form__button" type="submit">Войти</button>
            </form>
        </div>


    )
}
export default Login