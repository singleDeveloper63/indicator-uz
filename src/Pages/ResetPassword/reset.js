import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import './reset.css';
import { updatePassword } from '../../Services/authService';

class ResetPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            password : "",
            confirm : "",
            load : false,
            visible : false,
            confirmvisible : false,
            disabled : false
        }
        this.toggle = this.toggle.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount(){
        console.log(this.props.match.params.token)
    }

    toggle  = id => {
        let elem = document.getElementById(id);
        if(id === 'password'){
            if(elem.getAttribute('type') === 'password'){
                elem.setAttribute('type','text');
                this.setState({ visible : true })
            }else{
                elem.setAttribute('type','password');
                this.setState({ visible : false })
            }
        }else{
            if(elem.getAttribute('type') === 'password'){
                elem.setAttribute('type','text');
                this.setState({ confirmvisible : true })
            }else{
                elem.setAttribute('type','password');
                this.setState({ confirmvisible : false })
            }
        }
    }

    update = (e) => {
        e.preventDefault();
        this.setState({ load : true, disabled : true });
        let lang = this.props.state.state.forgotpassword;
        let err = document.createElement('h5');
        err.className = 'text-danger text-center';
        err.textContent = lang.errorText;

        let errpass = document.createElement('h5');
        errpass.className = 'text-danger text-center';
        errpass.textContent = lang.notequalpassword;
        
        let erreasy = document.createElement('h5');
        erreasy.className = 'text-danger text-center';
        erreasy.textContent = lang.easypassword;

        let success = document.createElement('h5');
        success.className = 'text-success text-center';
        success.textContent = lang.success;

        let token = this.props.match.params.token;

        let { password,confirm } = this.state;
        if(password.length<8){
            swal({
                title : lang.error,
                content : erreasy,
                icon : 'error'
            })
        }else if(password !== confirm){
            swal({
                title : lang.error,
                content : errpass,
                icon : 'error'
            })
        }else{
            updatePassword(password,token)
            .then( res => {
                this.setState({ load : false, password : "", confirm : "" ,disabled : false})
                swal({
                    content : success,
                    icon : 'success',
                    timer : 2000
                });
                setTimeout( () => {
                    this.props.history.push('/sign-in')
                },2000);
            })
            .catch( () => {
                this.setState({ load : false, password : "", confirm : "" ,disabled : false})
                swal({
                    title : lang.error,
                    content : err,
                    icon : 'error',
                    dangerMode : true
                })
            })
        }
    }

    render () {
        const lang = this.props.state.state.forgotpassword;

        return (
            <div className="d-flex align-items-center reset justify-content-center mt-5">
                <div className="card p-3 p-md-5 shadow-lg">
                    <form onSubmit={ e => this.update(e)}>
                        <h4 className="text-center mb-4"> {lang.caption} </h4>
                        <div className="form-group my-2">
                            <label htmlFor="password"> <h5> {lang.newpassword} </h5> </label>
                            <div className="input-group">
                                <input value={this.state.password} id="password" type="password" className="form-control"
                                onChange={ e => this.setState({ password : e.target.value }) }
                                required/>
                                <span className="input-group-btn">
                                    <button type='button' onClick={ () => this.toggle('password') } className="btn"> <i className={ this.state.visible ? "fa fa-fw fa-eye" : "fa fa-fw fa-eye-slash" }></i> </button>
                                </span>
                            </div>
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="confirm"> <h5> {lang.retype} </h5> </label>
                            <div className="input-group">
                                <input value={this.state.confirm} id="confirm" type="password" className="form-control"
                                onChange={ e => this.setState({ confirm : e.target.value }) }
                                required/>
                                <span className="input-group-btn">
                                    <button type='button' onClick={ () => this.toggle('confirm')}  className="btn"> <i className={ this.state.confirmvisible ? "fa fa-fw fa-eye" : "fa fa-fw fa-eye-slash" }></i> </button>
                                </span>
                            </div>
                        </div>
                        <button disabled={this.state.disabled} type='submit' className="btn btn-indicator mt-5 d-block mx-auto">
                            {lang.reset} <i className={ this.state.load ? 'fa fa-fw fa-circle-notch fa-spin' : "" }></i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        state : state    }
}

export default connect(mapStateToProps,null)(ResetPage)