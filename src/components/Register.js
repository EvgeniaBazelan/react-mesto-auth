

import { Link } from 'react-router-dom';
import Header from "./Header";


function Register (props) {

    return (
        <div className="register">
            <Header>
                <Link to="/sing-in" className="header__text">Войти</Link>
            </Header>


            <form className="form form_black" name="register" onSubmit={props.onSubmit}>
                <h2 className="form__text form__text_black" style={{color: 'white'}}>Регистрация</h2>

                <fieldset className="form__personal-info form__personal-info_black">
                    <input value={props.valueEmail} onChange={props.onChangeEmail}
                           className="form__item form__item_black " id='email' placeholder="email" name="email"
                           type="email" required minLength="2"
                           maxLength="40"/>
                    <span className="form__item-error email-error "/>
                    <input value={props.valuePassword} onChange={props.onChangePassword}
                           className="form__item form__item_black " id='password' placeholder="password" name="password"
                           type="password"
                           required minLength="2" maxLength="200"/>
                    <span className="form__item-error password-error"/>
                </fieldset>
                <button className="form__button" style={{backgroundColor: "white", color: "black"}}
                        type="submit">Зарегистрироваться
                </button>
            </form>
            <div className="register__signup">
                <p>Уже зарегистрированы?</p>
                <Link to="/sing-in" className="">Войти</Link>
            </div>

        </div>


    )
}
export default Register