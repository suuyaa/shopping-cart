import React from "react";
import {signUp} from "../actions/authActions";
import {connect} from "react-redux";
import {Redirect} from "react-router";

class Signup extends React.Component{
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }

    render() {
        const {auth, authError} = this.props;
        if (auth.uid) return <Redirect to='/' />
        return(
            <div className="container" style={{width: "30%"}}>
                <h3 className="text-center">Sign Up</h3>
                <form onSubmit={this.handleSubmit} className="justify-content-center">
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email"
                               placeholder="Enter email" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password"
                               placeholder="Password" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First name:</label>
                        <input type="text" className="form-control" id="firstName"
                               placeholder="First Name" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last name:</label>
                        <input type="text" className="form-control" id="lastName"
                               placeholder="Last Name" onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <div className="text-center text-danger">
                        {authError ? <p>{authError}</p> : null}
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("aaaaa");
    console.log(state);
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);