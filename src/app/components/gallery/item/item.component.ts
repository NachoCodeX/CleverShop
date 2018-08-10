import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AddToCart } from '../../../store/actions/cart.actions';
import { Product, CartProduct } from '../../../app.model'
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'gallery-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent2 implements OnInit {
  public itemClasses: Object = {
    'gallery__item': true,
    'gallery__item--normal': true,
    'gallery__item--outofstock': false
  }


  @Select(state => state.app.products) products$: Observable<Product[]>
  @Select(state => state.cart.products) cartProducts$: Observable<Product[]>


  @Input() categoryName: string
  @Input() categoryImage: string
  @Input() isProduct: boolean
  @Input() categoryColor: string
  @Input() productData: Product
  @Input() isOutOfStock: boolean

  // private currentQuatity: number = 0

  @Output() categorySelect: EventEmitter<string> = new EventEmitter<string>()

  //private


  constructor(private snackBar: MatSnackBar, private $store: Store) {

  }


  ngOnInit() {
    if (this.isProduct && this.isOutOfStock) {
      this.itemClasses['gallery__item--outofstock'] = true
      this.itemClasses['gallery__item--normal'] = false
    } else if (this.isProduct && !this.isOutOfStock) {
      this.itemClasses['gallery__item--outofstock'] = false
      this.itemClasses['gallery__item--normal'] = true
    }
  }
  onClick(categorySelected: string) {
    this.categorySelect.emit(categorySelected)
  }

  canAddToCart(_id: string, quantity: number): boolean {
    let productQuantity: number = 0

    this.cartProducts$.pipe(
      filter(values => values.length > 0),
      map((values: Product[]) => values.filter(val => val._id == _id)[0])
    ).subscribe((value: Product) => {
      if (value)
        productQuantity = value.quantity
    })
    // this.currentQuatity = productQuantity - quantity
    return productQuantity < quantity
  }

  addProduct(product: Product) {


    if (this.canAddToCart(product._id, product.quantity)) {
      this.$store.dispatch(new AddToCart(product))
    } else {
      this.snackBar.open(`No puedes agregar mas ${product.name}`, 'Undo', { duration: 1000 })
    }
  }
}
