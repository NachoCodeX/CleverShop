import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Credentials } from '../../app.model';
import { Product } from '../../app.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  URL_AUTH: string = 'http://localhost:7000/auth'
  URL_API: string = 'http://localhost:7000/api'

  constructor(private $http: HttpClient) { }

  public searchProduct(values: string[]) {
    if (values.length == 1)
      return this.$http.get(`${this.URL_API}/product/${values[0]}`)
    else
      return this.$http.get(`${this.URL_API}/product/${values[0]}/${values[1]}`)
  }

  public authRequest({ email, password }: Credentials) {
    return this.$http.post(`${this.URL_AUTH}/user/signin`, {
      email,
      password
    })
  }

  public signUp(data) {
    return this.$http.post(`${this.URL_AUTH}/user/signup`, data)
  }

  public confirmSale(data) {
    return this.$http.post(`${this.URL_API}/sale`, data)
  }

  public addProduct(product: Product) {
    return this.$http.post(`${this.URL_API}/product`, product)
  }


}
