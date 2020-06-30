import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {signOut} from "../actions/authActions";

const SignInLinks = (props) => {
    return (
        <ul className="nav justify-content-end">
            <li className="nav-link"><NavLink to='/'>Shop</NavLink></li>
            <li className="nav-link"><NavLink to='/cart'>My Cart</NavLink></li>
            <li className="nav-link"><NavLink to='/' onClick={props.signOut}>Log Out</NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignInLinks);