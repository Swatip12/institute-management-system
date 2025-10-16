import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <div class="header">
      <h1>{{ isEditMode ? 'Edit Course' : 'Add New Course' }}</h1>
    </div>

    <mat-card>
      <mat-card-content>
        <form [formGroup]="courseForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline">
            <mat-label>Course Name</mat-label>
            <input matInput formControlName="name" placeholder="Enter course name">
            <mat-error *ngIf="courseForm.get('name')?.hasError('required')">
              Course name is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description" rows="4" placeholder="Enter course description"></textarea>
            <mat-error *ngIf="courseForm.get('description')?.hasError('required')">
              Description is required
            </mat-error>
          </mat-form-field>

          <div class="action-buttons">
            <button mat-button type="button" (click)="onCancel()">Cancel</button>
            <button mat-raised-button color="primary" type="submit" [disabled]="courseForm.invalid || submitting">
              {{ submitting ? 'Saving...' : (isEditMode ? 'Update' : 'Create') }}
            </button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .header {
      margin-bottom: 20px;
    }
    
    .action-buttons {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-top: 20px;
    }
  `]
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  isEditMode = false;
  courseId: number | null = null;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.courseId = +id;
      this.loadCourse();
    }
  }

  loadCourse(): void {
    if (this.courseId) {
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (course) => {
          this.courseForm.patchValue({
            name: course.name,
            description: course.description
          });
        },
        error: (error) => {
          console.error('Error loading course:', error);
          this.snackBar.open('Error loading course', 'Close', { duration: 3000 });
          this.router.navigate(['/courses']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      this.submitting = true;
      const courseData: Course = this.courseForm.value;

      const operation = this.isEditMode
        ? this.courseService.updateCourse(this.courseId!, courseData)
        : this.courseService.createCourse(courseData);

      operation.subscribe({
        next: () => {
          const message = this.isEditMode ? 'Course updated successfully' : 'Course created successfully';
          this.snackBar.open(message, 'Close', { duration: 3000 });
          this.router.navigate(['/courses']);
        },
        error: (error) => {
          console.error('Error saving course:', error);
          this.snackBar.open('Error saving course', 'Close', { duration: 3000 });
          this.submitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }
}