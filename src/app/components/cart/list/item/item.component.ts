import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../app.model';
import { Store } from '@ngxs/store';
import { RemoveToCart } from '../../../../store/actions/cart.actions';

@Component({
  selector: 'cart-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() product: Product


  public itemClasses = {
    'cart__item': true,
    'cart__item--active': false,
    'hover': true
  }
  public itemDescription = {
    'cart__item__description': true,
    'borderbottom': true
  }

  constructor(private $store: Store) { }

  ngOnInit() {
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
