import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './register.css';
import 'node-waves/dist/waves.css';
import Waves from 'node-waves';
import swal from 'sweetalert';
import { register } from '../../Services/authService';

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            password1 : "eye-slash",
            password2 : "eye-slash",
            username : "",
            email : "",
            password : "",
            confirm : "",
            disabled : false,
            load : ""
        }

        this.togglePassword = this.togglePassword.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }


    togglePassword = id => {
        switch(id){
            case 1:
                let elem = document.getElementById('password');
                if(elem.getAttribute('type') === 'password'){
                    elem.setAttribute('type','text');
                    this.setState({ password1 : 'eye' })
                }else{
                    elem.setAttribute('type','password');
                    this.setState({ password1 : 'eye-slash' })
                };break;
            case 2:
                let elem2 = document.getElementById('confirm');
                if(elem2.getAttribute('type') === 'password'){
                    elem2.setAttribute('type','text');
                    this.setState({ password2 : 'eye' })
                }else{
                    elem2.setAttribute('type','password');
                    this.setState({ password2 : 'eye-slash' })
                }; break;
        }
    }

    componentDidMount(){
        Waves.init();
        Waves.attach('.dropdown-item',['waves-light','waves-button']);
        Waves.attach('button',['waves-button'])
    }


    registerUser = () => {
        let { username, email, password, confirm } = this.state;
        let lang = this.props.state.state.signup;
        if(password.length<8 || confirm.length<8){
            swal(lang.title,lang.easypassword,'error')
        }else if(password !== confirm){
            swal(lang.title,lang.notequalpassword,'error')
        }else{
            this.setState({ load : "fa fa-fw fa-circle-notch fa-spin",disabled : true }, () => {
                let data = {
                    username : username,
                    password : password,
                    email : email
                }
                register(data)
                .then( res => {
                    localStorage.setItem('indicator_user', res.token);
                    this.setState({ load : "", username : "", password : "", confirm : "", email : "",disabled : false});
                    let text = document.createElement('h5');
                    text.className = 'text-success text-center mb-3';
                    text.textContent = lang.successText;
                    swal( { title : lang.successTitle, content : text, icon : 'success', timer : '3000', buttons : false, closeOnClickOutside : false } );
                    setTimeout( () => { this.props.history.push('/sign-in') } ,3000)
                })
                .catch( err => {
                    let error = document.createElement('h5');
                    error.className = 'text-danger text-center pb-3';
                    error.textContent = lang.errorText;
                    this.setState({ load : "", username : "", password : "", confirm : "", email : "",disabled : false});
                    swal({ title : lang.title,  content : error , icon : 'error', dangerMode : true})
                })
                });
        }

    }

    render() {

        const lang = this.props.state.state.signup;

        return (
             <div className="container">
                 <div className="mt-4 px-2 px-sm-3 pb-3 pt-5 register">
                     <h4 className="text-center text-success text-center"> {lang.signup} </h4>
                 <form onSubmit={ e => {
                     e.preventDefault();
                     this.registerUser();
                     }}>
                    <div className="row mt-4 px-2 px-md-5 no-gutters">
                        <div className="col-12 col-md-6 my-2 my-md-0 px-3 px-md-3">
                            <div className="form-group">
                                <label htmlFor="username">< h5><span className="text-danger">*</span> {lang.username}</ h5></label>
                                <input id="username" type="text"  className="form-control" type="text" placeholder={ `${lang.uplas} : John Doe` }
                                onChange={ e => this.setState({ username : e.target.value }) } value={this.state.username}
                                required/>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 my-2 my-md-0 px-3 px-md-3">
                            <div className="form-group">
                                <label htmlFor="email"> < h5><span className="text-danger">*</span> {lang.email} </ h5> </label>
                                <input type="email" id="email"   className="form-control"
                                onChange={ e => this.setState({ email : e.target.value }) } value={this.state.email}
                                required/>
                            </div>
                        </div>
                    </div>
                    <div className="row px-2 my-2 px-md-5">
                        <div className="col-12 col-md-6 my-2 my-md-0 px-3 px-md-3">
                                <div className="form-group w-100">
                                    <label htmlFor="password">< h5><span className="text-danger">*</span> {lang.password}</ h5></label>
                                    <div className="input-group">
                                        <input id="password"   type="password" className="form-control" 
                                        onChange={ e => this.setState({ password : e.target.value }) } value={this.state.password}
                                        required/>
                                        <span className="input-group-btn">
                                            <button type="button" className="addon" onClick={ () => this.togglePassword(1) }><i className={"fa fa-fw fa-"+this.state.password1}></i></button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 my-2 my-md-0 col-md-6 px-3 px-md-3">
                                <div className="form-group">
                                    <label htmlFor="confirm"> < h5><span className="text-danger">*</span> {lang.confirm} </ h5> </label>
                                    <div className="input-group">
                                        <input id="confirm" type="password"   className="form-control" 
                                        onChange={ e => this.setState({ confirm : e.target.value }) } value={this.state.confirm}
                                        required/>
                                        <span className="input-group-btn">
                                            <button type="button" className="addon" onClick={ () => this.togglePassword(2) }><i className={"fa fa-fw fa-"+this.state.password2}></i></button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="font-weight-bolder pl-3 mt-2">
                                { lang.login } <Link to='/sign-in' className="text-success"> {lang.signin} </Link>
                            </p>
                    </div>
                    <button type="submit" className="btn-indicator btn d-block mx-auto mt-2 mb-4" disabled={ this.state.disabled }>
                        { lang.signup } <i className={this.state.load}></i>
                    </button>
                 </form>
             </div>
             </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state : state
    }
}

export default connect(mapStateToProps,null)(Register);