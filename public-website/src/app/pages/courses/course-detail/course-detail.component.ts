import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Course } from '../../../models/course.model';
import { ApiService } from '../../../services/api.service';
import { LoadingService } from '../../../services/loading.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly apiService = inject(ApiService);
  private readonly loadingService = inject(LoadingService);
  private readonly errorHandler = inject(ErrorHandlerService);

  course: Course | null = null;
  courseId: number | null = null;
  isLoading = false;
  error: string | null = null;

  // Course features for display
  courseFeatures: string[] = [];
  coursePrerequisites: string[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseId = parseInt(id, 10);
      this.loadCourse();
    } else {
      this.error = 'Invalid course ID';
    }
  }

  async loadCourse() {
    if (!this.courseId) return;

    this.isLoading = true;
    this.error = null;
    this.loadingService.show('Loading course details...');

    try {
      const courseData = await this.apiService.getCourse(this.courseId).toPromise();
      this.course = courseData || null;
      if (this.course) {
        this.courseFeatures = this.course.features || [];
        this.coursePrerequisites = this.course.prerequisites || [];
      } else {
        this.error = 'Course not found';
      }
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to load course';
      this.errorHandler.showError(this.error);
      console.error('Error loading course:', error);
    } finally {
      this.isLoading = false;
      this.loadingService.hide();
    }
  }

  goBack() {
    this.router.navigate(['/courses']);
  }

  enrollInCourse() {
    // This would typically open an enrollment form or redirect to enrollment page
    // For now, we'll show an alert
    alert(`Enrollment for "${this.course?.name}" will be available soon. Please contact us for more information.`);
  }

  contactAboutCourse() {
    // Navigate to contact page with course pre-filled
    this.router.navigate(['/contact'], { 
      queryParams: { 
        course: this.course?.name,
        subject: `Inquiry about ${this.course?.name}` 
      } 
    });
  }

  getStarArray(): number[] {
    return [1, 2, 3, 4, 5];
  }

  isStarFilled(star: number): boolean {
    return star <= (this.course?.rating || 0);
  }

  formatPrice(price: number | undefined): string {
    if (!price || price === 0) return 'Free';
    return `$${price.toLocaleString()}`;
  }

  getLevelClass(): string {
    if (!this.course?.level) return '';
    return `level-${this.course.level.toLowerCase()}`;
  }
}