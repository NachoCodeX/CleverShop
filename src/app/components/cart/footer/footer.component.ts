import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../../../app.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'cart-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Select(state => state.cart.products) products: Observable<Product[]>
  total: number = 0


  constructor() { }

  ngOnInit() {


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

}
