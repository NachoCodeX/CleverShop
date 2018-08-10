import { Product, CartProduct } from "../../app.model";

export class AddToCart {
    static readonly type = "[Cart] Add"
    constructor(public payload: Product) { }
}

export class ClearCart {
    static readonly type = "[Cart] CLEAR"
}

export class RemoveToCart {
    static readonly type = "[Cart] REMOVE"
    constructor(public payload: string) { }
}

export class ConfirmSale {
    static readonly type: string = "[Cart] PAY"
    constructor(public products: CartProduct[], public total: number, public user: string) { }
}
