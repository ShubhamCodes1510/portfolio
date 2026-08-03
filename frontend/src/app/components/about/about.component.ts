import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  techStack = [
    'Angular', 'React', 'TypeScript', 'JavaScript', 
    'Java', 'Spring Boot', 'Node.js', 'Express', 
    'MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 
    'Git', 'Docker', 'AWS', 'Python', 'C++', 
    'HTML5', 'CSS3', 'SASS', 'Bootstrap', 'Tailwind CSS'
  ];

  experienceYears = signal(5);
  projectsCompleted = signal(20);
  teamSize = signal(5);

  // Group tech stack by category for better organization
  techCategories = [
    {
      name: 'Frontend',
      technologies: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SASS', 'Bootstrap', 'Tailwind CSS']
    },
    {
      name: 'Backend',
      technologies: ['Java', 'Spring Boot', 'Node.js', 'Express', 'Python', 'C++']
    },
    {
      name: 'Databases',
      technologies: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase']
    },
    {
      name: 'DevOps & Tools',
      technologies: ['Git', 'Docker', 'AWS']
    }
  ];
}
