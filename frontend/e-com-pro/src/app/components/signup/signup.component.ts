import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email = '';
  password = '';
  showPassword = false;

  constructor(private readonly authServices: AuthService,private readonly router: Router) { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSignup() {
    console.log('Signup:', this.email, this.password);
        const isValid = this.authServices.login(this.email, this.password);
    

    if (isValid) {
      alert("Email Exist try to login");
      this.router.navigate(['/login']);
    } else {
      this.authServices.register(this.email, this.password);

    }
  

  }
}
