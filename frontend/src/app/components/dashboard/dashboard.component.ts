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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
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

  getActiveModules(): number {
    let modules = 0;
    if (this.courseCount > 0) modules++;
    if (this.studentCount > 0) modules++;
    if (this.messageCount > 0) modules++;
    return modules;
  }

  getProgressWidth(current: number, max: number): number {
    return Math.min((current / max) * 100, 100);
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
