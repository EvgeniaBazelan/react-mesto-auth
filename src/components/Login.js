

import { Link, withRouter } from 'react-router-dom';
import Header from "./Header";



function Login (props) {
    // const [stateEmailLog,setStateEmailLog]=useState('')
    // const [statePasswordLog,setStatePasswordLog]=useState('')
    // //     this.handleChange = this.handleChange.bind(this);
    // //     this.handleSubmit = this.handleSubmit.bind(this);
    // // }
    //
    // function handleChangeE(e) {
    //     setStateEmailLog(e.target.value)
    // }
    // function handleChangeP(e) {
    //     setStatePasswordLog(e.target.value)
    // }
    // function handleSubmit(){
    //    props.onLogin({
    //        email:stateEmailLog,
    //        password:statePasswordLog
    //    })
    //     // здесь обработчик регистрации
    // }

    return(
        <div className="register">
            <Header>
                <Link to="/sing-up" className="header__text">Зарегистрироваться</Link>
            </Header>


            <form className="form form_black" name="login" onSubmit={props.onLogin} >
                <h2 className="form__text form__text_black" style={{color:'white'}}>Вход</h2>

                <fieldset className="form__personal-info form__personal-info_black">
                    <input value={props.valueEmail} onChange={props.onChangeEmail} className="form__item " id='email' placeholder="email" name="email" type="email" required minLength="2"
                           maxLength="40"/>
                    <span className="form__item-error email-error "/>
                    <input value={props.valuePassword} onChange={props.onChangePassword} className="form__item " id='password' placeholder="password" name="password" type="password"
                           required minLength="2" maxLength="200"/>
                    <span className="form__item-error password-error"/>
                </fieldset>
                <button className="form__button" style={{backgroundColor:"white",color:"black"}} type="submit">Войти</button>

            </form>
        </div>


    )
}
export default withRouter(Login)