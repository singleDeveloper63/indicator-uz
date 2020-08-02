import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { ChangeLanguage } from '../../Redux/actions/LanguageAction';
import './Header.css';
import 'node-waves/dist/waves.css';
import Waves from 'node-waves';
import { Link } from 'react-router-dom';
import $ from 'jquery';
const icons = {
    ru : require('../../Assets/Images/Icons/ru.svg'),
    uz : require('../../Assets/Images/Icons/uz.svg'),
    icol : require('../../Assets/Images/Logos/indicolor.png'),
    iwhite : require('../../Assets/Images/Logos/indiwhite.png'),
    like : require('../../Assets/Images/Icons/Heart.svg'),
    cart : require('../../Assets/Images/Icons/Cart.svg')
}

class Header extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        Waves.init();
        Waves.attach('button',['waves-button','waves-effect','waves-ripple']);
        Waves.attach('.nav-link',['waves-light']);
        Waves.attach('.dropdown-item',['waves-light','waves-button']);
        Waves.attach('.items>div:not(.lang)',['waves-light']);
        
        $(document).ready( () => {
            let btt = document.getElementById('backToTop');
            if(window.pageYOffset<40){
                btt.style.bottom = '-200px';
                btt.style.opacity = '0';
            }
            $(window).scroll( () => {
                if(window.pageYOffset < 30){
                    btt.style.bottom = '-200px';
                    btt.style.opacity = '0';
                    
                }else{
                    btt.style.bottom = '30px';
                    btt.style.opacity = '1';
                }
            })
        })
    }
    render() {
        let lang = this.props.state.state;
        return (
             <div className="header">
                 <div className="d-flex border-bottom justify-content-center justify-content-md-between flex-nowrap w-100 navbar-header" style={{height : "40px"}}>
                    <div className="left items right d-flex justify-content-start align-items-center">
                        <div className="d-none d-md-inline-block"><i className="fa fa-fw fa-phone fa-flip-horizontal"></i> +(998) 93 772-07-49 </div>
                        <div className="d-none d-md-inline-block"><i className="fa fa-fw fa-envelope"></i> info@indicator.com</div>
                    </div>
                    <div className="right d-flex justify-content-start align-items-center items">
                        <div>
                            <a href="#" className="text-white"><i className="fa fa-fw fa-stream"></i> <span className="d-none d-lg-inline">{lang.navbar.blog}</span> </a>
                        </div>
                        <div>
                            <a href="#" className="text-white"><i className="fa fa-fw fa-shield-alt"></i> <span className="d-none d-lg-inline">{lang.navbar.guarante}</span> </a>
                        </div>
                        <div>
                            <a href="#" className="text-white"><i className="fa fa-fw fa-wallet"></i> <span className="d-none d-lg-inline">{lang.navbar.payment}</span> </a>
                        </div>
                        <div>
                            <a href="#" className="text-white"><i className="fa fa-fw fa-truck"></i> <span className="d-none d-lg-inline">{lang.navbar.deliv}</span> </a>
                        </div>
                        <div className="lang">
                            <div className="dropdown d-inline-block">
                                <a href="#" className="dropdown-toggle lang text-white text-white dropdown-toggle" data-toggle="dropdown">
                                    <img src={lang.lang.type === "ru" ? icons.ru : icons.uz} style={{width : "15px"}} alt="flag"/> {lang.lang.name}
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" onClick={() => this.props.changeLang("uz")}><img src={icons.uz} style={{width : "15px"}} /> {lang.navbar.uz}</button>
                                    <button className="dropdown-item" onClick={() => this.props.changeLang("ru")}><img src={icons.ru} style={{width : "15px"}} /> {lang.navbar.ru}</button>
                                </div>
                            </div>
                        </div>
                        <div className="d-none d-sm-inline-block">
                            <i className="fa fa-fw fa-user"></i><Link to='/sign-in' className="text-white">{lang.navbar.signIn}</Link> {lang.navbar.or} <Link to='/sign-up' className="text-white"> {lang.navbar.signUp} </Link>
                        </div>
                    </div>
                 </div>
                 <nav className="navbar border-top navbar-expand-xl px-2 px-sm-5 py-1 py-md-2 py-lg-3 navbar-dark" id="navigation" >
                     <div className="container">
                        <Link to='/' className="navbar-brand">
                            <img src={icons.iwhite} alt="Indicator" className="img-brand" style={{width : "200px "}}/>
                        </Link>
                        <button className="navbar-toggler" data-toggle="collapse" data-target="#nav-menu">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="nav-menu">
                            <div className="nav navbar-nav ml-auto">
                                <a href="#" className="nav-item nav-link">{lang.navbar.home}</a>
                                <a href="#" className="nav-item nav-link">{lang.navbar.tvaud}</a>
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">{lang.navbar.prods}</a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a href="#" className="dropdown-item">First item</a>
                                        <a href="#" className="dropdown-item">Second item</a>
                                        <a href="#" className="dropdown-item">Third item</a>
                                        <a href="#" className="dropdown-item">Fourth item</a>
                                    </div>
                                </div>
                                <a href="#" className="nav-item nav-link">{lang.navbar.servs}</a>
                                <a href="#" className="nav-item nav-link">{lang.navbar.cont}</a>
                                <div className="nav-item" >
                                    <a className="nav-link" href="#" data-badge="23"><i className="fa fa-fw fa-heart fa-lg" ></i></a>
                                </div>
                                <div className="nav-item d-block">
                                    <a className="nav-link" href="#" data-badge="99+"><i className="fa fa-fw fa-shopping-cart fa-lg"></i></a>
                                </div>
                            </div>
                        </div>
                     </div>
                 </nav>
                 <button className="btn-backToTop" id="backToTop" onClick={ () => window.scrollTo(0,0) }><i className="fa fa-fw fa-arrow-up"></i></button>
             </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state : state
    }
}

const mapDispatchToProps = dispatch => {
    return{
        changeLang : lang => {
            dispatch(ChangeLanguage(lang))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);