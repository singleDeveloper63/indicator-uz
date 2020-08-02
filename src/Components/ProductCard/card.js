import React, { Component } from 'react';
import { connect } from 'react-redux';
import './card.css';
class Card extends Component{
    render() {

        const data = this.props.data;
        const lang = this.props.state.state.card.productCard;
        return (
             <div className="card product-card p-2 p-md-3">
                 { data.isNew && 
                    <span className="new"> { lang.new } </span>
                 }
                 { data.isSale &&
                    <span className={ data.isNew ? 'saleBottom' : 'saleTop' }> { data.isSale } </span>
                 }
                 <img src={data.img} alt="" className="card-img-top"/>
                 <div className="card-body">
                    <h6 className="text-center">
                        { data.productName }
                    </h6>
                    <h4 className="text-success text-center">
                        { `$${data.price}` }
                    </h4>
                    <button className="btn-indicator btn mt-1 d-block mx-auto">
                        { lang.addToCart} 
                    </button>
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

export default connect(mapStateToProps,null)(Card);