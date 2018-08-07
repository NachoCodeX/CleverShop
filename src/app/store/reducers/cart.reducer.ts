import { State, Action, StateContext } from '@ngxs/store'
import { Product } from '../../app.model';
import { AddToCart, ClearCart, RemoveToCart } from '../actions/cart.actions';

export interface CartStateModel {
    products: Product[]
}



@State<CartStateModel>({
    name: 'cart',
    defaults: {
        products: []
    }
})
export default class CartState {

    constructor() { }

    @Action(RemoveToCart)
    removeToCart(ctx: StateContext<CartStateModel>, { payload }: RemoveToCart) {
        const products: Product[] = ctx
            .getState()
            .products
            .filter((product: Product) => product._id !== payload)



        ctx.patchState({
            products
        })
    }


    @Action(ClearCart)
    clearCart(ctx: StateContext<CartStateModel>) {
        ctx.patchState({
            products: []
        })
    }

    @Action(AddToCart)
    addToCart(ctx: StateContext<CartStateModel>, { payload }: AddToCart) {
        // console.log(payload);
        const products = ctx.getState().products
        const isFound: boolean = products.filter(product => {
            const found: boolean = product._id == payload._id
            if (found) product.quantity++
            return found
        }).length > 0

        if (!isFound) {
            products.push({
                _id: payload._id,
                name: payload.name,
                quantity: 1,
                price: payload.price,
                discount: payload.discount
            })
        }
        ctx.patchState({
            products
        })
    }
}
