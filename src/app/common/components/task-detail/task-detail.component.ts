import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITask } from '../../interface/ITaks.interface';
import { IDialogTask } from '../../interface/IDialogTask.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/core/service/snackbar.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {

  dialogData!: IDialogTask;

  private snackbarService: SnackbarService = inject(SnackbarService);

  private fb: FormBuilder = inject(FormBuilder);
  taskForm: FormGroup = this.fb.group({
    title: ['',  Validators.required],
    description: ['', Validators.required]
  });

  public dialogRef: MatDialogRef<TaskDetailComponent> = inject(MatDialogRef<TaskDetailComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogTask)
  {
    this.dialogData = {...data};
    this.taskForm.controls[ "title" ].setValue(this.dialogData.task.title);
    this.taskForm.controls[ "description" ].setValue(this.dialogData.task.description);
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }

  save():void {
    if(this.taskForm.invalid){
      this.snackbarService.showSnackbar({message: 'Debe ingresar un titulo y una descripción válidos', style: 'error'});
      return;
    }

    this.dialogData.task.title = this.taskForm.get( "title" )! .value;
    this.dialogData.task.description = this.taskForm.get( "description" )!.value;
    this.dialogRef.close(this.dialogData);
  }

}
