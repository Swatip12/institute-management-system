import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { MessageService } from '../../services/message.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  template: `
    <h1>Dashboard</h1>
    
    <div class="dashboard-grid">
      <mat-card class="dashboard-card">
        <mat-card-header>
          <mat-icon mat-card-avatar>school</mat-icon>
          <mat-card-title>Courses</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="stat-number">{{ courseCount }}</div>
          <p>Total courses available</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button routerLink="/courses">View Courses</button>
          <button mat-raised-button color="primary" routerLink="/courses/new">Add Course</button>
        </mat-card-actions>
      </mat-card>

      <mat-card class="dashboard-card">
        <mat-card-header>
          <mat-icon mat-card-avatar>people</mat-icon>
          <mat-card-title>Students</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="stat-number">{{ studentCount }}</div>
          <p>Total registered students</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button routerLink="/students">View Students</button>
        </mat-card-actions>
      </mat-card>

      <mat-card class="dashboard-card">
        <mat-card-header>
          <mat-icon mat-card-avatar>message</mat-icon>
          <mat-card-title>Messages</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="stat-number">{{ messageCount }}</div>
          <p>Total messages received</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button routerLink="/messages">View Messages</button>
        </mat-card-actions>
      </mat-card>
    </div>

    <mat-card class="welcome-card">
      <mat-card-header>
        <mat-card-title>Welcome to Institute Management System</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>This system allows you to manage courses, view student information, and handle messages efficiently.</p>
        <ul>
          <li><strong>Courses:</strong> Create, edit, and delete courses</li>
          <li><strong>Students:</strong> View student information and details</li>
          <li><strong>Messages:</strong> Review messages from students and visitors</li>
        </ul>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .dashboard-card {
      text-align: center;
    }
    
    .stat-number {
      font-size: 3em;
      font-weight: bold;
      color: #3f51b5;
      margin: 10px 0;
    }
    
    .welcome-card {
      margin-top: 20px;
    }
    
    .welcome-card ul {
      text-align: left;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .welcome-card li {
      margin-bottom: 8px;
    }
  `]
})
export class DashboardComponent implements OnInit {
  courseCount = 0;
  studentCount = 0;
  messageCount = 0;

  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    forkJoin({
      courses: this.courseService.getAllCourses(),
      students: this.studentService.getAllStudents(),
      messages: this.messageService.getAllMessages()
    }).subscribe({
      next: (data: any) => {
        this.courseCount = data.courses.length;
        this.studentCount = data.students.length;
        this.messageCount = data.messages.length;
      },
      error: (error: any) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }
}