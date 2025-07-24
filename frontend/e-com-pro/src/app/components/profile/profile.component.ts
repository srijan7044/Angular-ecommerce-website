import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-555-1234',
    address: '123 Main St, Cityville',
    bio: 'Hello! I love coding and coffee.'
  };

  onSave(): void {
    alert('Profile saved successfully!');
  }

  onLogout(): void {
    alert('Logging out...');
  }
}