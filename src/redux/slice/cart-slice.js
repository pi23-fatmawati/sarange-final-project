import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    },
    reducers: {
        addCart(state, action) {
            const product = action.payload;
            const existingProduct = state.cart.find(item => item.id === product.id);

            if(existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
        },
        removeCart(state, action) {
            const productId = action.payload;
            const existingProductId = state.cart.findIndex(item => item.id === productId);

            if(existingProductId !== 1) {
                const existingProduct = state.cart[existingProductId];

                if(existingProduct.quantity > 1) {
                    existingProduct.quantity -= 1;
                } else {
                    state.cart.splice(existingProductId, 1)
                }
            }
        }
    }
})

export const { addCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;