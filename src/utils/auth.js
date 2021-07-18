export const BASE_URL = 'https://auth.nomoreparties.co';


  export const postRegNewUser=(email,password)=>{
    return fetch(`${BASE_URL}/signup`, {
              method: 'POST',
        // mode:"no-cors",
             headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                      email: email,
                    password: password
        })})
    //     .then((response) => {
    //     return checkStatus(response);
    // })

        .then((response) => {
            return response.json();})
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
            .catch(err => console.log(err))
    };
        //     .then((response) => {
        //
        //     try {
        //         if (response.status === 200){
        //             return response.json();
        //         }
        //     } catch(e){
        //         return (e)
        //     }
        // })
        //     .then((data) => {
        //
        //         // сохраняем токен
        //         localStorage.setItem('token', data.token);
        //
        //         return data;
        //     })
    //         .then((response) => {
    //         return response.json();
    //     }).then((res) => {
    //         if(res.token){
    //             localStorage.setItem('token', res.token)
    //             return res
    //         }
    //         .catch((err) => console.log(err));
    // }
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
        //     .then((response) => {
        //     return response.json();
        // })
        //     .then((res) => {return res;}).catch((err) => console.log(err));
    }

