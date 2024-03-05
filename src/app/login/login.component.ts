import { Component, inject } from '@angular/core';
import { LoginService } from '../core/service/login.service';
import { IUser } from '../common/interface/IUser.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../core/service/snackbar.service';
import { emailValidator } from '../common/util/EmailValidator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private fb: FormBuilder = inject(FormBuilder);
  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required, emailValidator()],
    password: ['', Validators.required]
  });


  userList: Array<IUser> = [];
  private loginService: LoginService = inject(LoginService);

  private snackService: SnackbarService = inject(SnackbarService);

  get userValid(): boolean {
    return !this.loginForm.controls['email'].touched ? this.loginForm.controls['email'].valid : true;
  }

  login(): void {

    if(this.loginForm.invalid) {
      this.snackService.showSnackbar({ message: 'Usuario y/o Contraseña no válidos', style: 'error' });
      return;
    }

    this.getAllUsers();

    const user = this.findUser();

    if(!user){
      this.snackService.showSnackbar({ message: 'Usuario y/o Contraseña incorrectos', style: 'error' });
      return;
    }

    this.loginService.setLoggedUser(user);
  }

  getAllUsers(): void {
    this.loginService.getAllUsers().subscribe({
      next: (response: Array<IUser> )  => this.userList = response,
      error: (error) => this.snackService.showSnackbar({ message: error.message, style: 'error' })
    });
  }

  findUser(): IUser | undefined {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    
    const user = this.userList.find(u => u.email === email && u.password === password);
  
    return user;
  }

}
