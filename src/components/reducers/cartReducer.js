import Item1 from "../../images/item1.jpg"
import Item2 from "../../images/item2.jpg";
import Item3 from "../../images/item3.jpg";
import Item4 from "../../images/item4.jpg";
import Item5 from "../../images/item5.jpg";
import Item6 from "../../images/item6.jpg";
import {
    ADD_TO_CART,
    REMOVE_ITEM,
    ADD_QUANTITY,
    ADD_QUANTITY_IN_CART,
    SUB_QUANTITY,
    ADD_SHIPPING,
    SUB_SHIPPING,
    SUB_QUANTITY_SINGLE
} from "../actions/action-types/cart-actions";

const initState = {
    items: [
        {
            id: 1,
            title: "Winter body",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
            price: 30,
            img: Item1,
            quantity: 0
        },
        {
            id: 2,
            title: "Adidas",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
            price: 30,
            img: Item2,
            quantity: 0
        },
        {
            id: 3,
            title: "Vans",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
            price: 20,
            img: Item3,
            quantity: 0
        },
        {
            id: 4,
            title: "White",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
            price: 20,
            img: Item4,
            quantity: 0
        },
        {
            id: 5,
            title: "Boots",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
            price: 20,
            img: Item5,
            quantity: 0
        },
        {
            id: 6,
            title: "Black",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
            price: 20,
            img: Item6,
            quantity: 0
        }
    ],
    addedItems: [],
    total: 0
};

const cartReducer = (state = initState, action) => {
        switch (action.type) {
            case ADD_TO_CART:
                let newTotal = state.total + action.addedItems.price;
                let itemToAdd = action.addedItems;
                return {
                    ...state,
                    addedItems: [...state.addedItems, itemToAdd],
                    total: newTotal
                };

            case REMOVE_ITEM:
                console.log('action', action.removedItems);
                let itemToRemove = action.removedItems;
                let newItems = state.addedItems.filter(item => itemToRemove.id !== item.id);
                let totalAfterRemove = state.total - (itemToRemove.price) * itemToRemove.quantity;
                return {
                    ...state,
                    addedItems: newItems,
                    total: totalAfterRemove
                };

            case ADD_QUANTITY:
                let newAddedTotal = state.total + action.addedItems.price;
                return {
                    ...state,
                    total: newAddedTotal
                };

            case ADD_QUANTITY_IN_CART:
                let newAddedTotalInCart = state.total + action.addQuantityItem.price;
                return {
                    ...state,
                    addedItems: state.addedItems,
                    total: newAddedTotalInCart
                };

            case SUB_QUANTITY:
                let subNewTotal = state.total - action.subtractQuantityItem.price;
                return {
                    ...state,
                    total: subNewTotal
                };

            case SUB_QUANTITY_SINGLE:
                console.log(state.addedItems);
                let itemToSub = action.subtractQuantityItem;
                let subNewItems = state.addedItems.filter((item => item.id !== itemToSub.id));
                console.log("sub", subNewItems);
                let subNewTotal2 = state.total - itemToSub.price;
                return {
                    ...state,
                    addedItems: subNewItems,
                    total: subNewTotal2
                };

            case ADD_SHIPPING:
                return {
                    ...state,
                    total: state.total + 6
                };
            case SUB_SHIPPING:
                return {
                    ...state,
                    total: state.total - 6
                };
            default:
                return state;
        }
    }
;

export default cartReducer;