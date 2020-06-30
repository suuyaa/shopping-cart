import React from "react";
import {connect} from "react-redux";

class Recipe extends React.Component{

    componentWillUnmount() {
        if(this.refs.shipping.checked){
            this.props.subShipping()
        }
    }

    handleChecked = (e) => {
        if (e.target.checked) {
            this.props.addShipping();
        } else {
            this.props.subShipping();
        }
    }

    render() {
        return(
            <div className="container">
                <ul className="list-group">
                    <li className="list-group-item">
                        <label>
                            <input type="checkbox" ref="shipping" onChange={this.handleChecked}/>
                            <span>Shipping fee: + CAD $6</span>
                        </label>
                    </li>
                    <li className="list-group-item">
                        <b>Total: CAD {this.props.total}</b>
                    </li>
                </ul>
                <div className="checkout">
                    <button>Check Out</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log("Recipe");
    // console.log(state);
    return {
        addedItems: state.cart.addedItems,
        total: state.cart.total
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
        subShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);