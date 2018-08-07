import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store'
import { Observable } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { Logout } from './store/actions/app.actions';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Clever Shop';
  opened: boolean = false
  @Select(state => state.app.isLoggedIn) isLoggedIn: Observable<boolean>
  @Select(state => state.app.user.isAdmin) isAdmin: Observable<boolean>

  constructor(private $store: Store, private $router: Router, private route: ActivatedRoute) { }
  showSignup() {
    this.$store.dispatch(new Navigate(['dashboard/signup']))
  }
  showDashboard() {
    this.$store.dispatch(new Navigate(['dashboard']))
  }
  showSalesPage() {
    this.$store.dispatch(new Navigate(['dashboard/sales']))
  }
  logout() {
    this.$store.dispatch([
      new Logout(),
      new Navigate(['/'])
    ])
  }

}
