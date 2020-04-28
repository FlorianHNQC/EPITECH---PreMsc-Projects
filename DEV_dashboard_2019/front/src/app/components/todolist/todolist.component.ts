import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariablesGlobalesService } from 'src/app/variables-globales.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {


  constructor(
    private _httpClient: HttpClient,
    private _variablesGlobales: VariablesGlobalesService,
  ) { }

  ngOnInit(): void {
    this.getTaskFromDb();
  }

  public listTask;
  public grogros = "teetetete";
  public response;

  addTask() {
    let task = prompt("Votre nouvelle tache :");
    console.log("add task");
    console.log(task);
    if(task.length != 0) {
    //APPEL ROUTE
      let tashToPush = {
        "description" : task,
        "completed" : false
      }
      this.pushTaskToDb(task);
    }
  }

  delTask(task) {
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this._variablesGlobales.tokenVg,
      })
    };

    this._httpClient.delete<any>('http://localhost:8080/tasks/' + task._id, httpOptions).subscribe(response => {
      console.log("result of delete tasks ")
      console.log(response)
      this.ngOnInit();
    })
  }

  taskDoneUndone(task) {
    let completed = task.completed;
    let id = task._id;
    if (completed == true) {
      completed = false
    } else {
      completed = true
    }
    this.patchTask(id, completed);
  } 

  patchTask(taskId, completed) {
    console.log("alelr laaaa :")
    console.log(completed);
    let body = {
      "completed" : completed
    };

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this._variablesGlobales.tokenVg,
      })
    };

    this._httpClient.patch<any>('http://localhost:8080/tasks/' + taskId, body, httpOptions).subscribe(response => {
      console.log("result of patch tasks ")
      console.log(response)
    })
  }

  pushTaskToDb(task) {
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this._variablesGlobales.tokenVg,
      })
    };
    const body = {
      "description" : task
    };
    this._httpClient.post<any>('http://localhost:8080/tasks', body, httpOptions).subscribe(data => {
      this.response = data;
      this.listTask.push(this.response);
      console.log("allr al")
      console.log(data)
    })
  }
  
  getTaskFromDb() {
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this._variablesGlobales.tokenVg,
      })
    };

    // get user db
    this._httpClient.get<any>('http://localhost:8080/tasks', httpOptions).subscribe(data => {
      console.log("Tasks :");
      this._variablesGlobales.tasksVg = data;
      this.listTask = data;
    })
  }

}
