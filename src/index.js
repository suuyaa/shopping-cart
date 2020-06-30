import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import rootReducer from "./components/reducers/rootReducer";
import {Provider, useSelector} from "react-redux";
import {applyMiddleware, createStore, compose} from "redux";
import * as serviceWorker from './serviceWorker';
import thunk from "redux-thunk";
import {reduxFirestore, getFirestore, createFirestoreInstance} from "redux-firestore";
import {ReactReduxFirebaseProvider, getFirebase, isLoaded} from "react-redux-firebase";
import fbConfig from "./config/fbConfig";
import firebase from "firebase/app";

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(fbConfig)
    )
);

const config = {
    userProfile: 'users', // where profiles are stored in database,
    useFirestoreForProfile: true
};


const rrfProps = {
    firebase,
    config,
    dispatch: store.dispatch,
    createFirestoreInstance
};
// const profileSpecificProps = {
//     userProfile: 'users',
//     useFirestoreForProfile: true,
//     enableRedirectHandling: false,
//     resetBeforeLogin: false
// }
//
// const rrfProps = {
//     firebase,
//     config: fbConfig,
//     config: profileSpecificProps,
//     dispatch: store.dispatch,
//     createFirestoreInstance
// };
//
// const rrfProps = {
//     firebase,
//     config: fbConfig,
//     dispatch: store.dispatch,
//     createFirestoreInstance,
//     userProfile: 'users',
//     useFirestoreForProfile: true,
//     presence: 'presence',
//     sessions: 'sessions'
// };

function AuthIsLoaded({children}) {
    const auth = useSelector(state => state.firebase.auth);
    if (!isLoaded(auth))return <div>Loading...</div>;
    return children;
}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>
            <App/>
            </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();