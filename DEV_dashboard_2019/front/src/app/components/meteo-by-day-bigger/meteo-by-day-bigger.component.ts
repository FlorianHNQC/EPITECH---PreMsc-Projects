import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { VariablesGlobalesService } from 'src/app/variables-globales.service';

@Component({
  selector: 'app-meteo-by-day-bigger',
  templateUrl: './meteo-by-day-bigger.component.html',
  styleUrls: ['./meteo-by-day-bigger.component.scss']
})
export class MeteoByDayBiggerComponent implements OnInit {
  @Input() meteoParamsBigger: any;
  @Input() itemIdBigger: any;

  public data;
  public ville;

  constructor(    
    private _httpClient: HttpClient,
    private _variablesGlobales: VariablesGlobalesService,
    ) { }

    ngOnInit(): void {
      // this.meteoService.initWidgetWithParam();
      if (this.meteoParamsBigger.ville != undefined) {
        this.ville = this.meteoParamsBigger.ville
      }
      this.getWeatherData(this.ville);
      this.refresh();
    }
  
    refresh() {
      setTimeout(() => {
        this.getWeatherData(this.ville);
        this.refresh()
      }, 1000*500);
    }

  getWeatherData(ville): void {
    console.log("villle : " + ville)
    let url = "http://api.weatherstack.com/current?access_key=f0aefb0ac8544f30840a7bdad1b14b1c&query=" + ville;
    this._httpClient.get(url)
        .subscribe(response => {
          this.data = response;
          console.log("data weather :")
          console.log(this.data)
        })
  }

  changeMeteoParams(): void {
    let ville = prompt("Veuillez renseignez la ville");
    let body = {}
    if (ville != null) {
      body = {
        "params" : {
          "ville" : ville
        }
      };
    }

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this._variablesGlobales.tokenVg,
      })
    };

    this._httpClient.patch<any>('http://localhost:8080/widgets/' + this.itemIdBigger, body, httpOptions).subscribe(response => {
      console.log("result of patch widhet ")
      console.log(response)
      this.getWeatherData(ville);
    })
  }

}
