import { createSlice } from "@reduxjs/toolkit";
import { cartStorage } from "../context/Context";

import { cartData } from "../context/cartData";

const initialState = {
    filterCardsText: "", // state-ПОИСКА
    cartObject: cartStorage(),  // state(объект)-КОРЗИНЫ
    totalPrice: 0,
}

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,

    reducers: {

        // Action ПОИСКА:
        setFilterCardsText(state, action){
            state.filterCardsText = action.payload
        },

        // Action-ы КОРЗИНЫ:
        addToCart(state, action){
            const cartId = action.payload
            state.cartObject[cartId] += 1
        },
        removeFromCart(state, action){
            const cartId = action.payload
            state.cartObject[cartId] -= 1
        },
        removeCompletelyFromCart(state, action){
            const cartId = action.payload
            state.cartObject[cartId] -= state.cartObject[cartId]
        },
        addArbitraryCout(state, action){
            const cartId = action.payload
            const cartInputCount = action.payload
            state.cartObject[cartId] = cartInputCount
        },
        getTotalPrice(state){
            let totalPrice = 0;
            for (let item in state.cartObject) {
                if (state.cartObject[item] > 0) {
                    let element = cartData.find((product) => product.id == +item)
                    totalPrice += state.cartObject[item] * parseInt(element.price)
                }
            }
            return { 
                ...state, 
                totalPrice 
            }
        }

    }

})

const {actions, reducer} = mainSlice
export const {
    setFilterCardsText,
    addToCart,
    removeFromCart,
    removeCompletelyFromCart,
    addArbitraryCout,
    getTotalPrice
} = actions;
export default reducer
