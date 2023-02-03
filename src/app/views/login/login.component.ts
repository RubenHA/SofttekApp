import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginI } from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private api: ApiService,
    private router:Router
  ) { }

  errorStatus:boolean = false;
  errorMessage:string = '';

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['listar']);
    }
  }

  onLogin(form: LoginI){
    this.api.login(form).subscribe(data =>{
      let dataResponse:ResponseI = data
      if(dataResponse.success){
        localStorage.setItem("token", dataResponse.result);
        this.router.navigate(['listar']);
      }else{
        this.errorStatus = true;
        this.errorMessage = dataResponse.message;
      }
    })
  }

}
