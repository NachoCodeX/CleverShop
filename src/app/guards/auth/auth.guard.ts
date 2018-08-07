import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';


type GuardResposnse= Observable<boolean> | Promise<boolean> | boolean

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  @Select((state)=>state.app.isLoggedIn) isLoggedIn:Observable<boolean>

  constructor(private $router:Router){}

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot):GuardResposnse {
      this.isLoggedIn.subscribe(
        value=>{
          if(!value){
            this.$router.navigate(['/'])
          }
        }
      )
      
      return this.isLoggedIn
  }
}
