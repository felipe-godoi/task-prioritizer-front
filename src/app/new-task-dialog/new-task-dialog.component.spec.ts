import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskDialog } from './new-task-dialog.component';

describe('NewTaskDialogComponent', () => {
  let component: NewTaskDialog;
  let fixture: ComponentFixture<NewTaskDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTaskDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTaskDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
