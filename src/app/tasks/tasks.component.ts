import { ITask } from './../common/interface/ITaks.interface';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IUser } from '../common/interface/IUser.interface';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../core/service/task.service';
import { SnackbarService } from '../core/service/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailComponent } from '../common/components/task-detail/task-detail.component';
import { IDialogTask } from '../common/interface/IDialogTask.interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {

  user: IUser = JSON.parse(sessionStorage.getItem('user')!);

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['id', 'title', 'description', 'status', 'actions'];
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions = [5, 10, 25, 50, 100]

  taskList: Array<ITask> = [];
  private taskService: TaskService = inject(TaskService);
  private snackbarService: SnackbarService = inject(SnackbarService);
  private dialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.getAllTasks();
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('user');
  }

  setDataSource(data: Array<ITask>): void{
    this.dataSource = new MatTableDataSource(data);
  }

  getAllTasks(): void {
    this.taskService.getAllTasks(this.user.id).subscribe({
      next: (response: Array<ITask>) => {
        this.taskList = response;
        this.setDataSource(this.taskList);
      },
      error: (err) => this.snackbarService.showSnackbar({message: err.message, style: 'error'})
    });
  }

  filter(ev: any): void {
    const filter = ev.target.value;
    if(!filter){
      this.setDataSource(this.taskList);
      return;
    }

    this.dataSource.filter = ev.target.value;
  }

  add():void {
    let task: ITask ={
      completed: false,
      description: '',
      id: '',
      userId: parseInt(this.user.id, 10),
      title: ''
    };

    const data: IDialogTask = {
      title: 'Agregar Tarea',
      isEditing: false,
      task
    }

    this.dialog.open(TaskDetailComponent, {
      data
    }).afterClosed().subscribe({
      next: (response: IDialogTask) => {
        this.taskService.createTask(response.task).subscribe({
          next: (response: ITask) => {
            this.taskList.push(response);
            this.setDataSource(this.taskList);
            this.snackbarService.showSnackbar({message: 'Tarea creada correctamente', style: 'success'})
          },
          error: (err) => this.snackbarService.showSnackbar({message: err.message, style: 'error'})
        });
      }
    });
  }

  edit(task: ITask): void{
    const data: IDialogTask = {
      title: 'Editar Tarea',
      isEditing: true,
      task
    }

    this.dialog.open(TaskDetailComponent, {
      data
    }).afterClosed().subscribe((updatedTask: ITask) => {
      if (!updatedTask) return;

      this.taskService.updateTask(updatedTask).subscribe();
  
      const index = this.taskList.findIndex(task => task.id === updatedTask.id);

      if (index === -1) return;
      
      this.taskList[index] = updatedTask;
      this.setDataSource(this.taskList);
      this.snackbarService.showSnackbar({message: 'Tarea actualizada correctamente', style: 'success'});
    });
  }

  delete(id: string): void {
    this.taskService.deleteTask(id).subscribe({
      next: (response: ITask) => {
        const index = this.taskList.findIndex(task => task.id === response.id);
        if (index === -1) return;
        this.taskList.splice(index, 1);
        this.setDataSource(this.taskList);
        this.snackbarService.showSnackbar({message: `Tarea ${response.title} eliminada correctamente`, style: 'success'})
      },
      error: (err) => this.snackbarService.showSnackbar({message: err.message, style: 'error'})
    });
  }

  complete(id: string):  void {
    const index = this.taskList.findIndex(task => task.id === id);

    if (index === -1) return;

    this.taskList[index].completed = true;

    this.snackbarService.showSnackbar({message: 'Tarea completada correctamente', style: 'success'});

  }

}
