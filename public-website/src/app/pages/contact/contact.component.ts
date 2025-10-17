import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AnalyticsService } from '../../services/analytics.service';
import { ContactForm } from '../../models/contact-form.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly apiService = inject(ApiService);
  private readonly analyticsService = inject(AnalyticsService);

  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      courseInterest: ['']
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitError = false;
      this.submitSuccess = false;

      const formData: ContactForm = this.contactForm.value;

      // Track form submission attempt
      this.analyticsService.trackCtaClick('contact_form_submit', 'contact_page', {
        subject: formData.subject,
        hasPhone: !!formData.phone,
        hasCourseInterest: !!formData.courseInterest
      });

      this.apiService.submitContactForm(formData).subscribe({
        next: (response) => {
          this.submitSuccess = true;
          this.isSubmitting = false;
          this.contactForm.reset();
          
          // Track successful form submission
          this.analyticsService.trackFormSubmission('contact_form', 'contact_page', true);
        },
        error: (error) => {
          console.error('Error submitting contact form:', error);
          this.submitError = true;
          this.isSubmitting = false;
          
          // Track failed form submission
          this.analyticsService.trackFormSubmission('contact_form', 'contact_page', false);
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.contactForm.markAllAsTouched();
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }
}