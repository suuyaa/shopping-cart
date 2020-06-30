import {ADD_QUANTITY, ADD_QUANTITY_IN_CART, ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, SUB_QUANTITY_SINGLE} from "./action-types/cart-actions";

export const addToCart = (addedItems) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;
        let state = getState();
        // console.log("cartActions: add to cart");
        // console.log(state);
        let itemToAdd = state.cart.addedItems.find(item => item.id === addedItems.id);
        if (itemToAdd === undefined) {
            addedItems.quantity = 1;
            firestore.collection('carts').add({
                addedItems,
                customerFirstName: profile.firstName,
                customerLastName: profile.lastName,
                customerId: userId,
                shoppedAt: new Date()
            }).then(() => {
                dispatch({type: ADD_TO_CART, addedItems});
            }).catch(err => {
                dispatch({type: "ADD_TO_CART_ERROR", err});
            });
        } else {
            firestore.collection('carts').where('addedItems.id', '==', addedItems.id)
                .get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    addedItems.quantity += 1;
                    // console.log(doc.id);
                    firestore.collection('carts').doc(doc.id).update({
                        addedItems: addedItems,
                        shoppedAt: new Date()
                    }).then(() => {
                        // console.log('updated');
                        dispatch({type: ADD_QUANTITY, addedItems});
                    }).catch(err => {
                        dispatch({type: "ADD_TO_CART_ERROR", err});
                    });
                })
            })
        }
    }
};

export const removeItem = (removedItems) => {
    console.log("removedItem");
    console.log(removedItems);
    // const id = removedItem.id.toString();
    // const cartsId = document.id;
    // console.log("dispatch", removedItems.addedItems.id);
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        let itemToRemove = getState().cart.addedItems.find(item => item.id === removedItems.id);
        console.log('itemToRemove', itemToRemove);

        firestore.collection('carts').where('addedItems.id', '==', itemToRemove.id)
            .get().then((snapshot) => {
            snapshot.forEach((doc) => {
                    console.log(doc.id);
                    firestore.collection('carts').doc(doc.id).delete().then(() => {
                        console.log('delete document successfully')
                        dispatch({type: REMOVE_ITEM, removedItems});
                    });
                }
            )
        }).catch(err => {
            console.log('delete failed');
            dispatch({type: "REMOVE_ITEM_ERROR", err});
        })
    }
};

export const addQuantity = (addQuantityItem) => {
    // console.log("addQuantityItem:", addQuantityItem);
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        let itemToAddQuantity = getState().cart.addedItems.find(item => item.id === addQuantityItem.id);
        console.log('itemToAddQuantity', itemToAddQuantity);

        if (itemToAddQuantity) {
            firestore.collection('carts').where("addedItems.id", '==', addQuantityItem.id)
                .get().then((snapshot) => {
                snapshot.forEach((doc => {
                        addQuantityItem.quantity += 1;
                        console.log('test quantity:', addQuantityItem.quantity);
                        console.log('add quantity successfully');
                        firestore.collection('carts').doc(doc.id).update({
                            addedItems: addQuantityItem,
                            shoppedAt: new Date()
                        }).then(() => {
                            console.log('updated');
                            dispatch({type: ADD_QUANTITY_IN_CART, addQuantityItem});
                        }).catch(err => {
                            dispatch({type: "ADD_QUANTITY_IN_CART_ERROR", err});
                        });
                    })
                )
            });
        }
    }
};

export const subtractQuantity = (subtractQuantityItem) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        console.log(subtractQuantityItem);
        if (subtractQuantityItem.quantity === 1) {
            firestore.collection('carts').where('addedItems.id', '==', subtractQuantityItem.id)
                .get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    // subtractQuantityItem.quantity = 1;
                    firestore.collection('carts').doc(doc.id).delete().then(() => {
                        console.log('subtracted');
                        dispatch({type: SUB_QUANTITY_SINGLE, subtractQuantityItem});
                    }).catch(err => {
                        dispatch({type: "SUB_QUANTITY_ERROR", err});
                    });
                })
            })
        } else {
            firestore.collection('carts').where('addedItems.id', '==', subtractQuantityItem.id)
                .get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    subtractQuantityItem.quantity -= 1;
                    firestore.collection('carts').doc(doc.id).update({
                        addedItems: subtractQuantityItem,
                        shoppedAt: new Date()
                    }).then(() => {
                        dispatch({type: SUB_QUANTITY, subtractQuantityItem});
                    }).catch(err => {
                        dispatch({type: "SUB_QUANTITY_ERROR", err});
                    });
                })
            })
        }
    }
};
