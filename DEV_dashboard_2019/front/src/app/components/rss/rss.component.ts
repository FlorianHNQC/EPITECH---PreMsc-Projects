import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Feed } from '../../model/feed';

@Component({
  selector: 'app-rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.scss']
})
export class RssComponent implements OnInit {

  private url = "https://www.jeuxactu.com/rss/ja.rss";

  private rssToJsonServiceBaseUrl: string = 'https://rss2json.com/api.json?rss_url=';

  public result;

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this._http.get(this.rssToJsonServiceBaseUrl + this.url)
      .subscribe(response => {
        this.result = response;
        console.log(this.result);
      })
      this.reset()
  }

  reset() {
    console.log("reset");
    setTimeout(() => {
      this.ngOnInit();
    }, 808000);
  }

}
