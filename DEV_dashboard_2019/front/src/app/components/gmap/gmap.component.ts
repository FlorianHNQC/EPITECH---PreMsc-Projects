import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { VariablesGlobalesService } from 'src/app/variables-globales.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss']
})
export class GmapComponent implements OnInit {
  @Input() gmapParams: any;
  @Input() itemGmapId: any;

  latitude = 43.300;
  longitude = 5.400;
  locationChosen = false;
  public data;

  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
  }

  constructor(
    private _httpClient: HttpClient,
    private _variablesGlobales: VariablesGlobalesService,
    private sanitizer: DomSanitizer,
  ) { }

  public ville = "toulouse";
  public key = "AIzaSyBlwohvAyosK18Z7nc7_LiGuobJb9XRYVc"

  getCoor(ville): void {

  }

  changeGmapParams(): void {
    let lieu = prompt("Veuillez renseignez la ville");
    let url = "http://api.weatherstack.com/current?access_key=f0aefb0ac8544f30840a7bdad1b14b1c&query=" + lieu;
    this._httpClient.get(url)
        .subscribe(response => {
          this.data = response;
          this.latitude = 0;
          this.latitude = +this.data.location.lat;
          this.longitude = 0;
          this.longitude = +this.data.location.lon;
          let body = {}
          if (lieu != null) {
            body = {
              "params" : {
                "lat" : this.latitude,
                "lon" : this.longitude
              }
            };
          }
      
          const httpOptions = {
            headers : new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': this._variablesGlobales.tokenVg,
            })
          };
      
          this._httpClient.patch<any>('http://localhost:3000/widgets/' + this.itemGmapId, body, httpOptions).subscribe(response => {
            console.log("result of patch widhet ")
            console.log(response)
          })
        })
  }

  ngOnInit(): void {
    if (this.gmapParams.lat != undefined && this.gmapParams.lon != undefined) {
      this.latitude = this.gmapParams.lat
      this.longitude = this.gmapParams.lon
    }
  }

}
