import axios from 'axios';

export const register = data => {
    return new Promise( (resolve,reject) => {
        axios.post('http://sdev.uz:5000/api/auth/register',{
            name : data.username,
            email : data.email,
            password : data.password
        })
        .then( res => resolve(res.data))
        .catch( err => reject(err))
    })
}

export const loginService = data => {
    return new Promise( (resolve,reject) => {
        axios.post('http://sdev.uz:5000/api/auth/login',data,{
            headers : {
                "Authorization" : `Bearer ${data.token}`
            }
        })
        .then( res => resolve(res.data.token))
        .catch( err => reject(err));
    })
}

export const getResetToken = email => {
    return new Promise( (resolve,reject) => {
        axios.post('http://sdev.uz:5000/api/auth/forgotpassword',{
            email : email
        })
        .then( res => resolve(res.data))
        .catch( err => reject(err));
    })
}

export const updatePassword = (passwrod,token) => {
    return new Promise( (resolve,reject) => {
        axios.put('http://sdev.uz:5000/api/auth/resetpassword', {
            password : passwrod
        },{
            headers : {
                resettoken : token
            }
        })
        .then( res => resolve(res.data))
        .catch( err => reject(err));
    } )
}