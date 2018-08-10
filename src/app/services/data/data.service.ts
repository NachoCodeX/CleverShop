import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { Product } from '../../app.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public payState$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public isOpenDialog$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public isCartEmpty$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public isConfirmDialog$: BehaviorSubject<boolean> = new BehaviorSubject(false)


  @Select(state => state.cart.products) products$: Observable<Product[]>
  private products: Product[]




  constructor() {
    this.products$.subscribe(
      (values: Product[]) => this.products = values
    )

  }

  changeIsConfirmDialog(value: boolean) {
    this.isConfirmDialog$.next(value)
  }

  getIsConfirmDialog(): Observable<boolean> {
    return this.isConfirmDialog$.asObservable()
  }

  getCurrentisCartEmpty() {
    return this.products.length === 0
  }


  changePayState(value: boolean) {
    this.payState$.next(value)
  }
  getCurrentPayState(): Observable<boolean> {
    return this.payState$.asObservable()
  }
  getCurrentisOpenDialog() {
    return this.isOpenDialog$.asObservable()
  }
  changeCurrentisOpenDialog(value: boolean) {
    this.isOpenDialog$.next(value)
  }


}
