import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialog } from './info-dialog/info-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task-prioritizer';
  constructor(public dialog: MatDialog,){

  }

  openInfoDialog(){
    const dialogRef = this.dialog.open(InfoDialog,{
      width: '450px'
    });
  }
}
