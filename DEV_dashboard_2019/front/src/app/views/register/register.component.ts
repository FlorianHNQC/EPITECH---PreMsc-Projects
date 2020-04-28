import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariablesGlobalesService } from 'src/app/variables-globales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public login = new FormControl('');
  public password = new FormControl('');
  public email = new FormControl('');
  public connect = false;
  
  constructor(
    private _httpClient: HttpClient,
    private _variablesGlobales: VariablesGlobalesService,
    private _router: Router,

  ) { }

  ngOnInit(): void {
  }

  userRegister() {
    if (this.login.value != "" && this.password.value != "" && this.email.value != "") {
      this.sendRegistration();
    }
  }

  sendRegistration() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const body = {
      "username": this.login.value,
      "email": this.email.value,
      "password": this.password.value
    };
    this._httpClient.post<any>('http://localhost:8080/users', body, httpOptions).subscribe(data => {
      this._variablesGlobales.loginVg = this.login.value;
      this._variablesGlobales.emailVg = this.email.value;
      this._variablesGlobales.tokenVg = data.token;
      this.connect = true;
      console.log(data)
    })
    setTimeout(() => {
      if (this.connect) {
        alert("Utilisateur enregistré !");
        this._router.navigate(['/dashboard'])
      }
      else {
        alert("Erreur l'hors de l'enregistrement, veuillez reessayer en renseignant les bonnes valeurs");
      }
    }, 200);
  }


}
