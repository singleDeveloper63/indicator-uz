import React, { Component } from 'react';
import { connect } from 'react-redux';
import './login.css';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import 'node-waves/dist/waves.css';
import Waves from 'node-waves';
import { loginService , getResetToken} from '../../Services/authService';
import axios from 'axios';
class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : "",
            load : "",
            visibility : "fa fa-fw fa-eye-slash",
            disabled : false,
            resetmail : ""
        }
        this.login = this.login.bind(this);
        this.resetRequest = this.resetRequest.bind(this);
    }

    componentDidMount(){
        Waves.attach('button',['waves-button']);
        axios.put('http://sdev.uz:5000/api/auth/resetpassword',{
           password : "newpassword123"},{
               headers : {
                   resettoken : '124d65cec6cbd5c67917b66c00e6fc6c2e518784'
               }
           })
       .then( res => console.log(res.data))
       .catch( err => console.error(err));
    }

    login = () => {
        let { email, password } = this.state;
        let lang = this.props.state.state.signin;
        if(password.length<8){
            let easy = document.createElement('h4');
            easy.className = 'text-danger text-center';
            easy.textContent = lang.easypassword;
            swal({
                title : lang.errorTitle,
                content : easy,
                icon : 'warning',
                dangerMode : true
            })
        }else if(!localStorage.getItem('indicator_user')){
            let noreg = document.createElement('h5');
            noreg.className = 'text-danger text-center';
            noreg.textContent = lang.noregister;
            swal({
                title : lang.errorTitle,
                content : noreg,
                icon : 'error',
                dangerMode : true
            })
        }else{
            let token = localStorage.getItem('indicator_user');
            let data = {
                email : email,
                password : password,
                token : token
            }
            this.setState({ load : "fa fa-fw fa-circle-notch fa-spin", email : "", password : "", disabled : true});
            loginService(data)
            .then( token => {
                let success = document.createElement('h5');
                success.className = 'text-success text-center';
                success.textContent = lang.success;
                localStorage.setItem('token',token);
                swal({
                    content : success,
                    icon : 'success',
                    timer : '2000'
                })
                setTimeout( () => {
                    this.props.history.push('/')
                },2000)
            })
            .catch( err => {
                console.error(err)
                this.setState({ email : "", password : "", load : "", disabled : false } );
                let error = document.createElement('h5');
                error.className = 'text-danger text-center';
                error.textContent = lang.loginError;
                swal({
                    content : error,
                    icon : 'error',
                    dangerMode : true
                })
            })
        }
    }

    resetRequest(){
        this.setState({ load : "fa fa-fw fa-circle-notch fa-spin" });
        let lang = this.props.state.state.signin;
        let err = document.createElement('h5');
        err.className = 'text-danger text-center';
        err.textContent = lang.notfound;
        let succ = document.createElement('h5');
        succ.className = 'text-success text-center';
        succ.textContent = lang.mailSended;
        getResetToken(this.state.resetmail)
        .then( () => {
            this.setState({ load : "", resetmail : "" });
            swal({
                content : succ,
                icon : 'success'
            })
        })
        .catch( () => {
            this.setState({ load : "", resetmail : "" });
            swal({
                content : err,
                icon : 'error'
            })
        })

    }

    render(){
        let lang = this.props.state.state.signin;

        return(
            <div className="container login">
                <div className="mt-2 card px-2 py-4 px-sm-5 d-block mx-auto">
                    <h4 className="text-center"> {lang.login} </h4>
                    <form onSubmit={ e => {
                        e.preventDefault();
                        this.login();
                        }} className="mt-3">
                        <div className="form-group">
                            <label htmlFor="email"> <h5> {lang.email} </h5> </label>
                            <input value={this.state.email} type="email" id="email" onChange={ e => this.setState({ email : e.target.value })} required className="form-control" placeholder="e.x. johndoe@example.com"/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="password"> <h5> {lang.password} </h5> </label>
                            <div className="input-group">
                                <input value={this.state.password} type="password" required className="form-control" id="password" onChange={ e => this.setState({ password : e.target.value })} />
                                <span className="input-group-btn">
                                    <button type='button' className="btn" onClick={ () => {
                                        let pass = document.getElementById('password');
                                        if(pass.getAttribute('type') === 'password'){
                                            pass.setAttribute('type','text');
                                            this.setState({ visibility : 'fa fa-fw fa-eye' })
                                        }else{
                                            pass.setAttribute('type','password');
                                            this.setState({ visibility : 'fa fa-fw fa-eye-slash' })}
                                    }}> <i className={this.state.visibility}></i> </button>
                                </span>
                            </div>
                        </div>
                        <p className="mt-3">
                            {lang.didntaccount} <Link to='/sign-up'> {lang.signup} </Link>
                            <span className="float-right text-success" style={{ cursor : 'pointer', fontWeight : '900' }} data-toggle="modal" data-target="#resetModal"> {lang.forgot} </span>
                        </p>
                        <button disabled={this.state.disabled} type="submit" className="btn btn-indicator d-block mx-auto mt-5"> {lang.login}  <i className={this.state.load}></i> </button>
                    </form>
                </div>
                <div className="modal fade" id="resetModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-indicator">
                                <h5 className="font-weight-bolder text-white"> {lang.resetTitle} </h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ e => { e.preventDefault(); this.resetRequest() } }>
                                    <div className="form-group">
                                        <label htmlFor="resetmail"> <h5> {lang.email} </h5> </label>
                                        <input required value={this.state.resetmail} type="email" className="form-control" placeholder="e.x. johndoe@gmail.com" id="resetmail" onChange={ e => this.setState({ resetmail : e.target.value }) }/>
                                    </div>
                                    <div className="mt-3 d-flex justify-content-end">
                                        <button type="button" className="btn font-weight-bolder" data-dismiss="modal"> {lang.cancel} </button>
                                        <button type="submit" className="btn bg-indicator mx-2 font-weight-bolder"> { lang.reset } <i className={this.state.load}></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        state : state
    }
}

export default connect(mapStateToProps,null)(Login);