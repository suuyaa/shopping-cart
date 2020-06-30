import React from "react";
import {connect} from "react-redux";
import {addToCart} from "../actions/cartActions";
import {BrowserRouter, Link} from "react-router-dom";


class ItemList extends React.Component {

    handleClick = (addedItems) => {
        this.props.addToCart(addedItems);
    };

    render() {
        let itemList = this.props.items.map(item => {
            return (
                <div className="card col-md-3" key={item.id}>
                <Link to={'/item/'+ item.id}>
                        <img className="card-img-top" src={item.img} alt={item.title}/>
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.description}</p>
                            <p className="card-text"><b>Price: CAD{item.price}</b></p>
                            <Link to="/" onClick={() => {this.handleClick(item)}} className="btn btn-light float-right">
                                <i className="fas fa-plus-circle"></i>
                            </Link>
                            {/*<BrowserRouter>*/}
                            {/*    <Link to="/" onClick={() => {this.handleClick(item)}} className="btn btn-light float-right">*/}
                            {/*        <i className="fas fa-plus-circle"></i>*/}
                            {/*    </Link>*/}
                            {/*</BrowserRouter>*/}
                        </div>
                </Link>
                </div>
            )
        })
        return (
            <div className="container">
                <div className="card-group">
                    <div className="row">
                        {itemList}
                    </div>
                    {/*<h3 className="text-center">Our items</h3>*/}
                </div>
            </div>

        )

    }
}

const mapStateToProps = (state) => {
    // console.log('list', state);
    return {
        items: state.cart.items
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        addToCart: addedItems => {dispatch(addToCart(addedItems))}
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
