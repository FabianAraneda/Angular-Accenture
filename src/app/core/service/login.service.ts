import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { IUser } from "src/app/common/interface/IUser.interface";
import { environment as env } from "src/environments/environment";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})

export class LoginService {

    isLogged = false;

    private http: HttpClient = inject(HttpClient);
    private router: Router = inject(Router);
    
    getAllUsers(): Observable<Array<IUser>> {
        return this.http.get<Array<IUser>>(`${env.baseUrl}users`);
    }

    setLoggedUser(user: IUser): void {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.isLogged = true;
        this.router.navigate(['tareas']);
    }
}