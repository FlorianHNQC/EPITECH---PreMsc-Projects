import { Component, OnInit, ViewChild } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { LayoutService } from '../../services/layout.service';
import { MeteoService } from '../../services/meteo.service';
import { VariablesGlobalesService } from 'src/app/variables-globales.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
selector: 'app-layout',
templateUrl: './layout.component.html',
styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public utilisateurName;

  get options(): GridsterConfig {
    return this.layoutService.options;
  }

  get layout(): GridsterItem[] {
    return this.layoutService.layout;
  }

  constructor(
    private _variablesGlobales: VariablesGlobalesService,
    public layoutService: LayoutService,
    public _httpClient: HttpClient,
    public meteoService: MeteoService,
    private _router: Router,

  ) { }

  public connected = false;

  getUserData() {
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this._variablesGlobales.tokenVg,
      })
    };

    // get user db
    this._httpClient.get<any>('http://localhost:8080/users/me', httpOptions).subscribe(data => {
      console.log("getUserData :");
      console.log(data);
      this._variablesGlobales.servicesVg = data.services;
      this._variablesGlobales.userIdVg = data._id;
      //get widget db
      this._httpClient.get<any>('http://localhost:8080/widgets/', httpOptions).subscribe(data => {
        console.log("widgetData :");
        console.log(data);
        this._variablesGlobales.listeWidgetsVg = data;
        this.connected = true;
        this.layoutService.initServices();
      })
    })

  }

  ngOnInit() {
    setTimeout(() => {
      this.getUserData();
      if (this.connected == false) {
        setTimeout(() => {
          if (this.connected == false) {
            this._router.navigate(['/'])
          }
        }, 300)
      }
    }, 200);
  }

}