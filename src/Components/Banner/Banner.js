import React, { Component } from 'react';
import './Banner.css';
import { connect } from 'react-redux';
import 'node-waves/dist/waves.css';
import Waves from 'node-waves';
import Advantage from '../Advantage/advantage';


class Banner extends Component {
    componentDidMount(){
        Waves.init();
        Waves.attach('.dropdown-item',['waves-light','waves-button']);
        Waves.attach('button',['waves-button'])
    }
    render() {

        const banner = this.props.state.state.banner;

        return (
             <div>
                 <div className="banner mt-5">
                    <div className="container h-100 ">
                        <div className="row h-100">
                            <div className="col-12 col-md-6 col-lg-4 offset-0 offset-md-6 offset-lg-8 h-100">
                                <div className="d-flex justify-content-center  align-items-center flex-column h-100 w-100">
                                    <div className="banner-caption text-center p-2 p-md-5">
                                        <p >{banner.title}</p>
                                        <h3 >{banner.text}</h3>
                                        <p>
                                            <h4><small>{banner.starting} </small> $302</h4>
                                        </p>
                                        <button className="btn btn-indicator mt-3">{banner.buy}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Advantage/>
             </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        state : state
    }
}

export default connect(mapStateToProps,null)(Banner);