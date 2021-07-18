
import React,{useState,useEffect} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import Main from "./Main";
import Footer from "./Footer";
import '../index.css';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import ok from "../images/Ok.png"
import fail from "../images/fail.png"
import * as auth from '../utils/auth'
import InfoToolTip from "./InfoToolTip";
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen]=useState(false)
    const  [isAddPlacePopupOpen, setIsAddPlacePopupOpen]=useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen]=useState(false)
    const [isViewPopupOpen,setIsViewPopupOpen]=useState(false)
    const [currentUser,setCurrentUser]=useState({})
    const [loggedIn,setLoggedIn]=useState(false)
    const handleTokenCheck=()=>{
        if (localStorage.getItem('token')){
            const jwt = localStorage.getItem('token');
            // проверяем токен пользователя
            auth.getValidAuthNewUser(jwt)
                .then((res) => {
                    localStorage.setItem('email',res.data.email)
                    handleLogin();
                    history.push("/");
                    // return res
                }).catch(()=>{
                console.log("Ошибка при проверке токена")
            })
        }
        history.push("/sing-in");
    }
    useEffect(()=>{handleTokenCheck()},[])
    useEffect(()=>{
        api.getUserInfo().then(response=>{
                console.log('response:',response)
                setCurrentUser(response)
            }
        ).catch(()=> {
            console.log("Ошибка при получении информации")
        })},[])
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsViewPopupOpen(false)
        setSelectedCard({name: '', link: ''})
        setIsOpenInfoToolTip(false)
        setIsGood(false)
    }
    function handleViewClick() {
        setIsViewPopupOpen(!isViewPopupOpen)
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
    }
    function handleEditProfileClick(){
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
    }
    function handleAddPlaceClick(){
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
    }
    const [selectedCard,setSelectedCard]= useState({name: '', link: ''})
    const handleCardClick= (item) => {
        console.log("privet")
        if (item !== undefined) {
            console.log("poka")
            const formattedCardForOpen={
                link:item.link,
                name:item.name,
            }
            setSelectedCard(formattedCardForOpen)
            handleViewClick()
        }
    }
    function  handleUpdateUser(obj) {
        api.changeUserInfo(obj.name, obj.about).then(response=>{
            console.log('response:',response)
            setCurrentUser(response)
            closeAllPopups()
        }).catch(()=> {
            console.log("Ошибка при смене информации о пользователе")
        })
    }
    function handleUpdateAvatar(obj) {
        api.changeAvatar(obj.avatar).then(
            response=>{
                setCurrentUser(response)
                closeAllPopups()
            }
        ).catch(()=> {
            console.log("Ошибка при смене аватара")
        })
    }
    const [cards,setCards]=useState([])
    const handleRequestCards=()=>{
        api.getInitialCards().then(response=>{
                console.log('response:',response)
                // const formattedCards=response.map(item=>{
                //     return{
                //         _id:item._id,
                //         link:item.link,
                //         name:item.name,
                //         likes:item.likes,
                //         owner:item.owner._id
                //     }
                // })
                setCards(response)
            }
        ).catch(()=> {
            console.log("Ошибка при загрузке карточек")
        })
    }
    useEffect(()=>{
        handleRequestCards()},[])
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            console.log(newCard)
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch(()=> {
            console.log("Ошибка при смене лайка")
        })
    }
    function handleCardDelete(card) {
        api.deleteMyCard(card._id).then((newCard) => {
            console.log(newCard)
            setCards((state) => state.filter((c) => c.owner._id !== currentUser._id));
        }).catch(()=> {
            console.log("Ошибка при удаление карточки")
        })
    }
    function handleAddPlaceSubmit(obj) {
        api.postNewCard(obj.name,obj.link).then((newCard)=>{
            setCards([newCard, ...cards]);
            closeAllPopups()
        }).catch(()=> {
            console.log("Ошибка при добавлении карточки")
        })
    }
    const [emailState,setEmailState]=useState('')
    const [passwordState,setPasswordState]=useState('')
    const history = useHistory();
    const handleChangeEmail=(e) =>{
        setEmailState(
            e.target.value
        );
    }
    const handleChangePassword=(e) =>{
        setPasswordState(
            e.target.value
        );
    }
    const [isOpenInfoToolTip,setIsOpenInfoToolTip]=useState(false)
    const [isGood,setIsGood]=useState(false)
    const handleSubmitReg=(e)=>{
        e.preventDefault();
        // setState({email,password})
        auth.postRegNewUser(emailState,passwordState).then((res)=>{
            if (res.data.email&&res.data._id) {
                setIsGood(true)
                setIsOpenInfoToolTip(true)
                setEmailState('')
                setPasswordState('')
                history.push('/sing-in')
            }
            else {
                setIsGood(false)
                setIsOpenInfoToolTip(true)
            }
        }).catch(()=>{
            console.log("Ошибка при регистрации")
        })
    }
    const handleLogin=()=>{
        setLoggedIn(true)
    }
    const [stateEmailLog,setStateEmailLog]=useState('')
    const [statePasswordLog,setStatePasswordLog]=useState('')
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }
    const handleChangeEmailLog=(e) =>{
        setStateEmailLog(e.target.value)
    }
    const handleChangePasswordLog=(e) =>{
        setStatePasswordLog(e.target.value)
    }
    const handleSubmitAuth=(e)=>{
        e.preventDefault();
        auth.postAuthNewUser(stateEmailLog,statePasswordLog).then((data)=> {
            if (data.token) {
                handleLogin()
                setStateEmailLog('')
                setStatePasswordLog('')
                history.push("/");
            }
        }).catch(()=>{
            console.log("Ошибка при входе")
        })
    }
    const resOk={
        name:"Вы успешно зарегистрированны ",
        link: `${ok}`
    }
    const resFail={
        name:"Что-то пошло не так ",
        link: `${fail}`
    }
    const signOut=()=>{
        localStorage.removeItem('token');
        // history.push('/sing-up');
    }
    return (
        // <BrowserRouter>
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>

                <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
                <AddPlacePopup onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen}/>
                <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
                <ImagePopup card={selectedCard} isOpen={isViewPopupOpen} name="view" onClose={closeAllPopups}/>
                {/*<ImagePopup card={resOk} isOpen={isGood} name="view" onClose={closeAllPopups}/>*/}
                {/*<ImagePopup card={resFail} isOpen={isFail} name="view" onClose={closeAllPopups}/>*/}
                <InfoToolTip image={isGood? resOk : resFail}
                             isOpen={isOpenInfoToolTip}
                             onClose={closeAllPopups}
                style={{background: "rgba(0, 0, 0, 0.6)"}}/>
                <PopupWithForm name="confirm" title="Вы уверенны?" btnText="Да" />
                <Switch>
                    <ProtectedRoute exact path="/"
                                    loggedIn={loggedIn}
                                    onEditAvatar={handleEditAvatarClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditProfile={handleEditProfileClick} onCardClick={handleCardClick}
                                    cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
                                    component={Main}/>
                    <Route path="/sing-up"> //регистрация
                        <Register valueEmail={emailState}
                                  valuePassword={passwordState}
                                  onRegister={handleSubmitReg}
                                  onChangeEmail={handleChangeEmail}
                                  onChangePassword={handleChangePassword}/>
                    </Route>
                    <Route path="/sing-in"> //авторизация
                        <Login onLogin={handleSubmitAuth}
                               valueEmail={stateEmailLog}
                               valuePassword={statePasswordLog}
                               onChangeEmail={handleChangeEmailLog}
                               onChangePassword={handleChangePasswordLog}
                               onClick={signOut}/>
                    </Route>
                </Switch>
                <Footer />
            </CurrentUserContext.Provider>
        </div>
        // </BrowserRouter>
    );
}
// export default withRouter(App);
export default App;
