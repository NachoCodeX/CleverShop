import { Component, OnInit } from '@angular/core';
import { Product } from '../../../app.model'

import { Select } from '@ngxs/store';
import { Observable } from 'rxjs'

@Component({
  selector: 'cart-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Select(state => state.cart.products) products: Observable<Product[]>


  constructor() { }

  ngOnInit() {
  }


}
