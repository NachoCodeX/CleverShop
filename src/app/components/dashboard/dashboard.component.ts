import { Component, OnInit } from '@angular/core';
import { Logout } from '../../store/actions/app.actions';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { ClearCart } from '../../store/actions/cart.actions';

export interface Product {
  id: number,
  name: string,
  price: number,
  quantity: number
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(private $store: Store) { }

  ngOnInit() {
    this.$store.dispatch(new ClearCart())
  }




}
