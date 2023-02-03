import { Injectable } from '@angular/core';
import { LoginI } from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VentaI } from 'src/app/models/venta.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token!: string
  url:string = "https://localhost:7057/api/"
  headers = new HttpHeaders();

  constructor(
    private http:HttpClient
  ) { 
    this.headers.append("Authorization", "Bearer " + localStorage.getItem("token"));
  }

  login(form: LoginI):Observable<ResponseI>{
    return this.http.post<ResponseI>(this.url + 'usuario/login', form)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getVentasAll():Observable<VentaI[]>{
    return this.http.get<VentaI[]>(this.url + 'ventas', { headers: this.headers });
  }

  addVenta(venta:VentaI){
    return this.http.post(this.url + 'ventas', venta);
  }

  updateVenta(id: number, venta: VentaI){
    return this.http.put(this.url + 'ventas/' + id, venta);
  }

  deleteVenta(id: number){
    return this.http.delete(this.url + 'ventas/' + id)
  }
}
