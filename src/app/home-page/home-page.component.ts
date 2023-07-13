import { Component, OnInit } from '@angular/core';
import { Elevel, Itask, ParseLevelToIndex, ParseLevelToString, getLevelLabelFeminino, getLevelLabelMasculino } from './task.interface';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskDialog } from '../new-task-dialog/new-task-dialog.component';
import { ApiTaskContract } from './api-task-contract.interface';
import { AppService } from '../app.service';
import { DeleteDialog } from '../delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePage implements OnInit {

  constructor(public dialog: MatDialog, private httpService: AppService,) { }

  displayedColumns: string[] = ['priority', 'description', 'complexity', 'relevance', 'impact', 'actions'];
  dataSource: Itask[] = [];
  taskBeforeEdit: Itask = <Itask> {};

  taskList: Itask[] = [
    {
      description: "Terminar o trabalho de Compiladores",
      complexity: Elevel.high,
      impact: Elevel.lowest,
      relevance: Elevel.low,
      priority: Elevel.low
    },
    {
      description: "Terminar o trabalho de Compiladores",
      complexity: Elevel.high,
      impact: Elevel.lowest,
      relevance: Elevel.low,
      priority: Elevel.lowest
    },
    {
      description: "Terminar o trabalho de Compiladores",
      complexity: Elevel.high,
      impact: Elevel.lowest,
      relevance: Elevel.low,
      priority: Elevel.medium
    },
    {
      description: "Terminar o trabalho de Inteligência Artificial",
      complexity: Elevel.high,
      impact: Elevel.medium,
      relevance: Elevel.high,
      priority: Elevel.highest
    },
    {
      description: "Trabalhar",
      complexity: Elevel.high,
      impact: Elevel.highest,
      relevance: Elevel.highest,
      priority: Elevel.high
    },
  ];

  ngOnInit(): void {
    this.refreshDataSource(this.taskList);
  }

  async getTaskListFromApi(){
    let apiResponse: any = await this.httpService.getRequest('/tasks');
    console.log(apiResponse.data);
  }

  refreshDataSource(taskList: Itask[]){
    taskList.sort(function comparar(a: Itask, b:Itask) {
      if (ParseLevelToIndex(a.priority) > ParseLevelToIndex(b.priority)) return -1;
      if (ParseLevelToIndex(a.priority) < ParseLevelToIndex(b.priority)) return 1;
      return 0;
    })
    this.dataSource = taskList;
  }


  getLevelLabelF(param:Elevel){
    return getLevelLabelFeminino(param);
  }

  getLevelLabelM(param:Elevel){
    return getLevelLabelMasculino(param);
  }


  newTask(){
    let newTask: Itask = {
      description: '',
      complexity: Elevel.medium,
      impact: Elevel.medium,
      relevance: Elevel.medium,
    };
    this.openTaskDialog(newTask, true);
  }

  updateTask(task: Itask){
    this.taskBeforeEdit = JSON.parse(JSON.stringify(task));
    this.openTaskDialog(task, false);
  }

  openTaskDialog(task: Itask, isNewTask: boolean) {
    const dialogRef = this.dialog.open(NewTaskDialog,{
      width: '600px',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      const body: ApiTaskContract = {
        description: result.description,
        complexity: ParseLevelToString(result.complexity),
        impact: ParseLevelToString(result.impact),
        relevance: ParseLevelToString(result.relevance),
      }
      if(!isNewTask) this.httpService.deleteRequest('/tasks', { description: this.taskBeforeEdit.description})

      this.httpService.postRequest('/tasks', body);
    });
  }

  deleteTask(task: Itask){
    const dialogRef = this.dialog.open(DeleteDialog,{
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) this.httpService.deleteRequest('/tasks', {description: task.description});
    });
  }
}
