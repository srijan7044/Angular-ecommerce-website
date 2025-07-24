import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

console.log("AuthService is running");

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly newUsers: { email: string; password: string }[] = [
    { email: 'user1@example.com', password: '12345678' },
    { email: 'user2@example.com', password: 'abcdefgh' }
  ];
  constructor (private readonly router: Router) { }
  // Auth state variable
  private readonly authState = new BehaviorSubject<boolean>(false);
  authStatus = this.authState.asObservable(); 

  register(email: string, password: string): void {
    this.newUsers.push({ email, password });
    alert("Sign Up sucessfull")
    console.log('User registered:', email);
  }

  login(email: string, password: string): boolean {
    console.log("AuthService: login called");
    const isValid = this.newUsers.some(user => user.email === email && user.password === password);
    console.log('Login result:', isValid);
    if (isValid) {
      localStorage.setItem('token', 'mock-token');
      this.authState.next(true);
    }
    else {  this.router.navigate([''])
}

    return isValid;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authState.next(false);
    this.router.navigate(['/login']);
    console.log("User logged out");
  }

  isLoggedIn(): boolean {
    return this.hasToken() &&  this.authState.getValue();   
  }
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
