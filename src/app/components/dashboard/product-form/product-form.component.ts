import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddProduct } from '../../../store/actions/product.actions';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  // public categories: string[] = ['Juguetes', 'Computadoras', 'Cables', 'Otros']
  public productForm: FormGroup
  public categoriesSelect: string[] = [
    'JUGUETES',
    'COMPUTO',
    'CABLES',
    'AUDIO',
    'OTROS'
  ]
  constructor(private snackBar: MatSnackBar, private $store: Store, private fb: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: '',
      price: 0,
      quantity: 0,
      category: ''
    })
  }

  onSubmit() {
    this.$store.dispatch(new AddProduct(this.productForm.value))
    this.productForm.reset()

  }

}
