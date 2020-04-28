import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariablesGlobalesService } from 'src/app/variables-globales.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  password = new FormControl('');
  email = new FormControl('');
  connect = false;
  public login;

  constructor(
    private _httpClient: HttpClient,
    private _variablesGlobales: VariablesGlobalesService,
    private _router: Router,
    ) { }

  ngOnInit(): void {
  }

  userLogin() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const body = {
      "email": this.email.value,
      "password": this.password.value
    };
    this._httpClient.post<any>('http://localhost:8080/users/login', body, httpOptions).subscribe(data => {
      this._variablesGlobales.emailVg = this.email.value;
      this._variablesGlobales.tokenVg = data.token;
      this.connect = true;
    })
    
    setTimeout(() => {
      if (this.connect) {
        alert("Vous etes bien connecté !");
        console.log("test :");
        console.log(this._variablesGlobales);
        this._router.navigate(['/dashboard'])
      }
      else {
        alert("Utilisateur ou mot de passe incorrect");
      }
    }, 200);
  }
}
