import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/Home";
import Cart from "./components/items/Cart";
import SignIn from "./components/auth/SignIn";
import Signup from "./components/auth/Signup";
import ItemDetails from "./components/items/ItemDetails";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar/>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/item/:id" component={ItemDetails} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/signin" component={SignIn} />
                        <Route path="/signup" component={Signup} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
