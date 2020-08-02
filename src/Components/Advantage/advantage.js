import React, { Component } from 'react';
import { connect } from 'react-redux';
import rocket from '../../Assets/Images/Icons/rocket.svg';
import guarante from '../../Assets/Images/Icons/guarante.svg';
import help from '../../Assets/Images/Icons/help.svg';
import payment from '../../Assets/Images/Icons/payment.svg';
import './advantages.css';

const mapStateToProps = state => {
    return {
        state
    }
}

class Advantage extends Component{
    render () {

        let lang = this.props.state.state.advantages;

        return (
            <div className="container my-5 advantages">
                <div className="row">
                    <div className="col-6 col-sm-6 col-xl-3">
                        <div className="row no-gutters">
                            <div className="col-12 col-sm-3 d-flex align-items-start">
                                <img src={rocket} alt="free shipping" className="d-block mx-auto"/>
                            </div>
                            <div className="col-12 px-0 col-sm-9">
                                <h5> {lang.freeshipTitle} </h5>
                                <p> {lang.freeshipText} </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-xl-3">
                        <div className="row no-gutters">
                            <div className="col-12 col-sm-3 d-flex align-items-start">
                                <img src={guarante} alt="free shipping" className="d-block mx-auto"/>
                            </div>
                            <div className="col-12 px-0 col-sm-9">
                                <h5> {lang.moneyguaranTitle } </h5>
                                <p> {lang.moneyguaranText} </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-xl-3">
                        <div className="row no-gutters">
                            <div className="col-12 col-sm-3 d-flex align-items-start">
                                <img src={help} alt="free shipping" className="d-block mx-auto"/>
                            </div>
                            <div className="col-12 px-0 col-sm-9">
                                <h5> {lang.supportTitle } </h5>
                                <p> {lang.supportText} </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-xl-3">
                        <div className="row no-gutters">
                            <div className="col-12 col-sm-3 d-flex align-items-start">
                                <img src={payment} alt="free shipping" className="d-block mx-auto"/>
                            </div>
                            <div className="col-12 px-0 col-sm-9">
                                <h5> {lang.paymentTitle } </h5>
                                <p> {lang.paymentText} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps,null)(Advantage);