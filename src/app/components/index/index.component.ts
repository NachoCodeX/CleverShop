import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Store, Select } from '@ngxs/store';
import { SignIn } from '../../store/actions/app.actions';
import { Navigate } from '@ngxs/router-plugin'
import { MatSnackBar } from '@angular/material';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, skip } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  signInForm: FormGroup


  constructor(public snackBar: MatSnackBar, private $store: Store, private fb: FormBuilder) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: '',
      password: ''
    })
  }

  onSubmit($event) {
    $event.preventDefault();

    this.$store.dispatch([
      new SignIn(this.signInForm.value),
      new Navigate(['dashboard'])
    ])
      .subscribe(value => {
        console.log("SUBSCRITION");

      })




  }

}
