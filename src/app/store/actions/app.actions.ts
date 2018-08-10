import { Credentials, Product } from "../../app.model";





// export class ConfirmSale {
//     static readonly type: string = "[User] PAY"
//     constructor(public products: Product[], public total: number, public user: string) { }
// }

export class SearchProduct {
    static readonly type: string = "[User] Search"
    constructor(public payload: string[]) { }
}

export class ClearProducts {
    static readonly type: string = "[User] CLEAR"


}



export class SignIn {
    static readonly type = "[User] SIGNIN"
    constructor(public payload: Credentials) { }
}

export class SignInError {
    static readonly type = "[User] SIGNIN_ERROR"
}

export class SignUp {
    static readonly type = "[User] SIGNUP"
    constructor(public payload: any) { }
}


export class Logout {
    static readonly type = "[User] LOGOUT"
    constructor() { }

}