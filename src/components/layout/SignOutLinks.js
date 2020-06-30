import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {signIn} from "../actions/authActions";

const SignOutLinks = (props) => {
    return (
        <ul className="nav justify-content-end">
            <li className="nav-link"><NavLink to='/'>Shop</NavLink></li>
            <li className="nav-link"><NavLink to='/signin'>Sign In</NavLink></li>
            <li className="nav-link"><NavLink to='/signup'>Sign Up</NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: () => dispatch(signIn())
    }
}

export default connect(null, mapDispatchToProps)(SignOutLinks);