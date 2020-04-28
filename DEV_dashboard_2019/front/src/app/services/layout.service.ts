import { Injectable, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem, GridsterComponentInterface, GridsterItemComponentInterface } from 'angular-gridster2';
import { UUID } from 'angular2-uuid';
import { VariablesGlobalesService } from 'src/app/variables-globales.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LayoutService {

  // ---------------------- VARIABLE GRIDSTER ---------------------- //
  public layout: GridsterItem[] = [ ];

  public options: GridsterConfig = {
    itemChangeCallback: this.itemChange,
    itemResizeCallback: LayoutService.itemResize,
    draggable: {
      enabled: true,
    },
    pushItems: true,
    resizable: {
      enabled: true,
    },
    minRows:8,
    minCols: 12,
    _variablesGlobales: this._variablesGlobales
    // maxRows : 8,
    // maxCols : 12,
  };

  // ---------------------- VARIABLE GLOBALE ---------------------- //
  public id = "";
  public navBar = "serviceNavBar";
  public meteoAlrdySub = false;
  public rssAlrdySub = false;
  public gmapAlrdySub = false;
  public todolistAlrdySub = false;

  public testJson;

  public listeService;

  public listeServiceTemplate = [{
    "name" : "meteo",
    "activate" : "no"
  },
  {
    "name" : "rss",
    "activate" : "no"
  },
  {
    "name" : "gmap",
    "activate" : "no"
  },
  {
    "name" : "todolist",
    "activate" : "no"
  }
];

  public allWidget = [ 
    {
      cols: 2,
      rows : 3,
      x: 0,
      y: 0,
      name: "meteoByDay",
      service: "meteo",
      params: {}
    },
    {
      cols: 3,
      rows : 5,
      x: 0,
      y: 0,
      name: "gmap",
      service: "gmap",
      params: {}
    },
    {
      cols: 3,
      rows : 6,
      x: 0,
      y: 0,
      name: "leMondeRss",
      service: "rss",
      params: {}
    },
    {
      cols: 3,
      rows : 6,
      x: 0,
      y: 0,
      name: "jeuxvideoRss",
      service: "rss",
      params: {}
    },
    {
      cols: 3,
      rows : 6,
      x: 0,
      y: 0,
      name: "todolist",
      service: "todolist",
      params: {}
    },
    {
      cols: 5,
      rows : 3,
      x: 0,
      y: 0,
      name: "meteoByDayBigger",
      service: "meteo",
      params: {}
    }
  ];

  // ---------------------- CONSTRUCTOR ---------------------- //
  constructor(
    private _httpClient: HttpClient,
    private _variablesGlobales: VariablesGlobalesService,
    private _router: Router,
  ) { }

  // ---------------------- SRC GLOBALE ---------------------- //
  initServices() {
    console.log("yre");
    console.log(this.listeService)
    //init id
    this.id = this._variablesGlobales.userIdVg;
    //init service
    if (this._variablesGlobales.servicesVg.length != 0) {
      this.listeService = JSON.parse(this._variablesGlobales.servicesVg)
    }
    else {
      this.listeService = this.listeServiceTemplate;
    }
    for (let j = 0; j < this.listeService.length; j++) {
      if (this.listeService[j].activate == "yes") {
        this.initSub(this.listeService[j]);
      }
    }
    //init widget
    if (this._variablesGlobales.listeWidgetsVg.length != 0) {
      for (let i = 0; i < this._variablesGlobales.listeWidgetsVg.length; i++) {
        if (this._variablesGlobales.listeWidgetsVg[i].owner == this._variablesGlobales.userIdVg ) {
          this.initWidgetItem(this._variablesGlobales.listeWidgetsVg[i])
        }
      }
    }
  }

  initSub(service) {
    if (service.name == "meteo") {
      this.meteoAlrdySub = true;
    }
    if (service.name == "rss") {
      this.rssAlrdySub = true;
    }
    if (service.name == "gmap") {
      this.gmapAlrdySub = true;
    }
    if (service.name == "todolist") {
      this.todolistAlrdySub = true;
    }
  }

  initWidgetItem(widget) {
    console.log(widget);
    let widgetInitialise = {
      id: widget._id,
      cols: widget.position.cols,
      rows : widget.position.rows,
      x: widget.position.x,
      y: widget.position.y,
      name: widget.name,
      service: widget.service,
      owner: widget.owner,
      params : widget.params
    }
    this.layout.push(widgetInitialise)
  }

  changeNavBar() {
    if (this.navBar == "serviceNavBar") {
      this.navBar = "widgetNavBar";
    } else {
      this.navBar = "serviceNavBar"
    }
  }

  logOut() {
    const body = {};
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this._variablesGlobales.tokenVg,
      })
    };
    console.log("httpOptions ;");
    console.log(httpOptions);
    this._httpClient.post<any>('http://localhost:8080/users/logout',body, httpOptions).subscribe(data => {
      alert("Vous etes bien déconnecté");
      this.renitGlobalData();
    })
    // this._variablesGlobales.tokenVg = "";
    this._router.navigate(['/'])
  }

  renitGlobalData() {
    this._variablesGlobales.servicesVg = "";
    this._variablesGlobales.loginVg = "";
    this._variablesGlobales.emailVg = "";
    this._variablesGlobales.grilleVg = "";
    this._variablesGlobales.tokenVg = "";
    this._variablesGlobales.listeWidgetsVg = [];
    this.meteoAlrdySub = false;
    this.rssAlrdySub = false;
    this.gmapAlrdySub = false;
    this.listeService = [];
    this.layout = [];
  }

  pushServicesToUserDb() {
    const servicesString = JSON.stringify(this.listeService);
    
    const body = {
      "services": servicesString
    };

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this._variablesGlobales.tokenVg,
      })
    };

    this._httpClient.patch<any>('http://localhost:8080/users/me', body, httpOptions).subscribe(data => {
      this._variablesGlobales.servicesVg = data.services;
      this.listeService = JSON.parse(servicesString);
      console.log("listeservice tst:");
      console.log(this.listeService);
    })

  }

  pushWidgetToDb(widget) {
    const body = {
      "name": widget.name,
      "ower": widget.owner,
      "position" : {
        "cols" : widget.cols,
        "rows" : widget.rows,
        "x" : widget.x,
        "y" : widget.y
      },
      "service" : widget.service,
      "params" : {

      }
    };

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this._variablesGlobales.tokenVg,
      })
    };

    this._httpClient.post<any>('http://localhost:8080/widgets', body, httpOptions).subscribe(data => {
      console.log("result of post widhet ")
      console.log(data)
    })
  }

  patchWidget(widget) {
    const body = {
      "name": widget.name,
      "ower": widget.owner,
      "position" : {
        "cols" : widget.cols,
        "rows" : widget.rows,
        "x" : widget.x,
        "y" : widget.y
      },
      "params" : {

      }
    };

    let params = new HttpParams();
    params
      .set("id", this._variablesGlobales.userIdVg)

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this._variablesGlobales.tokenVg,
      })
    };

    this._httpClient.patch<any>('http://localhost:8080/widgets', body, httpOptions).subscribe(data => {
      console.log("result of patch widhet ")
      console.log(data)
    })
  }

  subMeteo() {
    if (this.meteoAlrdySub == false) {
      this.listeService[0].activate = "yes";
      // this._variablesGlobales.servicesVg.push("meteo");
      this.meteoAlrdySub = true;
    } else {
      this.listeService[0].activate = "no";
      // this._variablesGlobales.servicesVg.splice(this._variablesGlobales.servicesVg.find(element => element == "meteo"), 1)
      this.meteoAlrdySub = false;
    }
    this.pushServicesToUserDb();
  }

  subRss() {
    if (this.rssAlrdySub == false) {
      this.listeService[1].activate = "yes";
      // this._variablesGlobales.servicesVg.push("rss");
      this.rssAlrdySub = true;
    } else {
      this.listeService[1].activate = "no";
      // this._variablesGlobales.servicesVg.splice(this._variablesGlobales.servicesVg.find(element => element == "rss"), 1)
      this.rssAlrdySub = false;
    }
    this.pushServicesToUserDb();
  }

  subgmap() {
    if (this.gmapAlrdySub == false) {
      this.listeService[2].activate = "yes";
      // this._variablesGlobales.servicesVg.push("gmap");
      this.gmapAlrdySub = true;
    } else {
      this.listeService[2].activate = "no";
      // this._variablesGlobales.servicesVg.splice(this._variablesGlobales.servicesVg.find(element => element == "gmap"), 1)
      this.gmapAlrdySub = false;
    }
    this.pushServicesToUserDb();
  }

  subTodolist() {
    if (this.todolistAlrdySub == false) {
      this.listeService[3].activate = "yes";
      // this._variablesGlobales.servicesVg.push("gmap");
      this.todolistAlrdySub = true;
    } else {
      this.listeService[3].activate = "no";
      // this._variablesGlobales.servicesVg.splice(this._variablesGlobales.servicesVg.find(element => element == "gmap"), 1)
      this.todolistAlrdySub = false;
    }
    this.pushServicesToUserDb();
  }

  addWidget(widget) {
    console.log(widget)

    const body = {
      "name": widget.name,
      "ower": widget.owner,
      "position" : {
        "cols" : widget.cols,
        "rows" : widget.rows,
        "x" : widget.x,
        "y" : widget.y
      },
      "service" : widget.service,
      "params" : widget.params
    };

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this._variablesGlobales.tokenVg,
      })
    };

    this._httpClient.post<any>('http://localhost:8080/widgets', body, httpOptions).subscribe(data => {
      let widgetInitialise = {
        id: data._id,
        cols: widget.cols,
        rows : widget.rows,
        x: widget.x,
        y: widget.y,
        name: widget.name,
        service: widget.service,
        owner: this._variablesGlobales.emailVg,
        token: this._variablesGlobales.tokenVg
      }
      console.log("widgetInitialise")
      console.log(widgetInitialise)
      this.layout.push(widgetInitialise)
    })
  }

  deleteItem(id): void {

    let url = 'http://localhost:8080/widgets/' + id;

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this._variablesGlobales.tokenVg,
      }),
    };

    this._httpClient.delete<any>(url, httpOptions).subscribe(data => {
      console.log("result of delet widhet ")
      console.log(data)
      const item = this.layout.find(d => d.id === id);
      this.layout.splice(this.layout.indexOf(item), 1);
    })
    
  }

    // ---------------------- SRC GRIDSTER ---------------------- //
    itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
      console.info('itemChanged', item, itemComponent);
    }
  
    static itemResize(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
      console.info('itemResized', item, itemComponent);
    }
  
    // static itemInit(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    //   console.info('itemInitialized', item, itemComponent);
    // }
  
    // static itemRemoved(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    //   console.info('itemRemoved', item, itemComponent);
    // }

  ngOnInit() {
  }

}