import React from "react";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

const ItemDetails = (props) => {
    const id = props.match.params.id;
    // console.log("details");
    // console.log(props);
        return (
            <div className="container">
                <h3 className="text-center">Item details - {id}</h3>
                <div className="row  justify-content-center">
                    <div className="col-md-3">
                        <img src={props.item.img} alt={props.item.title}/>
                        <div>
                            <h5>{props.item.title}</h5>
                            <p>{props.item.description}</p>
                            <p><b>Price: CAD{props.item.price}</b></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    const id = ownProps.match.params.id;
    const items = state.cart.items;
    const item = items?items[id]:null;
    // console.log(item);
    return {
        item: item
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'cart'}
    ])
)(ItemDetails);

// export default ItemDetails;