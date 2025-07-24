import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password= '';
  loginFailed = false;
  showPassword: boolean = false;

  constructor(private readonly authServices: AuthService, private  readonly router: Router) {}

  onLogin(): void {
    console.log('Attempting login:', this.email);

    const isValid = this.authServices.login(this.email, this.password);
    

    if (isValid) {
      console.log("Login successful");
      this.router.navigate(['/home']);
    } else {
      console.log("Login failed");
      this.loginFailed = true;
    }
  }


onsignup(){
  this.router.navigate(['/signup']);
}

}

