import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment as env } from "src/environments/environment";
import { Router } from "@angular/router";
import { ITask } from "src/app/common/interface/ITaks.interface";


@Injectable({
    providedIn: 'root'
})

export class TaskService {

    private http: HttpClient = inject(HttpClient);
    
    getAllTasks(id: string): Observable<Array<ITask>> {
        return this.http.get<Array<ITask>>(`${env.baseUrl}tasks?userId=${id}`);
    }

    createTask(newTask: ITask): Observable<any>{
        const body = this.buildBody(newTask);
        return this.http.post<any>(`${env.baseUrl}tasks`, body);
    }

    updateTask(updatedTask: ITask): Observable<any>{
        const body = this.buildBody(updatedTask);
        return this.http.put<any>(`${env.baseUrl}task/${updatedTask.id}`, body);
    }

    buildBody(updatedTask: ITask): Object {
        return {
            title: updatedTask.title,
            description: updatedTask.description,
            completed: updatedTask.completed,
            userId: updatedTask.userId
        }
    }

    deleteTask(id: string): Observable<ITask> {
        return this.http.delete<ITask>(`${env.baseUrl}tasks/${id}`);
    }
}