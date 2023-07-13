import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePage } from './home-page/home-page.component';
import { MatTableModule } from '@angular/material/table';
import { NewTaskDialog } from './new-task-dialog/new-task-dialog.component';
import { MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { DeleteDialog } from './delete-dialog/delete-dialog.component';
import { InfoDialog } from './info-dialog/info-dialog.component';
import { InterceptorModule } from './interceptors/interceptor.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    NewTaskDialog,
    DeleteDialog,
    InfoDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    NgbModule,
    MatDialogModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    HttpClientModule,
    MatIconModule,
    InterceptorModule,
    MatProgressSpinnerModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
  entryComponents: [
    NewTaskDialog
  ]
})
export class AppModule { }
