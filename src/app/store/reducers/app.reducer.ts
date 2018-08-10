import { State, Action, StateContext } from '@ngxs/store'
import { User, Product } from '../../app.model';
import { SignIn, Logout, SearchProduct, ClearProducts, SignUp, } from '../actions/app.actions';
import { ApiService } from '../../services/api/api.service';
import { MatSnackBar } from '@angular/material';
import { NgZone } from '@angular/core';


interface AppStateModel {
    isLoggedIn: boolean,
    user: User,
    products: Product[]
}



@State<AppStateModel>({
    name: 'app',
    defaults: {
        isLoggedIn: false,
        user: {
            firstName: '',
            lastName: '',
            email: '',
            age: 0,
            avatar: '',
            isAdmin: false
        },
        products: []
    }
})
export class AppState {
    BASE_URL: string = 'http://localhost:7000'
    constructor(private zone: NgZone, private snackBar: MatSnackBar, private apiService: ApiService) { }

    private updateProductQuantity(products: Product[]) {

    }
    private showError(message: string): void {
        this.zone.run(() => {
            this.snackBar.open(message, 'Undo', {
                verticalPosition: 'bottom',
                horizontalPosition: 'center',
                duration: 1000
            })

        })
    }


    // @Action(ConfirmSale)
    // confirmSale(ctx: StateContext<AppState>, { total, products, user }: ConfirmSale) {

    //     // this.products
    //     this.apiService.confirmSale({ total, products, user })
    //         .subscribe(
    //             (response) => {
    //                 console.log(response);
    //             }
    //       )
    // }


    @Action(SignUp)
    signUp(ctx: StateContext<AppState>, { payload }: SignUp) {
        this.apiService.signUp(payload).subscribe(
            response => {
                console.log(response);
                console.log("EXITO!");

            }
        )
    }
    @Action(ClearProducts)
    clearProducts(ctx: StateContext<AppStateModel>) {
        ctx.patchState({
            products: []
        })
    }

    @Action(SearchProduct)
    searchProduct(ctx: StateContext<AppStateModel>, { payload }: SearchProduct) {
        this.apiService.searchProduct(payload)
            .subscribe(
                (products: Product[]) => {
                    console.log(products);

                    ctx.patchState({
                        products
                    })
                },
                (error) => {
                    console.log(error);

                }
            )
    }

    @Action(SignIn)
    signIn(ctx: StateContext<AppStateModel>, { payload }: SignIn) {
        return this.apiService.authRequest(payload)
            .pipe()
            .subscribe(
                ({ user, token }: any) => {
                    console.log(`LOGIN`);
                    console.log(user);
                    localStorage.setItem('token', token)
                    ctx.patchState({
                        user,
                        isLoggedIn: true
                    })
                },
                error => {
                    const message: string = error.error.message
                    console.log(error.error.message);
                    this.showError(message)
                }
            )




    }

    @Action(Logout)
    logout(ctx: StateContext<AppStateModel>) {
        localStorage.removeItem('token')
        ctx.patchState({
            isLoggedIn: false,
            user: {
                firstName: null,
                lastName: null,
                email: null,
                age: null,
                avatar: null,
                isAdmin: null
            }
        })
    }
}
