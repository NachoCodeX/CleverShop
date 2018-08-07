import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs'

@Component({
  selector: 'cart-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Select(state => state.app.user.firstName) firstName: Observable<string>

  constructor() { }

  ngOnInit() {
  }

}
