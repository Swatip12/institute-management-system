import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="contact-container">
      <div class="contact-header">
        <h1>📞 Get in Touch</h1>
        <p>Ready to start your learning journey? We're here to help!</p>
      </div>

      <div class="contact-content">
        <div class="contact-info">
          <div class="info-card">
            <mat-icon>location_on</mat-icon>
            <div>
              <h3>Visit Us</h3>
              <p>123 Education Street<br>Learning City, LC 12345</p>
            </div>
          </div>
          
          <div class="info-card">
            <mat-icon>phone</mat-icon>
            <div>
              <h3>Call Us</h3>
              <p>+1 (555) 123-4567<br>Mon-Fri: 9AM-6PM</p>
            </div>
          </div>
          
          <div class="info-card">
            <mat-icon>email</mat-icon>
            <div>
              <h3>Email Us</h3>
              <p>info&#64;excellenceinstitute.com<br>admissions&#64;excellenceinstitute.com</p>
            </div>
          </div>
        </div>

        <mat-card class="contact-form-card">
          <mat-card-header>
            <mat-card-title>Send us a Message</mat-card-title>
            <mat-card-subtitle>We'll get back to you within 24 hours</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
              <div class="form-row">
                <mat-form-field appearance="outline" class="half-width">
                  <mat-label>Full Name</mat-label>
                  <input matInput formControlName="name" placeholder="Your full name">
                  <mat-icon matSuffix>person</mat-icon>
                  <mat-error *ngIf="contactForm.get('name')?.hasError('required')">
                    Name is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="half-width">
                  <mat-label>Email Address</mat-label>
                  <input matInput type="email" formControlName="email" placeholder="your.email&#64;example.com">
                  <mat-icon matSuffix>email</mat-icon>
                  <mat-error *ngIf="contactForm.get('email')?.hasError('required')">
                    Email is required
                  </mat-error>
                  <mat-error *ngIf="contactForm.get('email')?.hasError('email')">
                    Please enter a valid email
                  </mat-error>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="half-width">
                  <mat-label>Phone Number</mat-label>
                  <input matInput formControlName="phone" placeholder="(555) 123-4567">
                  <mat-icon matSuffix>phone</mat-icon>
                </mat-form-field>

                <mat-form-field appearance="outline" class="half-width">
                  <mat-label>Course Interest</mat-label>
                  <mat-select formControlName="courseInterest">
                    <mat-option value="">Select a course</mat-option>
                    <mat-option value="web-development">Web Development</mat-option>
                    <mat-option value="data-science">Data Science</mat-option>
                    <mat-option value="mobile-development">Mobile Development</mat-option>
                    <mat-option value="ai-ml">AI & Machine Learning</mat-option>
                    <mat-option value="cybersecurity">Cybersecurity</mat-option>
                    <mat-option value="other">Other</mat-option>
                  </mat-select>
                  <mat-icon matSuffix>school</mat-icon>
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Subject</mat-label>
                <input matInput formControlName="subject" placeholder="What's this about?">
                <mat-icon matSuffix>subject</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Message</mat-label>
                <textarea 
                  matInput 
                  formControlName="message" 
                  rows="5" 
                  placeholder="Tell us more about your inquiry, goals, or questions...">
                </textarea>
                <mat-icon matSuffix>message</mat-icon>
                <mat-error *ngIf="contactForm.get('message')?.hasError('required')">
                  Message is required
                </mat-error>
              </mat-form-field>

              <div class="form-actions">
                <button 
                  mat-raised-button 
                  color="primary" 
                  type="submit" 
                  [disabled]="contactForm.invalid || submitting"
                  class="submit-btn">
                  <mat-spinner diameter="20" *ngIf="submitting"></mat-spinner>
                  <mat-icon *ngIf="!submitting">send</mat-icon>
                  {{ submitting ? 'Sending...' : 'Send Message' }}
                </button>
              </div>
            </form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .contact-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .contact-header {
      text-align: center;
      margin-bottom: 50px;
    }

    .contact-header h1 {
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      font-size: 3rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 0 16px 0;
    }

    .contact-header p {
      font-size: 1.3rem;
      color: #666;
      margin: 0;
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 40px;
      align-items: start;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .info-card {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 24px;
      background: white;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      border-left: 4px solid #667eea;
    }

    .info-card mat-icon {
      font-size: 2rem !important;
      width: 2rem !important;
      height: 2rem !important;
      color: #667eea;
    }

    .info-card h3 {
      margin: 0 0 8px 0;
      color: #333;
      font-weight: 600;
    }

    .info-card p {
      margin: 0;
      color: #666;
      line-height: 1.5;
    }

    .contact-form-card {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
      border-radius: 20px !important;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 20px;
    }

    .form-row {
      display: flex;
      gap: 20px;
    }

    .half-width {
      flex: 1;
    }

    .full-width {
      width: 100%;
    }

    .form-actions {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }

    .submit-btn {
      padding: 12px 40px !important;
      border-radius: 25px !important;
      font-weight: 600 !important;
      font-size: 1.1rem !important;
      text-transform: none !important;
    }

    @media (max-width: 768px) {
      .contact-content {
        grid-template-columns: 1fr;
        gap: 30px;
      }

      .form-row {
        flex-direction: column;
        gap: 16px;
      }

      .contact-header h1 {
        font-size: 2.5rem;
      }
    }
  `]
})
export class ContactFormComponent {
  contactForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: [''],
      message: ['', [Validators.required]],
      courseInterest: ['']
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.submitting = true;
      
      const formData = this.contactForm.value;
      
      this.http.post('http://localhost:8080/api/public/contact', formData).subscribe({
        next: (response: any) => {
          this.snackBar.open(response.message || 'Message sent successfully! We\'ll get back to you soon.', 'Close', {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
          this.contactForm.reset();
          this.submitting = false;
        },
        error: (error) => {
          console.error('Error sending message:', error);
          this.snackBar.open('Failed to send message. Please try again later.', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
          this.submitting = false;
        }
      });
    }
  }
}