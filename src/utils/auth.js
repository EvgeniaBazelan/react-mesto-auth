export const BASE_URL = 'https://auth.nomoreparties.co';
function checkStatus(res) {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

  export const postRegNewUser=(email,password)=>{
    return fetch(`${BASE_URL}/signup`, {
              method: 'POST',
        // mode:"no-cors",
             headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                      email: email,
                    password: password
        })})
        .then((response) => {
        return checkStatus(response);
    })

        // .then((response) => {
        //     return response.json();})
        .then((res) => {
            return res
            })

  }
    export const postAuthNewUser=(email,password)=>{
        return fetch(`${BASE_URL}/signin`, {
            method: 'POST',
            headers:  {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })})
            .then((response => response.json()))
            .then((data) => {
                if (data){
                    localStorage.setItem('token', data.token);

                    return data;
                }
            })

    };

    export const getValidAuthNewUser=(jwt)=>{
        return fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            }
          })
            .then(res => res.json())
            .then(data => data)
    }

