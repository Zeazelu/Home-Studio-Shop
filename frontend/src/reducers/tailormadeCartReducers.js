import { TAILORMADE_ADD_ITEM, TAILORMADE_EMPTY, TAILORMADE_REMOVE_ITEM, TAILORMADE_SAVE_DIMENSIONS, TAILORMADE_SAVE_PAYMENT_METHOD, TAILORMADE_SAVE_SHIPPING_ADDRESS, } from '../constants/tailormadeCartConstants';

export const tailormadeCartReducer = (state = { tailormadeCartItems: [] }, action) => {
    switch (action.type) {
        case TAILORMADE_ADD_ITEM:
            const tailormadeItem = action.payload;
            const existTailormadeItem = state.tailormadeCartItems.find((x) => x.tailormade === tailormadeItem.tailormade);
            if (existTailormadeItem) {
                return {
                    ...state,
                    tailormadeCartItems: state.tailormadeCartItems.map((x) =>
                        x.tailormade === existTailormadeItem.tailormade ? tailormadeItem : x
                    ),
                };
            } else {
                return { ...state, tailormadeCartItems: [...state.tailormadeCartItems, tailormadeItem] };
            }
        case TAILORMADE_REMOVE_ITEM:
            return {
                ...state, tailormadeCartItems: state.tailormadeCartItems.filter((x) => x.tailormade !== action.payload),
            };
        case TAILORMADE_SAVE_SHIPPING_ADDRESS:
            return {
                ...state, tailormadeShippingAddress: action.payload
            };
        case TAILORMADE_SAVE_DIMENSIONS:
            return {
                ...state, dimensions: action.payload
            };
        case TAILORMADE_SAVE_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload };
        case TAILORMADE_EMPTY:
            return { ...state, tailormadeCartItems: [] };
        default:
            return state;
    }
};