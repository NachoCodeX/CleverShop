import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SignUp } from '../../../store/actions/app.actions';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup

  constructor(private $router: Router, private snackBar: MatSnackBar, private $store: Store, private fb: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      age: 18,
      isAdmin: false
    })
  }
  onSubmit($event) {

    console.log(this.signupForm.value);
    this.$store.dispatch(new SignUp(this.signupForm.value))
    this.signupForm.reset()
    this.snackBar.open('User created successfully', 'Undo')
      .afterDismissed()
      .subscribe(
        () => {
          this.$router.navigate(['dashboard'])
        }
      )
  }

}
