import { Component, OnInit } from '@angular/core';
import { Elevel, Itask, ParseLevelToIndex, ParseLevelToString, ParseStringToLevel, getLevelLabelFeminino, getLevelLabelMasculino } from './task.interface';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskDialog } from '../new-task-dialog/new-task-dialog.component';
import { ApiTaskContract } from './api-task-contract.interface';
import { AppService } from '../app.service';
import { DeleteDialog } from '../delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePage implements OnInit {

  constructor(public dialog: MatDialog, private httpService: AppService,) { }

  displayedColumns: string[] = ['priority', 'description', 'complexity', 'relevance', 'impact', 'actions'];
  dataSource: Itask[] = [];
  taskBeforeEdit: Itask = <Itask> {};

  taskList: Itask[] = [];

  async ngOnInit(): Promise<void> {
    await this.getTaskListFromApi();
  }

  async getTaskListFromApi(){
    let apiResponse: any = await this.httpService.getRequest('/tasks');
    this.taskList = apiResponse || [];
    this.taskList.forEach((element: any) => {
      element.complexity = ParseStringToLevel(element.complexity);
      element.relevance = ParseStringToLevel(element.relevance);
      element.impact = ParseStringToLevel(element.impact);
      if(element.priority) element.priority = ParseStringToLevel(element.priority);
    });
    this.refreshDataSource(this.taskList);
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
      if(!isNewTask) this.httpService.deleteRequest('/tasks', { description: this.taskBeforeEdit.description}).then((res) => {
        this.ngOnInit();
      })

      this.httpService.postRequest('/tasks', body).then((res) => {
        this.ngOnInit();
      });
    });
  }

  deleteTask(task: Itask){
    const dialogRef = this.dialog.open(DeleteDialog,{
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) this.httpService.deleteRequest('/tasks', {description: task.description}).then((res) => {
        this.ngOnInit();
      });
    });
  }

  chooseBackgroundColor(task: Itask){
    if(task.priority == Elevel.highest) return 'highest';
    else if(task.priority == Elevel.high) return 'high';
    else if(task.priority == Elevel.medium) return 'medium';
    else if(task.priority == Elevel.low) return 'low';
    else return 'lowest';
  }
}
