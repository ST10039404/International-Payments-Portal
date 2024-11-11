import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-welcome',
    template: `
    <div class="welcome-container">
      <mat-card>
        <mat-card-header>
          <div class="header-content">
            <mat-card-title class="title">Welcome to the International Payments Portal</mat-card-title>
          </div>
        </mat-card-header>
        
        <mat-card-content>
          <div class="welcome-message">
            <p class="tagline">Your Gateway to Global Transactions</p>
            <p class="subtitle">Fast. Secure. Reliable.</p>
          </div>

          <div class="action-buttons">
            <button mat-raised-button color="primary" (click)="navigate('login')" aria-label="Login">
              <mat-icon>login</mat-icon>
              Login
            </button>
            <button mat-raised-button color="accent" (click)="navigate('register')" aria-label="Register">
              <mat-icon>person_add</mat-icon>
              Register
            </button>
          </div>
        </mat-card-content>

        <mat-card-footer>
          <div class="footer">
            <p>&copy; {{ currentYear }} International Payments Portal. All rights reserved.</p>
          </div>
        </mat-card-footer>
      </mat-card>
    </div>
  `,
    styles: [`
    :host {
      display: block;
      height: 100%;
    }

    .welcome-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
      background: url('/assets/background.jpg') no-repeat center center;
      background-size: cover;
      color: #fff;
    }

    mat-card {
      max-width: 600px;
      width: 100%;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      background-color: rgba(255, 255, 255, 0.8); /* Transparent for blending */
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: linear-gradient(135deg, #007bb5, #00aaff); /* Softer blue gradient */
      color: #fff;
    }

    .title {
      font-size: 1.5rem;
      font-weight: 600;
    }

    .welcome-message {
      text-align: center;
      padding: 20px 0;
    }

    .welcome-message .tagline {
      font-size: 1.4rem;
      font-weight: bold;
      margin-bottom: 10px;
      color: #003f6b;
      text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2); /* Text shadow */
    }

    .welcome-message .subtitle {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 20px;
    }

    .action-buttons {
      display: flex;
      justify-content: space-between;
      gap: 20px;
    }

    .action-buttons button {
      width: 45%;
      font-size: 0.95rem;
      font-weight: 500;
      padding: 12px 16px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .action-buttons button:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    button mat-icon {
      margin-right: 8px;
    }

    mat-card-footer {
      text-align: center;
      padding: 10px 20px;
      background: rgba(255, 255, 255, 0.8); /* Light footer background */
    }

    .footer p {
      margin: 0;
      font-size: 0.8rem;
      color: rgba(0, 0, 0, 0.6);
    }
  `]
})
export class WelcomeComponent {
  currentYear: number = new Date().getFullYear();
  constructor(private router: Router) {}

  navigate(route: string) {
    this.router.navigate([`/auth/${route}`]);
  }
} 