import React from "react";
import ItemList from "./items/ItemList";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

class Home extends React.Component {
    render() {
        // const {items} = this.props;
        return (
            <div>
                <ItemList />
            </div>
        )
    }
}




const mapStateToProps = (state) => {
    // console.log("Home");
    // console.log(state);
    return {
        items: state.cart.items
    }
}
//
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'carts' }
    ])
)(Home);
//
// export default firestoreConnect([
//     {collection: 'carts'}
// ])(Home);