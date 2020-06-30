import React from "react";
import {Link} from 'react-router-dom';
// import NavLinks from "./NavLinks";
import SignInLinks from "./SignInLinks";
import SignOutLinks from "./SignOutLinks";
import {connect} from "react-redux";

const Navbar = (props) => {
    const {auth} = props;
    console.log(auth);
    const links = auth.uid? <SignInLinks /> : <SignOutLinks />;
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
            <div className="container">
                <Link to="/" className="brand-logo">Logo</Link>
                {links}
                {/*<SignInLinks />*/}
                {/*<SignOutLinks />*/}
                {/*<NavLinks />*/}
            </div>
        </nav>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Navbar);