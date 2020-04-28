import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { VariablesGlobalesService } from 'src/app/variables-globales.service';


@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  private accesKey : "f0aefb0ac8544f30840a7bdad1b14b1c";

  public temperature;
  public data;

  constructor(
    private _httpClient: HttpClient,
    private _variablesGlobales: VariablesGlobalesService
    ) { }

}