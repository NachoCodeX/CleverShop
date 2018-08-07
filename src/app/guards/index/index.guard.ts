import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class IndexGuard implements CanActivate {
  @Select(state=>state.app.isLoggedIn) isLoggedIn:Observable<boolean>
  _isLoggedIn:boolean

  constructor(private $router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      this.isLoggedIn.subscribe(
        value=>{
          if(value) this.$router.navigate(['dashboard'])
          this._isLoggedIn=value
          // else this.$router.navigate(['/'])

        }
      )
      console.log(!this._isLoggedIn);
      
      return !this._isLoggedIn;

  }
}
