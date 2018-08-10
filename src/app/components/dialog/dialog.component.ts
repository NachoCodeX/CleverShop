import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store'
import { Observable } from 'rxjs';
import { Product } from '../../app.model';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Select(state => state.cart.products) products: Observable<Product[]>


  constructor(private dataService: DataService) { }

  ngOnInit() {

  }
  confirm() {
    this.dataService.changeCurrentisOpenDialog(false)
    this.dataService.changeIsConfirmDialog(true)

  }
  cancel() {
    this.dataService.changeCurrentisOpenDialog(false)
    this.dataService.changeIsConfirmDialog(false)
  }

}
