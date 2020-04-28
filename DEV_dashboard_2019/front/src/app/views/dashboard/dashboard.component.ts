import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit(): void {
    // this.router.queryParams.subscribe(params => {
    //   this.variablesGlobales.loginVg = params.user;
    // });
    this.getUserHome();

  }

  getUserHome(){
    
  }
}
