import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariablesGlobalesService } from 'src/app/variables-globales.service';

@Component({
  selector: 'app-le-monde-rss',
  templateUrl: './le-monde-rss.component.html',
  styleUrls: ['./le-monde-rss.component.scss']
})
export class LeMondeRssComponent implements OnInit {
  @Input() paramsMondeRss: any;
  @Input() itemIdMondeRss: any;

  private urlCinema = "https://www.lemonde.fr/cinema/rss_full.xml";
  private urlActu = "https://www.lemonde.fr/rss/une.xml";

  private rssToJsonServiceBaseUrl: string = 'https://rss2json.com/api.json?rss_url=';

  public data;
  public actuOrCinema = "actu";

  constructor(
    private _httpClient: HttpClient,
    private _variablesGlobales: VariablesGlobalesService,
    ) { }

  ngOnInit(): void {
    if (this.paramsMondeRss != undefined) {
      if (this.paramsMondeRss.actuOrCinema != undefined) {
        this.actuOrCinema = this.paramsMondeRss.actuOrCinema
      }
    }
    this.getRssData();
    this.reset()
  }

  getRssData() {
    if (this.actuOrCinema == "actu") {
      this._httpClient.get(this.rssToJsonServiceBaseUrl + this.urlActu)
        .subscribe(response => {
          this.data = response;
          console.log(this.data);
        })
    }
    else {
      this._httpClient.get(this.rssToJsonServiceBaseUrl + this.urlCinema)
      .subscribe(response => {
        this.data = response;
        console.log(this.data);
      })
    }
  }

  changeMenu(changement) {
    if (changement == "actu") {
      this.actuOrCinema = "actu";
    }
    else {
      this.actuOrCinema = "cinema";
    }
    this.changeJeuxvideoRssParams(this.actuOrCinema)
    this.getRssData();
  }

  reset() {
    setTimeout(() => {
      this.getRssData();
      this.reset();
    }, 1000 * 300);
  }

  changeJeuxvideoRssParams(actuOrCinema): void {
    let body = {}
    body = {
      "params" : {
        "actuOrCinema": actuOrCinema
      }
    };

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this._variablesGlobales.tokenVg,
      })
    };

    this._httpClient.patch<any>('http://localhost:8080/widgets/' + this.itemIdMondeRss, body, httpOptions).subscribe(response => {
      console.log("result of patch widhet ")
      console.log(response)
    })
  }

}
