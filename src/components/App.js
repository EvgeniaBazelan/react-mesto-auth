import React,{useState,useEffect,useStateIfMounted} from 'react';
import {BrowserRouter, Route, Switch, Redirect, useHistory, Link} from 'react-router-dom';
import Header from './Header'
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


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen]=useState(false)
    const  [isAddPlacePopupOpen, setIsAddPlacePopupOpen]=useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen]=useState(false)
    const [isViewPopupOpen,setIsViewPopupOpen]=useState(false)
    const [currentUser,setCurrentUser]=useState({})
    const [loggedIn,setLoggedIn]=useState(false)

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
        setIsFail(false)
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
    const [emailState,setEmailState]=useStateIfMounted('')
    const [passwordState,setPasswordState]=useStateIfMounted('')
    const history=useHistory()
    function handleChangeEmail(e) {

        // const {name, value} = e.target;

        setEmailState(
            e.target.value
        );
    }
    function handleChangePassword(e) {

        // const {name, value} = e.target;

        setPasswordState(
            e.target.value
        );
    }
    const [isFail,setIsFail]=useState(false)
    const [isGood,setIsGood]=useState(false)
    const handleSubmitReg=(e)=>{
        e.preventDefault();
        // setState({email,password})
        auth.postRegNewUser(emailState,passwordState).then((res)=>{
            if(res.statusCode !== 400){
                setIsGood(true)
                history.push('/sing-in')
            }
            // setIsGood(true)
            // history.push('/sing-in')
            // return res

        }).catch(()=>{
            setIsFail(true)
            console.log("Ошибка при регистрации")
        })
        // auth.postRegNewUser(emailState,passwordState).then((res)=>{
        //     console.log(res)
        //     setIsGood(true)},()=>{
        //     history.push('/sing-in')
        // }).catch(()=>{
        //     setIsFail(true)
        //     console.log("Ошибка при регистрации")
        // })

        // здесь обработчик регистрации
    }
    const handleLogin=()=>{
        setLoggedIn(true)
    }
    const handleSubmitAuth=(obj,e)=>{
        // e.preventDefault();
        if (obj.email!==emailState || obj.password!==passwordState){
            return;
        }
        auth.postAuthNewUser(emailState,passwordState).then((res)=> {
            if (res.token) {
                handleLogin()
                history.push("/profile");
            }
        }).catch(()=>{
            console.log("Ошибка при входе")
        })

        // здесь обработчик регистрации
    }
     const resOk={
        name:" ",
        link:`${ok}`
       }
    const resFail={
        name:" ",
        link:`${fail}`
    }
    const handleTokenCheck=()=>{
        if (localStorage.getItem('token')){
            const jwt = localStorage.getItem('jwt');
            // проверяем токен пользователя
            auth.getValidAuthNewUser(jwt).then((res) => {

                handleLogin();
                        history.push("/profile");
                    });
        }}
    // useEffect(()=>{
    //     handleTokenCheck()},[])
    const signOut=()=>{
        localStorage.removeItem('token');
        // history.push('/sing-up');
    }



    return (
        <BrowserRouter>
      <div className="page">
          <CurrentUserContext.Provider value={currentUser}>
      <Header >

              <p className="header__text">{`${emailState}`}</p>
              <Link to="/sing-up" onClick={signOut} className="header__text"> выйти</Link>

          {/*<Link to="/sing-in" className="header__text">{`${emailState}выйти`}</Link>*/}
      </Header>



              <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
              <AddPlacePopup onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen}/>
              <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
              <ImagePopup card={selectedCard} isOpen={isViewPopupOpen} name="view" onClose={closeAllPopups}/>
              <ImagePopup card={resOk} isOpen={isGood} name="view" onClose={closeAllPopups}/>
              <ImagePopup card={resFail} isOpen={isFail} name="view" onClose={closeAllPopups}/>

              <PopupWithForm name="confirm" title="Вы уверенны?" btnText="Да" />
              <Switch>
                  <Route path="/sing-up"> //регистрация
                      <Register valueEmail={emailState} valuePassword={passwordState} onSubmit={handleSubmitReg} onChangeEmail={handleChangeEmail} onChangePassword={handleChangePassword}/>
                  </Route>
                  <Route path="/sing-in"> //авторизация
                      <Login onLogin={handleSubmitAuth}/>
                  </Route>
                  <ProtectedRoute exact
                                  path="/"
                                  loggedIn={loggedIn}
                                  component={Main}
                                  onEditAvatar={handleEditAvatarClick}
                                  onAddPlace={handleAddPlaceClick}
                                  onEditProfile={handleEditProfileClick} onCardClick={handleCardClick}
                                  cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
                  {/*<Route exact path="/">*/}
                  {/*    {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/sing-in" />}//перенаправление в зависимости от статуса авторизации*/}
                  {/*</Route>*/}
              </Switch>

      <Footer />

          </CurrentUserContext.Provider>
      </div>
        </BrowserRouter>

  );
}

export default App;
