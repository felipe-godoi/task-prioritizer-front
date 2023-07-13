import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Elevel, Itask, ParseLevelToIndex, getLevelLabelFeminino, getLevelLabelMasculino } from '../home-page/task.interface';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.scss']
})
export class NewTaskDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewTaskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Itask,
  ) { }

  ngOnInit(): void {
    this.description = this.data.description;
    this.impact = ParseLevelToIndex(this.data.impact);
    this.complexity = ParseLevelToIndex(this.data.complexity);
    this.relevance = ParseLevelToIndex(this.data.relevance);

    this.impactLevel = this.getLevel(this.impact);
    this.complexityLevel = this.getLevel(this.complexity);
    this.relevanceLevel = this.getLevel(this.relevance);

    this.impactLabel = getLevelLabelMasculino(this.impactLevel);
    this.complexityLabel = getLevelLabelFeminino(this.complexityLevel);
    this.relevanceLabel = getLevelLabelFeminino(this.relevanceLevel);
  }

  description: string = '';
  impact: number = 3;
  complexity: number = 3;
  relevance: number = 3;

  impactLevel: Elevel = Elevel.medium;
  complexityLevel: Elevel = Elevel.medium;
  relevanceLevel: Elevel = Elevel.medium;

  impactLabel: string = '';
  complexityLabel: string = '';
  relevanceLabel: string = '';

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.data.relevance = this.relevanceLevel;
    this.data.impact = this.impactLevel;
    this.data.complexity = this.complexityLevel;
    this.data.description = this.description;
    this.dialogRef.close(this.data);
  }

  onImpactChange(args: MatSliderChange){
    this.impact = args.value ?? 0;
    this.impactLevel = this.getLevel(this.impact);
    this.impactLabel = getLevelLabelMasculino(this.impactLevel);
  }

  onComplexityChange(args: MatSliderChange){
    this.complexity = args.value ?? 0;
    this.complexityLevel = this.getLevel(this.complexity);
    this.complexityLabel = getLevelLabelFeminino(this.complexityLevel);
  }

  onRelevanceChange(args: MatSliderChange){
    this.relevance = args.value ?? 0;
    this.relevanceLevel = this.getLevel(this.relevance);
    this.relevanceLabel = getLevelLabelFeminino(this.relevanceLevel);
  }

  getLevel(param:number){
    if(param == 5) return Elevel.highest;
    else if(param == 4) return Elevel.high;
    else if(param == 3) return Elevel.medium;
    else if(param == 2) return Elevel.low;
    else return Elevel.lowest;
  }

  disableSaveButton(){
    if(!this.description || this.description.trim() == "") return true;
    else return false;
  }
}
