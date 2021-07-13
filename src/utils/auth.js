export const BASE_URL = 'https://auth.nomoreparties.co';
class Auth {
 constructor(BASE_URL) {
    this._baseUrl = BASE_URL
}
    postRegNewUser(email,password){
    return fetch(`${this._baseUrl}/signup`, {
              method: 'POST',
             headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                      email: email,
                    password: password
        })})
        .then((response) => {
                                 return response.json();
                                        }).then((res) => {
                                                  return res
                                                      console.log(res);}).catch((err) => console.log(err));
 }
    postAuthNewUser(email,password){
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })})
            .then((response) => {
            return response.json();
        }).then((res) => {
            if(res.token){
                localStorage.setItem('token', res.token)
                return res
                console.log(res.token)
                console.log(localStorage)
            }
            }).catch((err) => console.log(err));
    }
    getValidAuthNewUser(){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify( {
                "password": "dsfsdfsdfsdf",
                "email": "email@email.ru"
            })}).then((response) => {
            return response.json();
        }).then((res) => {
            return res;}).catch((err) => console.log(err));
    }
};
const auth=new Auth(BASE_URL)
export default auth