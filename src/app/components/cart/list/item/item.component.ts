import { Component, OnInit, Input } from '@angular/core';
import { Product, CartProduct } from '../../../../app.model';
import { Store, Select } from '@ngxs/store';
import { RemoveToCart } from '../../../../store/actions/cart.actions';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'cart-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() product: Product
  @Select(state => state.cart.products) products$: Observable<CartProduct[]>

  private products: CartProduct[]

  public quantityForm: FormGroup

  public itemClasses = {
    'cart__item': true,
    'cart__item--active': false,
    'hover': true
  }
  public itemDescription = {
    'cart__item__description': true,
    'borderbottom': true
  }

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private $store: Store) { }

  getMaxQuantity(_id): number {
    return this.products.filter((product: CartProduct) => product._id === _id)[0].maxQuantity
  }

  ngOnInit() {

    this.products$
      .subscribe((products: Product[]) => this.products = products)

    this.quantityForm = this.fb.group({
      quantity: new FormControl('', [Validators.min(1), Validators.max(this.getMaxQuantity(this.product._id))])
    })


    this.quantityForm.valueChanges.subscribe(
      ({ quantity }) => {
        const isInvalid = this.quantityForm.controls.quantity.invalid
        const maxQuantity: number = this.getMaxQuantity(this.product._id)
        if (!quantity) {
          console.log("AQUI");
          this.quantityForm.controls.quantity.setValue(1)
          this.product.quantity = 1
        } else {

          if (isInvalid) {
            console.log("INVALID");
            this.product.quantity = quantity > maxQuantity ? maxQuantity : 1
            console.log(`PRODUCT QUANTITY ${this.product.quantity}`);
            this.quantityForm.controls.quantity.setValue(quantity > maxQuantity ? maxQuantity : 1)
            this.snackBar.open(`Solo hay ${maxQuantity} en stock`, 'Undo', { duration: 1000 })
          } else {
            this.product.quantity = quantity
          }

          console.log(quantity);

        }


        // if (quantity && !isInvalid) {
        //   console.log(`CURRENT QUANTITY ${quantity} && is invalidad ${isInvalid}`);
        //   this.product.quantity = quantity
        // } else {
        //   this.product.quantity = 1
        // }


      }
    )
  }
  onClick() {

    this.itemClasses["cart__item--active"] = !this.itemClasses["cart__item--active"];
    if (this.itemClasses['cart__item--active']) {
      this.itemDescription['borderbottom'] = true
      this.itemClasses['hover'] = false
    } else {
      this.itemDescription['borderbottom'] = false
      this.itemClasses['hover'] = true

    }
    // console.log(this.itemDescription['borderbottom']);
  }

  removeToCart(id: string) {
    console.log(id);

    this.$store.dispatch(new RemoveToCart(id))
  }

}
