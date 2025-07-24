import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './components/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  ngOnInit() {
    if (true) {
      this.router.navigate(['/login']);
    }
  }
}
