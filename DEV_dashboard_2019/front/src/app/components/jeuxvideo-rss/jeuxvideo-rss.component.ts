import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariablesGlobalesService } from 'src/app/variables-globales.service';

@Component({
  selector: 'app-jeuxvideo-rss',
  templateUrl: './jeuxvideo-rss.component.html',
  styleUrls: ['./jeuxvideo-rss.component.scss']
})
export class JeuxvideoRssComponent implements OnInit {
  @Input() paramsRss: any;
  @Input() itemIdRss: any;

  private urlActu = "https://www.jeuxactu.com/rss/ja.rss";
  private urlActuPc = "https://www.jeuxactu.com/rss/pc.rss";

  private rssToJsonServiceBaseUrl: string = 'https://rss2json.com/api.json?rss_url=';

  public data;
  public actuOrBestGame = "actu";

  constructor(
    private _httpClient: HttpClient,
    private _variablesGlobales: VariablesGlobalesService,
    ) { }

  ngOnInit(): void {
    if (this.paramsRss != undefined) {
      if (this.paramsRss.actuOrBestGame != undefined) {
        this.actuOrBestGame = this.paramsRss.actuOrBestGame
      }
    }
    this.getRssData();
    this.reset()
  }

  getRssData() {
    if (this.actuOrBestGame == "actu") {
      this._httpClient.get(this.rssToJsonServiceBaseUrl + this.urlActu)
        .subscribe(response => {
          this.data = response;
          console.log(this.data);
        })
    }
    else {
      this._httpClient.get(this.rssToJsonServiceBaseUrl + this.urlActuPc)
      .subscribe(response => {
        this.data = response;
        console.log(this.data);
      })
    }
  }

  changeMenu(changement) {
    if (changement == "actu") {
      this.actuOrBestGame = "actu";
    }
    else {
      this.actuOrBestGame = "actuPc";
    }
    this.changeJeuxvideoRssParams(this.actuOrBestGame)
    this.getRssData();
  }

  reset() {
    setTimeout(() => {
      this.getRssData();
      this.reset();
    }, 1000 * 300);
  }

  changeJeuxvideoRssParams(actuOrBestGame): void {
    let body = {}
    body = {
      "params" : {
        "actuOrBestGame": actuOrBestGame
      }
    };

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this._variablesGlobales.tokenVg,
      })
    };

    this._httpClient.patch<any>('http://localhost:8080/widgets/' + this.itemIdRss, body, httpOptions).subscribe(response => {
      console.log("result of patch widhet ")
      console.log(response)
    })
  }

}
