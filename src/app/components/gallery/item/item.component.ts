import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddToCart } from '../../../store/actions/cart.actions';
import { Product } from '../../../app.model'

@Component({
  selector: 'gallery-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent2 implements OnInit {
  @Input() categoryName: string
  @Input() categoryImage: string
  @Input() isProduct: boolean
  @Input() categoryColor: string
  @Input() productData: Product


  @Output() categorySelect: EventEmitter<string> = new EventEmitter<string>()

  constructor(private $store: Store) { }


  ngOnInit() {
  }
  onClick(categorySelected: string) {
    this.categorySelect.emit(categorySelected)
  }

  addProduct(product: Product) {

    this.$store.dispatch(new AddToCart(product))

  }
}
