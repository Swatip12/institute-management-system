import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSnackBarModule
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  instituteInfo: any = null;
  
  features = [
    {
      icon: 'school',
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of real-world experience and proven track records.'
    },
    {
      icon: 'schedule',
      title: 'Flexible Learning',
      description: 'Study at your own pace with our flexible scheduling options and online learning platforms.'
    },
    {
      icon: 'workspace_premium',
      title: 'Industry Certification',
      description: 'Earn recognized certifications that boost your career prospects and validate your skills.'
    },
    {
      icon: 'support_agent',
      title: '24/7 Support',
      description: 'Get help whenever you need it with our dedicated student support team available around the clock.'
    },
    {
      icon: 'trending_up',
      title: 'Career Growth',
      description: 'Access our career services including job placement assistance and professional networking opportunities.'
    },
    {
      icon: 'devices',
      title: 'Modern Technology',
      description: 'Learn using cutting-edge tools and technologies that are currently used in the industry.'
    }
  ];

  popularCourses = [
    {
      name: 'Full Stack Web Development',
      shortDescription: 'Master modern web development with React, Node.js, and cloud technologies.',
      duration: '6 months',
      level: 'Intermediate',
      icon: 'code'
    },
    {
      name: 'Data Science & Analytics',
      shortDescription: 'Learn Python, machine learning, and data visualization for data-driven insights.',
      duration: '8 months',
      level: 'Advanced',
      icon: 'analytics'
    },
    {
      name: 'Digital Marketing',
      shortDescription: 'Comprehensive digital marketing including SEO, social media, and content strategy.',
      duration: '4 months',
      level: 'Beginner',
      icon: 'campaign'
    }
  ];

  testimonials = [
    {
      name: 'Sarah Johnson',
      course: 'Web Development Graduate',
      content: 'The course completely transformed my career. I went from having no coding experience to landing a job as a full-stack developer at a tech startup. The instructors were amazing and the curriculum was very practical.'
    },
    {
      name: 'Michael Chen',
      course: 'Data Science Graduate',
      content: 'Excellence Institute provided me with the skills and confidence I needed to transition into data science. The hands-on projects and real-world applications made all the difference in my learning journey.'
    },
    {
      name: 'Emily Rodriguez',
      course: 'Digital Marketing Graduate',
      content: 'I was able to start my own digital marketing agency after completing the course. The knowledge I gained about SEO, social media marketing, and analytics has been invaluable for my business success.'
    }
  ];

  constructor(
    private http: HttpClient, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadInstituteInfo();
  }

  loadInstituteInfo(): void {
    this.http.get('http://localhost:8080/api/public/institute-info').subscribe({
      next: (info) => {
        this.instituteInfo = info;
      },
      error: (error) => {
        console.error('Error loading institute info:', error);
        // Use default values if API fails
      }
    });
  }

  learnMore(course: any): void {
    // Show course information in a snackbar
    console.log('Learn more about:', course.name);
    this.snackBar.open(
      `📚 ${course.name} - ${course.duration} (${course.level}) | ${course.shortDescription}`, 
      'Contact Us', 
      {
        duration: 8000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['course-info-snackbar']
      }
    ).onAction().subscribe(() => {
      this.router.navigate(['/contact'], { 
        queryParams: { 
          course: course.name,
          action: 'learn-more' 
        } 
      });
    });
  }

  enrollNow(course: any): void {
    // Show enrollment confirmation and navigate to contact form
    console.log('Enroll in:', course.name);
    this.snackBar.open(
      `🚀 Great choice! Redirecting you to enrollment form for ${course.name}`, 
      'OK', 
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['enrollment-snackbar']
      }
    );
    
    // Navigate after a short delay for better UX
    setTimeout(() => {
      this.router.navigate(['/contact'], { 
        queryParams: { 
          course: course.name,
          action: 'enroll' 
        } 
      });
    }, 1000);
  }
}
