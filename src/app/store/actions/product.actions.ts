import { Product } from "../../app.model";

export class SearchProduct {
    static readonly type = "[Product] Search"
    constructor(public payload: string) { }
}


export class AddProduct {
    static readonly type: string = "[Product] Add"
    constructor(public payload: Product) { }
}

export class RemoveProduct {
    static readonly type: string = "[Product] Remove"
    constructor(public payload: string) { }
}

export class UpdateProduct {
    static readonly type: string = "[Product] Update"
    constructor(public payload: string) { }
}