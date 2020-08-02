import React, { Component } from 'react';
import { connect } from 'react-redux';
import './search.css';

const icons = {
    like : require('../../Assets/Images/Icons/Heart.svg'),
    cart : require('../../Assets/Images/Icons/Cart.svg')
}

class SearchBar extends Component {

  
    render() {

        let lang = this.props.state.state;

        return (
             <div className="container search">
                 <div className="w-100 mt-2 p-0">
                    <div className="row">
                        <div className="col-12 col-md-3 my-1">
                            <div className="dropdown search-dropdown">
                                <button className="dropdown-toggle btn-indicator btn w-100" data-toggle="dropdown">
                                    <i className="fa fa-fw fa-bars"></i> {lang.searchBar.category}
                                </button>
                                <div className="dropdown-menu w-100">
                                    <a href="#" className="dropdown-item">First item</a>
                                    <a href="#" className="dropdown-item">First item</a>
                                    <a href="#" className="dropdown-item">First item</a>
                                    <a href="#" className="dropdown-item">First item</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-9  my-1">
                            <div className="input-group w-100">
                                <input placeholder={lang.searchBar.lf} type="text" className="form-control"/>
                                <div className="dropdown">
                                    <span className="input-group-append">
                                        <button className="btn btn-indicator dropdown-toggle" data-toggle="dropdown"><span className="d-none d-sm-inline-block">{ lang.searchBar.allcategory }</span></button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a href="#" className="dropdown-item">
                                            First item
                                        </a>
                                        <a href="#" className="dropdown-item">
                                            First item
                                        </a>
                                        <a href="#" className="dropdown-item">
                                            First item
                                        </a>
                                        <a href="#" className="dropdown-item">
                                            First item
                                        </a>
                                    </div>
                                    </span>
                                </div>
                                <span className="input-group-append">
                                    <button className="btn btn-indicator"><i className="fa fa-fw fa-search"></i>  { lang.searchBar.search }</button>
                                </span>
                            </div>
                        </div>
                    </div>
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


export default connect(mapStateToProps,null)(SearchBar);