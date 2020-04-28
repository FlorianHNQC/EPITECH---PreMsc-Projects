import { Injectable } from '@angular/core';
import { GridsterConfig, GridsterItem, GridsterComponentInterface, GridsterItemComponentInterface } from 'angular-gridster2';

@Injectable({
  providedIn: 'root'
})
export class VariablesGlobalesService {
  loginVg: string;
  emailVg: string;
  grilleVg: string;
  tokenVg: string;
  servicesVg: string;
  listeWidgetsVg: GridsterItem[];
  userIdVg;
  tasksVg;
  constructor() { }
}
