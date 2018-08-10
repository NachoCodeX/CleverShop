import { State, Action, StateContext } from '@ngxs/store'
import { AddProduct } from '../actions/product.actions';
import { ApiService } from '../../services/api/api.service';
import { NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material';



interface ProductStateModel {

}

@State({
    name: 'product'
})
export class ProductReducer {
    constructor(private zone: NgZone, private snackBar: MatSnackBar, private apiService: ApiService) { }

    private showMessage(message: string) {
        this.zone.run(() => {
            this.snackBar.open(message, 'Undo', {
                verticalPosition: 'bottom',
                horizontalPosition: 'center',
                duration: 1000
            })

        })
    }


    @Action(AddProduct)
    addProduct(ctx: StateContext<ProductStateModel>, { payload }: AddProduct) {
        this.apiService.addProduct(payload)
            .subscribe(
                (response) => {
                    this.showMessage(`${payload.name} successfully added`)
                },
                (error) => {
                    this.showMessage(`Something went wrong :(`)
                }
            )
    }

}