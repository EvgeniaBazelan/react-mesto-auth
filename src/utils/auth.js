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
        .then(checkStatus)
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
            .then(checkStatus)
            .then((data) => {
                if (data){
                    // localStorage.setItem( JSON.stringify({
                    //     'token': data.token,
                    //     'email': data.email
                    // }));
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
            .then(checkStatus)
            .then(data => data)
    }

