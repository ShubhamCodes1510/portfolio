import { Component, OnInit, signal, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  activeFilter = signal('All');
  filters: string[] = ['All'];
  projects: any[] = [];
  loading = signal(true);
  isVisible = signal(false);

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadProjects();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isVisible.set(true);
    }, 100);
  }

  loadProjects() {
    this.loading.set(true);
    this.api.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        const categories = [...new Set(data.map((p: any) => p.category).filter(Boolean))];
        this.filters = ['All', ...categories];
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  filteredProjects() {
    if (this.activeFilter() === 'All') return this.projects;
    return this.projects.filter(p => p.category === this.activeFilter());
  }

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  // Mock data for demonstration if API returns empty
  getMockProjects() {
    return [
      {
        id: 1,
        title: 'Portfolio Website',
        description: 'A modern portfolio website built with Angular and Bootstrap showcasing my projects and skills.',
        category: 'Web Development',
        technologies: 'Angular,TypeScript,Bootstrap,SCSS',
        imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        liveDemoUrl: 'https://example.com',
        githubUrl: 'https://github.com/example'
      },
      {
        id: 2,
        title: 'E-commerce Platform',
        description: 'Full-stack e-commerce platform with user authentication, product management, and payment integration.',
        category: 'Full Stack',
        technologies: 'Java,Spring Boot,React,PostgreSQL',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        liveDemoUrl: 'https://example.com',
        githubUrl: 'https://github.com/example'
      },
      {
        id: 3,
        title: 'Task Management App',
        description: 'Collaborative task management application with real-time updates and team collaboration features.',
        category: 'Mobile',
        technologies: 'React Native,Node.js,MongoDB',
        imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        liveDemoUrl: 'https://example.com',
        githubUrl: 'https://github.com/example'
      },
      {
        id: 4,
        title: 'Weather Dashboard',
        description: 'Real-time weather dashboard with interactive maps, forecasts, and location-based weather data.',
        category: 'Web Development',
        technologies: 'JavaScript,API,Chart.js,HTML/CSS',
        imageUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        liveDemoUrl: 'https://example.com',
        githubUrl: 'https://github.com/example'
      },
      {
        id: 5,
        title: 'Blog Platform',
        description: 'Content management system for blogging with rich text editor, comments, and user management.',
        category: 'Full Stack',
        technologies: 'Python,Django,PostgreSQL,JavaScript',
        imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        liveDemoUrl: 'https://example.com',
        githubUrl: 'https://github.com/example'
      },
      {
        id: 6,
        title: 'Fitness Tracker',
        description: 'Mobile application for tracking workouts, nutrition, and fitness progress with data visualization.',
        category: 'Mobile',
        technologies: 'Flutter,Dart,Firebase,Google Fit API',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        liveDemoUrl: 'https://example.com',
        githubUrl: 'https://github.com/example'
      }
    ];
  }
}
