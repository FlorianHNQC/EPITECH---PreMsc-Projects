import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { Feed } from '../model/feed';

@Injectable({
  providedIn: 'root'
})
export class RssService {

  constructor() { }
}
