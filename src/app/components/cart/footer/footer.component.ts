import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { Product } from '../../../app.model';
import { filter } from 'rxjs/operators';
import { ConfirmSale } from '../../../store/actions/cart.actions';
import { ClearCart } from '../../../store/actions/cart.actions';
import { MatSnackBar } from '@angular/material';
import { DataService } from '../../../services/data/data.service';

@Component({
  selector: 'cart-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Select(state => state.cart.products) products: Observable<Product[]>
  @Select(state => state.app.user._id) userID: Observable<string>

  private payButton$: Subject<boolean[]> = new Subject();

  public isLoading: boolean = false
  public isSuccess: boolean = false
  public isError: boolean = false


  private total: number = 0
  private id: string = ''
  private productsValue: Product[] = []
  private isOpenDialog: boolean = false

  constructor(private dataService: DataService, private snackBar: MatSnackBar, private $store: Store) { }

  ngOnInit() {
    this.userID.subscribe(id => this.id = id)
    this.subscribeProducts()
    this.subscribePayButtonState()
    this.subscribeisOpenDialog()
    this.subscribeisConfirmDialog()
  }

  makeSale() {
    if (this.total > 0) {
      this.isLoading = true
      this.$store.dispatch([
        new ConfirmSale(this.productsValue, this.total, this.id),
        new ClearCart()
      ]).subscribe(
        () => {
          this.payButton$.next([true, false])
          //Sharing data with Gallery Search Input
          this.dataService.changePayState(true)

          setTimeout(() => this.payButton$.next([false, true]), 1000)
          setTimeout(() => this.payButton$.next([false, false]), 2500)
        }
      )
    }
  }

  subscribeisConfirmDialog() {
    this.dataService.getIsConfirmDialog()
      .subscribe(
        (value: boolean) => {
          if (value) {
            console.log("PITO");
            this.makeSale()
          } else {
            console.log("PUTO");

          }
        }
      )

  }

  subscribeProducts() {
    this.products.subscribe(products => this.productsValue = products)

  }
  subscribePayButtonState() {
    this.payButton$.subscribe(
      (value: boolean[]) => {
        this.isLoading = value[0]
        this.isSuccess = value[1]
      }
    )
  }

  subscribeisOpenDialog() {
    this.dataService
      .getCurrentisOpenDialog()
      .subscribe(
        (value: boolean) => this.isOpenDialog = value
      )
  }


  getTotal(): number {

    this.products.pipe(
      filter(value => {
        if (!(value.length > 0)) this.total = 0

        return value.length > 0
      }),
    ).subscribe(
      (products: Product[]) => {
        this.total = products.map((product: Product) => product.price * product.quantity).reduce((prevValue, cValue) => prevValue + cValue)

      }
    )

    return this.total;
  }
  confirmSale() {
    if (!this.dataService.getCurrentisCartEmpty()) {
      this.dataService.changeCurrentisOpenDialog(true)
    } else {
      this.snackBar.open('Cart is empty.', 'Undo', { duration: 1000 })

    }

  }




}
