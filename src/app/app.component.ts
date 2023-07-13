import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialog } from './info-dialog/info-dialog.component';
import { LoadingService } from './loading.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'task-prioritizer';
  loading: boolean = false;
  constructor(public dialog: MatDialog, private _loading: LoadingService){

  }

  ngOnInit() {
    this.listenToLoading();
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  openInfoDialog(){
    const dialogRef = this.dialog.open(InfoDialog,{
      width: '450px'
    });
  }
}
