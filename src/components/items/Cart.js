import React from "react";
import {connect} from "react-redux";
import {removeItem, addQuantity, subtractQuantity} from "../actions/cartActions";
import Recipe from "../Recipe";

class Cart extends React.Component {

    handleRemove = (removedItems) => {
        this.props.removeItem(removedItems);
    };

    handleAddQuantity = (addQuantityItem) => {
        this.props.addQuantity(addQuantityItem);
    };

    handleSubtractQuantity = (subtractQuantityItem) => {
        this.props.subtractQuantity(subtractQuantityItem);
    };

    render() {
        // const addedItemsTemp = this.props.addedItems ? {...this.props.addedItems} : {};
        // const addedItemsTemp = this.props.items.addedItems ? this.props.items.addedItems : {};
        // console.log('addedItems:', this.props.addedItems);
        // if (addedItemsTemp.length > 0 ) {
        let addedItems = this.props.items.addedItems.map(item => {
            // console.log('item:', item);
            return (
                    <li className="list-group-item" key={item.id}>
                        <div className="item-img">
                            <img src={item.img} alt={item.img}/>
                        </div>
                        <div className="item-desc">
                            <span className="item-title">{item.title}</span>
                            <p>{item.description}</p>
                            <p><b>price: {item.price}</b></p>
                            <p><b>Quantity: {item.quantity} </b></p>
                        </div>
                        <button onClick={() => {this.handleAddQuantity(item)}}>add</button>
                        <button onClick={() => {this.handleSubtractQuantity(item)}}>sub</button>
                        <button onClick={() => {this.handleRemove(item)}}>Remove</button>
                    </li>

            )
        });
        return (
            <div className="container">
                <div className="cart">
                    <h5>You have ordered:</h5>
                    <ul className="list-group">
                        {addedItems}
                    </ul>
                </div>
                <Recipe/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log("Cart.js");
    // console.log('cart state:', state);
    return {
        items: state.cart,
        // addedItems: state.cart.addedItems
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: removedItems => {
            dispatch(removeItem(removedItems))
        },
        addQuantity: addQuantityItem => {
            dispatch(addQuantity(addQuantityItem))
        },
        subtractQuantity: subtractQuantityItem => {
            dispatch(subtractQuantity(subtractQuantityItem))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);