import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="sidenav.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Institute Management System</span>
    </mat-toolbar>

    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" opened class="sidenav">
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
            <mat-icon>dashboard</mat-icon>
            <span>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/courses" routerLinkActive="active">
            <mat-icon>school</mat-icon>
            <span>Courses</span>
          </a>
          <a mat-list-item routerLink="/students" routerLinkActive="active">
            <mat-icon>people</mat-icon>
            <span>Students</span>
          </a>
          <a mat-list-item routerLink="/messages" routerLinkActive="active">
            <mat-icon>message</mat-icon>
            <span>Messages</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="main-content">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: calc(100vh - 64px);
    }
    
    .sidenav {
      width: 250px;
    }
    
    .main-content {
      padding: 20px;
    }
    
    .active {
      background-color: rgba(0, 0, 0, 0.04);
    }
    
    mat-list-item {
      display: flex;
      align-items: center;
    }
    
    mat-list-item mat-icon {
      margin-right: 16px;
    }
  `]
})
export class AppComponent {
  title = 'Institute Management System';
}