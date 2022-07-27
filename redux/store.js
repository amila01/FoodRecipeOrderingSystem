import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { profileReducer } from "./userReducer"


export default configureStore({
    reducer: {
        cart: cartReducer,
        profile: profileReducer,
    }
})