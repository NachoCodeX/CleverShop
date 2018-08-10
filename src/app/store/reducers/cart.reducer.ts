import { State, Action, StateContext } from '@ngxs/store'
import { Product, CartProduct } from '../../app.model';
import { AddToCart, ClearCart, RemoveToCart } from '../actions/cart.actions';
import { ApiService } from '../../services/api/api.service';
import { ConfirmSale } from '../actions/cart.actions';

interface CartStateModel {
    products: CartProduct[]
}



@State<CartStateModel>({
    name: 'cart',
    defaults: {
        products: []
    }
})
export class CartState {

    constructor(private apiService: ApiService) { }
    @Action(ConfirmSale)
    confirmSale(ctx: StateContext<CartStateModel>, { total, products, user }: ConfirmSale) {

        // this.products
        this.apiService.confirmSale({ total, products, user })
            .subscribe(
                (response) => {
                    console.log(response);
                }
            )
    }


    @Action(RemoveToCart)
    removeToCart(ctx: StateContext<CartStateModel>, { payload }: RemoveToCart) {
        const products: Product[] = ctx
            .getState()
            .products
            .filter((product: Product) => {
                const isFound: boolean = product._id !== payload


                return isFound
            })



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
                discount: payload.discount,
                maxQuantity: payload.quantity
            })
        }
        ctx.patchState({
            products
        })
    }
}
