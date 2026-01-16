import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  values = [
    {
      icon: 'school',
      title: 'Excellence in Education',
      description: 'We strive for the highest standards in teaching and learning, ensuring every student receives world-class education.'
    },
    {
      icon: 'lightbulb',
      title: 'Innovation',
      description: 'We embrace new technologies and teaching methods to provide cutting-edge learning experiences.'
    },
    {
      icon: 'diversity_3',
      title: 'Inclusivity',
      description: 'We welcome students from all backgrounds and create an environment where everyone can thrive.'
    },
    {
      icon: 'handshake',
      title: 'Integrity',
      description: 'We maintain the highest ethical standards in all our interactions and educational practices.'
    },
    {
      icon: 'psychology',
      title: 'Student-Centered',
      description: 'Every decision we make is focused on enhancing the student experience and success.'
    },
    {
      icon: 'public',
      title: 'Global Perspective',
      description: 'We prepare students for success in an interconnected world with international standards.'
    }
  ];

  teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      title: 'Founder & CEO',
      bio: 'With over 20 years in education and technology, Dr. Johnson leads our vision of transforming lives through quality education.',
      expertise: ['Educational Leadership', 'Technology Integration', 'Curriculum Development'],
      icon: 'person'
    },
    {
      name: 'Prof. Michael Chen',
      title: 'Academic Director',
      bio: 'Former MIT professor with expertise in computer science and data analytics, ensuring our curriculum stays cutting-edge.',
      expertise: ['Computer Science', 'Data Analytics', 'Research'],
      icon: 'person'
    },
    {
      name: 'Emily Rodriguez',
      title: 'Student Success Manager',
      bio: 'Dedicated to ensuring every student achieves their goals through personalized support and career guidance.',
      expertise: ['Student Support', 'Career Counseling', 'Program Management'],
      icon: 'person'
    }
  ];

  statistics = [
    {
      icon: 'people',
      number: '5,000+',
      label: 'Graduates',
      description: 'Successful alumni worldwide'
    },
    {
      icon: 'school',
      number: '50+',
      label: 'Courses',
      description: 'Comprehensive programs'
    },
    {
      icon: 'work',
      number: '95%',
      label: 'Job Placement',
      description: 'Within 6 months of graduation'
    },
    {
      icon: 'star',
      number: '4.9/5',
      label: 'Student Rating',
      description: 'Average satisfaction score'
    }
  ];

  timeline = [
    {
      year: '2010',
      title: 'Foundation',
      description: 'Excellence Institute was founded with a vision to provide world-class education in technology and business.'
    },
    {
      year: '2013',
      title: 'First Campus',
      description: 'Opened our flagship campus with state-of-the-art facilities and modern learning environments.'
    },
    {
      year: '2016',
      title: 'Online Platform Launch',
      description: 'Launched our comprehensive online learning platform, making education accessible globally.'
    },
    {
      year: '2019',
      title: 'Industry Partnerships',
      description: 'Established partnerships with leading tech companies for internships and job placements.'
    },
    {
      year: '2022',
      title: 'AI Integration',
      description: 'Integrated AI-powered learning tools to personalize education for each student.'
    },
    {
      year: '2025',
      title: 'Global Expansion',
      description: 'Expanding to serve students worldwide with localized programs and support.'
    }
  ];
}